"use client";
import { Inter } from "next/font/google";
import "./globals.css";
import { store } from "@/store/store";
import { Provider } from "react-redux";
import "dotenv/config";
import { NextUIProvider } from "@nextui-org/react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main className="dark text-foreground bg-background">
          <Provider store={store}>
            <NextUIProvider>
              <ToastContainer theme="dark" />
              {children}
            </NextUIProvider>
          </Provider>
        </main>
      </body>
    </html>
  );
}
