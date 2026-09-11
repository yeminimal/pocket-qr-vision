export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      api_keys: {
        Row: {
          created_at: string
          id: string
          key_hash: string
          key_prefix: string
          last_used_at: string | null
          name: string | null
          revoked: boolean
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          key_hash: string
          key_prefix: string
          last_used_at?: string | null
          name?: string | null
          revoked?: boolean
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          key_hash?: string
          key_prefix?: string
          last_used_at?: string | null
          name?: string | null
          revoked?: boolean
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "api_keys_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      api_usage: {
        Row: {
          api_key_id: string
          called_at: string
          endpoint: string
          id: string
          processing_ms: number | null
          response_status: number | null
        }
        Insert: {
          api_key_id: string
          called_at?: string
          endpoint: string
          id?: string
          processing_ms?: number | null
          response_status?: number | null
        }
        Update: {
          api_key_id?: string
          called_at?: string
          endpoint?: string
          id?: string
          processing_ms?: number | null
          response_status?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "api_usage_api_key_id_fkey"
            columns: ["api_key_id"]
            isOneToOne: false
            referencedRelation: "api_keys"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          created_at: string
          device_fingerprint: string | null
          email: string
          full_name: string | null
          id: string
          ip_last_seen: unknown
        }
        Insert: {
          created_at?: string
          device_fingerprint?: string | null
          email: string
          full_name?: string | null
          id: string
          ip_last_seen?: unknown
        }
        Update: {
          created_at?: string
          device_fingerprint?: string | null
          email?: string
          full_name?: string | null
          id?: string
          ip_last_seen?: unknown
        }
        Relationships: []
      }
      report_feedback: {
        Row: {
          created_at: string
          feedback_type: string
          id: string
          note: string | null
          threat_report_id: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          feedback_type: string
          id?: string
          note?: string | null
          threat_report_id: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          feedback_type?: string
          id?: string
          note?: string | null
          threat_report_id?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "report_feedback_threat_report_id_fkey"
            columns: ["threat_report_id"]
            isOneToOne: false
            referencedRelation: "threat_reports"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "report_feedback_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      sales_leads: {
        Row: {
          company_name: string
          contact_name: string
          created_at: string
          email: string
          expected_monthly_volume: number | null
          id: string
          phone: string | null
          status: string
          use_case: string | null
        }
        Insert: {
          company_name: string
          contact_name: string
          created_at?: string
          email: string
          expected_monthly_volume?: number | null
          id?: string
          phone?: string | null
          status?: string
          use_case?: string | null
        }
        Update: {
          company_name?: string
          contact_name?: string
          created_at?: string
          email?: string
          expected_monthly_volume?: number | null
          id?: string
          phone?: string | null
          status?: string
          use_case?: string | null
        }
        Relationships: []
      }
      scan_results: {
        Row: {
          created_at: string
          decoded_url: string | null
          filename: string | null
          id: string
          processing_ms: number | null
          qr_detected: boolean
          risk_level: string | null
          risk_score: number | null
          scan_id: string
          upload_order: number
        }
        Insert: {
          created_at?: string
          decoded_url?: string | null
          filename?: string | null
          id?: string
          processing_ms?: number | null
          qr_detected: boolean
          risk_level?: string | null
          risk_score?: number | null
          scan_id: string
          upload_order: number
        }
        Update: {
          created_at?: string
          decoded_url?: string | null
          filename?: string | null
          id?: string
          processing_ms?: number | null
          qr_detected?: boolean
          risk_level?: string | null
          risk_score?: number | null
          scan_id?: string
          upload_order?: number
        }
        Relationships: [
          {
            foreignKeyName: "scan_results_scan_id_fkey"
            columns: ["scan_id"]
            isOneToOne: false
            referencedRelation: "scans"
            referencedColumns: ["id"]
          },
        ]
      }
      scans: {
        Row: {
          created_at: string
          file_count: number
          id: string
          session_fingerprint: string | null
          source: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          file_count?: number
          id?: string
          session_fingerprint?: string | null
          source: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          file_count?: number
          id?: string
          session_fingerprint?: string | null
          source?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "scans_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      subscriptions: {
        Row: {
          created_at: string
          current_period_end: string | null
          custom_price_cents: number | null
          custom_upload_limit: number | null
          id: string
          status: Database["public"]["Enums"]["subscription_status"]
          stripe_customer_id: string | null
          stripe_subscription_id: string | null
          tier: Database["public"]["Enums"]["subscription_tier"]
          trial_ends_at: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          current_period_end?: string | null
          custom_price_cents?: number | null
          custom_upload_limit?: number | null
          id?: string
          status?: Database["public"]["Enums"]["subscription_status"]
          stripe_customer_id?: string | null
          stripe_subscription_id?: string | null
          tier?: Database["public"]["Enums"]["subscription_tier"]
          trial_ends_at?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          current_period_end?: string | null
          custom_price_cents?: number | null
          custom_upload_limit?: number | null
          id?: string
          status?: Database["public"]["Enums"]["subscription_status"]
          stripe_customer_id?: string | null
          stripe_subscription_id?: string | null
          tier?: Database["public"]["Enums"]["subscription_tier"]
          trial_ends_at?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "subscriptions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      threat_reports: {
        Row: {
          created_at: string
          data_sources: Json | null
          domain_findings: Json | null
          domain_score: number | null
          external_links: Json | null
          id: string
          qr_specific_findings: Json | null
          qr_specific_score: number | null
          reputation_findings: Json | null
          reputation_score: number | null
          scan_result_id: string
          structure_findings: Json | null
          structure_score: number | null
        }
        Insert: {
          created_at?: string
          data_sources?: Json | null
          domain_findings?: Json | null
          domain_score?: number | null
          external_links?: Json | null
          id?: string
          qr_specific_findings?: Json | null
          qr_specific_score?: number | null
          reputation_findings?: Json | null
          reputation_score?: number | null
          scan_result_id: string
          structure_findings?: Json | null
          structure_score?: number | null
        }
        Update: {
          created_at?: string
          data_sources?: Json | null
          domain_findings?: Json | null
          domain_score?: number | null
          external_links?: Json | null
          id?: string
          qr_specific_findings?: Json | null
          qr_specific_score?: number | null
          reputation_findings?: Json | null
          reputation_score?: number | null
          scan_result_id?: string
          structure_findings?: Json | null
          structure_score?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "threat_reports_scan_result_id_fkey"
            columns: ["scan_result_id"]
            isOneToOne: false
            referencedRelation: "scan_results"
            referencedColumns: ["id"]
          },
        ]
      }
      tier_limits: {
        Row: {
          api_calls_per_month: number | null
          api_rate_limit_per_second: number | null
          has_full_report: boolean
          has_link_bundler: boolean
          has_link_shortener: boolean
          has_whatsapp_bot: boolean
          max_pdf_size_mb: number | null
          max_uploads_per_day: number | null
          max_uploads_per_scan: number
          tier: Database["public"]["Enums"]["subscription_tier"]
        }
        Insert: {
          api_calls_per_month?: number | null
          api_rate_limit_per_second?: number | null
          has_full_report?: boolean
          has_link_bundler?: boolean
          has_link_shortener?: boolean
          has_whatsapp_bot?: boolean
          max_pdf_size_mb?: number | null
          max_uploads_per_day?: number | null
          max_uploads_per_scan: number
          tier: Database["public"]["Enums"]["subscription_tier"]
        }
        Update: {
          api_calls_per_month?: number | null
          api_rate_limit_per_second?: number | null
          has_full_report?: boolean
          has_link_bundler?: boolean
          has_link_shortener?: boolean
          has_whatsapp_bot?: boolean
          max_pdf_size_mb?: number | null
          max_uploads_per_day?: number | null
          max_uploads_per_scan?: number
          tier?: Database["public"]["Enums"]["subscription_tier"]
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      current_session_fingerprint: { Args: never; Returns: string }
    }
    Enums: {
      subscription_status:
        | "active"
        | "trialing"
        | "past_due"
        | "canceled"
        | "pending_sales"
      subscription_tier: "free" | "developer" | "business" | "custom"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends (DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never) = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends (PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never) = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      subscription_status: [
        "active",
        "trialing",
        "past_due",
        "canceled",
        "pending_sales",
      ],
      subscription_tier: ["free", "developer", "business", "custom"],
    },
  },
} as const
