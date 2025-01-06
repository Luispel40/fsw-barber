import type { Metadata } from "next";
import { Inter } from "next/font/google"
import "./globals.css";
import Footer from "./_components/footer";
import AuthProvider from "./_providers/auth";
import { Toaster } from "./_components/ui/sonner";

const inter = Inter({ subsets: ["latin"] })



export const metadata: Metadata = {
  title: "fsw Barber",
  description: "Full Stack week 3 - Barber Shop",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br" className="dark">
      <body className={`${inter.className} dark`}>
        <AuthProvider>
          {children}

          <Toaster />
          <Footer />
        </AuthProvider>

      </body>
    </html>
  );
}
