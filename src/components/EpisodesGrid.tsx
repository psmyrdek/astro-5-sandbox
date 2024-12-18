import {useEffect, useState} from "react";
import type {Episode} from "../loaders/episode-loader";

interface EpisodesGridProps {
  count?: number;
}

export default function EpisodesGrid({count}: EpisodesGridProps) {
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEpisodes = async () => {
      try {
        const response = await fetch(`/api/episodes?count=${count}`);
        if (!response.ok) {
          throw new Error("Failed to fetch episodes");
        }
        const data = await response.json();
        setEpisodes(count ? data.slice(0, count) : data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchEpisodes();
  }, [count]);

  if (loading) {
    return (
      <div className='flex justify-center items-center min-h-[200px]'>
        <div className='animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900'></div>
      </div>
    );
  }

  if (error) {
    return <div className='text-center text-red-600 p-4'>{error}</div>;
  }

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4'>
      {episodes.map((episode) => (
        <div
          key={episode.id}
          className='border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow duration-200'
        >
          <h2 className='text-xl font-semibold mb-2 text-gray-800'>
            {episode.title}
          </h2>
          <p className='text-sm text-gray-600'>
            Fetched at: {episode.fetchedAt}
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
