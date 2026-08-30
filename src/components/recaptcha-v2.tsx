"use client";

import Script from "next/script";
import { useCallback, useEffect, useRef, useState } from "react";

type RecaptchaV2Props = {
  onChange: (token: string | null) => void;
  resetSignal?: number;
};

type RecaptchaParameters = {
  sitekey: string;
  theme: "dark" | "light";
  callback: (token: string) => void;
  "expired-callback": () => void;
  "error-callback": () => void;
};

declare global {
  interface Window {
    grecaptcha?: {
      render?: (
        container: HTMLElement,
        parameters: RecaptchaParameters,
      ) => number;
      reset?: (widgetId?: number) => void;
    };
  }
}

const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY ?? "";

export function RecaptchaV2({ onChange, resetSignal = 0 }: RecaptchaV2Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<number | null>(null);
  const onChangeRef = useRef(onChange);
  const retryTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const mountedRef = useRef(false);
  const [isUnavailable, setIsUnavailable] = useState(false);

  useEffect(() => {
    onChangeRef.current = onChange;
  }, [onChange]);

  const renderWidget = useCallback((): boolean => {
    const recaptcha = window.grecaptcha;

    if (
      !siteKey ||
      typeof recaptcha?.render !== "function" ||
      !containerRef.current ||
      widgetIdRef.current !== null
    ) {
      return false;
    }

    try {
      widgetIdRef.current = recaptcha.render(containerRef.current, {
        sitekey: siteKey,
        theme: "dark",
        callback: (token) => onChangeRef.current(token),
        "expired-callback": () => onChangeRef.current(null),
        "error-callback": () => {
          onChangeRef.current(null);
          setIsUnavailable(true);
        },
      });
      setIsUnavailable(false);
    } catch {
      setIsUnavailable(true);
    }

    return true;
  }, []);

  const initializeWidget = useCallback(() => {
    if (retryTimerRef.current !== null) {
      clearTimeout(retryTimerRef.current);
    }

    let attempts = 0;

    const tryRender = () => {
      if (!mountedRef.current || widgetIdRef.current !== null) {
        return;
      }

      if (renderWidget()) {
        retryTimerRef.current = null;
        return;
      }

      attempts += 1;

      if (attempts >= 100) {
        retryTimerRef.current = null;
        setIsUnavailable(true);
        return;
      }

      retryTimerRef.current = setTimeout(tryRender, 100);
    };

    tryRender();
  }, [renderWidget]);

  useEffect(() => {
    mountedRef.current = true;
    initializeWidget();

    return () => {
      mountedRef.current = false;

      if (retryTimerRef.current !== null) {
        clearTimeout(retryTimerRef.current);
      }
    };
  }, [initializeWidget]);

  useEffect(() => {
    const reset = window.grecaptcha?.reset;

    if (
      resetSignal > 0 &&
      widgetIdRef.current !== null &&
      typeof reset === "function"
    ) {
      reset(widgetIdRef.current);
      onChangeRef.current(null);
    }
  }, [resetSignal]);

  if (!siteKey) {
    return (
      <p className="mt-5 text-center text-xs text-red-400" role="alert">
        reCAPTCHA não configurado. Informe a chave pública do site.
      </p>
    );
  }

  return (
    <>
      <Script
        id="google-recaptcha-v2"
        src="https://www.google.com/recaptcha/api.js?render=explicit&hl=pt-BR"
        strategy="afterInteractive"
        onReady={initializeWidget}
        onError={() => setIsUnavailable(true)}
      />
      <div className="mt-5 flex justify-center overflow-x-auto">
        <div ref={containerRef} />
      </div>
      {isUnavailable ? (
        <p className="mt-3 text-center text-xs text-red-400" role="alert">
          Não foi possível carregar o reCAPTCHA. Atualize a página e tente novamente.
        </p>
      ) : null}
    </>
  );
}