"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import styles from "./FormSuccess.module.scss";

export default function FormSuccess({ reservation = false }) {
  const confirmationRef = useRef(null);

  useEffect(() => {
    const confirmation = confirmationRef.current;
    confirmation.focus({ preventScroll: true });
    confirmation.scrollIntoView({ behavior: "instant", block: "start" });
  }, []);

  return (
    <section
      ref={confirmationRef}
      className={styles.confirmation}
      tabIndex={-1}
      aria-labelledby="form-success-title"
      aria-describedby="form-success-description"
    >
      <span className={styles.checkmark} aria-hidden="true">✓</span>
      <p className={styles.eyebrow}>Formularz wysłany pomyślnie</p>
      <h2 id="form-success-title" className={styles.title}>Dziękujemy za wiadomość!</h2>
      <p id="form-success-description" className={styles.description}>
        Twoje zapytanie dotarło do nas. Nie musisz wysyłać go ponownie.
        {reservation
          ? " Skontaktujemy się z Tobą, aby omówić szczegóły i przygotować propozycję na Twoją imprezę."
          : " Odezwiemy się do Ciebie najszybciej, jak to możliwe."}
      </p>
      {reservation && (
        <p className={styles.note}>Termin i rezerwację potwierdzimy podczas kontaktu.</p>
      )}
      <Link href="/" className={styles.homeLink}>Wróć na stronę główną <span aria-hidden="true">→</span></Link>
    </section>
  );
}
