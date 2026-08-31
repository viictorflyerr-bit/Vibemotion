import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { AuthSessionProvider } from "@/components/auth-session-provider";
import { AuthProvider } from "@/components/auth-provider";
import { CartProvider } from "@/components/cart-provider";
import { MotionProvider } from "@/components/motion-provider";
import { OrderProvider } from "@/components/order-provider";
import { CustomCursor } from "@/components/ui/CustomCursor";

import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://vibemotion.local"),
  title: "VIBE MOTION | Biblioteca visual para telÃµes e shows",
  description:
    "Packs de vÃ­deos, loops, animaÃ§Ãµes e artes visuais prontas para transformar telÃµes de shows, eventos, igrejas e palcos.",
  openGraph: {
    title: "VIBE MOTION",
    description:
      "Biblioteca digital de conteÃºdos visuais prontos para telÃµes, palcos e eventos.",
    type: "website",
    locale: "pt_BR",
  },
  twitter: {
    card: "summary_large_image",
    title: "VIBE MOTION",
    description:
      "Centenas de visuais prontos para deixar seu show com estÃ©tica profissional.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="h-full antialiased" suppressHydrationWarning>
      <body className="min-h-full" suppressHydrationWarning>
        <AuthSessionProvider>
          <AuthProvider>
            <CartProvider>
              <OrderProvider>
                <MotionProvider>{children}</MotionProvider>
              </OrderProvider>
            </CartProvider>
            <CustomCursor />
          </AuthProvider>
        </AuthSessionProvider>
        <Analytics />
      </body>
    </html>
  );
}


