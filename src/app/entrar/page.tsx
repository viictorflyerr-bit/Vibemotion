"use client";

import { FormEvent, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye } from "lucide-react";
import { useAuth } from "@/components/auth-provider";
import { RecaptchaV2 } from "@/components/recaptcha-v2";
import { verifyRecaptchaToken } from "@/lib/recaptcha";

function getReturnTo() {
  if (typeof window === "undefined") {
    return "/";
  }

  const params = new URLSearchParams(window.location.search);
  const returnTo = params.get("returnTo");

  return returnTo?.startsWith("/") ? returnTo : "/";
}

export default function EntrarPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [returnTo, setReturnTo] = useState("/");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);
  const [recaptchaReset, setRecaptchaReset] = useState(0);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    queueMicrotask(() => {
      setReturnTo(getReturnTo());
    });
  }, []);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    if (!email.trim() || !password.trim()) {
      setError("Informe e-mail e senha para entrar.");
      return;
    }

    if (!recaptchaToken) {
      setError("Confirme que você não é um robô.");
      return;
    }

    setIsSubmitting(true);

    try {
      await verifyRecaptchaToken(recaptchaToken);
      await login({ email, password });
      router.push(returnTo);
    } catch (loginError) {
      setError(
        loginError instanceof Error
          ? loginError.message
          : "Não foi possível entrar. Tente novamente.",
      );
      setRecaptchaToken(null);
      setRecaptchaReset((current) => current + 1);
      setIsSubmitting(false);
    }
  };

  return (
    <main className="grid min-h-screen place-items-center bg-[#05070A] px-4 py-8 text-white">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md rounded-[10px] border border-cyan-100/12 bg-[#1B1D20] p-8"
      >
        <h1 className="text-center text-3xl font-black">Entrar</h1>
        <label className="mt-8 block">
          <span className="text-sm font-bold text-cyan-50/70">E-mail</span>
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            autoComplete="email"
            className="mt-2 h-12 w-full rounded-[6px] border border-cyan-100/12 bg-white/[0.04] px-4 outline-none focus:border-[#35C8FF]/60"
          />
        </label>
        <label className="mt-5 block">
          <span className="text-sm font-bold text-cyan-50/70">Senha</span>
          <span className="mt-2 flex h-12 items-center rounded-[6px] border border-cyan-100/12 bg-white/[0.04] px-4 focus-within:border-[#35C8FF]/60">
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              autoComplete="current-password"
              className="min-w-0 flex-1 bg-transparent outline-none"
            />
            <Eye aria-hidden="true" className="h-5 w-5 text-cyan-50/45" />
          </span>
        </label>
        <RecaptchaV2
          onChange={setRecaptchaToken}
          resetSignal={recaptchaReset}
        />
        {error ? (
          <p className="mt-4 text-sm text-[#35C8FF]" role="alert">
            {error}
          </p>
        ) : null}
        <button
          disabled={isSubmitting}
          className="shine-button mt-6 h-12 w-full text-sm uppercase tracking-[0.14em] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting ? "Entrando..." : "Entrar"}
        </button>
        <p className="mt-5 text-center text-sm text-cyan-50/70">
          Não tem uma conta?{" "}
          <Link
            href={"/cadastro?returnTo=" + encodeURIComponent(returnTo)}
            className="font-black text-[#35C8FF]"
          >
            Cadastre-se
          </Link>
        </p>
      </form>
    </main>
  );
}