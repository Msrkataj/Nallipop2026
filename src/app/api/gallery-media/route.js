import { getDownloadURL, listAll, ref } from "firebase/storage";
import { NextResponse } from "next/server";
import { storage } from "@/lib/firebase";

function getMediaType(name) {
  return /\.(mp4|webm|mov|m4v|ogv)$/i.test(name) ? "video" : "image";
}

export async function GET() {
  try {
    const folders = ["dmuchaniec", "gallery"];
    const folderResults = await Promise.all(
      folders.map(async (folderName) => ({ folderName, result: await listAll(ref(storage, folderName)) }))
    );
    const items = folderResults.flatMap(({ folderName, result }) =>
      result.items.map((itemRef) => ({ folderName, itemRef }))
    );
    const media = await Promise.all(
      items
        .sort((a, b) => a.itemRef.name.localeCompare(b.itemRef.name, "pl"))
        .map(async ({ folderName, itemRef }) => ({
          id: itemRef.fullPath,
          folderName,
          src: await getDownloadURL(itemRef),
          type: getMediaType(itemRef.name),
          alt: folderName === "dmuchaniec"
            ? "Dmuchaniec Safari podczas wydarzenia Nallipop"
            : "Zabawa podczas wydarzenia Nallipop",
        }))
    );

    return NextResponse.json(
      { media },
      { headers: { "Cache-Control": "public, s-maxage=900, stale-while-revalidate=3600" } }
    );
  } catch (error) {
    console.error("Gallery media API error:", error);
    return NextResponse.json({ media: [], message: "Galeria jest chwilowo niedostępna." }, { status: 502 });
  }
}
