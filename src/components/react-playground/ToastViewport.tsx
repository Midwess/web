import { CircleAlert, CircleCheck, Info, X } from "lucide-react";

export type PlaygroundToast = {
  id: number;
  kind: "error" | "success" | "info";
  title: string;
  message?: string;
};

type ToastViewportProps = {
  toasts: PlaygroundToast[];
  onDismiss: (id: number) => void;
};

const icons = {
  error: CircleAlert,
  success: CircleCheck,
  info: Info,
};

export function ToastViewport({ toasts, onDismiss }: ToastViewportProps) {
  return (
    <div className="wp-toaster" aria-live="polite" aria-atomic="false">
      {toasts.map((toast) => {
        const Icon = icons[toast.kind];
        return (
          <div
            key={toast.id}
            className={`wp-toast is-${toast.kind}`}
            role="status"
          >
            <Icon aria-hidden="true" size={17} />
            <div>
              <strong>{toast.title}</strong>
              {toast.message ? <p>{toast.message}</p> : null}
            </div>
            <button
              type="button"
              aria-label="Dismiss notification"
              onClick={() => onDismiss(toast.id)}
            >
              <X aria-hidden="true" size={14} />
            </button>
          </div>
        );
      })}
    </div>
  );
}
