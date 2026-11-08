import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "DEEPAVALI — Personalized Festive Experience",
  description: "A personalized, cinematic Deepavali festival greeting that brings your portrait to life with golden reveals and glowing cracker spark bursts.",
  keywords: ["Deepavali", "Diwali", "Festival of Lights", "Personalized Greeting", "Golden Reveal"],
  openGraph: {
    title: "DEEPAVALI — Cinematic Golden Greeting",
    description: "Experience the festival of lights with a personalized golden portrait reveal.",
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
  themeColor: "#09090D",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className="min-h-screen bg-festival-dark text-festival-text-bright antialiased selection:bg-festival-gold/30 selection:text-festival-gold-light">
        {children}
      </body>
    </html>
  );
}
