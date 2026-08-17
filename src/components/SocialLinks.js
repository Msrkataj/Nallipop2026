import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faInstagram,
  faTiktok,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import { BUSINESS } from "@/lib/seo";

const socialLinks = [
  {
    label: "Facebook",
    href: BUSINESS.facebook,
    icon: faFacebookF,
  },
  {
    label: "Instagram",
    href: BUSINESS.instagram,
    icon: faInstagram,
  },
  {
    label: "TikTok",
    href: BUSINESS.tiktok,
    icon: faTiktok,
  },
  {
    label: "YouTube",
    href: BUSINESS.youtube,
    icon: faYoutube,
  },
];

export default function SocialLinks() {
  return (
    <nav className="offer-footer__socials" aria-label="Social media">
      {socialLinks.map((social) => (
        <a
          href={social.href}
          key={social.label}
          aria-label={social.label}
          target="_blank"
          rel="noreferrer"
        >
          <FontAwesomeIcon icon={social.icon} />
        </a>
      ))}
    </nav>
  );
}
