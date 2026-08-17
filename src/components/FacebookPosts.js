"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookF } from "@fortawesome/free-brands-svg-icons";
import { useConsent } from "@/components/ConsentProvider";
import { BUSINESS } from "@/lib/seo";

const FACEBOOK_PAGE_URL = BUSINESS.facebook;

function formatDate(value) {
  if (!value) return "Najnowsza publikacja";

  return new Intl.DateTimeFormat("pl-PL", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(value));
}

export default function FacebookPosts() {
  const { consent, isReady, openSettings } = useConsent();
  const [posts, setPosts] = useState([]);
  const [status, setStatus] = useState("loading");
  const [activeIndex, setActiveIndex] = useState(0);
  const railRef = useRef(null);

  useEffect(() => {
    if (!isReady || !consent?.social) return undefined;

    let active = true;

    async function loadPosts() {
      try {
        const response = await fetch("/api/facebook-posts");
        const data = await response.json();

        if (!active) return;
        setPosts(data.posts || []);
        setStatus(data.posts?.length ? "ready" : data.configured === false ? "setup" : "error");
      } catch {
        if (active) setStatus("error");
      }
    }

    loadPosts();
    return () => {
      active = false;
    };
  }, [consent?.social, isReady]);

  const displayStatus = isReady && consent?.social ? status : "blocked";

  const scrollToPost = useCallback((index) => {
    const rail = railRef.current;
    const cards = rail?.querySelectorAll(".facebook-post-card");
    const card = cards?.[index];

    if (!rail || !card) return;
    rail.scrollTo({ left: card.offsetLeft - rail.offsetLeft, behavior: "smooth" });
    setActiveIndex(index);
  }, []);

  useEffect(() => {
    if (posts.length < 2) return undefined;

    const timer = window.setInterval(() => {
      setActiveIndex((current) => {
        const next = (current + 1) % posts.length;
        const rail = railRef.current;
        const cards = rail?.querySelectorAll(".facebook-post-card");
        const card = cards?.[next];
        if (rail && card) {
          rail.scrollTo({ left: card.offsetLeft - rail.offsetLeft, behavior: "smooth" });
        }
        return next;
      });
    }, 6500);

    return () => window.clearInterval(timer);
  }, [posts.length]);

  return (
    <section className="facebook-posts" aria-labelledby="facebook-posts-title">
      <div className="container">
        <div className="facebook-posts__heading">
          <div>
            <span className="section-kicker">Najnowsze realizacje</span>
            <h2 id="facebook-posts-title">Zobacz, co u nas słychać</h2>
            <p>Trzy najnowsze publikacje prosto z naszego Facebooka.</p>
          </div>
          <a className="facebook-posts__page-link" href={FACEBOOK_PAGE_URL} target="_blank" rel="noreferrer">
            <FontAwesomeIcon icon={faFacebookF} /> Obserwuj Nallipop
          </a>
        </div>

        {displayStatus === "loading" && (
          <div className="facebook-posts__notice" role="status">Pobieramy najnowsze posty…</div>
        )}

        {displayStatus === "blocked" && (
          <div className="facebook-posts__notice facebook-posts__notice--consent">
            <span className="facebook-posts__notice-icon"><FontAwesomeIcon icon={faFacebookF} /></span>
            <div>
              <strong>Posty z Facebooka są wyłączone</strong>
              <p>Ta sekcja połączy się z Facebookiem dopiero po Twojej zgodzie na treści społecznościowe.</p>
            </div>
            <button type="button" onClick={openSettings}>Ustawienia cookies</button>
          </div>
        )}

        {(displayStatus === "setup" || displayStatus === "error") && (
          <div className="facebook-posts__notice facebook-posts__notice--setup">
            <span className="facebook-posts__notice-icon"><FontAwesomeIcon icon={faFacebookF} /></span>
            <div>
              <strong>{displayStatus === "setup" ? "Sekcja jest gotowa do połączenia" : "Facebook jest chwilowo niedostępny"}</strong>
              <p>{displayStatus === "setup" ? "Po dodaniu bezpiecznego tokena na serwerze pojawią się tutaj trzy najnowsze posty." : "Najnowsze realizacje możesz teraz zobaczyć bezpośrednio na naszym profilu."}</p>
            </div>
            <a href={FACEBOOK_PAGE_URL} target="_blank" rel="noreferrer">Przejdź na Facebooka →</a>
          </div>
        )}

        {displayStatus === "ready" && (
          <>
            <div className="facebook-posts__rail" ref={railRef}>
              {posts.map((post) => (
                <article className="facebook-post-card" key={post.id}>
                  {post.picture && (
                    <div
                      className="facebook-post-card__media"
                      style={{ backgroundImage: `url("${post.picture}")` }}
                      role="img"
                      aria-label="Zdjęcie z posta Nallipop na Facebooku"
                    >
                      {post.mediaType === "video" && <span>▶</span>}
                    </div>
                  )}
                  <div className="facebook-post-card__body">
                    <div className="facebook-post-card__meta">
                      <span><FontAwesomeIcon icon={faFacebookF} /></span>
                      <div><strong>Nallipop</strong><small>{formatDate(post.createdTime)}</small></div>
                    </div>
                    <p>{post.message}</p>
                    <a href={post.permalinkUrl || FACEBOOK_PAGE_URL} target="_blank" rel="noreferrer">
                      Zobacz post na Facebooku <span aria-hidden="true">→</span>
                    </a>
                  </div>
                </article>
              ))}
            </div>

            <div className="facebook-posts__controls" role="group" aria-label="Sterowanie postami z Facebooka">
              <button type="button" onClick={() => scrollToPost((activeIndex - 1 + posts.length) % posts.length)} aria-label="Poprzedni post">‹</button>
              <div>
                {posts.map((post, index) => (
                  <button
                    type="button"
                    className={index === activeIndex ? "is-active" : ""}
                    key={post.id}
                    onClick={() => scrollToPost(index)}
                    aria-label={`Pokaż post ${index + 1}`}
                    aria-current={index === activeIndex ? "true" : undefined}
                  />
                ))}
              </div>
              <button type="button" onClick={() => scrollToPost((activeIndex + 1) % posts.length)} aria-label="Następny post">›</button>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
