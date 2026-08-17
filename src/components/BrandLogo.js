import Image from "next/image";

export default function BrandLogo({ className = "", priority = false }) {
  return (
    <Image
      className={`brand-logo ${className}`.trim()}
      src="/images/logo.png"
      alt="Nallipop"
      width={768}
      height={866}
      priority={priority}
      sizes="96px"
    />
  );
}
