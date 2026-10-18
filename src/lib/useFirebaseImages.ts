import localImages from './local-images.json';

export interface FirebaseImage {
  id: string;
  name: string;
  thumbnailLink: string;
  fullSizeLink: string;
  category?: string;
}

// Temporary local snapshot while Firebase billing is repaired.
const images: FirebaseImage[] = localImages.map(image => ({
  ...image,
  thumbnailLink: `${import.meta.env.BASE_URL}gallery/${encodeURIComponent(image.id)}`,
  fullSizeLink: `${import.meta.env.BASE_URL}gallery/${encodeURIComponent(image.id)}`,
}));

export function useFirebaseImages() {
  return { images, loading: false, error: null };
}
