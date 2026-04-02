// ===== PAINTING DATA =====
// Replace "src" with your actual image paths when ready.
// Placeholder function generates a colored SVG so every card has a visible image.
function placeholder(hue) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="530">
    <rect width="400" height="530" fill="hsl(${hue},15%,14%)"/>
    <rect x="80" y="140" width="240" height="250" rx="4" fill="hsl(${hue},20%,20%)" opacity="0.6"/>
    <text x="200" y="280" text-anchor="middle" fill="hsl(${hue},30%,40%)" font-family="serif" font-size="18">Your Painting</text>
  </svg>`;
  return 'data:image/svg+xml,' + encodeURIComponent(svg);
}

const paintings = [
  {
    title: "Untitled I",
    src: placeholder(30),
    medium: "Acrylic on Canvas",
    filter: "acrylic",
    size: '36 × 48 in',
    date: "2025",
    description: "Description of this piece."
  },
  {
    title: "Untitled II",
    src: placeholder(35),
    medium: "Acrylic on Canvas",
    filter: "acrylic",
    size: '30 × 40 in',
    date: "2025",
    description: "Description of this piece."
  },
  {
    title: "Untitled III",
    src: placeholder(25),
    medium: "Acrylic on Canvas",
    filter: "acrylic",
    size: '48 × 60 in',
    date: "2024",
    description: "Description of this piece."
  },
  {
    title: "Untitled IV",
    src: placeholder(40),
    medium: "Acrylic on Canvas",
    filter: "acrylic",
    size: '36 × 36 in',
    date: "2024",
    description: "Description of this piece."
  },
  {
    title: "Untitled V",
    src: placeholder(20),
    medium: "Acrylic on Canvas",
    filter: "acrylic",
    size: '24 × 36 in',
    date: "2023",
    description: "Description of this piece."
  },
  {
    title: "Untitled VI",
    src: placeholder(32),
    medium: "Acrylic on Canvas",
    filter: "acrylic",
    size: '36 × 48 in',
    date: "2023",
    description: "Description of this piece."
  },
  {
    title: "Untitled VII",
    src: placeholder(15),
    medium: "Oil on Canvas",
    filter: "oil",
    size: '24 × 36 in',
    date: "2025",
    description: "Description of this piece."
  },
  {
    title: "Untitled VIII",
    src: placeholder(10),
    medium: "Oil on Canvas",
    filter: "oil",
    size: '24 × 30 in',
    date: "2024",
    description: "Description of this piece."
  },
  {
    title: "Untitled IX",
    src: placeholder(18),
    medium: "Oil on Canvas",
    filter: "oil",
    size: '20 × 24 in',
    date: "2024",
    description: "Description of this piece."
  },
  {
    title: "Untitled X",
    src: placeholder(8),
    medium: "Oil on Canvas",
    filter: "oil",
    size: '30 × 40 in',
    date: "2023",
    description: "Description of this piece."
  },
  {
    title: "Untitled XI",
    src: placeholder(22),
    medium: "Oil on Canvas",
    filter: "oil",
    size: '40 × 50 in',
    date: "2023",
    description: "Description of this piece."
  },
  {
    title: "Untitled XII",
    src: placeholder(12),
    medium: "Oil on Canvas",
    filter: "oil",
    size: '24 × 30 in',
    date: "2022",
    description: "Description of this piece."
  },
  {
    title: "Untitled XIII",
    src: placeholder(200),
    medium: "Watercolour on Paper",
    filter: "watercolour",
    size: '18 × 24 in',
    date: "2025",
    description: "Description of this piece."
  },
  {
    title: "Untitled XIV",
    src: placeholder(210),
    medium: "Watercolour on Paper",
    filter: "watercolour",
    size: '12 × 16 in',
    date: "2024",
    description: "Description of this piece."
  },
  {
    title: "Untitled XV",
    src: placeholder(190),
    medium: "Watercolour on Paper",
    filter: "watercolour",
    size: '14 × 20 in',
    date: "2024",
    description: "Description of this piece."
  },
  {
    title: "Untitled XVI",
    src: placeholder(220),
    medium: "Watercolour on Paper",
    filter: "watercolour",
    size: '16 × 22 in',
    date: "2023",
    description: "Description of this piece."
  }
];
