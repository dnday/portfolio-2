import { SpeedInsights } from "@vercel/speed-insights/next";
import { B612, Newsreader } from "next/font/google";
import heroPic from "../assets/self2.jpg";
import { CompassRose } from "../components/chart";
import Footer from "../components/footer";
import { Cursor, MotionProvider, ScrollProgress } from "../components/fx";
import Motion from "../components/motion";
import Nav from "../components/nav";
import NowPlaying from "../components/nowPlaying";
import { education, profile, SITE_URL } from "../content";
import "./globals.css";

const newsreader = Newsreader({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-newsreader",
});
const b612 = B612({ subsets: ["latin"], weight: ["400", "700"], variable: "--font-b612" });

const DESCRIPTION =
  "Marcelinus Dinoglide Yoga Prakoso, a software engineer and Information Engineering student at Universitas Gadjah Mada building backend systems, LLM features and computer vision for robotics.";
const ogImage = { url: heroPic.src, width: heroPic.width, height: heroPic.height };

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${profile.name}, software engineer`,
    template: `%s | ${profile.name}`,
  },
  description: DESCRIPTION,
  keywords: [
    "software engineer",
    "backend developer",
    "FastAPI",
    "NestJS",
    "Go",
    "Next.js",
    "YOLOv8",
    "Universitas Gadjah Mada",
    "portfolio",
  ],
  authors: [{ name: profile.name }],
  robots: { index: true, follow: true },
  alternates: { canonical: "/" },
  verification: { google: "google36b9a761c3f54938" },
  openGraph: { title: profile.name, description: DESCRIPTION, type: "website", url: "/", images: [ogImage] },
  twitter: { card: "summary_large_image", title: profile.name, description: DESCRIPTION, images: [ogImage] },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  jobTitle: "Software Engineer",
  description: DESCRIPTION,
  url: SITE_URL,
  image: `${SITE_URL}${heroPic.src}`,
  sameAs: [profile.github, profile.linkedin],
  affiliation: { "@type": "CollegeOrUniversity", name: education.school },
  address: { "@type": "PostalAddress", addressLocality: "Yogyakarta", addressCountry: "ID" },
  knowsAbout: [
    "Backend development",
    "FastAPI",
    "NestJS",
    "Go",
    "Next.js",
    "TypeScript",
    "PostgreSQL",
    "Docker",
    "YOLOv8",
    "OpenVINO",
    "ROS 2",
    "LLM integration",
  ],
};

// First visit in a session: show the intro overlay and hold the page's entrance animations
// until it lifts (.intro and html[data-intro] in globals.css). Runs before first paint.
const INTRO = `try{var h=document.documentElement;if(!sessionStorage.getItem("intro")&&matchMedia("(prefers-reduced-motion: no-preference)").matches){sessionStorage.setItem("intro","1");h.dataset.intro="";h.classList.add("intro-show");setTimeout(function(){delete h.dataset.intro},1700);setTimeout(function(){h.classList.remove("intro-show")},2700)}}catch(e){}`;

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${newsreader.variable} ${b612.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: INTRO }} />
      </head>
      <body>
        <div className="intro" aria-hidden="true">
          <CompassRose className="intro-rose" />
          <p className="intro-name font-serif italic">Marcel</p>
          <p className="intro-coords font-sans text-sm text-pencil">{profile.coords}</p>
          <span className="intro-bar scale-bar" />
        </div>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <MotionProvider>
          <ScrollProgress />
          <Nav />
          <main id="main">{children}</main>
          <Footer />
          <Cursor />
        </MotionProvider>
        <NowPlaying />
        <Motion />
        <SpeedInsights />
      </body>
    </html>
  );
}
