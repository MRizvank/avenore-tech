import { MetadataRoute } from 'next'

export const dynamic = 'force-static'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Avenore Studio - Mobile App Engineering',
    short_name: 'Avenore',
    description: "Kuwait City's leading mobile app engineering firm specializing in Flutter, iOS, Android, and Fintech applications for GCC founders and enterprises.",
    start_url: '/',
    display: 'standalone',
    background_color: '#131317',
    theme_color: '#8b5cf6',
    icons: [
      {
        src: '/icon.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icon.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  }
}
