import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Fuse Agent Dealroom",
  description: "Human-in-the-loop AI sales execution prototype",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
