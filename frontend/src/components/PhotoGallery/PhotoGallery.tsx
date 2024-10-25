import { Photo } from "@/interfaces";
import PhotoCard from "../PhotoCard/PhotoCard";

const PhotoGallery = ({
  photos,
  title = "Galería",
  date,
  time,
  category,
}: {
  photos: Photo[];
  title: string;
  date: string;
  time: string;
  category: number;
}) => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="mb-6 text-pretty text-3xl sm:text-4xl font-semibold lg:text-5xl">
        {title}
      </h1>
      <h4 className="text-lg text-gray-500">
        <b>Fecha: </b>
        {date} | <b>Hora: </b> {time}
      </h4>
      <h4 className="text-lg text-gray-500 mb-4">
        <b>Categoría:</b> Sub - {category}
      </h4>

      {/* Responsive Grid for Photos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {photos.map((photo: Photo) => (
          <PhotoCard photo={photo} key={photo.id} />
        ))}
      </div>
    </div>
  );
};

export default PhotoGallery;
