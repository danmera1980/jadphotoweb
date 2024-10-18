import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface ImageDialogProps {
  isOpen: boolean;
  onClose: () => void;
  src: string;
  alt: string;
}

const ImageDialog: React.FC<ImageDialogProps> = ({
  isOpen,
  onClose,
  src,
  alt,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[1000px]">
        <DialogHeader>
          <DialogTitle>{alt}</DialogTitle>
        </DialogHeader>
        <div className="flex justify-center items-center">
          <img
            src={src}
            alt={alt}
            className="max-h-[80vh] max-w-full object-contain"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ImageDialog;
