import { Newsreader, Instrument_Sans } from "next/font/google";
import site from "@/content/site.json";
import MotionProvider from "@/components/MotionProvider";
import "./globals.css";

const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["opsz"],
  display: "swap",
});

const instrumentSans = Instrument_Sans({
  variable: "--font-instrument",
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: site.meta.title,
  description: site.meta.description,
  openGraph: {
    title: site.meta.title,
    description: site.meta.description,
    siteName: site.meta.siteName,
    locale: site.meta.locale,
    type: "website",
  },
};

export const viewport = {
  themeColor: "#8c3f25",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${newsreader.variable} ${instrumentSans.variable}`}>
      <body>
        {children}
        <MotionProvider />
      </body>
    </html>
  );
}
