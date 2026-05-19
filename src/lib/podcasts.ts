export interface PodcastEpisode {
  id: string;
  title: string;
  summary: string;
  duration: string;
  pubDate: string;
  audio: string;
  image: string;
  season: number;
  isTrailer?: boolean;
}

const CHANNEL_ART =
  "https://image.simplecastcdn.com/images/f743f9e0-8ec4-43dc-8361-431829f4c096/f8689354-4fe4-4008-a39a-6a001e52af7e/3000x3000/white-wtil-cover-template.jpg?aid=rss_feed";

const BLUE_ART =
  "https://image.simplecastcdn.com/images/f743f9e0-8ec4-43dc-8361-431829f4c096/0bbbce76-ed45-4999-9c6a-6665fcce32bc/blue-wtil-cover-template.jpg?aid=rss_feed";

export const podcastEpisodes: PodcastEpisode[] = [
  // ── Season 5 (2026) — latest first ──────────────────────────
  {
    id: "s5e10",
    title: "The Next Leap for Intelligence",
    summary:
      "Blaise Agüera y Arcas discusses intelligence evolution and Project Suncatcher's space-based solar energy research.",
    duration: "00:21:36",
    pubDate: "2026-03-11",
    audio:
      "https://mgln.ai/e/p425918/cdn.simplecast.com/media/audio/transcoded/e5ae886a-f9ba-4ad2-a303-a77b027f89af/1fa9e054-c34b-489c-86b1-bd3464944c5c/episodes/audio/group/7a3bde81-3998-40a2-9e65-4b7695fb91ce/group-item/23a1248a-d15d-40bb-abb7-6290add98312/128_default_tc.mp3",
    image:
      "https://image.simplecastcdn.com/images/f743f9e0-8ec4-43dc-8361-431829f4c096/8aab7565-fa2a-4936-8b1c-70df427ed498/3000x3000/ep10square512x512.jpg?aid=rss_feed",
    season: 5,
  },
  {
    id: "s5e9",
    title: "New Frontiers in Farming",
    summary:
      "Anastasia Volkova and Brad Zamft harness AI to keep soil and crops resilient in a changing climate.",
    duration: "00:23:06",
    pubDate: "2026-03-04",
    audio:
      "https://mgln.ai/e/p425918/cdn.simplecast.com/media/audio/transcoded/e5ae886a-f9ba-4ad2-a303-a77b027f89af/1fa9e054-c34b-489c-86b1-bd3464944c5c/episodes/audio/group/1da96b42-8eca-434d-8041-0cfa68c89264/group-item/b642c16c-b550-4ed6-a44f-2834ca901f1f/128_default_tc.mp3",
    image:
      "https://image.simplecastcdn.com/images/f743f9e0-8ec4-43dc-8361-431829f4c096/4ac1b846-199f-4f5d-9838-b303cc91eb6c/3000x3000/ep9square512x512.jpg?aid=rss_feed",
    season: 5,
  },
  {
    id: "s5e8",
    title: "The AI-Energy Nexus",
    summary:
      "Lucia Tian addresses carbon-free power solutions including geothermal and nuclear partnerships for data centers.",
    duration: "00:26:55",
    pubDate: "2026-02-25",
    audio:
      "https://mgln.ai/e/p425918/cdn.simplecast.com/media/audio/transcoded/e5ae886a-f9ba-4ad2-a303-a77b027f89af/1fa9e054-c34b-489c-86b1-bd3464944c5c/episodes/audio/group/2fa8d101-d710-42e2-be14-69c051cee263/group-item/580a6a85-0df8-41d6-afa5-a723e1fa61c1/128_default_tc.mp3",
    image:
      "https://image.simplecastcdn.com/images/f743f9e0-8ec4-43dc-8361-431829f4c096/4a19e673-63dc-4b35-86eb-3eb0658abbdd/3000x3000/ep8square512x512.jpg?aid=rss_feed",
    season: 5,
  },
  {
    id: "s5e7",
    title: "Coding the Future",
    summary:
      "Tara Chklovski, CEO of Technovation, explains how the global organization empowers girls to use AI to solve real-world problems.",
    duration: "00:17:32",
    pubDate: "2026-02-18",
    audio:
      "https://mgln.ai/e/p425918/cdn.simplecast.com/audio/1fa9e054-c34b-489c-86b1-bd3464944c5c/episodes/db9755e1-557d-4df7-bd78-915eadc88b06/audio/9aed0790-5f14-4be5-964f-e3d341f32ab5/default_tc.mp3",
    image:
      "https://image.simplecastcdn.com/images/f743f9e0-8ec4-43dc-8361-431829f4c096/fdefdc2d-b67f-4b77-9b33-b1d3126033f1/3000x3000/ep7-square-512x512.jpg?aid=rss_feed",
    season: 5,
  },
  {
    id: "s5e6",
    title: "Leaps in Logistics",
    summary:
      "Oana Jinga, co-founder of Dexory, explains how AI has enabled her company's robots to shine light on warehouses.",
    duration: "00:22:34",
    pubDate: "2026-02-11",
    audio:
      "https://mgln.ai/e/p425918/cdn.simplecast.com/audio/1fa9e054-c34b-489c-86b1-bd3464944c5c/episodes/6ff169b3-7498-47cd-8520-7eb6c0aa3202/audio/fc833640-b00a-4f46-9edb-6eca6896a8e2/default_tc.mp3",
    image:
      "https://image.simplecastcdn.com/images/f743f9e0-8ec4-43dc-8361-431829f4c096/80cc34e8-79b0-4934-bd2c-21370642d274/3000x3000/ep6-square-512x512.jpg?aid=rss_feed",
    season: 5,
  },
  {
    id: "s5e5",
    title: "Anatomy of a Modern Data Center",
    summary:
      "Partha Ranganathan — one of the architects of modern data center design — explains how Google's data centers have embraced efficiency.",
    duration: "00:21:12",
    pubDate: "2026-02-04",
    audio:
      "https://mgln.ai/e/p425918/cdn.simplecast.com/audio/1fa9e054-c34b-489c-86b1-bd3464944c5c/episodes/636c4168-112d-43ca-bb25-85a728d85561/audio/1de877cd-ef61-4370-afae-181936bd3c53/default_tc.mp3",
    image:
      "https://image.simplecastcdn.com/images/f743f9e0-8ec4-43dc-8361-431829f4c096/88aef2ee-032d-4d84-bd6f-ac13a067dfb2/3000x3000/ep5-square-512x512.jpg?aid=rss_feed",
    season: 5,
  },
  {
    id: "s5e4",
    title: "Reimagining Manufacturing",
    summary:
      "Wendy Tan White, CEO of Intrinsic, explains how the company is embracing AI to make manufacturing more accessible.",
    duration: "00:19:58",
    pubDate: "2026-01-28",
    audio:
      "https://mgln.ai/e/p425918/cdn.simplecast.com/audio/1fa9e054-c34b-489c-86b1-bd3464944c5c/episodes/20bae55d-659b-4e7c-a119-6e3809d1c56f/audio/9aaf23de-561b-4e79-b8f8-a48d3139649b/default_tc.mp3",
    image:
      "https://image.simplecastcdn.com/images/f743f9e0-8ec4-43dc-8361-431829f4c096/24dd9e99-c4dc-4171-8f04-6891f2b9094e/3000x3000/ep4-square-512x512.jpg?aid=rss_feed",
    season: 5,
  },
  {
    id: "s5e3",
    title: "Supercharging Creativity",
    summary:
      "Multimedia artist King Willonious discusses his creative process, including the story behind his AI-generated hit song.",
    duration: "00:19:41",
    pubDate: "2026-01-21",
    audio:
      "https://mgln.ai/e/p425918/cdn.simplecast.com/audio/1fa9e054-c34b-489c-86b1-bd3464944c5c/episodes/3f1b094e-f507-4320-93a6-43b5591f4cb5/audio/4444457a-6be2-4548-aa4d-30d887a9bea2/default_tc.mp3",
    image:
      "https://image.simplecastcdn.com/images/f743f9e0-8ec4-43dc-8361-431829f4c096/23f804fd-014f-4dfe-bbf9-b417c130007e/3000x3000/ep3-square-512x512.jpg?aid=rss_feed",
    season: 5,
  },
  {
    id: "s5e2",
    title: "Mapping New Medicines",
    summary:
      "Recursion CEO Chris Gibson explains how the company combines high-tech lab experiments with advanced computing to map human biology.",
    duration: "00:21:40",
    pubDate: "2026-01-14",
    audio:
      "https://mgln.ai/e/p425918/cdn.simplecast.com/audio/1fa9e054-c34b-489c-86b1-bd3464944c5c/episodes/3e886322-1663-4395-ab46-0325b7d16841/audio/6a8b5ce8-d5d0-4889-9a6e-24e390e8a7fb/default_tc.mp3",
    image:
      "https://image.simplecastcdn.com/images/f743f9e0-8ec4-43dc-8361-431829f4c096/3249ab4a-3def-4ab3-807f-16a02733b638/3000x3000/medicine-ep2-square-3000x3000.jpg?aid=rss_feed",
    season: 5,
  },
  {
    id: "s5e1",
    title: "The Era of AI Innovation",
    summary:
      "MIT professor and author Andrew McAfee draws the throughline from early industrial revolutions to the AI revolution.",
    duration: "00:27:25",
    pubDate: "2026-01-07",
    audio:
      "https://mgln.ai/e/p425918/cdn.simplecast.com/audio/1fa9e054-c34b-489c-86b1-bd3464944c5c/episodes/fb737f05-5909-4d6a-90ce-374e96c52269/audio/6e4e580a-a430-4108-b41b-7e57b48e4100/default_tc.mp3",
    image:
      "https://image.simplecastcdn.com/images/f743f9e0-8ec4-43dc-8361-431829f4c096/a621ab93-220c-40ae-9c09-f8747091f6a8/3000x3000/innovation-ep1-square-3000x3000.jpg?aid=rss_feed",
    season: 5,
  },
  {
    id: "s5-trailer",
    title: "Season 5: The Dawn of a New Era",
    summary: "Season introduction featuring AI's impact on data centers and global innovation.",
    duration: "00:02:54",
    pubDate: "2025-12-17",
    audio:
      "https://mgln.ai/e/p425918/cdn.simplecast.com/audio/1fa9e054-c34b-489c-86b1-bd3464944c5c/episodes/eb81c8f1-6499-489b-8e7a-cb5278322c79/audio/85c84f0f-7c10-4cd8-aba3-e47c30e2eb4c/default_tc.mp3",
    image: CHANNEL_ART,
    season: 5,
    isTrailer: true,
  },

  // ── Season 4 (2024) — latest first ──────────────────────────
  {
    id: "s4e5",
    title: "Chasing Arrows",
    summary:
      "Technology advances are helping recyclers convert hard-to-recycle waste into a valuable feedstock for a circular economy.",
    duration: "00:30:10",
    pubDate: "2024-11-06",
    audio:
      "https://mgln.ai/e/p425918/cdn.simplecast.com/audio/1fa9e054-c34b-489c-86b1-bd3464944c5c/episodes/bc4b8237-d14e-4d56-b911-b83c4eab1d7c/audio/81ad9ec8-08d3-42d0-9492-a1e5b1f50595/default_tc.mp3",
    image:
      "https://image.simplecastcdn.com/images/f743f9e0-8ec4-43dc-8361-431829f4c096/ac4288ec-5cdf-4bb6-a0f4-cf61fad0e2f0/3000x3000/5-wtil-s4-circularity-3000sq-300dpi-layers-wlogo.jpg?aid=rss_feed",
    season: 4,
  },
  {
    id: "s4e4",
    title: "Invisible Threats",
    summary:
      "Data centers and the AI they enable are helping to mitigate the invisible threats of heat and air pollution.",
    duration: "00:35:51",
    pubDate: "2024-10-30",
    audio:
      "https://mgln.ai/e/p425918/cdn.simplecast.com/audio/1fa9e054-c34b-489c-86b1-bd3464944c5c/episodes/9ab598de-bbe5-4c28-a035-701325598e88/audio/28c2b98e-2d05-4149-b169-2e720a8c2268/default_tc.mp3",
    image:
      "https://image.simplecastcdn.com/images/f743f9e0-8ec4-43dc-8361-431829f4c096/ed90687a-b2e3-4c73-9ee2-0e5fc495a335/3000x3000/4-wtil-s4-health-3000sq-300dpi-layers-wlogo.jpg?aid=rss_feed",
    season: 4,
  },
  {
    id: "s4e3",
    title: "Growing a Better Food System",
    summary:
      "Data-driven tools are helping farmers use less water and improve yields while AI gets excess food to those who need it most.",
    duration: "00:35:59",
    pubDate: "2024-10-23",
    audio:
      "https://mgln.ai/e/p425918/cdn.simplecast.com/audio/1fa9e054-c34b-489c-86b1-bd3464944c5c/episodes/66829ea1-ffdb-4e33-971c-981938bea3a8/audio/831a30ce-a0f9-4484-a947-cf47905c481a/default_tc.mp3",
    image:
      "https://image.simplecastcdn.com/images/f743f9e0-8ec4-43dc-8361-431829f4c096/c71ec27d-9796-4cc8-a432-8854e0aa8c53/3000x3000/ep3-wtil-art.jpg?aid=rss_feed",
    season: 4,
  },
  {
    id: "s4e2",
    title: "Keeping the Lights On",
    summary:
      "Data centers are helping decarbonize the energy system while enabling tools that make the grid more resilient.",
    duration: "00:39:36",
    pubDate: "2024-10-16",
    audio:
      "https://mgln.ai/e/p425918/cdn.simplecast.com/audio/1fa9e054-c34b-489c-86b1-bd3464944c5c/episodes/9e781cac-0f6b-46a1-babf-1a9bc088cf05/audio/803c8650-a324-4732-987e-7f108f6a6aad/default_tc.mp3",
    image:
      "https://image.simplecastcdn.com/images/f743f9e0-8ec4-43dc-8361-431829f4c096/e050bb87-ad7e-4973-8393-c509a24e05d7/3000x3000/ep2-wtil-art.jpg?aid=rss_feed",
    season: 4,
  },
  {
    id: "s4e1",
    title: "Data on Fire",
    summary:
      "How can AI and data centers help us solve the world's most critical climate challenges? Season 4 opens with a look at wildfire resilience.",
    duration: "00:40:18",
    pubDate: "2024-10-09",
    audio:
      "https://mgln.ai/e/p425918/cdn.simplecast.com/audio/1fa9e054-c34b-489c-86b1-bd3464944c5c/episodes/f6772f90-28db-4638-91ab-dfb8e0949d3c/audio/e691602d-c0d7-4600-9c49-95a343b7febf/default_tc.mp3",
    image:
      "https://image.simplecastcdn.com/images/f743f9e0-8ec4-43dc-8361-431829f4c096/3e0cf68d-eedf-44b1-9ed9-3028daf56f87/3000x3000/1-wtil-s4-climate-3000sq-300dpi-layer-w-logo-update.jpg?aid=rss_feed",
    season: 4,
  },
  {
    id: "s4-trailer",
    title: "A Preview of Season 4: Resilience",
    summary:
      "Where the Internet Lives is back for a fourth season, focusing on how data center infrastructure is critical for resilience.",
    duration: "00:02:51",
    pubDate: "2024-09-25",
    audio:
      "https://mgln.ai/e/p425918/cdn.simplecast.com/audio/1fa9e054-c34b-489c-86b1-bd3464944c5c/episodes/b3bf760c-6f1f-4278-9625-87b4deeab866/audio/f3dd4c2f-0214-4ac3-b5bd-776944a78be8/default_tc.mp3",
    image: BLUE_ART,
    season: 4,
    isTrailer: true,
  },

  // ── Season 3 (2023) — latest first ──────────────────────────
  {
    id: "s3e9",
    title: "Machine Learning Unlocks a New Era for Music",
    summary:
      "Hanoi Hantrakul, a former AI resident at Google, explores creative applications of machine learning for music composition.",
    duration: "00:24:02",
    pubDate: "2023-07-12",
    audio:
      "https://mgln.ai/e/p425918/cdn.simplecast.com/audio/1fa9e054-c34b-489c-86b1-bd3464944c5c/episodes/cde333eb-a130-4816-9e7d-a53f258a00ec/audio/8ac948b2-41d6-4d19-acba-fce2beb00ea1/default_tc.mp3",
    image:
      "https://image.simplecastcdn.com/images/f743f9e0-8ec4-43dc-8361-431829f4c096/d7cc0ee7-e960-4f02-ba0d-55b03c39e0e5/3000x3000/gdc-wtil-s3-ep9-album-3000x3000.jpg?aid=rss_feed",
    season: 3,
  },
  {
    id: "s3e8",
    title: "A Finnish Paper Town Becomes a Digital Hub",
    summary:
      "Mikko Green, operations manager at Google's Hamina, Finland data center, shares how a former paper mill became one of the world's most advanced data centers.",
    duration: "00:18:29",
    pubDate: "2023-06-28",
    audio:
      "https://mgln.ai/e/p425918/cdn.simplecast.com/audio/1fa9e054-c34b-489c-86b1-bd3464944c5c/episodes/77a19d71-3911-424e-9292-7c7ba2337d5e/audio/78fc5979-ec93-44a7-ad06-304a24942364/default_tc.mp3",
    image:
      "https://image.simplecastcdn.com/images/f743f9e0-8ec4-43dc-8361-431829f4c096/09d6ea77-52e0-4901-9a14-63642baecbd3/3000x3000/gdc-wtil-s3-ep8-album-3000x3000.jpg?aid=rss_feed",
    season: 3,
  },
  {
    id: "s3e7",
    title: "From Despair to a Dream Job in the Trades",
    summary:
      "Oregon Tradeswomen helps women like Sarah Hess build careers in construction trades, including the skilled work of building data centers.",
    duration: "00:18:47",
    pubDate: "2023-06-14",
    audio:
      "https://mgln.ai/e/p425918/cdn.simplecast.com/audio/1fa9e054-c34b-489c-86b1-bd3464944c5c/episodes/0b9fd453-f719-403a-9802-050728fee0d4/audio/732f98fe-cc10-41dc-980b-30269ed1d1bd/default_tc.mp3",
    image:
      "https://image.simplecastcdn.com/images/f743f9e0-8ec4-43dc-8361-431829f4c096/9d9eab46-8ce5-45c2-8e10-3a12d0a23d87/3000x3000/gdc-wtil-s3-ep7-album-3000x3000.jpg?aid=rss_feed",
    season: 3,
  },
  {
    id: "s3e6",
    title: "A Creative Water Solution for a Dutch Data Center",
    summary:
      "Google partnered with North Water to harness canal water for cooling its data center in the Netherlands, reducing freshwater consumption.",
    duration: "00:17:13",
    pubDate: "2023-05-31",
    audio:
      "https://mgln.ai/e/p425918/cdn.simplecast.com/audio/1fa9e054-c34b-489c-86b1-bd3464944c5c/episodes/04e1ebe8-d471-4b50-9d80-a2df9e56d2a9/audio/3b67ef9e-4d39-469b-9c60-33453653dcd9/default_tc.mp3",
    image:
      "https://image.simplecastcdn.com/images/f743f9e0-8ec4-43dc-8361-431829f4c096/9304c007-5ba6-4562-9e08-9e8673cfdf2e/3000x3000/gdc-wtil-s3-ep6-album-3000x3000.jpg?aid=rss_feed",
    season: 3,
  },
  {
    id: "s3e5",
    title: "The 'Gaygler' Fighting for Same-Sex Rights in Taiwan",
    summary:
      "Ian, an operations engineer at Google's Changhua County, Taiwan data center, shares his journey as an LGBTQ+ advocate in the region.",
    duration: "00:18:42",
    pubDate: "2023-05-17",
    audio:
      "https://mgln.ai/e/p425918/cdn.simplecast.com/audio/1fa9e054-c34b-489c-86b1-bd3464944c5c/episodes/bdb1a8a9-c725-498e-a9b5-1e4ed3c75054/audio/f1c1941c-9dc6-4cea-adf7-5dd32df8de57/default_tc.mp3",
    image:
      "https://image.simplecastcdn.com/images/f743f9e0-8ec4-43dc-8361-431829f4c096/23f0a386-d6e8-4c24-a158-dd905252fc6e/3000x3000/gdc-wtil-s3-ep5-album-3000x3000-1.jpg?aid=rss_feed",
    season: 3,
  },
  {
    id: "s3e4",
    title: "From Trauma to Triumph",
    summary:
      "Dave Moody has tackled construction projects for three decades. Data centers are the latest chapter in a remarkable career shaped by resilience.",
    duration: "00:17:48",
    pubDate: "2023-05-03",
    audio:
      "https://mgln.ai/e/p425918/cdn.simplecast.com/audio/1fa9e054-c34b-489c-86b1-bd3464944c5c/episodes/073f2e9b-2a11-40ff-8ce0-36a9b4c4bd88/audio/c2c4e9aa-b791-454a-a798-04efc6f9e22f/default_tc.mp3",
    image:
      "https://image.simplecastcdn.com/images/f743f9e0-8ec4-43dc-8361-431829f4c096/ec36020b-eb02-4b6e-9da5-81a4d28e0b04/3000x3000/gdc-wtil-s3-ep4-album-3000x3000.jpg?aid=rss_feed",
    season: 3,
  },
  {
    id: "s3e3",
    title: "Data Centers Help Fuel the Solar-Energy Boom",
    summary:
      "As digital tools behind solar get more sophisticated, data centers have the potential to be the backbone of the clean-energy economy.",
    duration: "00:14:02",
    pubDate: "2023-04-19",
    audio:
      "https://mgln.ai/e/p425918/cdn.simplecast.com/audio/1fa9e054-c34b-489c-86b1-bd3464944c5c/episodes/067ccfff-51f8-4181-94ef-081fea159834/audio/60f64776-b10b-4e26-955e-974e6ddbac08/default_tc.mp3",
    image:
      "https://image.simplecastcdn.com/images/f743f9e0-8ec4-43dc-8361-431829f4c096/52e0f646-0c5a-4149-8905-efdb9a3dafa3/3000x3000/gdc-wtil-s3-ep3-album-3000x3000.jpg?aid=rss_feed",
    season: 3,
  },
  {
    id: "s3e2",
    title: "From Furniture to Fiber, a Town Changed",
    summary:
      "Communities like Lenoir, NC are often great data center sites because of their strong industrial histories — and they're transformed by the investment.",
    duration: "00:15:21",
    pubDate: "2023-04-05",
    audio:
      "https://mgln.ai/e/p425918/cdn.simplecast.com/audio/1fa9e054-c34b-489c-86b1-bd3464944c5c/episodes/8476967c-1fda-4b6c-9426-62b78095a3d2/audio/1a6b9689-5e0b-4feb-9a32-eb96311628ec/default_tc.mp3",
    image:
      "https://image.simplecastcdn.com/images/f743f9e0-8ec4-43dc-8361-431829f4c096/47e237a0-83da-4e00-9c13-d79d1cccf895/3000x3000/gdc-wtil-s3-ep2-album-3000x3000.jpg?aid=rss_feed",
    season: 3,
  },
  {
    id: "s3e1",
    title: "Data Center on the Prairie",
    summary:
      "Exploring how data centers are transforming rural communities across the American Midwest, bringing new economic opportunities and high-speed connectivity.",
    duration: "00:18:11",
    pubDate: "2023-03-22",
    audio:
      "https://mgln.ai/e/p425918/cdn.simplecast.com/audio/1fa9e054-c34b-489c-86b1-bd3464944c5c/episodes/07f74717-610e-4a53-8ff6-6175ec592024/audio/404243da-48c5-4b9b-9439-034090b7248c/default_tc.mp3",
    image:
      "https://image.simplecastcdn.com/images/f743f9e0-8ec4-43dc-8361-431829f4c096/f2004b85-a9e1-415c-8a6b-d1fa98aee89b/3000x3000/gdc-wtil-s3-ep1-album-3000x3000.jpg?aid=rss_feed",
    season: 3,
  },
  {
    id: "s3-trailer",
    title: "A Preview of Season 3",
    summary: "A sneak peek at the new season of Where the Internet Lives, exploring data centers' impact on communities, energy, and people.",
    duration: "00:01:00",
    pubDate: "2023-03-01",
    audio:
      "https://mgln.ai/e/p425918/cdn.simplecast.com/audio/1fa9e054-c34b-489c-86b1-bd3464944c5c/episodes/a64ec49a-6487-462f-9c33-72421ea1c29b/audio/2ae22b3f-c1de-4ea7-ba8b-1bc05b7a1cf3/default_tc.mp3",
    image:
      "https://image.simplecastcdn.com/images/f743f9e0-8ec4-43dc-8361-431829f4c096/d97efb7a-ae4f-47c1-99bc-f3fb34d2faec/3000x3000/067-gdc-wtil-s3-teaser-3000x3000.jpg?aid=rss_feed",
    season: 3,
    isTrailer: true,
  },

  // ── Season 2 (2021–2022) — latest first ─────────────────────
  {
    id: "s2e10",
    title: "The Most Important Things Are Invisible",
    summary:
      "Bikash Koley, Google's head of network infrastructure, reflects on the hidden complexity of the systems that silently keep the internet running.",
    duration: "00:14:59",
    pubDate: "2022-01-27",
    audio:
      "https://mgln.ai/e/p425918/cdn.simplecast.com/audio/1fa9e054-c34b-489c-86b1-bd3464944c5c/episodes/836a6812-2631-4be4-bae0-956ca9e3a565/audio/649af44a-3261-48a3-9cba-7b5e8479ba2f/default_tc.mp3",
    image:
      "https://image.simplecastcdn.com/images/f743f9e0-8ec4-43dc-8361-431829f4c096/a2198fc2-f06d-4a91-9f63-e6ac6afda7a7/3000x3000/gdc-wtil-3000x3000-static-s2e6-bikash.jpg?aid=rss_feed",
    season: 2,
  },
  {
    id: "s2e9",
    title: "Scale Beyond Our Imagination",
    summary:
      "Majd Bakar, VP of Engineering at Google, shares how the extraordinary global scale of Google's network shapes every engineering decision.",
    duration: "00:13:03",
    pubDate: "2022-01-27",
    audio:
      "https://mgln.ai/e/p425918/cdn.simplecast.com/audio/1fa9e054-c34b-489c-86b1-bd3464944c5c/episodes/de8fe112-3e33-46e8-9644-336ad592fa91/audio/174472c9-fb8d-4cdc-b203-16d70465f104/default_tc.mp3",
    image:
      "https://image.simplecastcdn.com/images/f743f9e0-8ec4-43dc-8361-431829f4c096/b2c3fad4-5f6a-43c3-b18b-0175635b4821/3000x3000/gdc-wtil-3000x3000-static-s2e7-majd.jpg?aid=rss_feed",
    season: 2,
  },
  {
    id: "s2e8",
    title: "It Gets My Heart Beating",
    summary:
      "Andreas shares his passion for working on cutting-edge data center technology and what it means to be on the front line of Google's infrastructure.",
    duration: "00:10:48",
    pubDate: "2022-01-27",
    audio:
      "https://mgln.ai/e/p425918/cdn.simplecast.com/audio/1fa9e054-c34b-489c-86b1-bd3464944c5c/episodes/a27bcc87-1ed9-477c-b69b-10106a48dba0/audio/810b5f22-7c58-4673-bc8f-25dd577bdddd/default_tc.mp3",
    image:
      "https://image.simplecastcdn.com/images/f743f9e0-8ec4-43dc-8361-431829f4c096/c705fb61-d930-41e1-b991-a60b65c789d4/3000x3000/gdc-wtil-3000x3000-static-s2e10-andreas.jpg?aid=rss_feed",
    season: 2,
  },
  {
    id: "s2e7",
    title: "Holy Cow, This Is What You Are Building?",
    summary:
      "Sarah reflects on the sheer scale of Google's infrastructure projects and the pride that comes with building something that serves billions of people.",
    duration: "00:11:40",
    pubDate: "2022-01-27",
    audio:
      "https://mgln.ai/e/p425918/cdn.simplecast.com/audio/1fa9e054-c34b-489c-86b1-bd3464944c5c/episodes/301fe3b6-0d2c-4323-b812-fcfbd3297e63/audio/1ff2971a-35e0-444e-961a-a029a8f5de0b/default_tc.mp3",
    image:
      "https://image.simplecastcdn.com/images/f743f9e0-8ec4-43dc-8361-431829f4c096/6269aa8e-e806-4fc6-a90f-dfd7e8cdbccd/3000x3000/gdc-wtil-3000x3000-static-s2e9-sarah.jpg?aid=rss_feed",
    season: 2,
  },
  {
    id: "s2e6",
    title: "A Big Step In Our Journey",
    summary:
      "Tara's story of career growth within Google's data center operations, from boots on the ground to leading teams across global facilities.",
    duration: "00:13:21",
    pubDate: "2022-01-27",
    audio:
      "https://mgln.ai/e/p425918/cdn.simplecast.com/audio/1fa9e054-c34b-489c-86b1-bd3464944c5c/episodes/2435f315-c4ad-4279-aa06-25f643e8ba67/audio/08f5e05c-1be3-42c2-b6f9-fc89d47b137a/default_tc.mp3",
    image:
      "https://image.simplecastcdn.com/images/f743f9e0-8ec4-43dc-8361-431829f4c096/9ff090c2-1e58-4d13-b30b-55919c0ee2cf/3000x3000/gdc-wtil-3000x3000-static-s2e8-tara.jpg?aid=rss_feed",
    season: 2,
  },
  {
    id: "s2e5",
    title: "Challenges Are Expected",
    summary:
      "Mamoudou shares how he tackles complex technical challenges in data center operations and why the relentless problem-solving keeps him motivated.",
    duration: "00:14:33",
    pubDate: "2021-12-09",
    audio:
      "https://mgln.ai/e/p425918/cdn.simplecast.com/audio/1fa9e054-c34b-489c-86b1-bd3464944c5c/episodes/07b4e3c8-72f3-4f27-8ae8-f7729049d572/audio/9c5b6591-4e0c-4968-b06d-93e557e77426/default_tc.mp3",
    image:
      "https://image.simplecastcdn.com/images/f743f9e0-8ec4-43dc-8361-431829f4c096/5cf63cb5-56e7-4759-b26b-e3687e5644f3/3000x3000/gdc-wtil-3000x3000-static-s2e5-mamoudou.jpg?aid=rss_feed",
    season: 2,
  },
  {
    id: "s2e4",
    title: "I Never Thought It Would Be Possible",
    summary:
      "Juliana's journey breaking into the tech industry against the odds, and how landing a role at a Google data center changed the trajectory of her life.",
    duration: "00:10:08",
    pubDate: "2021-12-09",
    audio:
      "https://mgln.ai/e/p425918/cdn.simplecast.com/audio/1fa9e054-c34b-489c-86b1-bd3464944c5c/episodes/554af683-4771-4d47-9407-32f7be70d83b/audio/afcfd2ec-5908-473a-bc54-6ab2c482ab38/default_tc.mp3",
    image:
      "https://image.simplecastcdn.com/images/f743f9e0-8ec4-43dc-8361-431829f4c096/0c5f21ce-a0f8-4369-97a4-7a8799065300/3000x3000/gdc-wtil-3000x3000-static-s2e4-juliana.jpg?aid=rss_feed",
    season: 2,
  },
  {
    id: "s2e3",
    title: "We Know Who's Here and Why",
    summary:
      "Libby oversees security at a Google data center, where she explains how rigorous physical security protocols protect some of the world's most valuable infrastructure.",
    duration: "00:13:08",
    pubDate: "2021-12-09",
    audio:
      "https://mgln.ai/e/p425918/cdn.simplecast.com/audio/1fa9e054-c34b-489c-86b1-bd3464944c5c/episodes/3273bf0e-4f11-47e0-a42e-a2063caef7f0/audio/315e9275-ad8e-47ae-ac08-ddb8ef8f4891/default_tc.mp3",
    image:
      "https://image.simplecastcdn.com/images/f743f9e0-8ec4-43dc-8361-431829f4c096/89565f4a-64ed-480d-ae59-af68d0472da3/3000x3000/gdc-wtil-3000x3000-static-s2e3-libby.jpg?aid=rss_feed",
    season: 2,
  },
  {
    id: "s2e2",
    title: "I Feel Like I've Seen It All",
    summary:
      "Kenny brings decades of experience to his work at a Google data center, offering a veteran's perspective on how the industry has evolved.",
    duration: "00:15:26",
    pubDate: "2021-12-09",
    audio:
      "https://mgln.ai/e/p425918/cdn.simplecast.com/audio/1fa9e054-c34b-489c-86b1-bd3464944c5c/episodes/e56e7b3b-2b4a-4c66-855c-8d8c2add3f19/audio/8c8be3bc-3c35-4037-80d4-4741e1aa320e/default_tc.mp3",
    image:
      "https://image.simplecastcdn.com/images/f743f9e0-8ec4-43dc-8361-431829f4c096/95b5f744-b094-40fb-a2dd-91e8e2dd1556/3000x3000/gdc-wtil-3000x3000-static-s2e2-kenny.jpg?aid=rss_feed",
    season: 2,
  },
  {
    id: "s2e1",
    title: "Little Pieces of a Big Puzzle",
    summary:
      "Damian walks us through his day maintaining data center infrastructure, explaining how every small task is an essential piece of a massive global operation.",
    duration: "00:13:39",
    pubDate: "2021-12-09",
    audio:
      "https://mgln.ai/e/p425918/cdn.simplecast.com/audio/1fa9e054-c34b-489c-86b1-bd3464944c5c/episodes/53202bd7-e94b-49fa-9099-195b0e2de98c/audio/bab608fe-42af-44e0-affb-1521a6cc56be/default_tc.mp3",
    image:
      "https://image.simplecastcdn.com/images/f743f9e0-8ec4-43dc-8361-431829f4c096/af20be71-ceeb-4b14-ade3-be97446639a8/3000x3000/gdc-wtil-3000x3000-static-s2e1-damian.jpg?aid=rss_feed",
    season: 2,
  },
  {
    id: "s2-trailer",
    title: "Season 2: More Stories About the People Who Run the Internet",
    summary: "A preview of Season 2, featuring the humans behind Google's data centers — engineers, operators, and builders keeping the internet alive.",
    duration: "00:00:48",
    pubDate: "2021-12-06",
    audio:
      "https://mgln.ai/e/p425918/cdn.simplecast.com/audio/1fa9e054-c34b-489c-86b1-bd3464944c5c/episodes/75ef8057-277e-4ecd-9f2b-5f546cd7ad62/audio/10843bb8-f88c-410c-90a0-408ba663efc8/default_tc.mp3",
    image:
      "https://image.simplecastcdn.com/images/f743f9e0-8ec4-43dc-8361-431829f4c096/ecb796fe-6836-4b0f-96b0-860c858818bc/3000x3000/gdc-wtil-3000x3000-static-s2-teaser.jpg?aid=rss_feed",
    season: 2,
    isTrailer: true,
  },

  // ── Season 1 (2020) — latest first ──────────────────────────
  {
    id: "s1e6",
    title: "Six: The Future",
    summary:
      "The season finale imagines what the future holds for data centers — from ocean-cooled facilities to AI-driven infrastructure management.",
    duration: "00:37:01",
    pubDate: "2020-12-09",
    audio:
      "https://mgln.ai/e/p425918/cdn.simplecast.com/audio/1fa9e054-c34b-489c-86b1-bd3464944c5c/episodes/2a330dc7-fdd6-496c-a4bf-1935c2842510/audio/52212ef7-60d9-4bd7-9417-ce7d076c051b/default_tc.mp3",
    image: BLUE_ART,
    season: 1,
  },
  {
    id: "s1e5",
    title: "Five: What If?",
    summary:
      "What happens when the internet goes dark? This episode explores hypothetical failure scenarios and the systems Google has built to prevent them.",
    duration: "00:27:04",
    pubDate: "2020-12-09",
    audio:
      "https://mgln.ai/e/p425918/cdn.simplecast.com/audio/1fa9e054-c34b-489c-86b1-bd3464944c5c/episodes/fd6cc66e-59cb-44c9-9346-45504dada06e/audio/ee23896a-ba31-41e7-9ba1-d7019b6d77ab/default_tc.mp3",
    image: BLUE_ART,
    season: 1,
  },
  {
    id: "s1e4",
    title: "Four: A Quest for 24/7 Clean Energy",
    summary:
      "Google's ambitious goal to power every data center with carbon-free energy around the clock — and the engineering breakthroughs needed to get there.",
    duration: "00:41:03",
    pubDate: "2020-12-09",
    audio:
      "https://mgln.ai/e/p425918/cdn.simplecast.com/audio/1fa9e054-c34b-489c-86b1-bd3464944c5c/episodes/6e7ff35c-f309-4e82-bf52-66431f817f06/audio/41fa0529-e4d0-4777-8aa4-44f715993b19/default_tc.mp3",
    image: BLUE_ART,
    season: 1,
  },
  {
    id: "s1e3",
    title: "Three: When the Data Center Came to Town",
    summary:
      "How the arrival of a Google data center transforms a local community — from new jobs and infrastructure investment to lasting economic change.",
    duration: "00:41:20",
    pubDate: "2020-12-09",
    audio:
      "https://mgln.ai/e/p425918/cdn.simplecast.com/audio/1fa9e054-c34b-489c-86b1-bd3464944c5c/episodes/65e6392c-ab2a-4835-a675-81f79df901ae/audio/8e6f9098-9210-44d2-a95f-35719f62232a/default_tc.mp3",
    image: BLUE_ART,
    season: 1,
  },
  {
    id: "s1e2",
    title: "Two: Inside the Walls",
    summary:
      "A rare look inside the physical infrastructure of a Google data center — cooling systems, power redundancy, servers, and the teams that keep them humming.",
    duration: "00:40:56",
    pubDate: "2020-12-09",
    audio:
      "https://mgln.ai/e/p425918/cdn.simplecast.com/audio/1fa9e054-c34b-489c-86b1-bd3464944c5c/episodes/cbe8b594-437f-4945-8edd-c367aa324863/audio/d39ef875-22ce-4267-8fbc-d74c484c68fd/default_tc.mp3",
    image: BLUE_ART,
    season: 1,
  },
  {
    id: "s1e1",
    title: "One: You Use Data Centers",
    summary:
      "Every email, search, and video call passes through a data center. This episode introduces the invisible machines that power the modern internet.",
    duration: "00:30:10",
    pubDate: "2020-12-09",
    audio:
      "https://mgln.ai/e/p425918/cdn.simplecast.com/audio/1fa9e054-c34b-489c-86b1-bd3464944c5c/episodes/b5304488-0472-4d64-8d10-472328c29156/audio/4041bd4b-506b-410d-98b5-9e4a3c23b740/default_tc.mp3",
    image: BLUE_ART,
    season: 1,
  },
  {
    id: "s1-trailer",
    title: "Introducing 'Where the Internet Lives'",
    summary:
      "A preview of the first season of Where the Internet Lives, a podcast by Google exploring the people, places, and technology behind global data centers.",
    duration: "00:01:09",
    pubDate: "2020-11-20",
    audio:
      "https://mgln.ai/e/p425918/cdn.simplecast.com/audio/1fa9e054-c34b-489c-86b1-bd3464944c5c/episodes/6262f226-03e0-47f5-9bae-c2b06fd12873/audio/140e0163-8d3f-4a25-884a-650d2a31526f/default_tc.mp3",
    image: BLUE_ART,
    season: 1,
    isTrailer: true,
  },
];

/** Returns duration in seconds from "HH:MM:SS" or "MM:SS" */
export function parseDuration(dur: string): number {
  const parts = dur.split(":").map(Number);
  if (parts.length === 3) return parts[0] * 3600 + parts[1] * 60 + parts[2];
  if (parts.length === 2) return parts[0] * 60 + parts[1];
  return 0;
}

/** Format seconds → "m:ss" or "h:mm:ss" */
export function formatTime(secs: number): string {
  const h = Math.floor(secs / 3600);
  const m = Math.floor((secs % 3600) / 60);
  const s = Math.floor(secs % 60);
  if (h > 0) return `${h}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  return `${m}:${String(s).padStart(2, "0")}`;
}
