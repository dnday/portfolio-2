/** @type {import('next').NextConfig} */
const nextConfig = {
  // ponytail: static export keeps the Go function in /api/contact deployable as-is on Vercel.
  // Drop `output` (and `images.unoptimized`) once contact moves into a Route Handler.
  output: "export",
  images: { unoptimized: true },
};

export default nextConfig;
