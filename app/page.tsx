import { BackgroundPattern } from "@/components/backgroundPattern";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { HeroSection } from "@/components/heroSection";

export default function Home() {
  return (
    <div className="h-screen flex flex-col overflow-y-hidden">
      <Header />
      <BackgroundPattern />
      <HeroSection />
      <Footer />
    </div>
  );
}
