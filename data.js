// ===== PAINTING DATA =====
const paintings = [
  // ——— ACRYLIC (14) ———
  {
    title: "Golden Hour",
    src: "images/acrylic/golden-hour-20250827.jpg",
    medium: "Acrylic on Canvas",
    filter: "acrylic",
    size: '36 × 48 in',
    date: "2025",
    description: "A study in warm light and layered texture."
  },
  {
    title: "Still Breathing",
    src: "images/acrylic/still-breathing-20250827.jpg",
    medium: "Acrylic on Canvas",
    filter: "acrylic",
    size: '30 × 40 in',
    date: "2025",
    description: "Bold strokes exploring movement and stillness."
  },
  {
    title: "Unfolding",
    src: "images/acrylic/unfolding-20250109.jpg",
    medium: "Acrylic on Canvas",
    filter: "acrylic",
    size: '30 × 40 in',
    date: "2025",
    description: "Layers peeling back to reveal something underneath."
  },
  {
    title: "September Glow",
    src: "images/acrylic/september-glow-20180904.jpg",
    medium: "Acrylic on Canvas",
    filter: "acrylic",
    size: '24 × 36 in',
    date: "2018",
    description: "Warm autumn hues on a textured ground."
  },
  {
    title: "Dusk Fragment",
    src: "images/acrylic/dusk-fragment-20180920.jpg",
    medium: "Acrylic on Canvas",
    filter: "acrylic",
    size: '30 × 40 in',
    date: "2018",
    description: "Fragments of a fading sky."
  },
  {
    title: "Bloom",
    src: "images/acrylic/bloom-20180415.jpeg",
    medium: "Acrylic on Canvas",
    filter: "acrylic",
    size: '24 × 30 in',
    date: "2018",
    description: "Colour bursting through a muted surface."
  },
  {
    title: "Winter Interior",
    src: "images/acrylic/winter-interior-20180114.jpg",
    medium: "Acrylic on Canvas",
    filter: "acrylic",
    size: '20 × 24 in',
    date: "2018",
    description: "Warm light against cold walls."
  },
  {
    title: "Soft Ground",
    src: "images/acrylic/soft-ground-20181030.jpg",
    medium: "Acrylic on Canvas",
    filter: "acrylic",
    size: '24 × 36 in',
    date: "2018",
    description: "Earth tones dissolving into canvas."
  },
  {
    title: "Ember",
    src: "images/acrylic/ember-20180927.jpg",
    medium: "Acrylic on Canvas",
    filter: "acrylic",
    size: '24 × 36 in',
    date: "2018",
    description: "The last glow before it fades."
  },
  {
    title: "Late May",
    src: "images/acrylic/late-may-20200526.jpg",
    medium: "Acrylic on Canvas",
    filter: "acrylic",
    size: '24 × 30 in',
    date: "2020",
    description: "Soft warmth capturing the end of spring."
  },
  {
    title: "Monsoon Memory",
    src: "images/acrylic/monsoon-memory-20170709.jpeg",
    medium: "Acrylic on Canvas",
    filter: "acrylic",
    size: '20 × 24 in',
    date: "2017",
    description: "Rain-soaked impressions on canvas."
  },
  {
    title: "Midday Heat",
    src: "images/acrylic/midday-heat-20170714.jpeg",
    medium: "Acrylic on Canvas",
    filter: "acrylic",
    size: '24 × 30 in',
    date: "2017",
    description: "Thick impasto capturing summer intensity."
  },
  {
    title: "First Marks",
    src: "images/acrylic/first-marks-20170228.jpg",
    medium: "Acrylic on Canvas",
    filter: "acrylic",
    size: '20 × 24 in',
    date: "2017",
    description: "Early explorations — raw and honest."
  },
  {
    title: "Wandering",
    src: "images/acrylic/wandering-2017.jpg",
    medium: "Acrylic on Canvas",
    filter: "acrylic",
    size: '18 × 24 in',
    date: "2017",
    description: "Loose brushwork following no particular path."
  },

  // ——— OIL (6) ———
  {
    title: "Morning Palette",
    src: "images/oil/morning-palette-20250109.jpg",
    medium: "Oil on Canvas",
    filter: "oil",
    size: '24 × 30 in',
    date: "2025",
    description: "An exploration of colour at first light."
  },
  {
    title: "Quiet Corners",
    src: "images/oil/quiet-corners-20250109.jpg",
    medium: "Oil on Canvas",
    filter: "oil",
    size: '20 × 24 in',
    date: "2025",
    description: "Intimate spaces rendered in rich oil tones."
  },
  {
    title: "February Light",
    src: "images/oil/february-light-20250214.jpg",
    medium: "Oil on Canvas",
    filter: "oil",
    size: '24 × 36 in',
    date: "2025",
    description: "Soft winter tones captured in oil."
  },
  {
    title: "Spring Residue",
    src: "images/oil/spring-residue-20230426.jpg",
    medium: "Oil on Canvas",
    filter: "oil",
    size: '36 × 48 in',
    date: "2023",
    description: "What remains after the season turns."
  },
  {
    title: "Morning Ritual",
    src: "images/oil/morning-ritual-20180511.jpg",
    medium: "Oil on Canvas",
    filter: "oil",
    size: '24 × 30 in',
    date: "2018",
    description: "Quiet contemplation in warm oil tones."
  },
  {
    title: "Passage",
    src: "images/oil/passage-20181030.jpg",
    medium: "Oil on Canvas",
    filter: "oil",
    size: '30 × 40 in',
    date: "2018",
    description: "A threshold between two states."
  },

  // ——— WATERCOLOUR (3) ———
  {
    title: "Lockdown Study",
    src: "images/watercolour/lockdown-study-20200410.jpg",
    medium: "Watercolour on Paper",
    filter: "watercolour",
    size: '14 × 18 in',
    date: "2020",
    description: "Painted during a time of stillness and reflection."
  },
  {
    title: "Night Study",
    src: "images/watercolour/night-study-20170127.jpg",
    medium: "Watercolour on Paper",
    filter: "watercolour",
    size: '12 × 16 in',
    date: "2017",
    description: "Dark tones and quiet energy on wet paper."
  },
  {
    title: "April Mood",
    src: "images/watercolour/april-mood-20200401.jpg",
    medium: "Watercolour on Paper",
    filter: "watercolour",
    size: '14 × 20 in',
    date: "2020",
    description: "A moody piece born from quiet evenings."
  }
];
