import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Photo } from "@/lib/api";
import { Download, ExternalLink } from "lucide-react";

interface ImageModalProps {
  photo: Photo | null;
  onClose: () => void;
}

export function ImageModal({ photo, onClose }: ImageModalProps) {
  if (!photo) return null;

  const handleDownload = async () => {
    try {
      const response = await fetch(photo.src.original);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `photo-${photo.id}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading image:', error);
    }
  };

  return (
    <Dialog open={!!photo} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-4xl max-h-[90vh] flex flex-col p-0">
        <DialogHeader className="p-6">
          <DialogTitle>Photo by {photo.photographer}</DialogTitle>
        </DialogHeader>
        <ScrollArea className="flex-1">
          <div className="p-6 pt-0">
            <img
              src={photo.src.large2x}
              alt={`Photo by ${photo.photographer}`}
              className="w-full h-auto rounded-lg"
            />
          </div>
        </ScrollArea>
        <div className="p-6 border-t flex items-center justify-between mt-auto">
          <a
            href={photo.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-muted-foreground hover:text-primary flex items-center gap-2"
          >
            View on Pexels
            <ExternalLink className="h-4 w-4" />
          </a>
          <Button onClick={handleDownload} className="flex items-center gap-2">
            Download
            <Download className="h-4 w-4" />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}