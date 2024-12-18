import {getCollection} from "astro:content";
interface EpisodesGridProps {
  count?: number;
}

export default async function EpisodesGridSSR({count}: EpisodesGridProps) {
  const episodes = await getCollection("episodes");

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4'>
      {episodes.slice(0, count).map((episode) => (
        <div
          key={episode.id}
          className='border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow duration-200'
        >
          <h2 className='text-xl font-semibold mb-2 text-gray-800'>
            {episode.data.title}
          </h2>
          <p className='text-sm text-gray-600'>
            Fetched at: {episode.data.fetchedAt}
          </p>
          <a
            href={`/episode/${episode.id}`}
            target='_blank'
            rel='noopener noreferrer'
            className='text-blue-600 hover:text-blue-800 transition-colors duration-200'
          >
            Listen to Episode →
          </a>
        </div>
      ))}
    </div>
  );
}
