import { getSeasonalPackage } from "../data/seasonal-packages.js";

export function getWarsawDate(now = new Date()) {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Europe/Warsaw", year: "numeric", month: "2-digit", day: "2-digit",
  }).formatToParts(now);
  const part = (type) => parts.find((item) => item.type === type).value;
  return `${part("year")}-${part("month")}-${part("day")}`;
}

export function validateEventDetails(data, now = new Date()) {
  const date = data.eventDate;
  if (typeof date !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    return "Podaj poprawną datę imprezy.";
  }
  const parsed = new Date(`${date}T12:00:00Z`);
  if (Number.isNaN(parsed.getTime()) || parsed.toISOString().slice(0, 10) !== date) {
    return "Podaj poprawną datę imprezy.";
  }
  if (date < getWarsawDate(now)) return "Data imprezy nie może być wcześniejsza niż dzisiaj.";
  const seasonalPackage = getSeasonalPackage(data.seasonalPackage);
  if (data.seasonalPackage && !seasonalPackage) return "Wybierz dostępny pakiet sezonowy.";
  if (seasonalPackage && date > seasonalPackage.availableUntil) {
    return `${seasonalPackage.label} jest dostępna do 31 października 2026. Wybierz wcześniejszy termin lub usuń ten pakiet.`;
  }
  if (typeof data.location !== "string" || !data.location.trim()) {
    return "Podaj adres imprezy.";
  }
  return null;
}
