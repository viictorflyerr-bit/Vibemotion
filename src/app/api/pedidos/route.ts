import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const runtime = "nodejs";

type OrderRequest = {
  name?: unknown;
  whatsapp?: unknown;
  email?: unknown;
  fileType?: unknown;
  projectName?: unknown;
  style?: unknown;
  eventDate?: unknown;
  reference?: unknown;
  description?: unknown;
  website?: unknown;
};

function clean(value: unknown, maxLength: number) {
  return typeof value === "string"
    ? value.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g, "").trim().slice(0, maxLength)
    : "";
}

function oneLine(value: string) {
  return value.replace(/[\r\n]+/g, " ").trim();
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

export async function POST(request: Request) {
  try {
    const body = await request.json() as OrderRequest;

    if (clean(body.website, 100)) {
      return NextResponse.json({ ok: true });
    }

    const order = {
      name: clean(body.name, 120),
      whatsapp: clean(body.whatsapp, 40),
      email: clean(body.email, 160),
      fileType: clean(body.fileType, 100),
      projectName: clean(body.projectName, 160),
      style: clean(body.style, 120),
      eventDate: clean(body.eventDate, 30),
      reference: clean(body.reference, 500),
      description: clean(body.description, 5000),
    };

    if (!order.name || !order.whatsapp || !order.fileType || !order.projectName || !order.style || !order.description) {
      return NextResponse.json(
        { ok: false, message: "Preencha todos os campos obrigatórios." },
        { status: 400 },
      );
    }

    if (order.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(order.email)) {
      return NextResponse.json(
        { ok: false, message: "Informe um e-mail válido." },
        { status: 400 },
      );
    }

    if (order.reference) {
      try {
        const referenceUrl = new URL(order.reference);
        if (!["http:", "https:"].includes(referenceUrl.protocol)) throw new Error("Protocolo inválido");
      } catch {
        return NextResponse.json(
          { ok: false, message: "Informe um link de referência válido." },
          { status: 400 },
        );
      }
    }

    const gmailUser = process.env.GMAIL_USER?.trim() ?? "";
    const gmailAppPassword = process.env.GMAIL_APP_PASSWORD?.replace(/\s/g, "") ?? "";
    const recipient = process.env.ORDER_REQUEST_RECIPIENT?.trim() || "suporte.vibemotion@gmail.com";

    if (!gmailUser || !gmailAppPassword) {
      console.error("Gmail não configurado: defina GMAIL_USER e GMAIL_APP_PASSWORD.");
      return NextResponse.json(
        { ok: false, message: "O envio por e-mail ainda não foi configurado. Tente novamente mais tarde." },
        { status: 503 },
      );
    }

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: gmailUser,
        pass: gmailAppPassword,
      },
    });

    const rows = [
      ["Nome", order.name],
      ["WhatsApp", order.whatsapp],
      ["E-mail", order.email || "Não informado"],
      ["Tipo de arquivo", order.fileType],
      ["Música ou projeto", order.projectName],
      ["Ritmo ou estilo", order.style],
      ["Data do evento", order.eventDate || "Não informada"],
      ["Referência", order.reference || "Não informada"],
    ];

    const text = [
      "NOVO PEDIDO DE ARQUIVO - VIBE MOTION",
      "",
      ...rows.map(([label, value]) => label + ": " + value),
      "",
      "Descrição:",
      order.description,
    ].join("\n");

    const tableRows = rows
      .map(([label, value]) => "<tr><td style=\"padding:10px 12px;border-bottom:1px solid #26303a;color:#8ca0b3;font-size:12px;text-transform:uppercase\">" + escapeHtml(label) + "</td><td style=\"padding:10px 12px;border-bottom:1px solid #26303a;color:#ffffff\">" + escapeHtml(value) + "</td></tr>")
      .join("");

    await transporter.sendMail({
      from: '"Vibe Motion - Pedidos" <' + gmailUser + ">",
      to: recipient,
      replyTo: order.email || gmailUser,
      subject: "[Novo pedido] " + oneLine(order.projectName) + " - " + oneLine(order.name),
      text,
      html: "<div style=\"background:#07090c;padding:32px;font-family:Arial,sans-serif;color:#fff\"><div style=\"max-width:680px;margin:auto;background:#0d1014;border:1px solid #26303a\"><div style=\"padding:24px;border-bottom:3px solid #35c8ff\"><div style=\"font-size:11px;letter-spacing:2px;color:#35c8ff;text-transform:uppercase\">Vibe Motion</div><h1 style=\"margin:8px 0 0;font-size:24px;text-transform:uppercase\">Novo pedido de arquivo</h1></div><table style=\"width:100%;border-collapse:collapse\">" + tableRows + "</table><div style=\"padding:24px\"><div style=\"font-size:11px;letter-spacing:1px;color:#35c8ff;text-transform:uppercase;margin-bottom:10px\">Descrição do pedido</div><div style=\"white-space:pre-wrap;line-height:1.7;color:#d9e2ea\">" + escapeHtml(order.description) + "</div></div></div></div>",
    });

    return NextResponse.json({
      ok: true,
      message: "Pedido enviado com sucesso para o atendimento.",
    });
  } catch (error) {
    console.error("Falha ao enviar pedido por e-mail:", error instanceof Error ? error.message : "Erro desconhecido");
    return NextResponse.json(
      { ok: false, message: "Não foi possível enviar o pedido agora. Tente novamente." },
      { status: 500 },
    );
  }
}
