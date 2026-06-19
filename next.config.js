/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // We'll run ESLint separately — don't block builds
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Don't fail build on type errors (we'll verify separately)
    ignoreBuildErrors: false,
  },
  output: 'export',
  images: {
    unoptimized: true,
  },
  basePath: process.env.NODE_ENV === 'production' ? '/dunekeyboard_concept' : '',
  env: {
    NEXT_PUBLIC_BASE_PATH: process.env.NODE_ENV === 'production' ? '/dunekeyboard_concept' : '',
  },
};

module.exports = nextConfig;
