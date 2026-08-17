import type { Metadata } from "next";
import { headers } from "next/headers";
import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const forwardedHost = requestHeaders.get("x-forwarded-host")?.split(",")[0].trim();
  const requestHost = forwardedHost ?? requestHeaders.get("host");
  const forwardedProtocol = requestHeaders.get("x-forwarded-proto")?.split(",")[0].trim();
  const protocol = forwardedProtocol === "http" || forwardedProtocol === "https"
    ? forwardedProtocol
    : requestHost?.startsWith("localhost") ? "http" : "https";
  const origin = requestHost && /^[a-z0-9.-]+(?::\d+)?$/i.test(requestHost)
    ? new URL(`${protocol}://${requestHost}`)
    : new URL("http://localhost:3000");
  const socialImage = new URL("/og.png", origin).toString();

  return {
    metadataBase: origin,
    title: {
      default: "Historie i sammenheng · Historie VG2",
      template: "%s · Historie i sammenheng",
    },
    description: "Et skalerbart digitalt læreverk for historie VG2 – fakta, forståelse og lange linjer.",
    icons: {
      icon: "/favicon.svg",
      shortcut: "/favicon.svg",
    },
    openGraph: {
      type: "website",
      locale: "nb_NO",
      siteName: "Historie i sammenheng",
      title: "Historie i sammenheng · Historie VG2",
      description: "Fra presise fakta til forklaring, kildearbeid og lange historiske linjer.",
      images: [{ url: socialImage, width: 1731, height: 909, alt: "Historie i sammenheng – Historie VG2" }],
    },
    twitter: {
      card: "summary_large_image",
      title: "Historie i sammenheng · Historie VG2",
      description: "Fra presise fakta til forklaring, kildearbeid og lange historiske linjer.",
      images: [socialImage],
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="no">
      <body>{children}</body>
    </html>
  );
}
