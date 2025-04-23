import { ThemeProvider } from './providers/ThemeProvider';
import { Navbar } from './components/layout/Navbar';
import { Hero } from './components/hero/Hero';
import { ImageSlider } from './components/hero/ImageSlider';
import { PhotoGallery } from './components/gallery/PhotoGallery';
import { About } from './components/about/About';
import { Footer } from './components/layout/Footer';
import { ScrollToTop } from './components/ui/ScrollToTop';
import { sliderData } from './lib/utils/mockData';
import { Toaster } from '@/components/ui/sonner';

function App() {
  return (
    <ThemeProvider defaultTheme="dark">
      <div className="min-h-screen flex flex-col">
        <Navbar />
        
        {/* Hero Section */}
        <Hero />
        
        {/* Featured Images Slider */}
        <div id="featured">
          <ImageSlider slides={sliderData} autoPlayInterval={8000} />
        </div>
        
        {/* Gallery Section using Firebase Images */}
        <section id="gallery" className="py-20">
          <div className="container mx-auto px-4 mb-12">
            <h2 className="text-3xl font-bold text-center mb-4">Photography Gallery</h2>
            <p className="text-muted-foreground text-center max-w-2xl mx-auto">
              Browse through my collection of photographs that capture moments, emotions, and scenery from around the world.
            </p>
          </div>
          <PhotoGallery />
        </section>
        
        {/* About Section */}
        <About />
        
        {/* Footer */}
        <Footer />
        
        {/* Scroll to Top Button */}
        <ScrollToTop />
        
        {/* Toast Notifications */}
        <Toaster />
      </div>
    </ThemeProvider>
  );
}

export default App;