import type React from "react"
import type { Metadata } from "next"
import { Itim } from "next/font/google"
import { LanguageProvider } from "@/contexts/language-context"
import "./globals.css"
import { RootLayout as CustomLayout } from "./rootlayout"
import { ThemeProvider } from "@/components/theme-provider"

const itim = Itim(
  {
    subsets: ["vietnamese"],
    weight: "400"
  }
);

// <head>
// <style>{`
// html {
// font-family: ${montserrat.style.fontFamily}, ${openSans.style.fontFamily};
// --font-sans: ${openSans.variable};
// --font-mono: ${openSans.variable}; /* Assuming Open Sans is used for mono as well */
// }
// `}</style>
// </head>

export const metadata: Metadata = {
  title: "Portfolio @Dotandev",
  description: "A comprehensive portfolio showcasing my projects, skills, and experiences.",
  generator: "@dotandev",
  applicationName: "Dotandev Portfolio",
  keywords: ["portfolio", "web development", "projects", "skills", "Dotandev"],
  authors: [{ name: "Dotandev", url: "https://dotan.dev" }],
  creator: "Dotandev",
  openGraph: {
    title: "Portfolio @Dotandev",
    description: "A comprehensive portfolio showcasing my projects, skills, and experiences.",
    url: "https://dotan.dev",
    siteName: "Dotandev Portfolio",
    images: [
      {
        url: "https://dotan.dev/og-image.png",
        width: 1200,
        height: 630,
        alt: "Dotandev Portfolio",
      },
    ],
    locale: "en_US",
    type: "website",
  },
}

import { SmoothScroll } from "@/components/smooth-scroll";
import { CustomCursor } from "@/components/ui/custom-cursor";

// ... imports

import { Preloader } from "@/components/preloader";

// ...

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${itim.className} antialiased`}>
      <body className={`${itim.className} font-sans bg-background text-foreground`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <LanguageProvider>
            <SmoothScroll>
              <Preloader />
              <CustomCursor />
              <CustomLayout>
                {children}
              </CustomLayout>
            </SmoothScroll>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
