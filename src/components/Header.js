"use client";

import Link from "next/link";
import { useState } from "react";
import BrandLogo from "@/components/BrandLogo";

export default function Header() {
    const [menuOpen, setMenuOpen] = useState(false);

    function closeMenu() {
        setMenuOpen(false);
    }

    return (
        <header className="header">
            <div className="container header__inner">
                <Link href="/" className="header__logo" onClick={closeMenu}>
                    <BrandLogo priority />
                </Link>

                <nav
                    className={`header__nav ${menuOpen ? "is-open" : ""}`}
                    id="main-navigation"
                    aria-label="Główna nawigacja"
                >
                    <Link href="/oferta" onClick={closeMenu}>Oferta</Link>
                    <Link href="/oferta?oferta=dmuchance#wybor-dmuchanca" onClick={closeMenu}>
                        Wynajmij dmuchańca
                    </Link>
                    <Link href="/o-nas" onClick={closeMenu}>O nas</Link>
                    <Link href="/atrakcje" onClick={closeMenu}>Atrakcje</Link>
                    <Link href="/galeria" onClick={closeMenu}>Galeria</Link>
                    <Link href="/opinie" onClick={closeMenu}>Opinie</Link>
                    <Link href="/kontakt" onClick={closeMenu}>Kontakt</Link>
                </nav>

                <div className="header__actions">
                    <Link href="/formularz-rezerwacji" className="header__button" onClick={closeMenu}>
                        Zarezerwuj termin
                    </Link>
                    <button
                        className={`header__menu-button ${menuOpen ? "is-open" : ""}`}
                        type="button"
                        aria-label={menuOpen ? "Zamknij menu" : "Otwórz menu"}
                        aria-expanded={menuOpen}
                        aria-controls="main-navigation"
                        onClick={() => setMenuOpen((open) => !open)}
                    >
                        <span />
                        <span />
                        <span />
                    </button>
                </div>
            </div>
        </header>
    );
}
