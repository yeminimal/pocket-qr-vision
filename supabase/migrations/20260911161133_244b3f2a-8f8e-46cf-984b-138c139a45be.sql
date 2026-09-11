-- Enums
CREATE TYPE public.subscription_tier AS ENUM ('free','developer','business','custom');
CREATE TYPE public.subscription_status AS ENUM ('active','trialing','past_due','canceled','pending_sales');

-- Helper: current anonymous session fingerprint from request header
CREATE OR REPLACE FUNCTION public.current_session_fingerprint()
RETURNS text
LANGUAGE sql
STABLE
SET search_path = public
AS $$
  SELECT nullif(current_setting('request.headers', true)::json->>'x-seeqr-session', '')
$$;

CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
SET search_path = public
AS $$ BEGIN NEW.updated_at = now(); RETURN NEW; END $$;

-- 1. profiles
CREATE TABLE public.profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email text NOT NULL,
  full_name text,
  device_fingerprint text,
  ip_last_seen inet,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE ON public.profiles TO authenticated;
GRANT ALL ON public.profiles TO service_role;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "profiles_select_own" ON public.profiles FOR SELECT TO authenticated USING (id = auth.uid());
CREATE POLICY "profiles_insert_own" ON public.profiles FOR INSERT TO authenticated WITH CHECK (id = auth.uid());
CREATE POLICY "profiles_update_own" ON public.profiles FOR UPDATE TO authenticated USING (id = auth.uid()) WITH CHECK (id = auth.uid());

-- 2. tier_limits
CREATE TABLE public.tier_limits (
  tier public.subscription_tier PRIMARY KEY,
  max_uploads_per_scan int NOT NULL,
  max_uploads_per_day int,
  max_pdf_size_mb int,
  api_calls_per_month int,
  api_rate_limit_per_second int,
  has_full_report boolean NOT NULL DEFAULT false,
  has_link_shortener boolean NOT NULL DEFAULT false,
  has_link_bundler boolean NOT NULL DEFAULT false,
  has_whatsapp_bot boolean NOT NULL DEFAULT false
);
GRANT SELECT ON public.tier_limits TO anon, authenticated;
GRANT ALL ON public.tier_limits TO service_role;
ALTER TABLE public.tier_limits ENABLE ROW LEVEL SECURITY;
CREATE POLICY "tier_limits_public_read" ON public.tier_limits FOR SELECT TO anon, authenticated USING (true);

INSERT INTO public.tier_limits (tier, max_uploads_per_scan, max_uploads_per_day, max_pdf_size_mb, api_calls_per_month, api_rate_limit_per_second, has_full_report, has_link_shortener, has_link_bundler, has_whatsapp_bot) VALUES
  ('free', 1, 3, 0, 0, 0, false, false, false, false),
  ('developer', 20, NULL, 50, 1000, 10, true, true, true, true),
  ('business', 20, NULL, 50, 10000, 20, true, true, true, true),
  ('custom', 20, NULL, 100, NULL, NULL, true, true, true, true);

-- 3. subscriptions
CREATE TABLE public.subscriptions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  tier public.subscription_tier NOT NULL DEFAULT 'free',
  status public.subscription_status NOT NULL DEFAULT 'active',
  stripe_customer_id text,
  stripe_subscription_id text,
  trial_ends_at timestamptz,
  current_period_end timestamptz,
  custom_upload_limit int,
  custom_price_cents int,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX subscriptions_user_id_idx ON public.subscriptions(user_id);
GRANT SELECT ON public.subscriptions TO authenticated;
GRANT ALL ON public.subscriptions TO service_role;
ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "subscriptions_select_own" ON public.subscriptions FOR SELECT TO authenticated USING (user_id = auth.uid());
CREATE TRIGGER subscriptions_set_updated_at BEFORE UPDATE ON public.subscriptions FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- 4. sales_leads
CREATE TABLE public.sales_leads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  company_name text NOT NULL,
  contact_name text NOT NULL,
  email text NOT NULL,
  phone text,
  expected_monthly_volume int,
  use_case text,
  status text NOT NULL DEFAULT 'new',
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT INSERT ON public.sales_leads TO anon, authenticated;
GRANT ALL ON public.sales_leads TO service_role;
ALTER TABLE public.sales_leads ENABLE ROW LEVEL SECURITY;
CREATE POLICY "sales_leads_insert_any" ON public.sales_leads FOR INSERT TO anon, authenticated WITH CHECK (true);

-- 5. scans
CREATE TABLE public.scans (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES public.profiles(id) ON DELETE SET NULL,
  session_fingerprint text,
  source text NOT NULL,
  file_count int NOT NULL DEFAULT 1,
  created_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT scans_source_valid CHECK (source IN ('web_upload','api','share_target','whatsapp'))
);
CREATE INDEX scans_user_id_idx ON public.scans(user_id);
CREATE INDEX scans_session_idx ON public.scans(session_fingerprint);
GRANT SELECT ON public.scans TO anon, authenticated;
GRANT ALL ON public.scans TO service_role;
ALTER TABLE public.scans ENABLE ROW LEVEL SECURITY;
CREATE POLICY "scans_select_own" ON public.scans FOR SELECT TO anon, authenticated
USING (
  (user_id IS NOT NULL AND user_id = auth.uid())
  OR (session_fingerprint IS NOT NULL AND session_fingerprint = public.current_session_fingerprint())
);

