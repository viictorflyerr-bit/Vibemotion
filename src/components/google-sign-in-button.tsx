"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";
import { signIn } from "next-auth/react";

export function GoogleSignInButton({ returnTo = "/" }: { returnTo?: string }) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSignIn = async () => {
    setError("");
    setIsLoading(true);

    try {
      const redirectTo = returnTo.startsWith("/") ? returnTo : "/";
      await signIn("google", { redirectTo });
    } catch {
      setError("Não foi possível abrir o login do Google. Tente novamente.");
      setIsLoading(false);
    }
  };

  return (
    <div className="mt-7">
      <button
        type="button"
        onClick={handleSignIn}
        disabled={isLoading}
        className="group relative flex h-12 w-full items-center justify-center gap-3 overflow-hidden rounded-[7px] border border-white/14 bg-[#111317] px-4 text-sm font-black text-white shadow-[0_10px_30px_rgba(0,0,0,.18)] transition hover:border-[#35C8FF]/55 hover:bg-[#151920] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#35C8FF] disabled:cursor-wait disabled:opacity-65"
      >
        <span className="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-[#4285F4] via-[#34A853] to-[#FBBC05] opacity-80 transition group-hover:opacity-100" />
        {isLoading ? (
          <Loader2 aria-hidden="true" className="h-5 w-5 animate-spin text-[#35C8FF]" />
        ) : (
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            className="h-5 w-5 shrink-0"
          >
            <path
              fill="#4285F4"
              d="M21.35 12.23c0-.71-.06-1.23-.2-1.77H12v3.34h5.37a4.59 4.59 0 0 1-1.99 3.01l2.82 2.19c1.64-1.52 3.15-3.76 3.15-6.77Z"
            />
            <path
              fill="#34A853"
              d="M12 21.75c2.61 0 4.8-.86 6.4-2.35l-2.82-2.19c-.78.52-1.78.88-3.58.88-2.51 0-4.64-1.7-5.4-3.98l-2.91 2.25A9.67 9.67 0 0 0 12 21.75Z"
            />
            <path
              fill="#FBBC05"
              d="M6.6 14.11A5.8 5.8 0 0 1 6.3 12c0-.73.13-1.44.36-2.11L3.75 7.63A9.74 9.74 0 0 0 2.75 12c0 1.57.38 3.05 1.04 4.37l2.81-2.26Z"
            />
            <path
              fill="#EA4335"
              d="M12 5.91c1.42 0 2.69.49 3.69 1.44l2.77-2.77C16.79 3.02 14.61 2.25 12 2.25a9.67 9.67 0 0 0-8.31 5.39L6.6 9.89c.76-2.28 2.89-3.98 5.4-3.98Z"
            />
          </svg>
        )}
        <span>{isLoading ? "Abrindo Google..." : "Entrar com o Google"}</span>
      </button>
      {error ? (
        <p className="mt-3 text-center text-xs leading-5 text-red-300" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}