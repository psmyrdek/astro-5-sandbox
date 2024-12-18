import {defineCollection, z} from "astro:content";
import episodeLoader from "./loaders/episode-loader.ts";

const episodes = defineCollection({
  loader: episodeLoader,
  schema: z.object({
    id: z.string(),
    title: z.string(),
    link: z.string(),
  }),
});

export const collections = {
  episodes,
};
