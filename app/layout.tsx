import Navbar from "@/components/Navbar";
import "@fortawesome/fontawesome-svg-core/styles.css";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "yet-another-react-lightbox/plugins/captions.css";
import "yet-another-react-lightbox/styles.css";
import "./globals.css";

const poppins = Poppins({
  weight: ["300", "400", "600", "800"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "KafeKoding Community",
  description:
    "KafeKoding Community adalah sebuah komunitas yang bergerak di bidang IT",
  authors: {
    name: "Fajri Fath",
    url: "https://github.com/Aeroxee",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="dark:text-white dark:bg-gray-900" style={poppins.style}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
