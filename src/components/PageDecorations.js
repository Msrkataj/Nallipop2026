import Image from "next/image";

const decorationSets = {
  home: [
    ["gwiazdka-zolta.webp", "8%", "left", "-18px", 78, "twinkle", "10deg"],
    ["kwiatek-roz.webp", "25%", "right", "-28px", 96, "float", "-8deg"],
    ["slaczek-turkus.webp", "44%", "left", "-42px", 138, "sway", "9deg"],
    ["serce-fiolet.webp", "66%", "right", "-18px", 74, "twinkle", "12deg"],
    ["kropki-roz.webp", "86%", "left", "-34px", 118, "float", "-6deg"],
  ],
  offer: [
    ["kwiatek-niebieski.webp", "7%", "right", "-24px", 92, "float", "8deg"],
    ["gwiazdka-roz.webp", "27%", "left", "-16px", 72, "twinkle", "-9deg"],
    ["slaczek-fiolet.webp", "48%", "right", "-46px", 148, "sway", "-7deg"],
    ["serce-turkus.webp", "69%", "left", "-18px", 76, "float", "10deg"],
    ["kropki-turkus.webp", "88%", "right", "-30px", 116, "twinkle", "5deg"],
  ],
  attractions: [
    ["gwiazdka-turkus.webp", "9%", "left", "-16px", 76, "twinkle", "-8deg"],
    ["kwiatek-fiolet.webp", "29%", "right", "-24px", 94, "float", "7deg"],
    ["slaczek-roz.webp", "50%", "left", "-48px", 150, "sway", "8deg"],
    ["serce-roz.webp", "70%", "right", "-16px", 74, "twinkle", "-11deg"],
    ["kropki-turkus.webp", "89%", "left", "-32px", 116, "float", "5deg"],
  ],
  reviews: [
    ["serce-roz.webp", "10%", "right", "-12px", 78, "twinkle", "11deg"],
    ["kwiatek-niebieski.webp", "32%", "left", "-25px", 96, "float", "-8deg"],
    ["slaczek-turkus.webp", "53%", "right", "-50px", 152, "sway", "-7deg"],
    ["gwiazdka-fiolet.webp", "74%", "left", "-15px", 72, "twinkle", "8deg"],
    ["kropki-roz.webp", "91%", "right", "-30px", 112, "float", "-5deg"],
  ],
  gallery: [
    ["gwiazdka-zolta.webp", "8%", "left", "-14px", 74, "twinkle", "9deg"],
    ["kwiatek-roz.webp", "28%", "right", "-24px", 94, "float", "-8deg"],
    ["slaczek-fiolet.webp", "52%", "left", "-48px", 150, "sway", "7deg"],
    ["serce-turkus.webp", "76%", "right", "-16px", 76, "twinkle", "-10deg"],
    ["kropki-turkus.webp", "92%", "left", "-32px", 112, "float", "5deg"],
  ],
  contact: [
    ["kwiatek-fiolet.webp", "9%", "right", "-22px", 92, "float", "8deg"],
    ["gwiazdka-roz.webp", "30%", "left", "-14px", 72, "twinkle", "-9deg"],
    ["slaczek-turkus.webp", "52%", "right", "-48px", 148, "sway", "-7deg"],
    ["serce-fiolet.webp", "73%", "left", "-16px", 76, "twinkle", "10deg"],
    ["kropki-roz.webp", "91%", "right", "-30px", 112, "float", "-5deg"],
  ],
  reservation: [
    ["gwiazdka-turkus.webp", "8%", "left", "-14px", 72, "twinkle", "-8deg"],
    ["kwiatek-roz.webp", "27%", "right", "-22px", 92, "float", "8deg"],
    ["slaczek-fiolet.webp", "50%", "left", "-48px", 148, "sway", "7deg"],
    ["serce-turkus.webp", "72%", "right", "-16px", 74, "twinkle", "-10deg"],
    ["kropki-turkus.webp", "91%", "left", "-30px", 110, "float", "5deg"],
  ],
};

export default function PageDecorations({ variant }) {
  const decorations = decorationSets[variant] || decorationSets.home;

  return (
    <div className={`page-decorations page-decorations--${variant}`} aria-hidden="true">
      {decorations.map(([src, top, side, offset, size, motion, rotation], index) => (
        <Image
          className={`page-decoration page-decoration--${motion}`}
          src={`/images/nallipop-dekoracje/${src}`}
          alt=""
          width={size}
          height={size}
          sizes={`${size}px`}
          key={`${variant}-${src}-${index}`}
          style={{
            top,
            [side]: offset,
            width: `${size}px`,
            "--decoration-delay": `${index * -1.35}s`,
            "--decoration-rotation": rotation,
          }}
        />
      ))}
    </div>
  );
}
