import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ubaid Ur Rehman — Frontend Engineer",
  description:
    "Portfolio of Ubaid Ur Rehman, Frontend Engineer specializing in React.js, Next.js, TypeScript, and the MERN stack.",
  icons: {
    icon: "/ubaid_logo.png",
  },
};

const themeInitScript = `
(function() {
  try {
    var saved = localStorage.getItem('ubaid-theme');
    var dark = saved ? saved === 'dark' : true;
    document.documentElement.dataset.theme = dark ? 'dark' : 'light';
    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', dark ? '#0e1015' : '#e8ebf1');
  } catch (e) {}
})();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="dark" suppressHydrationWarning>
      <head>
        <meta name="theme-color" content="#0e1015" />
        <link
          rel="preload"
          as="image"
          type="image/webp"
          imageSrcSet="/images/hero_ubaid_mobile.webp 480w, /images/hero_ubaid_desktop.webp 768w"
          imageSizes="(max-width: 767px) min(92vw, 540px), min(44vw, 76svh)"
          fetchPriority="high"
        />
        <link rel="preconnect" href="https://api.fontshare.com" />
        <link
          href="https://api.fontshare.com/v2/css?f[]=satoshi@400,500,700,900&display=swap"
          rel="stylesheet"
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400..600;1,9..144,400..600&family=JetBrains+Mono:wght@400;500&family=Plus+Jakarta+Sans:wght@400;500;600;700&family=Unbounded:wght@700&display=swap"
        />
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
