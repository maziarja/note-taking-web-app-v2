import type { Metadata } from "next";
import { Inter, Noto_Serif, Source_Code_Pro, Geist } from "next/font/google";
import "./globals.css";
import Logo from "@/components/shared/Header";
import { NoteProvider } from "./_context/NoteContext";
import BottomNav from "@/components/shared/BottomNav";
import { cn } from "@/lib/utils";
import { Toaster } from "sonner";
import { ThemeProvider } from "@/lib/theme-provider";
import { NoteUIProvider } from "./_context/NoteUIContext";

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
  sidebar,
  noteList,
  noteDetails,
  noteSearch,
  noteActions,
}: Readonly<{
  children: React.ReactNode;
  sidebar: React.ReactNode;
  noteList: React.ReactNode;
  noteDetails: React.ReactNode;
  noteSearch: React.ReactNode;
  noteActions: React.ReactNode;
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
        <NoteProvider>
          <NoteUIProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              {children}
              <div className="hidden min-h-dvh lg:grid lg:grid-cols-[210px_1fr] xl:grid-cols-[272px_1fr]">
                {sidebar}
                <div className="flex w-full flex-col">
                  <div>{noteSearch}</div>
                  <div className="flex h-full w-full">
                    <div className="w-67.5 shrink-0 xl:w-72.5">{noteList}</div>
                    <div className="flex-1">{noteDetails}</div>
                    <div className="w-17.5 shrink-0 xl:w-62.5">
                      {noteActions}
                    </div>
                  </div>
                </div>
              </div>
              <Toaster position="bottom-right" />
            </ThemeProvider>
          </NoteUIProvider>
        </NoteProvider>
      </body>
    </html>
  );
}
