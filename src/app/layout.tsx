import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/header";


const inter = Inter( {
  variable: "--font-inter",
  subsets: ["latin"],

} )

export const metadata: Metadata = {
  title: "Licitati - Busca por Compras",
  description: "Busque por compras públicas de forma simples e rápida.",
};

export default function RootLayout( { children, }: Readonly<{ children: React.ReactNode; }> ) {
  return (
    <html lang="pt-br">
      <body className={`${inter.variable} antialiased`}>
        <Header />
        {children}
      </body>
    </html>
  );
}
