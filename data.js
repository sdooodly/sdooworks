// ===== PAINTING DATA =====
const paintings = [
  // ——— ACRYLIC (14) ———
  {
    title: "Golden Hour",
    src: "images/acrylic/PXL_20250827_053309506.jpg",
    medium: "Acrylic on Canvas",
    filter: "acrylic",
    size: '36 × 48 in',
    date: "2025",
    description: "A study in warm light and layered texture."
  },
  {
    title: "Still Breathing",
    src: "images/acrylic/PXL_20250827_120930272~2.jpg",
    medium: "Acrylic on Canvas",
    filter: "acrylic",
    size: '30 × 40 in',
    date: "2025",
    description: "Bold strokes exploring movement and stillness."
  },
  {
    title: "Unfolding",
    src: "images/acrylic/20250109_093727.jpg",
    medium: "Acrylic on Canvas",
    filter: "acrylic",
    size: '30 × 40 in',
    date: "2025",
    description: "Layers peeling back to reveal something underneath."
  },
  {
    title: "September Glow",
    src: "images/acrylic/IMG_20180904_185544_225.jpg",
    medium: "Acrylic on Canvas",
    filter: "acrylic",
    size: '24 × 36 in',
    date: "2018",
    description: "Warm autumn hues on a textured ground."
  },
  {
    title: "Dusk Fragment",
    src: "images/acrylic/IMG_20180920_194805_982.jpg",
    medium: "Acrylic on Canvas",
    filter: "acrylic",
    size: '30 × 40 in',
    date: "2018",
    description: "Fragments of a fading sky."
  },
  {
    title: "Bloom",
    src: "images/acrylic/IMG_20180415_114911-01.jpeg",
    medium: "Acrylic on Canvas",
    filter: "acrylic",
    size: '24 × 30 in',
    date: "2018",
    description: "Colour bursting through a muted surface."
  },
  {
    title: "Winter Interior",
    src: "images/acrylic/IMG_20180114_220703_293.jpg",
    medium: "Acrylic on Canvas",
    filter: "acrylic",
    size: '20 × 24 in',
    date: "2018",
    description: "Warm light against cold walls."
  },
  {
    title: "Soft Ground",
    src: "images/acrylic/IMG-20181030-WA0003.jpg",
    medium: "Acrylic on Canvas",
    filter: "acrylic",
    size: '24 × 36 in',
    date: "2018",
    description: "Earth tones dissolving into canvas."
  },
  {
    title: "Ember",
    src: "images/acrylic/IMG-20180927-WA0060.jpg",
    medium: "Acrylic on Canvas",
    filter: "acrylic",
    size: '24 × 36 in',
    date: "2018",
    description: "The last glow before it fades."
  },
  {
    title: "Late May",
    src: "images/acrylic/IMG_20200526_202041.jpg",
    medium: "Acrylic on Canvas",
    filter: "acrylic",
    size: '24 × 30 in',
    date: "2020",
    description: "Soft warmth capturing the end of spring."
  },
  {
    title: "Monsoon Memory",
    src: "images/acrylic/IMG_20170709_121641-01.jpeg",
    medium: "Acrylic on Canvas",
    filter: "acrylic",
    size: '20 × 24 in',
    date: "2017",
    description: "Rain-soaked impressions on canvas."
  },
  {
    title: "Midday Heat",
    src: "images/acrylic/IMG_20170714_172632-02.jpeg",
    medium: "Acrylic on Canvas",
    filter: "acrylic",
    size: '24 × 30 in',
    date: "2017",
    description: "Thick impasto capturing summer intensity."
  },
  {
    title: "First Marks",
    src: "images/acrylic/IMG_20170228_211845.jpg",
    medium: "Acrylic on Canvas",
    filter: "acrylic",
    size: '20 × 24 in',
    date: "2017",
    description: "Early explorations — raw and honest."
  },
  {
    title: "Wandering",
    src: "images/acrylic/IMG_4722.JPG",
    medium: "Acrylic on Canvas",
    filter: "acrylic",
    size: '18 × 24 in',
    date: "2017",
    description: "Loose brushwork following no particular path."
  },

  // ——— OIL (6) ———
  {
    title: "Morning Palette",
    src: "images/oil/20250109_093708.jpg",
    medium: "Oil on Canvas",
    filter: "oil",
    size: '24 × 30 in',
    date: "2025",
    description: "An exploration of colour at first light."
  },
  {
    title: "Quiet Corners",
    src: "images/oil/20250109_093720.jpg",
    medium: "Oil on Canvas",
    filter: "oil",
    size: '20 × 24 in',
    date: "2025",
    description: "Intimate spaces rendered in rich oil tones."
  },
  {
    title: "February Light",
    src: "images/oil/PXL_20250214_120648249.jpg",
    medium: "Oil on Canvas",
    filter: "oil",
    size: '24 × 36 in',
    date: "2025",
    description: "Soft winter tones captured in oil."
  },
  {
    title: "Spring Residue",
    src: "images/oil/PXL_20230426_174653725.jpg",
    medium: "Oil on Canvas",
    filter: "oil",
    size: '36 × 48 in',
    date: "2023",
    description: "What remains after the season turns."
  },
  {
    title: "Morning Ritual",
    src: "images/oil/IMG_20180511_091945_052.jpg",
    medium: "Oil on Canvas",
    filter: "oil",
    size: '24 × 30 in',
    date: "2018",
    description: "Quiet contemplation in warm oil tones."
  },
  {
    title: "Passage",
    src: "images/oil/IMG-20181030-WA0000.jpg",
    medium: "Oil on Canvas",
    filter: "oil",
    size: '30 × 40 in',
    date: "2018",
    description: "A threshold between two states."
  },

  // ——— WATERCOLOUR (3) ———
  {
    title: "Lockdown Study",
    src: "images/watercolour/20200410_195700~2.jpg",
    medium: "Watercolour on Paper",
    filter: "watercolour",
    size: '14 × 18 in',
    date: "2020",
    description: "Painted during a time of stillness and reflection."
  },
  {
    title: "Night Study",
    src: "images/watercolour/IMG_20170127_202538_817.jpg",
    medium: "Watercolour on Paper",
    filter: "watercolour",
    size: '12 × 16 in',
    date: "2017",
    description: "Dark tones and quiet energy on wet paper."
  },
  {
    title: "April Mood",
    src: "images/watercolour/IMG_20200401_210917.jpg",
    medium: "Watercolour on Paper",
    filter: "watercolour",
    size: '14 × 20 in',
    date: "2020",
    description: "A moody piece born from quiet evenings."
  }
];
