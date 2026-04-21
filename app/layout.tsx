import type { Metadata } from "next";
import { Inter, Noto_Serif, Source_Code_Pro } from "next/font/google";
import "./globals.css";
import { NoteProvider } from "./_context/NoteContext";
import { cn } from "@/lib/utils";
import { Toaster } from "sonner";
import { ThemeProvider } from "@/lib/theme-provider";
import { NoteUIProvider } from "./_context/NoteUIContext";
import { SessionProvider } from "./_context/SessionContext";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});
const notoSerif = Noto_Serif({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-noto-serif",
});
const sourceCodePro = Source_Code_Pro({
  subsets: ["latin"],
  display: "swap",
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
      suppressHydrationWarning
      className={cn(
        "antialiased",
        sourceCodePro.variable,
        notoSerif.variable,
        inter.variable,
      )}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
      const font = localStorage.getItem("font");
      if (font) {
        document.documentElement.setAttribute("data-font", font);
      }
    `,
          }}
        />
      </head>
      <body className="bg-secondary lg:bg-background flex min-h-dvh flex-col">
        <SessionProvider>
          <NoteProvider>
            <NoteUIProvider>
              <ThemeProvider
                attribute="class"
                defaultTheme="system"
                enableSystem
                disableTransitionOnChange
              >
                {children}
                <Toaster position="bottom-right" />
              </ThemeProvider>
            </NoteUIProvider>
          </NoteProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
