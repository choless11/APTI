import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "APTI 人格评估",
  description: "一个用动物与职业讲人格风格的搞怪测评项目。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
