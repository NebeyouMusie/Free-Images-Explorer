import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Photo } from "@/lib/api";
import { ExternalLink } from "lucide-react";

interface ImageModalProps {
  photo: Photo | null;
  onClose: () => void;
}

export function ImageModal({ photo, onClose }: ImageModalProps) {
  if (!photo) return null;

  return (
    <Dialog open={!!photo} onOpenChange={() => onClose()}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span>Photo by {photo.photographer}</span>
            <a
              href={photo.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-muted-foreground hover:text-primary flex items-center gap-2"
            >
              View on Pexels
              <ExternalLink className="h-4 w-4" />
            </a>
          </DialogTitle>
        </DialogHeader>
        <div className="mt-4">
          <img
            src={photo.src.large2x}
            alt={`Photo by ${photo.photographer}`}
            className="w-full h-auto rounded-lg"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}