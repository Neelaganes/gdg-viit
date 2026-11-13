import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import AboutBento from "@/components/AboutBento";
import EventSpotlight from "@/components/EventSpotlight";
import Stats from "@/components/Stats";
import Tracks from "@/components/Tracks";
import PastEvents from "@/components/PastEvents";
import Team from "@/components/Team";
import Gallery from "@/components/Gallery";
import Faq from "@/components/Faq";
import JoinCta from "@/components/JoinCta";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-cream text-ink">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <Marquee />
        <AboutBento />
        <EventSpotlight />
        <Stats />
        <Tracks />
        <PastEvents />
        <Team />
        <Gallery />
        <Faq />
        <JoinCta />
      </main>
      <Footer />
    </div>
  );
}
