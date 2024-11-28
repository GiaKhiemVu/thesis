// src/app/layout.tsx
import { Providers } from "../redux/providers"; // Adjust the path as needed
import './globals.css'

export const metadata = {
  title: "My App",
  description: "An app with centralized providers",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
