import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ReduxProvider } from "@/redux/ReduxProvider";
import AuthProvider from "@/components/auth/AuthProvider";
import { ThemeProvider } from "@/components/theme-provider";
import WhatsAppContact from "@/components/ui/WhatsAppContact";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Professional Portfolio | Full-Stack Developer",
  description: "A showcase of high-performance web applications and technical expertise.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground overflow-x-hidden`}
      >
        <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
          <AuthProvider>
            <ReduxProvider>
              {children}
              <WhatsAppContact />
            </ReduxProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}