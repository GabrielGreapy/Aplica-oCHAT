import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "./provider";
import localFont from 'next/font/local';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';

import Header from "./components/Header";
import Footer from "./components/Footer";

const NexaLight = localFont({
  src: "./fonts/Nexa-ExtraLight.ttf",
  display: "swap",
  variable: "--NexaLight",
})
const NexaHeavy = localFont({
  src: "./fonts/Nexa-Heavy.ttf",
  display: "swap",
  variable: "--NexaHeavy",
})


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Chat-G",
  description: "Student chat application created by Gabriel Martins",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (

    <html lang="pt-Br">
      <body className={`${geistSans.variable} ${geistMono.variable}
        
          ${NexaLight.variable} ${NexaHeavy.variable}`}>
          <AppRouterCacheProvider>
            <Providers>
              <Header />
              {children}
              <Footer />
            </Providers>
          </AppRouterCacheProvider>
        
      </body>
    </html>

  );
}
