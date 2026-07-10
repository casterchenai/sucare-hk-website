import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.sucare.com.hk"),
  title: {
    default: "香港上門護理與復康服務｜家怡康 Supreme Care",
    template: "%s｜家怡康 Supreme Care",
  },
  description: "家怡康由護士、治療師及照顧團隊提供出院照顧、上門護理、復康、陪診及社區券服務，覆蓋全港18區。",
  alternates: {
    canonical: "/",
    languages: { "zh-Hant-HK": "/", "x-default": "/" },
  },
  openGraph: {
    type: "website",
    locale: "zh_HK",
    siteName: "家怡康 Supreme Care",
    title: "香港上門護理與復康服務｜家怡康",
    description: "讓家人安心回家，專業護理與復康上門支援。",
    images: [{ url: "/images/home-hero.webp", width: 1536, height: 960, alt: "家怡康上門護理服務" }],
  },
  other: {
    "codex-preview": "development",
  },
  icons: {
    icon: "/images/sucare-logo.png",
    shortcut: "/images/sucare-logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-Hant-HK">
      <body>
        <Script id="gtm-base" strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','GTM-MBP8RHG');` }} />
        <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-MBP8RHG" height="0" width="0" style={{ display: "none", visibility: "hidden" }} /></noscript>
        {children}
      </body>
    </html>
  );
}
