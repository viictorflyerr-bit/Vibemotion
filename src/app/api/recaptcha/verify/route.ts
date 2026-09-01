import { NextResponse } from "next/server";

type GoogleVerificationResponse = {
  success: boolean;
  hostname?: string;
  "error-codes"?: string[];
};

function verificationErrorMessage(errorCodes: string[]) {
  if (errorCodes.includes("timeout-or-duplicate")) {
    return "O reCAPTCHA expirou. Marque novamente e envie em até dois minutos.";
  }

  if (
    errorCodes.includes("missing-input-secret") ||
    errorCodes.includes("invalid-input-secret")
  ) {
    return "A chave secreta do reCAPTCHA está incorreta na Vercel.";
  }

  if (
    errorCodes.includes("missing-input-response") ||
    errorCodes.includes("invalid-input-response")
  ) {
    return "As chaves do reCAPTCHA não correspondem ou o domínio não está autorizado.";
  }

  return "O reCAPTCHA não foi validado. Marque novamente e tente outra vez.";
}

function normalizeHostname(value: string | null | undefined) {
  if (!value) return "";

  return value
    .trim()
    .toLowerCase()
    .replace(/^https?:\/\//, "")
    .split("/")[0]
    .split(":")[0];
}

export async function POST(request: Request) {
  const secretKey = process.env.RECAPTCHA_SECRET_KEY;

  if (!secretKey) {
    return NextResponse.json(
      { success: false, message: "reCAPTCHA não configurado no servidor." },
      { status: 503 },
    );
  }

  let token = "";

  try {
    const body = (await request.json()) as { token?: unknown };
    token = typeof body.token === "string" ? body.token.trim() : "";
  } catch {
    return NextResponse.json(
      { success: false, message: "Solicitação inválida." },
      { status: 400 },
    );
  }

  if (!token || token.length > 4096) {
    return NextResponse.json(
      { success: false, message: "Confirme que você não é um robô." },
      { status: 400 },
    );
  }

  const parameters = new URLSearchParams({
    secret: secretKey,
    response: token,
  });
  const forwardedFor = request.headers
    .get("x-forwarded-for")
    ?.split(",")[0]
    ?.trim();

  if (forwardedFor) {
    parameters.set("remoteip", forwardedFor);
  }

  try {
    const googleResponse = await fetch(
      "https://www.google.com/recaptcha/api/siteverify",
      {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: parameters,
        cache: "no-store",
      },
    );

    if (!googleResponse.ok) {
      throw new Error("Google verification request failed");
    }

    const result = (await googleResponse.json()) as GoogleVerificationResponse;

    if (!result.success) {
      const errorCodes = result["error-codes"] ?? [];
      console.error("Falha do Google reCAPTCHA:", errorCodes.join(", "));
      return NextResponse.json(
        {
          success: false,
          message: verificationErrorMessage(errorCodes),
        },
        { status: 400 },
      );
    }

    const allowedHostnames = (process.env.RECAPTCHA_ALLOWED_HOSTNAMES ?? "")
      .split(",")
      .map(normalizeHostname)
      .filter(Boolean);

    if (
      allowedHostnames.length > 0 &&
      (!result.hostname ||
        !allowedHostnames.includes(normalizeHostname(result.hostname)))
    ) {
      return NextResponse.json(
        {
          success: false,
          message: result.hostname
            ? "Origem não autorizada. Adicione " + result.hostname + " em RECAPTCHA_ALLOWED_HOSTNAMES na Vercel."
            : "Origem do reCAPTCHA não autorizada.",
        },
        { status: 400 },
      );
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      {
        success: false,
        message: "Não foi possível validar o reCAPTCHA agora.",
      },
      { status: 502 },
    );
  }
}