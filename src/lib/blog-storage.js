import "server-only";

import { getDownloadURL, getMetadata, ref } from "firebase/storage";
import { storage } from "@/lib/firebase";

export async function resolveBlogImage(post) {
  if (!post?.storageFolder) {
    return post?.image;
  }

  try {
    const imageRef = ref(storage, `blog/${post.storageFolder}/cover.webp`);
    const [url, metadata] = await Promise.all([
      getDownloadURL(imageRef),
      getMetadata(imageRef),
    ]);
    const version = metadata.generation || metadata.updated;

    if (!version) {
      return url;
    }

    return `${url}${url.includes("?") ? "&" : "?"}v=${encodeURIComponent(version)}`;
  } catch (error) {
    console.warn(`Nie udało się pobrać zdjęcia bloga z folderu ${post.storageFolder}`, error?.code || error);
    return post.image;
  }
}

export async function resolveBlogPostsImages(posts) {
  return Promise.all(
    posts.map(async (post) => ({
      ...post,
      image: await resolveBlogImage(post),
    })),
  );
}
