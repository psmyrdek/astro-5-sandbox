import type {APIRoute} from "astro";
import {getCollection} from "astro:content";

export const GET: APIRoute = async ({url}) => {
  try {
    const count = url.searchParams.get("count");
    const episodes = await getCollection("episodes");

    const limitedEpisodes = count
      ? episodes.slice(0, parseInt(count))
      : episodes;

    return new Response(JSON.stringify(limitedEpisodes.map((ep) => ep.data)), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({
        message: "Failed to fetch episodes",
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
};
