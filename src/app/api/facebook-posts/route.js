import { NextResponse } from "next/server";

const DEFAULT_PAGE_ID = "100090355616685";

export async function GET() {
  const accessToken = process.env.FACEBOOK_PAGE_ACCESS_TOKEN;
  const pageId = process.env.FACEBOOK_PAGE_ID || DEFAULT_PAGE_ID;
  const apiVersion = process.env.FACEBOOK_GRAPH_API_VERSION;

  if (!accessToken || !apiVersion) {
    return NextResponse.json(
      {
        configured: false,
        posts: [],
        message: "Brakuje danych FACEBOOK_PAGE_ACCESS_TOKEN lub FACEBOOK_GRAPH_API_VERSION w konfiguracji serwera.",
      },
      { status: 503 }
    );
  }

  const fields = [
    "id",
    "message",
    "created_time",
    "permalink_url",
    "full_picture",
    "attachments{media_type,media,target,url,title,description}",
  ].join(",");

  const url = new URL(`https://graph.facebook.com/${apiVersion}/${pageId}/posts`);
  url.searchParams.set("fields", fields);
  url.searchParams.set("limit", "3");
  url.searchParams.set("access_token", accessToken);

  try {
    const response = await fetch(url, {
      next: { revalidate: 900 },
    });
    const data = await response.json();

    if (!response.ok || data.error) {
      console.error("Facebook Graph API error", {
        status: response.status,
        code: data.error?.code,
        type: data.error?.type,
      });

      return NextResponse.json(
        {
          configured: true,
          posts: [],
          message: "Nie udało się pobrać postów z Facebooka.",
        },
        { status: 502 }
      );
    }

    const posts = (data.data || []).slice(0, 3).map((post) => ({
      id: post.id,
      message: post.message || post.attachments?.data?.[0]?.description || "Zobacz naszą najnowszą publikację na Facebooku.",
      createdTime: post.created_time,
      permalinkUrl: post.permalink_url,
      picture: post.full_picture || post.attachments?.data?.[0]?.media?.image?.src || null,
      mediaType: post.attachments?.data?.[0]?.media_type || "photo",
    }));

    return NextResponse.json(
      { configured: true, posts },
      {
        headers: {
          "Cache-Control": "public, s-maxage=900, stale-while-revalidate=3600",
        },
      }
    );
  } catch (error) {
    console.error("Facebook posts request failed", error);
    return NextResponse.json(
      {
        configured: true,
        posts: [],
        message: "Połączenie z Facebookiem jest chwilowo niedostępne.",
      },
      { status: 502 }
    );
  }
}
