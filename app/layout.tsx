import './globals.css';
import type { Metadata, Viewport } from 'next';
import { Manrope } from 'next/font/google';
import { getUser } from '@/lib/db/queries';
import { FeedbackButton } from '@/components/feedback-button';
// import { UserProvider } from '@/lib/auth/index';// Ensure you have this provider from your starter

export const metadata: Metadata = {
  title: 'CSV Pro - Instant CSV to JSON & SQL',
  description: 'The fastest way to clean, validate, and convert your CSV files to developer-friendly formats.'
};

export const viewport: Viewport = {
  maximumScale: 1,
  width: 'device-width',
  initialScale: 1,
};

const manrope = Manrope({ subsets: ['latin'] });

export default async function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  // Fetch user on the server to pass into the Auth Provider
  const userPromise = getUser();

  return (
    <html
      lang="en"
      className={`bg-white text-black ${manrope.className}`}
    >
      <body className="min-h-[100dvh] bg-gray-50">
        {/* <UserProvider userPromise={userPromise}> */}
          {children}
        {/* </UserProvider> */}
        <FeedbackButton />
      </body>
    </html>
  );
}