import { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SlideItem {
  image: string;
  heading: string;
  description: string;
}

interface ImageSliderProps {
  slides: SlideItem[];
  autoPlayInterval?: number;
}

export function ImageSlider({ slides, autoPlayInterval = 8000 }: ImageSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const goToNext = useCallback(() => {
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    setCurrentIndex((prevIndex) => (prevIndex === slides.length - 1 ? 0 : prevIndex + 1));
    
    // Reset transitioning state after animation completes
    setTimeout(() => setIsTransitioning(false), 1000);
  }, [isTransitioning, slides.length]);

  const goToPrevious = useCallback(() => {
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? slides.length - 1 : prevIndex - 1));
    
    // Reset transitioning state after animation completes
    setTimeout(() => setIsTransitioning(false), 1000);
  }, [isTransitioning, slides.length]);

  // Auto-play effect
  useEffect(() => {
    const interval = setInterval(goToNext, autoPlayInterval);
    return () => clearInterval(interval);
  }, [goToNext, autoPlayInterval]);

  if (!slides || slides.length === 0) {
    return null;
  }

  return (
    <section id="featured" className="relative h-screen overflow-hidden">
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={cn(
            "absolute inset-0 transition-opacity duration-1000 ease-in-out",
            index === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0"
          )}
        >
          <img
            src={slide.image}
            alt={slide.heading}
            className="absolute w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
          
          <div className="absolute bottom-0 left-0 p-8 md:p-16 max-w-3xl text-white">
            <h2 className={cn(
              "text-3xl md:text-4xl font-bold mb-4 transition-all duration-700 ease-out",
              index === currentIndex 
                ? "opacity-100 translate-y-0" 
                : "opacity-0 translate-y-8"
            )}>
              {slide.heading}
            </h2>
            <p className={cn(
              "text-white/80 mb-6 transition-all duration-700 delay-100 ease-out",
              index === currentIndex 
                ? "opacity-100 translate-y-0" 
                : "opacity-0 translate-y-8"
            )}>
              {slide.description}
            </p>
            <div className="h-px w-32 bg-white/50 my-6" />
          </div>
        </div>
      ))}
      
      {/* Navigation Buttons */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 text-white hover:bg-white/20 h-12 w-12 rounded-full"
        onClick={goToPrevious}
      >
        <ChevronLeft className="h-6 w-6" />
      </Button>
      
      <Button
        variant="ghost"
        size="icon"
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 text-white hover:bg-white/20 h-12 w-12 rounded-full"
        onClick={goToNext}
      >
        <ChevronRight className="h-6 w-6" />
      </Button>
      
      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            className={cn(
              "w-2 h-2 rounded-full transition-all",
              index === currentIndex 
                ? "bg-white w-8" 
                : "bg-white/40 hover:bg-white/60"
            )}
            onClick={() => {
              if (!isTransitioning) {
                setIsTransitioning(true);
                setCurrentIndex(index);
                setTimeout(() => setIsTransitioning(false), 1000);
              }
            }}
          />
        ))}
      </div>
    </section>
  );
}