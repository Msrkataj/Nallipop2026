import NitrogenExperience, { nitrogenMetadata } from "@/components/NitrogenExperience";
import { nitrogenOccasions } from "@/data/liquid-nitrogen";

const occasion = nitrogenOccasions.find((item) => item.slug === "urodziny");
export const metadata = nitrogenMetadata(occasion);

export default function NitrogenBirthdayPage() {
  return <NitrogenExperience occasion={occasion} />;
}
