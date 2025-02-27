import "~/styles/globals.css"; //This creates a layout, Might change for better styling
import { GeistSans } from "geist/font/sans";

import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "Create T3 App",
  description: "Generated by create-t3-app",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={'font-sans ${inter-variable'}>
        {children}
      </body>
    </html>
  );
};