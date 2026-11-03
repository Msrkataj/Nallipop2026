// Compare upload/creation dates, never filenames or promotional priority.
export function galleryDate(value) {
  if (!value) return 0;
  let timestamp;
  if (typeof value.toMillis === "function") timestamp = value.toMillis();
  else if (typeof value.seconds === "number") timestamp = value.seconds * 1000 + (value.nanoseconds || 0) / 1e6;
  else timestamp = typeof value === "number" ? value : new Date(value).getTime();
  return Number.isFinite(timestamp) ? timestamp : 0;
}

export function newestGalleryFirst(a, b) {
  return galleryDate(b.createdAt) - galleryDate(a.createdAt)
    || String(a.id).localeCompare(String(b.id), "pl");
}
