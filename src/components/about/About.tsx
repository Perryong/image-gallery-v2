// src/components/about/About.tsx
import { Separator } from '@/components/ui/separator';

// 1️⃣  Import the image from src/assets
import animePhoto from '@/assets/anime.jpg';

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

        {/* 2️⃣  Use the imported URL so the path is correct on GitHub Pages */}
        <div className="flex justify-center">
          <div className="rounded-lg overflow-hidden shadow-lg max-w-md w-full">
            <img
              src={animePhoto}
              alt="Photographer"
              className="w-full h-auto"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
