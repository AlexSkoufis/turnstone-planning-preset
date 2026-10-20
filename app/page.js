import site from "@/content/site.json";
import home from "@/content/home.json";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import TrustMarquee from "@/components/TrustMarquee";
import Situations from "@/components/Situations";
import Belief from "@/components/Belief";
import Services from "@/components/Services";
import Process from "@/components/Process";
import WhyUs from "@/components/WhyUs";
import Resources from "@/components/Resources";
import Faq from "@/components/Faq";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import MobileBar from "@/components/MobileBar";

export default function Home() {
  return (
    <>
      <Header site={site} />
      <main id="main">
        <Hero content={home.hero} />
        <TrustMarquee content={home.trust} />
        <Situations content={home.situations} contact={site.contact} />
        <Belief content={home.belief} />
        <Services content={home.services} />
        <Process content={home.process} />
        <WhyUs content={home.why} />
        <Resources content={home.resources} />
        <Faq content={home.faq} />
        <Contact content={home.contact} contact={site.contact} />
      </main>
      <Footer site={site} />
      <MobileBar content={site.mobileBar} contact={site.contact} />
    </>
  );
}
