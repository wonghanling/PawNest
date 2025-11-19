'use client'

import { Manrope } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { CartProvider } from "@/context/CartContext";
import { AuthProvider } from "@/context/AuthContext";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["400", "500", "700", "800"],
});

const paypalOptions = {
  clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || '',
  currency: "USD",
  intent: "capture",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body
        className={`${manrope.variable} font-display antialiased bg-background-light dark:bg-background-dark text-slate-800 dark:text-slate-200`}
      >
        <AuthProvider>
          <CartProvider>
            <PayPalScriptProvider options={paypalOptions}>
              <Navbar />
              {children}
            </PayPalScriptProvider>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
