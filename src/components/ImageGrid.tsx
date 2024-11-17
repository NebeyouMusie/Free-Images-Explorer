import { useState } from "react";
import { Photo } from "@/lib/api";
import { ImageModal } from "./ImageModal";

interface ImageGridProps {
  photos: Photo[];
  isLoading: boolean;
}

export function ImageGrid({ photos, isLoading }: ImageGridProps) {
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);

  if (isLoading) {
    return (
      <div className="masonry-grid">
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            className="animate-pulse bg-muted rounded-lg"
            style={{ height: `${Math.random() * 200 + 200}px` }}
          />
        ))}
      </div>
    );
  }

  return (
    <>
      <div className="masonry-grid">
        {photos.map((photo) => (
          <div
            key={photo.id}
            className="relative group cursor-pointer overflow-hidden rounded-lg animate-fade-in"
            onClick={() => setSelectedPhoto(photo)}
          >
            <img
              src={photo.src.large}
              alt={`Photo by ${photo.photographer}`}
              className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-opacity duration-300">
              <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <p className="text-sm font-medium">{photo.photographer}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <ImageModal
        photo={selectedPhoto}
        onClose={() => setSelectedPhoto(null)}
      />
    </>
  );
}