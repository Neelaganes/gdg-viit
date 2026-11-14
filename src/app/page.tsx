import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import AboutBento from "@/components/AboutBento";
import EventSpotlight from "@/components/EventSpotlight";
import Tracks from "@/components/Tracks";
import UpcomingEvents from "@/components/UpcomingEvents";
import Team from "@/components/Team";
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
        <UpcomingEvents />
        <Tracks />
        <Team />
        <JoinCta />
      </main>
      <Footer />
    </div>
  );
}