-- 6. scan_results
CREATE TABLE public.scan_results (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  scan_id uuid NOT NULL REFERENCES public.scans(id) ON DELETE CASCADE,
  upload_order int NOT NULL,
  filename text,
  decoded_url text,
  qr_detected boolean NOT NULL,
  risk_score int,
  risk_level text,
  processing_ms int,
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX scan_results_scan_id_idx ON public.scan_results(scan_id);
GRANT SELECT ON public.scan_results TO anon, authenticated;
GRANT ALL ON public.scan_results TO service_role;
ALTER TABLE public.scan_results ENABLE ROW LEVEL SECURITY;
CREATE POLICY "scan_results_select_own" ON public.scan_results FOR SELECT TO anon, authenticated
USING (EXISTS (SELECT 1 FROM public.scans s WHERE s.id = scan_id));

-- 7. threat_reports
CREATE TABLE public.threat_reports (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  scan_result_id uuid NOT NULL REFERENCES public.scan_results(id) ON DELETE CASCADE,
  reputation_score int,
  reputation_findings jsonb,
  structure_score int,
  structure_findings jsonb,
  domain_score int,
  domain_findings jsonb,
  qr_specific_score int,
  qr_specific_findings jsonb,
  data_sources jsonb,
  external_links jsonb,
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX threat_reports_scan_result_idx ON public.threat_reports(scan_result_id);
GRANT SELECT ON public.threat_reports TO anon, authenticated;
GRANT ALL ON public.threat_reports TO service_role;
ALTER TABLE public.threat_reports ENABLE ROW LEVEL SECURITY;
CREATE POLICY "threat_reports_select_own" ON public.threat_reports FOR SELECT TO anon, authenticated
USING (EXISTS (SELECT 1 FROM public.scan_results r WHERE r.id = scan_result_id));

-- 8. report_feedback
CREATE TABLE public.report_feedback (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  threat_report_id uuid NOT NULL REFERENCES public.threat_reports(id) ON DELETE CASCADE,
  user_id uuid REFERENCES public.profiles(id) ON DELETE SET NULL,
  feedback_type text NOT NULL,
  note text,
  created_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT report_feedback_type_valid CHECK (feedback_type IN ('false_positive','false_negative','confirm_phishing'))
);
CREATE INDEX report_feedback_report_idx ON public.report_feedback(threat_report_id);
GRANT SELECT, INSERT ON public.report_feedback TO authenticated;
GRANT ALL ON public.report_feedback TO service_role;
ALTER TABLE public.report_feedback ENABLE ROW LEVEL SECURITY;
CREATE POLICY "report_feedback_select_own" ON public.report_feedback FOR SELECT TO authenticated USING (user_id = auth.uid());
CREATE POLICY "report_feedback_insert_own" ON public.report_feedback FOR INSERT TO authenticated
WITH CHECK (
  user_id = auth.uid()
  AND EXISTS (SELECT 1 FROM public.threat_reports t WHERE t.id = threat_report_id)
);

-- 9. api_keys
CREATE TABLE public.api_keys (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  key_hash text NOT NULL,
  key_prefix text NOT NULL,
  name text,
  revoked boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now(),
  last_used_at timestamptz
);
CREATE INDEX api_keys_user_id_idx ON public.api_keys(user_id);
CREATE UNIQUE INDEX api_keys_key_hash_idx ON public.api_keys(key_hash);
GRANT SELECT (id, user_id, key_prefix, name, revoked, created_at, last_used_at) ON public.api_keys TO authenticated;
GRANT UPDATE (revoked) ON public.api_keys TO authenticated;
GRANT ALL ON public.api_keys TO service_role;
ALTER TABLE public.api_keys ENABLE ROW LEVEL SECURITY;
CREATE POLICY "api_keys_select_own" ON public.api_keys FOR SELECT TO authenticated USING (user_id = auth.uid());
CREATE POLICY "api_keys_update_own" ON public.api_keys FOR UPDATE TO authenticated USING (user_id = auth.uid()) WITH CHECK (user_id = auth.uid());

-- 10. api_usage
CREATE TABLE public.api_usage (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  api_key_id uuid NOT NULL REFERENCES public.api_keys(id) ON DELETE CASCADE,
  endpoint text NOT NULL,
  called_at timestamptz NOT NULL DEFAULT now(),
  response_status int,
  processing_ms int
);
CREATE INDEX api_usage_key_idx ON public.api_usage(api_key_id, called_at);
GRANT SELECT ON public.api_usage TO authenticated;
GRANT ALL ON public.api_usage TO service_role;
ALTER TABLE public.api_usage ENABLE ROW LEVEL SECURITY;
CREATE POLICY "api_usage_select_own" ON public.api_usage FOR SELECT TO authenticated
USING (EXISTS (SELECT 1 FROM public.api_keys k WHERE k.id = api_key_id AND k.user_id = auth.uid()));