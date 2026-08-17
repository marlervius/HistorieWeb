"use client";

import { useState } from "react";

export function CopyLinkButton({ label = "Kopier lenke" }: { label?: string }) {
  const [status, setStatus] = useState<"idle" | "copied" | "error">("idle");

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setStatus("copied");
      window.setTimeout(() => setStatus("idle"), 2400);
    } catch {
      setStatus("error");
    }
  }

  return (
    <button className="button button-quiet" type="button" onClick={copyLink}>
      {status === "copied" ? "Lenke kopiert" : status === "error" ? "Kopier manuelt" : label}
    </button>
  );
}
