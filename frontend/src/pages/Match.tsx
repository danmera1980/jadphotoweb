import Footer from "@/components/Footer/Footer";
import Navbar from "@/components/Navbar/Navbar";
import PhotoGallery from "@/components/PhotoGallery/PhotoGallery";
import { getImagesByMatchId } from "@/services/match.services";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const Match = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const matchId = searchParams.get("matchId");
  const [photos, setPhotos] = useState([]);
  const [title, setTitle] = useState("Match");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [category, setCategory] = useState(9);

  useEffect(() => {
    const getPhotos = async (matchId: string) => {
      try {
        const result = await getImagesByMatchId(matchId);
        setPhotos(result.photos);
        setTitle(result.matchName);
        setDate(result.date);
        setTime(result.time);
        setCategory(result.category);
      } catch (error) {
        console.error("Error getting the photos", error);
        throw error;
      }
    };

    if (matchId) {
      getPhotos(matchId);
    }
  }, [matchId]);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-grow p-4">

        {/* Photo Gallery */}
        <PhotoGallery
          title={title}
          photos={photos}
          date={date}
          time={time}
          category={category}
        />
      </main>

      <Footer />
    </div>
  );
};

export default Match;
