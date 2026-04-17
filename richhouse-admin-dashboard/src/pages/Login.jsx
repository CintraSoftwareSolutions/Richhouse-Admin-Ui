import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import useAdminLogin from "../hooks/auth/useLogin";
import toast from "react-hot-toast";

const FONT_URL =
  "https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap";

// tiny tokens to match your admin UI
const twInput =
  "rounded-xl border px-3 py-2 text-sm w-full bg-white dark:bg-neutral-800 " +
  "border-neutral-300 dark:border-neutral-700 text-neutral-900 dark:text-neutral-100 " +
  "outline-none focus:ring-2 focus:ring-neutral-900 dark:focus:ring-neutral-300";
const twBtnPri =
  "rounded-xl border px-3 py-2 text-sm w-full bg-neutral-900 text-white hover:bg-neutral-800 " +
  "border-neutral-900 dark:bg-neutral-200 dark:text-neutral-900 dark:hover:bg-white dark:border-neutral-200";

export default function Login() {
  // load Google Font for this page too
  useEffect(() => {
    const p1 = document.createElement("link");
    p1.rel = "preconnect";
    p1.href = "https://fonts.googleapis.com";
    const p2 = document.createElement("link");
    p2.rel = "preconnect";
    p2.href = "https://fonts.gstatic.com";
    p2.crossOrigin = "anonymous";
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = FONT_URL;
    document.head.append(p1, p2, link);
    return () => {
      document.head.removeChild(link);
      document.head.removeChild(p2);
      document.head.removeChild(p1);
    };
  }, []);

  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [remember, setRemember] = useState(true);
  // const [err, setErr] = useState("");
  // const [loading, setLoading] = useState(false);
  const { loginAdmin, loading, error } = useAdminLogin();
  const navigate = useNavigate();
  const [sp] = useSearchParams();
  const next = sp.get("next") || "/admin";

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const user = await loginAdmin({
        email,
        password: pw,
      });

      if (user.role !== "admin") {
        throw new Error("Access denied");
      }
      navigate(next, { replace: true });
    } catch (e) {
      // toast.error("Email or password is incorrect");
      console.log("Login failed:", e.message);
       
    }
  };

  return (
    <div
      className="min-h-screen grid place-items-center bg-neutral-100 text-neutral-900 dark:bg-neutral-950 dark:text-neutral-100 px-4"
      style={{ fontFamily: '"Poppins", ui-sans-serif, system-ui' }}
    >
      <div className="w-full max-w-md">
        {/* card */}
        <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-sm p-6">
          {/* brand */}
          <div className="flex items-center gap-3 mb-6">
            <div className="h-10 w-10 rounded-xl bg-neutral-900 dark:bg-neutral-100 grid place-items-center text-white dark:text-neutral-900 font-bold">
              C
            </div>
            <div>
              <div className="text-lg font-semibold">Crave Admin</div>
              <div className="text-xs text-neutral-500 dark:text-neutral-400">
                Sign in to continue
              </div>
            </div>
          </div>

          <form onSubmit={onSubmit} className="space-y-3">
            <label className="block">
              <div className="text-xs font-medium text-neutral-600 dark:text-neutral-300 mb-1">
                Email
              </div>
              <input
                type="email"
                className={twInput}
                placeholder="admin@Crave.app"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoFocus
              />
            </label>

            <label className="block">
              <div className="text-xs font-medium text-neutral-600 dark:text-neutral-300 mb-1">
                Password
              </div>
              <input
                type="password"
                className={twInput}
                placeholder="••••••••"
                value={pw}
                onChange={(e) => setPw(e.target.value)}
              />
            </label>

            <div className="flex items-center justify-between">
              <label className="inline-flex items-center gap-2 text-sm text-neutral-700 dark:text-neutral-200">
                <input
                  type="checkbox"
                  className="accent-neutral-900 dark:accent-neutral-200"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                />
                Remember me
              </label>
              <button
                type="button"
                className="text-sm text-neutral-700 dark:text-neutral-200 hover:underline"
                onClick={() => alert("Stub: connect your reset flow")}
              >
                Forgot password?
              </button>
            </div>

            {error && (
              <div className="text-xs text-rose-600 dark:text-rose-400">
                {error}
              </div>
            )}

            <button type="submit" className={twBtnPri} disabled={loading}>
              {loading ? "Signing in..." : "Sign in"}
            </button>
          </form>

          {/* demo creds hint (remove in prod) */}
          {/* <div className="mt-4 text-[11px] text-neutral-500 dark:text-neutral-400">
            Demo: <span className="font-mono">admin@Crave.app</span> /{" "}
            <span className="font-mono">admin123</span>
          </div> */}
        </div>
      </div>
    </div>
  );
}
