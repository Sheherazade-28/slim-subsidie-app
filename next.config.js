/** @type {import('next').NextConfig} */
const nextConfig = {
  // Mollie en Resend worden server-side aangeroepen via API routes
  // Geen extra headers nodig voor externe API's
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
