import { Toaster as Sonner } from "sonner";

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast glass-panel group-[.toaster]:text-foreground group-[.toaster]:rounded-xl group-[.toaster]:font-light",
          title: "group-[.toast]:font-light group-[.toast]:tracking-tight",
          description: "group-[.toast]:text-muted-foreground group-[.toast]:font-light",
          actionButton:
            "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground group-[.toast]:rounded-lg group-[.toast]:font-light",
          cancelButton:
            "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground group-[.toast]:rounded-lg group-[.toast]:font-light",
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
