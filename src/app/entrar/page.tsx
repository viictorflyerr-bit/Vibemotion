"use client";

import { FormEvent, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, X } from "lucide-react";
import { useAuth } from "@/components/auth-provider";
import { GoogleSignInButton } from "@/components/google-sign-in-button";
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

function getAccessNotice() {
  if (typeof window === "undefined") {
    return "";
  }

  const params = new URLSearchParams(window.location.search);

  if (params.get("error")) {
    return "Não foi possível entrar com o Google. Tente novamente ou use seu e-mail e senha.";
  }

  return params.get("reason") === "cart"
    ? "Entre ou cadastre-se para adicionar cards ao carrinho."
    : "";
}

export default function EntrarPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [returnTo, setReturnTo] = useState("/");
  const [accessNotice, setAccessNotice] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);
  const [recaptchaReset, setRecaptchaReset] = useState(0);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    queueMicrotask(() => {
      setReturnTo(getReturnTo());
      setAccessNotice(getAccessNotice());
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
        className="relative w-full max-w-md rounded-[10px] border border-cyan-100/12 bg-[#1B1D20] p-8"
      >
        <Link
          href={returnTo}
          aria-label="Fechar e voltar"
          className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full text-cyan-50/55 transition hover:bg-white/[0.06] hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#35C8FF]"
        >
          <X aria-hidden="true" className="h-5 w-5" />
        </Link>
        <h1 className="text-center text-3xl font-black">Entrar</h1>
        {accessNotice ? (
          <p
            className="mt-5 rounded-[7px] border border-[#35C8FF]/30 bg-[#35C8FF]/10 px-4 py-3 text-center text-sm leading-6 text-cyan-50/80"
            role="status"
          >
            {accessNotice}
          </p>
        ) : null}
        <GoogleSignInButton returnTo={returnTo} />
        <div className="my-7 flex items-center gap-3" aria-hidden="true">
          <span className="h-px flex-1 bg-white/10" />
          <span className="font-mono text-[0.62rem] font-black uppercase tracking-[0.16em] text-cyan-50/35">
            ou entre com e-mail
          </span>
          <span className="h-px flex-1 bg-white/10" />
        </div>
        <label className="block">
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