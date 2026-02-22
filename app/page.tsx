import HeroSection from "@/components/hero-section";
import FeaturesSection from "@/components/features-section";
import InfiniteTestimonials from "@/components/infinite-testimonials";
import QuestionForm from "@/components/question-form";
import QuestionTable from "@/components/question-table";
import AnimatedTestimonialsSection from "@/components/animated-testimonials-section";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import MetaBallsBg from "@/components/meta-balls-bg";
import GridBackground from "@/components/grid-background";

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-x-hidden bg-black dark:bg-black">
      {/* Grid background matching GridBackgroundDemo */}
      <GridBackground />

      {/* Global MetaBalls cursor background */}
      <MetaBallsBg />

      {/* Hero with MacbookScroll */}
      <HeroSection />

      {/* Features with card hover effect */}
      <FeaturesSection />

      {/* Infinite scrolling testimonials */}
      <InfiniteTestimonials />

      {/* Question form with anonim toggle + platform */}
      <QuestionForm />

      {/* Question table */}
      <QuestionTable />

      {/* Animated testimonials with images before footer */}
      <AnimatedTestimonialsSection />

      {/* Footer */}
      <Footer />

      {/* Floating dock navbar (fixed bottom) */}
      <Navbar />
    </main>
  );
      }
