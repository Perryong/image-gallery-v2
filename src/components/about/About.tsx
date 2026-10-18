// src/components/about/About.tsx
import { Separator } from '@/components/ui/separator';

import pikachuRain from '@/assets/about/pikachu-rain.jpg';
import gengarRain from '@/assets/about/gengar-rain.png';
import gengarGarden from '@/assets/about/gengar-garden.png';
import snorlaxPond from '@/assets/about/snorlax-pond.jpg';

export function About() {
  return (
    <section id="about" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">About Me</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Welcome to my portfolio! I'm a passionate photographer capturing moments and emotions through my lens
          </p>
          <Separator className="max-w-md mx-auto my-6" />
        </div>

        <div className="grid grid-cols-4 items-start gap-2 sm:gap-4 max-w-6xl mx-auto">
          <img src={pikachuRain} alt="Pikachu holding an umbrella on a rainy street" className="w-full h-auto rounded-lg shadow-lg" loading="lazy" />
          <img src={gengarRain} alt="Gengar holding a purple umbrella on a rainy street" className="w-full h-auto rounded-lg shadow-lg" loading="lazy" />
          <img src={gengarGarden} alt="Gengar beneath cherry blossoms in a garden" className="w-full h-auto rounded-lg shadow-lg" loading="lazy" />
          <img src={snorlaxPond} alt="Snorlax resting beside a sunlit pond" className="w-full h-auto rounded-lg shadow-lg" loading="lazy" />
        </div>
      </div>
    </section>
  );
}
