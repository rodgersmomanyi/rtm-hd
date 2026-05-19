import { fetchYouTubeVideos } from "@/lib/youtube";
import { YoutubeSection } from "./YouTubeClient";

export async function YouTube() {
  const videos = await fetchYouTubeVideos();
  return <YoutubeSection videos={videos} />;
}
