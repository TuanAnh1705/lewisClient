
import { ContactForm } from "@/components/contact/contactForm";
import { About } from "@/components/homepage/about";
import BottomSection from "@/components/homepage/bottom";
import { CoreStrategiesSection } from "@/components/homepage/CoreStrategiesSection";
import { Hero } from "@/components/homepage/hero";
import TestimonialsSection from "@/components/homepage/testimonial";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
        <Hero />
        <About />
        <CoreStrategiesSection/>
        <TestimonialsSection/>
        <BottomSection/>
        <ContactForm/>
    </div>
  );
}