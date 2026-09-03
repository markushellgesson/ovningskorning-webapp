import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'export',
  basePath: '/ovningskorning-webapp',
  assetPrefix: '/ovningskorning-webapp/',

  // Exporterar varje sida som `skills/INT-01/index.html` i stället för
  // `skills/INT-01.html`.
  //
  // Utan detta blir en direktlänk beroende av att värden själv provar att
  // lägga på `.html`. GitHub Pages gör det, men inte varje statisk värd —
  // och en delad länk som bara fungerar på ett ställe går sönder tyst den
  // dag sidan flyttas. index.html i en katalog fungerar överallt.
  trailingSlash: true,

  images: {
    unoptimized: true,
  },
  typescript: {
    ignoreBuildErrors: false,
  },
  eslint: {
    ignoreDuringBuilds: false,
  },
};

export default nextConfig;
