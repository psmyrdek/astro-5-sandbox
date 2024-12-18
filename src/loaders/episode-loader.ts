export interface Episode {
  id: string;
  title: string;
  link: string;
}

export default async function loadEpisodes(): Promise<Episode[]> {
  const PODCAST_URL = "https://anchor.fm/s/e2cb03d0/podcast/rss";
  const response = await fetch(PODCAST_URL);
  const feedXml = await response.text();

  const itemRegex = /<item>[\s\S]*?<\/item>/g;
  const items = [...feedXml.matchAll(itemRegex)];

  return items.map((item, index) => {
    const titleMatch = item[0].match(/<title><!\[CDATA\[(.*?)\]\]><\/title>/);
    const linkMatch = item[0].match(/<link>(.*?)<\/link>/);

    return {
      id: `episode-${index}`,
      title: titleMatch ? titleMatch[1] : "",
      link: linkMatch ? linkMatch[1] : "",
    };
  });
}
