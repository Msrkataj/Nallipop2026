"use client";

import Link from "next/link";
import { useConsent } from "@/components/ConsentProvider";

export default function LegalFooter() {
  const { openSettings } = useConsent();

  return (
    <footer className="legal-footer">
      <div className="legal-footer__inner">
        <p>© {new Date().getFullYear()} Nallipop · KamaLogic Kamil Tosnowiec</p>
        <nav aria-label="Dokumenty prawne">
          <Link href="/regulamin">Regulamin</Link>
          <Link href="/polityka-prywatnosci">Polityka prywatności i cookies</Link>
          <Link href="/zgody-i-wizerunek">Klauzule i zgoda na wizerunek</Link>
          <Link href="/blog">Blog</Link>
          <Link href="/sitemap.xml">Mapa strony</Link>
          <button type="button" onClick={openSettings}>Ustawienia cookies</button>
        </nav>
      </div>
    </footer>
  );
}
