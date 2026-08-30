import { NextResponse } from "next/server";

type GoogleVerificationResponse = {
  success: boolean;
  hostname?: string;
  "error-codes"?: string[];
};

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
      return NextResponse.json(
        {
          success: false,
          message: "O reCAPTCHA expirou ou não foi validado. Tente novamente.",
        },
        { status: 400 },
      );
    }

    const allowedHostnames = (process.env.RECAPTCHA_ALLOWED_HOSTNAMES ?? "")
      .split(",")
      .map((hostname) => hostname.trim().toLowerCase())
      .filter(Boolean);

    if (
      allowedHostnames.length > 0 &&
      (!result.hostname ||
        !allowedHostnames.includes(result.hostname.toLowerCase()))
    ) {
      return NextResponse.json(
        { success: false, message: "Origem do reCAPTCHA não autorizada." },
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