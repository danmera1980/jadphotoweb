import Footer from "@/components/Footer/Footer";
import ImageUploader from "@/components/ImageUpload/ImageUpload";
import Navbar from "@/components/Navbar/Navbar";
import {
  getImagesByMatchId,
  uploadMatchPhotos,
} from "@/services/match.services"; // Import upload function
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";

const AddPhotos = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const searchParams = new URLSearchParams(location.search);
  const matchId = searchParams.get("matchId");
  const [clearFiles, setClearFiles] = useState(false);
  const [matchInfo, setMatchInfo] = useState({
    matchName: "",
    date: "",
    time: "",
    category: "",
  });
  const [uploading, setUploading] = useState(false); // Add uploading state
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const handleFilesSelected = (files: File[]) => {
    setSelectedFiles(files); // Update selectedFiles state
  };

  useEffect(() => {
    const getMatchInfo = async (matchId: string) => {
      try {
        const result = await getImagesByMatchId(matchId);
        setMatchInfo(result);
      } catch (error) {
        console.error("Error getting the match information", error);
      }
    };

    if (matchId) {
      getMatchInfo(matchId);
    }
  }, [matchId]);

  const handleUpload = async () => {
    if (!matchId) {
      console.error("Match ID not found.");
      return;
    }

    try {
      setUploading(true); // Set uploading to true
      await uploadMatchPhotos(matchId, selectedFiles); // Assuming you have this service function
      toast({
        title: "Fotos subidas",
        description: "Las fotos se han subido correctamente.",
      });
      setClearFiles(true); // Clear the uploader
      setTimeout(() => {
        // Redirect after successful upload (adjust delay as needed)
        navigate(`/match?matchId=${matchId}`);
      }, 1500);
    } catch (error) {
      console.error("Error uploading photos:", error);
      toast({
        variant: "destructive",
        title: "Error al subir fotos",
        description: "Hubo un error al subir las fotos. Inténtalo de nuevo.",
      });
    } finally {
      setUploading(false); // Set uploading to false
    }
  };

  return (
    <>
      <Navbar />
      <h1>Añadir fotos a: {matchInfo.matchName}</h1>
      <ImageUploader
        onFilesSelected={handleFilesSelected}
        clearFiles={clearFiles}
      />
      <Button
        type="button"
        onClick={handleUpload}
        disabled={uploading} // Disable button while uploading
        className="mt-4" // Add some margin
      >
        {uploading ? "Subiendo..." : "Subir Fotos"}
      </Button>
      <Footer />
    </>
  );
};

export default AddPhotos;
