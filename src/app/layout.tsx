import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "MediVital",
  description:
    "Clínica MediVital: atención médica integral con más de 15 años de experiencia. Cardiología, pediatría, traumatología y más. Agenda tu cita hoy mismo.",
  keywords: [
    "clínica",
    "centro médico",
    "MediVital",
    "citas médicas",
    "especialistas",
  ],
  openGraph: {
    title: "MediVital | Centro Médico Integral",
    description:
      "Agenda tu cita médica en Clínica MediVital. Especialistas certificados y atención de emergencias 24/7.",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es"
      className={`${jakarta.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
