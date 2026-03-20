import type { Metadata } from "next";
import { Inter, Noto_Serif, Source_Code_Pro } from "next/font/google";
import "./globals.css";
import Logo from "@/components/shared/Logo";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});
const notoSerif = Noto_Serif({
  subsets: ["latin"],
  variable: "--font-noto-serif",
});
const sourceCodePro = Source_Code_Pro({
  subsets: ["latin"],
  variable: "--font-source-code-pro",
});

export const metadata: Metadata = {
  title: {
    default: "Note Taking App",
    template: "%s | Note Taking App",
  },

  description:
    "A modern note-taking app that helps you capture, organize, and manage your ideas effortlessly in one place.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${sourceCodePro.variable} ${notoSerif.variable} ${inter.variable} h-full antialiased`}
    >
      <body>
        <Logo />
        {children}
      </body>
    </html>
  );
}
