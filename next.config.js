/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  async rewrites() {
    return [
      {
        source: '/getSession',
        destination: 'https://v2-api.obilet.com/api/client/getsession',
      },
      {
        source: '/getBuslocations',
        destination: 'https://v2-api.obilet.com/api/location/getbuslocations',
      },
      {
        source: '/getJourneys',
        destination: 'https://v2-api.obilet.com/api/journey/getbusjourneys',
      },
    ]
  },

  env: {
    REACT_AUTH_KEY: process.env.NEXT_PUBLIC_AUTH_KEY,
  }
}

module.exports = nextConfig
