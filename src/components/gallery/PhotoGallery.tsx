import { useState } from 'react';
import { useFirebaseImages, type FirebaseImage } from '@/lib/useFirebaseImages';
import { ImageModal } from '@/components/gallery/ImageModal';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import { ImageIcon } from 'lucide-react';

export function PhotoGallery() {
  const { images, loading, error } = useFirebaseImages();
  const [selectedImage, setSelectedImage] = useState<FirebaseImage | null>(null);
  const [category, setCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');

  // Extract unique categories from images
  const categories = ['all', ...new Set(images.map(img => img.category || 'misc'))];

  // Filter images by category and search term
  const filteredImages = images.filter(img => {
    const matchesCategory = category === 'all' || img.category === category;
    const matchesSearch = !searchTerm || 
      img.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[300px] p-8">
        <ImageIcon className="h-12 w-12 text-muted-foreground mb-4" />
        <h3 className="text-xl font-medium mb-2">Failed to load images</h3>
        <p className="text-muted-foreground text-center max-w-md mb-4">{error}</p>
        <Button onClick={() => window.location.reload()}>Try Again</Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-8 flex flex-col md:flex-row justify-between gap-4">
        <Input
          type="search"
          placeholder="Search images..."
          className="max-w-xs"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        
        <Tabs defaultValue="all" value={category} onValueChange={setCategory}>
          <TabsList>
            {categories.map((cat) => (
              <TabsTrigger key={cat} value={cat} className="capitalize">
                {cat}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="aspect-square">
              <Skeleton className="w-full h-full rounded-md" />
            </div>
          ))}
        </div>
      ) : filteredImages.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 animate-in fade-in-50 duration-500">
          {filteredImages.map((image) => (
            <div 
              key={image.id}
              className="aspect-square cursor-pointer overflow-hidden rounded-md transition-all duration-300 hover:shadow-lg hover:scale-[1.02] group relative"
              onClick={() => setSelectedImage(image)}
            >
              <img
                src={image.thumbnailLink}
                alt={image.name}
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3">
                <span className="text-white text-sm font-medium line-clamp-2">{image.name}</span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center min-h-[300px]">
          <ImageIcon className="h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-xl font-medium mb-2">No images found</h3>
          <p className="text-muted-foreground">
            {searchTerm 
              ? `No images matching "${searchTerm}" in the ${category === 'all' ? 'gallery' : category} category` 
              : `No images found in the ${category} category`}
          </p>
        </div>
      )}

      {selectedImage && (
        <ImageModal
          image={selectedImage}
          images={filteredImages}
          onClose={() => setSelectedImage(null)}
        />
      )}
    </div>
  );
}