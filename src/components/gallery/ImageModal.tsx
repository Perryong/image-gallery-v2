import { useState, useEffect } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { 
  ChevronLeft, 
  ChevronRight, 
  X, 
  ZoomIn, 
  ZoomOut 
} from 'lucide-react';
import type { FirebaseImage } from '@/lib/useFirebaseImages';

interface ImageModalProps {
  image: FirebaseImage;
  images: FirebaseImage[];
  onClose: () => void;
}

export function ImageModal({ image, images, onClose }: ImageModalProps) {
  const [currentImage, setCurrentImage] = useState<FirebaseImage>(image);
  const [isLoading, setIsLoading] = useState(true);
  const [scale, setScale] = useState(1);
  
  // Find the index of the current image
  const currentIndex = images.findIndex(img => img.id === currentImage.id);

  // Navigate to previous image
  const goToPrev = () => {
    if (currentIndex > 0) {
      setCurrentImage(images[currentIndex - 1]);
      setIsLoading(true);
      setScale(1);
    }
  };

  // Navigate to next image
  const goToNext = () => {
    if (currentIndex < images.length - 1) {
      setCurrentImage(images[currentIndex + 1]);
      setIsLoading(true);
      setScale(1);
    }
  };

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.key) {
        case 'ArrowLeft':
          goToPrev();
          break;
        case 'ArrowRight':
          goToNext();
          break;
        case 'Escape':
          onClose();
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, images]);

  // Reset loading state when image changes
  useEffect(() => {
    setIsLoading(true);
  }, [currentImage]);

  // Handle zoom in/out
  const zoomIn = () => setScale(prev => Math.min(prev + 0.25, 2.5));
  const zoomOut = () => setScale(prev => Math.max(prev - 0.25, 0.5));

  return (
    <Dialog open={true} onOpenChange={() => onClose()}>
      <DialogContent className="max-w-7xl w-[95vw] h-[90vh] p-0 bg-black/95 border-none overflow-hidden">
        <div className="relative flex flex-col h-full">
          {/* Controls at the top */}
          <div className="absolute top-0 left-0 right-0 flex justify-between items-center p-4 z-10 bg-gradient-to-b from-black/60 to-transparent">
            <span className="text-white font-medium truncate max-w-[60%]">
              {currentImage.name}
            </span>
            <div className="flex gap-2">
              <Button 
                variant="ghost" 
                size="icon" 
                className="text-white hover:bg-white/20" 
                onClick={zoomOut}
              >
                <ZoomOut size={20} />
              </Button>
              <Button 
                variant="ghost" 
                size="icon" 
                className="text-white hover:bg-white/20" 
                onClick={zoomIn}
              >
                <ZoomIn size={20} />
              </Button>
              <Button 
                variant="ghost" 
                size="icon" 
                className="text-white hover:bg-white/20" 
                onClick={onClose}
              >
                <X size={20} />
              </Button>
            </div>
          </div>
          
          {/* Image container */}
          <div className="flex-1 flex items-center justify-center overflow-hidden">
            <img 
              src={currentImage.fullSizeLink}
              alt={currentImage.name}
              className="max-h-full max-w-full object-contain transition-all duration-300"
              style={{ 
                transform: `scale(${scale})`,
                opacity: isLoading ? 0 : 1,
                maxHeight: '80vh'
              }}
              onLoad={() => setIsLoading(false)}
            />
            
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="animate-spin h-8 w-8 border-4 border-white/20 border-t-white rounded-full" />
              </div>
            )}
          </div>
          
          {/* Navigation buttons */}
          {currentIndex > 0 && (
            <Button 
              variant="ghost" 
              size="icon" 
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/20 h-10 w-10 rounded-full" 
              onClick={goToPrev}
            >
              <ChevronLeft size={24} />
            </Button>
          )}
          
          {currentIndex < images.length - 1 && (
            <Button 
              variant="ghost" 
              size="icon" 
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/20 h-10 w-10 rounded-full" 
              onClick={goToNext}
            >
              <ChevronRight size={24} />
            </Button>
          )}
          
          {/* Image counter */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/80 text-sm">
            {currentIndex + 1} / {images.length}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}