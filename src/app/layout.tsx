import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Navigation from "@/website/Navigation";

const satoshi = localFont({
  src: [
    {
      path: "./fonts/Satoshi/Satoshi-Light.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "./fonts/Satoshi/Satoshi-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/Satoshi/Satoshi-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "./fonts/Satoshi/Satoshi-Bold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "./fonts/Satoshi/Satoshi-Black.woff2",
      weight: "900",
      style: "normal",
    },
  ],
  variable: "--font-satoshi",
  display: "swap",
});

const integral = localFont({
  src: [
    {
      path: "./fonts/Integral/integral-regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/Integral/integral-medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "./fonts/Integral/integral-semibold.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "./fonts/Integral/integral-bold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "./fonts/Integral/integral-extrabold.woff2",
      weight: "800",
      style: "normal",
    },
  ],
  variable: "--font-integral",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Ecommerce Website",
  description: "A fully functional ecommerce website.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${satoshi.variable} ${integral.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Navigation />
        {children}
      </body>
    </html>
  );
}
