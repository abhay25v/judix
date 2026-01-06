import '../styles/globals.css';
import Providers from './providers';

export const metadata = {
  title: 'Judix Task Manager',
  description: 'Judix full-stack assignment',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
