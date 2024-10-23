import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import ImageDialog from "../ImageDialog/ImageDialog";
import { PhotoCardProps } from "@/interfaces";

const PhotoCard: React.FC<PhotoCardProps> = ({ photo }) => {
  const [isDialogOpen, setDialogOpen] = useState(false); // State for dialog visibility
  
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  const openDialog = () => setDialogOpen(true);
  const closeDialog = () => setDialogOpen(false);
  console.log(photo);

  return (
    <>
      <Card
        key={photo.id}
        className="shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer" // Add cursor pointer for better UX
        onClick={openDialog} // Open dialog on click
      >
        <CardHeader>
          <img
            src={BACKEND_URL + photo.src}
            alt={photo.alt}
            className="w-full h-48 object-cover rounded-md"
          />
        </CardHeader>
        <CardContent>
          <CardTitle>{photo.title}</CardTitle>
        </CardContent>
      </Card>

      {/* Render the ImageDialog */}
      <ImageDialog
        isOpen={isDialogOpen}
        onClose={closeDialog}
        src={photo.src}
        alt={photo.alt}
      />
    </>
  );
};

export default PhotoCard;
