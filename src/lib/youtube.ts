export interface VideoCard {
  id: string;
  title: string;
  thumbnail: string;
  viewCount?: string;
  publishedAt?: string;
}

// Static fallback — Google "Where the Internet Lives" playlist
// Source: https://www.youtube.com/playlist?list=PL590L5WQmH8dLLdbnJ775gPNvMeVWHLxT
export const featuredVideos: VideoCard[] = [
  {
    id: "okxUpjDOd1w",
    title: "The Era of AI Innovation | Where the Internet Lives",
    thumbnail: "https://i.ytimg.com/vi/okxUpjDOd1w/maxresdefault.jpg",
    publishedAt: "2024-01-01",
  },
  {
    id: "7hnvRBjuCW8",
    title: "Farming for the Future | Where the Internet Lives",
    thumbnail: "https://i.ytimg.com/vi/7hnvRBjuCW8/maxresdefault.jpg",
    publishedAt: "2024-01-01",
  },
  {
    id: "vFe-FrZSAKo",
    title: "Coding the Future | Where the Internet Lives",
    thumbnail: "https://i.ytimg.com/vi/vFe-FrZSAKo/maxresdefault.jpg",
    publishedAt: "2024-01-01",
  },
  {
    id: "QdRfaMRjzvw",
    title: "Leaps in Logistics | Where the Internet Lives",
    thumbnail: "https://i.ytimg.com/vi/QdRfaMRjzvw/maxresdefault.jpg",
    publishedAt: "2024-01-01",
  },
  {
    id: "jiGDzy0sxOI",
    title: "Supercharging Creativity | Where the Internet Lives",
    thumbnail: "https://i.ytimg.com/vi/jiGDzy0sxOI/maxresdefault.jpg",
    publishedAt: "2024-01-01",
  },
  {
    id: "2hibjbZDys4",
    title: "Where the Internet Lives S4E1 | Data on Fire",
    thumbnail: "https://i.ytimg.com/vi/2hibjbZDys4/maxresdefault.jpg",
    publishedAt: "2023-01-01",
  },
  // kept for reference — extra videos available from the playlist
  {
    id: "wfAFv6ikmkE",
    title: "How Canal Water Cools Our Dutch Data Center",
    thumbnail: "https://i.ytimg.com/vi/wfAFv6ikmkE/maxresdefault.jpg",
    publishedAt: "2023-01-01",
  },
  {
    id: "o-8WCNb3BQY",
    title: "Mapping New Medicines | Where the Internet Lives",
    thumbnail: "https://i.ytimg.com/vi/o-8WCNb3BQY/maxresdefault.jpg",
    publishedAt: "2023-01-01",
  },
];

export async function fetchYouTubeVideos(): Promise<VideoCard[]> {
  const apiKey = process.env.YOUTUBE_API_KEY;
  const channelId = process.env.YOUTUBE_CHANNEL_ID;

  if (!apiKey || !channelId) return featuredVideos;

  try {
    const searchRes = await fetch(
      `https://www.googleapis.com/youtube/v3/search?key=${apiKey}&channelId=${channelId}&part=snippet&order=date&maxResults=6&type=video`,
      { next: { revalidate: 3600 } }
    );

    if (!searchRes.ok) return featuredVideos;

    const searchData = await searchRes.json();
    const videoIds: string[] = searchData.items.map(
      (item: { id: { videoId: string } }) => item.id.videoId
    );

    const statsRes = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?key=${apiKey}&id=${videoIds.join(",")}&part=statistics,snippet`,
      { next: { revalidate: 3600 } }
    );

    if (!statsRes.ok) return featuredVideos;

    const statsData = await statsRes.json();

    return statsData.items.map(
      (item: {
        id: string;
        snippet: { title: string; publishedAt: string; thumbnails: { maxres?: { url: string }; high: { url: string } } };
        statistics: { viewCount: string };
      }) => ({
        id: item.id,
        title: item.snippet.title,
        thumbnail:
          item.snippet.thumbnails.maxres?.url ?? item.snippet.thumbnails.high.url,
        viewCount: formatViewCount(parseInt(item.statistics.viewCount)),
        publishedAt: item.snippet.publishedAt.slice(0, 10),
      })
    );
  } catch {
    return featuredVideos;
  }
}

function formatViewCount(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1000) return `${(n / 1000).toFixed(1)}K`;
  return String(n);
}
