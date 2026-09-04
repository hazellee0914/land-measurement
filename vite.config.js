import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    VitePWA({
      registerType: 'autoUpdate',

      manifest: {
        name: '토지면적 측정',
        short_name: '토지면적',
        description: 'GPS와 지도를 이용한 토지면적 측정 앱',
        lang: 'ko',
        start_url: '/',
        display: 'standalone',
        background_color: '#f4f7f4',
        theme_color: '#16833b',

        icons: [
          {
            src: '/icons/icon-192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/icons/icon-512.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
    }),
  ],
});
