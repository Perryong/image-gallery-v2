import { useState, useEffect } from 'react';
import { storage } from './firebase';
import { ref, listAll, getDownloadURL, getMetadata } from 'firebase/storage';

export interface FirebaseImage {
  id: string;
  name: string;
  thumbnailLink: string;
  fullSizeLink: string;
  category?: string;
}

export function useFirebaseImages() {
  const [images, setImages] = useState<FirebaseImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadImages() {
      try {
        setLoading(true);
        const storageRef = ref(storage);
        const result = await listAll(storageRef);
        
        const imagePromises = result.items.map(async (item) => {
          const fullSizeLink = await getDownloadURL(item);
          const metadata = await getMetadata(item);
          const category = metadata.customMetadata?.category || 'misc';
          
          return {
            id: item.name,
            name: item.name.replace(/\.[^/.]+$/, ''),
            thumbnailLink: fullSizeLink, // Using full size as thumbnail for now
            fullSizeLink: fullSizeLink,
            category: category
          };
        });

        const fetchedImages = await Promise.all(imagePromises);
        setImages(fetchedImages);
        setError(null);
      } catch (err) {
        console.error('Error fetching images:', err);
        setError(err instanceof Error ? err.message : 'Failed to load images');
      } finally {
        setLoading(false);
      }
    }

    loadImages();
  }, []);

  return { images, loading, error };
}