import NitrogenExperience, { nitrogenMetadata } from "@/components/NitrogenExperience";
import { nitrogenOccasions } from "@/data/liquid-nitrogen";

const occasion = nitrogenOccasions.find((item) => item.slug === "szkoly-i-przedszkola");
export const metadata = nitrogenMetadata(occasion);

export default function NitrogenSchoolsPage() {
  return <NitrogenExperience occasion={occasion} />;
}
