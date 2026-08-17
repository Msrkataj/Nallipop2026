import Link from "next/link";

export function LegalDocument({ eyebrow, title, lead, downloadHref, children, toc = [] }) {
  return (
    <main className="legal-page">
      <div className="legal-page__decor legal-page__decor--one" aria-hidden="true" />
      <div className="legal-page__decor legal-page__decor--two" aria-hidden="true" />
      <header className="legal-hero">
        <nav className="legal-breadcrumbs" aria-label="Okruszki">
          <Link href="/">Strona główna</Link><span aria-hidden="true">/</span><span>{eyebrow}</span>
        </nav>
        <span className="legal-hero__eyebrow">{eyebrow}</span>
        <h1>{title}</h1>
        <p>{lead}</p>
        <div className="legal-hero__meta">
          <span><b>Administrator</b>KamaLogic Kamil Tosnowiec</span>
          <span><b>Marka</b>Nallipop</span>
          <span><b>Aktualizacja</b>11 sierpnia 2026 r.</span>
        </div>
        <a className="legal-download" href={downloadHref} download>Pobierz dokument DOCX <span aria-hidden="true">↓</span></a>
      </header>

      <div className="legal-layout">
        {toc.length > 0 && (
          <aside className="legal-toc">
            <span>Na tej stronie</span>
            <nav>{toc.map((item) => <a href={`#${item.id}`} key={item.id}>{item.label}</a>)}</nav>
          </aside>
        )}
        <article className="legal-document">{children}</article>
      </div>
    </main>
  );
}

export function LegalSection({ id, title, children, highlight = false }) {
  return <section className={`legal-section${highlight ? " legal-section--highlight" : ""}`} id={id}><h2>{title}</h2>{children}</section>;
}

export function LegalList({ children }) {
  return <ul className="legal-list">{children}</ul>;
}

export function LegalTable({ headers, rows }) {
  return (
    <div className="legal-table-wrap">
      <table className="legal-table">
        <thead><tr>{headers.map((header) => <th key={header}>{header}</th>)}</tr></thead>
        <tbody>{rows.map((row, rowIndex) => <tr key={rowIndex}>{row.map((cell, cellIndex) => <td key={cellIndex}>{cell}</td>)}</tr>)}</tbody>
      </table>
    </div>
  );
}
