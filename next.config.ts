import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ['ru-msk-dr3-1.store.cloud.mts.ru'], // ваш домен с изображениями
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/cars',
        permanent: true,
      },
    ]
  },
};

export default nextConfig;
