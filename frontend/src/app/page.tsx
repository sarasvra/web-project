
import LatestProductsSection from "@/components/product/LatestProductsSection";
import AllProductsSection from "@/components/product/AllProductsSection";
import Navbar from "@/components/layout/Navbar";
import HeroSlider from "@/components/home/HeroSlider";
import CategorySection from "@/components/home/Category";
import AboutSection from "@/components/home/About";
import WhyUsSection from "@/components/home/Whyuse";
import Footer from "@/components/layout/Footer";


export default function Home() {
  return (
    <div >

       <Navbar />
   
       <HeroSlider />

       <CategorySection />
  
       <LatestProductsSection />
   
       <AllProductsSection />
   
       <AboutSection />
   
       <WhyUsSection />
    
       <Footer />

    
  </div>
  );
}
