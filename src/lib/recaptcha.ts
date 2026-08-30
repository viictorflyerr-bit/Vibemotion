type VerificationResponse = {
  success?: boolean;
  message?: string;
};

export async function verifyRecaptchaToken(token: string) {
  let response: Response;

  try {
    response = await fetch("/api/recaptcha/verify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token }),
    });
  } catch {
    throw new Error("Não foi possível verificar o reCAPTCHA. Tente novamente.");
  }

  const data = (await response.json().catch(() => ({}))) as VerificationResponse;

  if (!response.ok || !data.success) {
    throw new Error(
      data.message ?? "Falha ao verificar o reCAPTCHA. Tente novamente.",
    );
  }
}