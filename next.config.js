/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com https://googleads.g.doubleclick.net; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https:; connect-src 'self' https://www.google-analytics.com https://api.anthropic.com https://formspree.io; frame-src https://www.googletagmanager.com;",
          },
        ],
      },
    ];
  },
  async redirects() {
    return [
      {
        source: "/wat-is-slim",
        destination: "/slim-subsidie",
        permanent: true,
      },
      {
        source: "/slim-subsidie/wat-is-slim",
        destination: "/slim-subsidie",
        permanent: true,
      },
      {
        source: "/slim",
        destination: "/slim-subsidie",
        permanent: true,
      },
      {
        source: "/scan",
        destination: "/quickscan",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
