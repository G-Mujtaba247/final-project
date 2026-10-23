/**
 * Hard-coded tour data for the Explore Pakistan website.
 *
 * Each record includes a unique id, slug, destination details, pricing,
 * dates, and status.  Statuses:
 *   • "available"  — open for booking right now
 *   • "recent"     — already completed
 *   • "upcoming"   — scheduled for a future date, not yet bookable
 *
 * Images reference files already present in the /public folder.
 * To swap to a real backend later, replace this export with an API call
 * that returns the same shape.
 */

export const toursData = [
  // ─── Available Tours (4) ───────────────────────────────────────────
  {
    id: "avl-001",
    _id: "avl-001",
    slug: "hunza-valley",
    title: "Hunza Valley Explorer",
    location: "Hunza Valley, Gilgit-Baltistan",
    image: "/hunza.jpg",
    duration: "4 Days / 3 Nights",
    price: 25000,
    description:
      "Witness the majestic Rakaposhi peak, stroll through ancient Baltit Fort, and savour apricot orchards in one of the most breathtaking valleys on Earth. Includes transport, meals, and guided heritage walks.",
    startDate: "2026-11-10",
    endDate: "2026-11-13",
    status: "available",
    rating: 4.9,
  },
  {
    id: "avl-002",
    _id: "avl-002",
    slug: "skardu-adventure",
    title: "Skardu Grand Adventure",
    location: "Skardu, Gilgit-Baltistan",
    image: "/skardu.jpg",
    duration: "5 Days / 4 Nights",
    price: 38000,
    description:
      "Explore Shangrila Resort, Upper Kachura Lake, and Deosai National Park — home to the Himalayan brown bear. A five-day deep dive into the roof-of-the-world landscape with comfortable camp stays.",
    startDate: "2026-11-15",
    endDate: "2026-11-19",
    status: "available",
    rating: 4.8,
  },
  {
    id: "avl-003",
    _id: "avl-003",
    slug: "swat-valley-retreat",
    title: "Swat Valley Retreat",
    location: "Swat Valley, Khyber Pakhtunkhwa",
    image: "/Sawat.jpg",
    duration: "3 Days / 2 Nights",
    price: 18500,
    description:
      "Known as the Switzerland of Pakistan, Swat offers emerald rivers, Mingora bazaars, and the Buddhist ruins of Butkara. A perfect weekend getaway with guided cultural excursions.",
    startDate: "2026-11-05",
    endDate: "2026-11-07",
    status: "available",
    rating: 4.7,
  },
  {
    id: "avl-004",
    _id: "avl-004",
    slug: "neelum-valley-escape",
    title: "Neelum Valley Escape",
    location: "Neelum Valley, Azad Kashmir",
    image: "/neelum.jpg",
    duration: "4 Days / 3 Nights",
    price: 22000,
    description:
      "Follow the turquoise Neelum River through Sharda, Kel, and Arang Kel. Dense pine forests, wooden bridges, and star-filled nights make this a soul-refreshing adventure in Azad Kashmir.",
    startDate: "2026-11-20",
    endDate: "2026-11-23",
    status: "available",
    rating: 4.6,
  },

  // ─── Recent Tours (4) ─────────────────────────────────────────────
  {
    id: "rec-001",
    _id: "rec-001",
    slug: "murree-hills-trip",
    title: "Murree Hills Weekend",
    location: "Murree, Punjab",
    image: "/image1.jpg",
    duration: "2 Days / 1 Night",
    price: 12000,
    description:
      "A relaxing hill-station escape featuring Mall Road shopping, Pindi Point chairlift, and Patriata cable-car rides amidst cool pine forests near Islamabad.",
    startDate: "2026-09-12",
    endDate: "2026-09-13",
    status: "recent",
    rating: 4.5,
  },
  {
    id: "rec-002",
    _id: "rec-002",
    slug: "chitral-kalash-heritage",
    title: "Chitral & Kalash Heritage",
    location: "Chitral, Khyber Pakhtunkhwa",
    image: "/Chitral.jpg",
    duration: "5 Days / 4 Nights",
    price: 34000,
    description:
      "Immerse yourself in the vibrant Kalash culture, witness ancient festivals, and hike through Chitral's dramatic mountain passes. A heritage trip unlike any other.",
    startDate: "2026-08-20",
    endDate: "2026-08-24",
    status: "recent",
    rating: 4.9,
  },
  {
    id: "rec-003",
    _id: "rec-003",
    slug: "ratti-gali-lake-hike",
    title: "Ratti Gali Lake Expedition",
    location: "Ratti Gali, Azad Kashmir",
    image: "/ratti.jpg",
    duration: "3 Days / 2 Nights",
    price: 19500,
    description:
      "Trek through alpine meadows to reach the crystal-clear Ratti Gali Lake at 12,130 ft. An unforgettable high-altitude camping experience under the Milky Way.",
    startDate: "2026-09-01",
    endDate: "2026-09-03",
    status: "recent",
    rating: 5.0,
  },
  {
    id: "rec-004",
    _id: "rec-004",
    slug: "kumrat-valley-tour",
    title: "Kumrat Valley Discovery",
    location: "Kumrat Valley, Dir Upper",
    image: "/kumrat.jpg",
    duration: "4 Days / 3 Nights",
    price: 24000,
    description:
      "Explore the untouched Kumrat Valley — thick deodar forests, the rushing Panjkora River, and the iconic Jahaz Banda meadow. Off-the-grid bliss for nature lovers.",
    startDate: "2026-09-15",
    endDate: "2026-09-18",
    status: "recent",
    rating: 4.7,
  },

  // ─── Upcoming Tours (2) ───────────────────────────────────────────
  {
    id: "upc-001",
    _id: "upc-001",
    slug: "fairy-meadows-trek",
    title: "Fairy Meadows Base Camp Trek",
    location: "Fairy Meadows, Gilgit-Baltistan",
    image: "/nanga.jpg",
    duration: "5 Days / 4 Nights",
    price: 35000,
    description:
      "Camp beneath the mighty Nanga Parbat — the world's ninth-highest peak. Trek through lush meadows, cross suspension bridges, and experience the raw beauty of Pakistan's Karakoram range.",
    startDate: "2027-04-15",
    endDate: "2027-04-19",
    status: "upcoming",
    rating: 4.8,
  },
  {
    id: "upc-002",
    _id: "upc-002",
    slug: "naran-kaghan-expedition",
    title: "Naran Kaghan Summer Expedition",
    location: "Naran Kaghan, Khyber Pakhtunkhwa",
    image: "/Kaghan.jpg",
    duration: "3 Days / 2 Nights",
    price: 20000,
    description:
      "Drive the legendary Kaghan Highway, visit the shimmering Saif-ul-Malook Lake, and take in Lulusar Lake's panoramic vistas on this action-packed summer adventure.",
    startDate: "2027-06-01",
    endDate: "2027-06-03",
    status: "upcoming",
    rating: 4.6,
  },
];

/**
 * Helper selectors — useful for filtering in the UI or connecting
 * to a future API response normaliser.
 */
export const getAvailableTours = () =>
  toursData.filter((t) => t.status === "available");

export const getRecentTours = () =>
  toursData.filter((t) => t.status === "recent");

export const getUpcomingTours = () =>
  toursData.filter((t) => t.status === "upcoming");

export const getTourBySlug = (slug) =>
  toursData.find((t) => t.slug === slug) || null;

export const getTourById = (id) =>
  toursData.find((t) => t.id === id || t._id === id) || null;
