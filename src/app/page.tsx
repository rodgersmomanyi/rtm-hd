import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Experience } from "@/components/sections/Experience";
import { Marquee } from "@/components/ui/Marquee";
import { Projects } from "@/components/sections/Projects";
import { YouTube } from "@/components/sections/YouTube";
import { Skills } from "@/components/sections/Skills";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/layout/Footer";

const skillsMarqueeItems = [
  "BGP",
  "DWDM",
  "MPLS",
  "IS-IS",
  "OSPF",
  "SD-WAN",
  "Python",
  "Ansible",
  "FTTx",
  "Juniper",
  "Huawei",
  "Azure",
  "GCP",
  "Segment Routing",
  "100G",
  "Optical Fibre",
];

export default function Home() {
  return (
    <main id="main-content">
      <Hero />

      {/* Skills marquee strip */}
      <div className="section-blue py-4 overflow-hidden">
        <Marquee
          items={skillsMarqueeItems}
          itemClassName="eyebrow text-off-white/70 hover:text-off-white transition-colors"
        />
      </div>

      <About />
      <Experience />

      {/* Skills marquee between Experience and Projects */}
      <div className="bg-brand-orange py-4 overflow-hidden">
        <Marquee
          items={skillsMarqueeItems}
          reverse
          itemClassName="eyebrow text-white/70 hover:text-white transition-colors"
        />
      </div>

      <Projects />
      <YouTube />
      <Skills />
      <Contact />
      <Footer />
    </main>
  );
}
