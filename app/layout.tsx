import { AuthProvider } from '../lib/firebase';
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "galleyz",
  description: "find, rate, & review books with your friends",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
