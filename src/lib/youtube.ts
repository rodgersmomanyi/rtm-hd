export interface VideoCard {
  id: string;
  title: string;
  thumbnail: string;
  viewCount?: string;
  publishedAt?: string;
}

// Static fallback — replace with real video IDs when available
export const featuredVideos: VideoCard[] = [
  {
    id: "dQw4w9WgXcQ",
    title: "KPLC Smart Grid Backbone — Deployment Walkthrough",
    thumbnail: "https://i.ytimg.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
    viewCount: "12K",
    publishedAt: "2026-03-10",
  },
  {
    id: "dQw4w9WgXcQ",
    title: "BGP at Scale: 300G of Optimised ISP Traffic",
    thumbnail: "https://i.ytimg.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
    viewCount: "8.4K",
    publishedAt: "2026-02-15",
  },
  {
    id: "dQw4w9WgXcQ",
    title: "Huawei NetEngine 8000 — Segment Routing Lab",
    thumbnail: "https://i.ytimg.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
    viewCount: "5.1K",
    publishedAt: "2026-01-20",
  },
  {
    id: "dQw4w9WgXcQ",
    title: "From ISP Core to Google Data Center — My Journey",
    thumbnail: "https://i.ytimg.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
    viewCount: "21K",
    publishedAt: "2026-04-01",
  },
  {
    id: "dQw4w9WgXcQ",
    title: "Python Automation for Network Engineers (Ansible + Netmiko)",
    thumbnail: "https://i.ytimg.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
    viewCount: "9.8K",
    publishedAt: "2025-12-05",
  },
  {
    id: "dQw4w9WgXcQ",
    title: "DWDM Fundamentals — Optical Networking Explained",
    thumbnail: "https://i.ytimg.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
    viewCount: "14.2K",
    publishedAt: "2025-10-18",
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
