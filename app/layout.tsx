import type { Metadata } from 'next';
import { Orbitron, Space_Grotesk, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { LenisProvider } from '@/lib/lenis';
import CustomCursor from '@/components/CustomCursor';

// ─── Fonts ──────────────────────────────────────
const orbitron = Orbitron({
  subsets: ['latin'],
  variable: '--font-orbitron',
  display: 'swap',
  weight: ['400', '500', '600', '700', '800', '900'],
  preload: true,
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700'],
  preload: true,
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
  weight: ['400', '500', '600'],
  preload: false,
});

// ─── Metadata ───────────────────────────────────
export const metadata: Metadata = {
  title: 'DUNE',
  description:
    'DUNE crafts aerospace-grade mechanical keyboards engineered for silence, precision, and performance. 75% layout. Gasket mount. Hot-swap. QMK/VIA.',
  keywords: [
    'mechanical keyboard',
    'DUNE keyboard',
    'premium keyboard',
    '75% keyboard',
    'gasket mount',
    'QMK VIA',
    'hot swap keyboard',
  ],
  openGraph: {
    title: 'DUNE',
    description: 'Engineered for Silence. 72 keys. Zero compromise. One instrument.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DUNE',
    description: 'Engineered for Silence. 72 keys. Zero compromise. One instrument.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${orbitron.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable}`}
    >
      <body className="bg-[#080810] text-[#f0ede6] overflow-x-hidden">
        <LenisProvider>
          <CustomCursor />
          {children}
        </LenisProvider>
      </body>
    </html>
  );
}
