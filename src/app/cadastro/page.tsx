"use client";

import { FormEvent, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
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

export default function CadastroPage() {
  const router = useRouter();
  const { register } = useAuth();
  const [returnTo, setReturnTo] = useState("/");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [accepted, setAccepted] = useState(false);
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

    if (!name.trim() || !email.trim() || !password.trim()) {
      setError("Preencha nome, e-mail e senha para criar sua conta.");
      return;
    }

    if (password !== confirmPassword) {
      setError("As senhas não conferem.");
      return;
    }

    if (!accepted) {
      setError("Aceite os termos para continuar.");
      return;
    }

    if (!recaptchaToken) {
      setError("Confirme que você não é um robô.");
      return;
    }

    setIsSubmitting(true);

    try {
      await verifyRecaptchaToken(recaptchaToken);
      await register({ name, email, password });
      router.push(returnTo);
    } catch (registerError) {
      setError(
        registerError instanceof Error
          ? registerError.message
          : "Não foi possível criar sua conta. Tente novamente.",
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
        <h1 className="text-center text-3xl font-black">Cadastre-se</h1>
        <label className="mt-8 block">
          <span className="text-sm font-bold text-cyan-50/70">Nome</span>
          <input
            value={name}
            onChange={(event) => setName(event.target.value)}
            autoComplete="name"
            className="mt-2 h-12 w-full rounded-[6px] border border-cyan-100/12 bg-white/[0.04] px-4 outline-none focus:border-[#35C8FF]/60"
          />
        </label>
        <label className="mt-5 block">
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
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            autoComplete="new-password"
            className="mt-2 h-12 w-full rounded-[6px] border border-cyan-100/12 bg-white/[0.04] px-4 outline-none focus:border-[#35C8FF]/60"
          />
        </label>
        <label className="mt-5 block">
          <span className="text-sm font-bold text-cyan-50/70">
            Confirme sua senha
          </span>
          <input
            type="password"
            value={confirmPassword}
            onChange={(event) => setConfirmPassword(event.target.value)}
            autoComplete="new-password"
            className="mt-2 h-12 w-full rounded-[6px] border border-cyan-100/12 bg-white/[0.04] px-4 outline-none focus:border-[#35C8FF]/60"
          />
        </label>
        <label className="mt-5 flex gap-3 text-sm leading-6 text-cyan-50/70">
          <input
            type="checkbox"
            checked={accepted}
            onChange={(event) => setAccepted(event.target.checked)}
            className="mt-1 h-4 w-4 accent-[#35C8FF]"
          />
          Aceito os termos de uso e a política de privacidade da VIBE MOTION.
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
          {isSubmitting ? "Criando conta..." : "Criar conta"}
        </button>
        <p className="mt-5 text-center text-sm text-cyan-50/70">
          Já tem conta?{" "}
          <Link
            href={"/entrar?returnTo=" + encodeURIComponent(returnTo)}
            className="font-black text-[#35C8FF]"
          >
            Entrar
          </Link>
        </p>
      </form>
    </main>
  );
}