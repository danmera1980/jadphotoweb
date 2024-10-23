import { useState } from "react";
import Footer from "@/components/Footer/Footer";
import Navbar from "@/components/Navbar/Navbar";
import { createMatch } from "@/services/match.services";
import { MatchData } from "@/interfaces";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/toaster";

const CreateMatch = () => {
  const [matchName, setMatchName] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [category, setCategory] = useState(9);
  const [loading, setLoading] = useState(false); // Loading state
  const [selectedFile, setSelectedFile] = useState<File | null>(null); // Store the selected file
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true); // Disable button and show progress

    const matchData: MatchData = {
      matchName,
      date,
      time,
      category,
    };

    try {
      // Create a FormData object to send the file
      const formData = new FormData();
      formData.append("matchData", JSON.stringify(matchData)); // Add match data

      // Append the file only if it's selected
      if (selectedFile) {
        formData.append("image", selectedFile);
      }

      // Update your createMatch service to handle FormData
      await createMatch(formData);

      setMatchName("");
      setDate("");
      setTime("");
      setCategory(9);
      setSelectedFile(null); // Clear the selected file
      toast({
        title: "Gallería de Partido Creado.",
        description: "Se ha creado la galería del partido exitosamente.",
      });
    } catch (error) {
      console.error("Error creating match:", error);
      alert("Error creating match. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Function to handle file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  return (
    <div>
      <Navbar />
      <form className="p-4" onSubmit={handleSubmit}>
        <h2 className="text-2xl font-bold mb-4">Crear Partido</h2>

        {/* Match Name */}
        <div className="mb-4">
          <label htmlFor="matchName" className="block mb-1">
            Nombre del Partido
          </label>
          <input
            type="text"
            id="matchName"
            value={matchName}
            onChange={(e) => setMatchName(e.target.value)}
            required
            className="border border-gray-300 p-2 w-full"
          />
        </div>

        {/* Date */}
        <div className="mb-4">
          <label htmlFor="date" className="block mb-1">
            Fecha
          </label>
          <input
            type="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
            className="border border-gray-300 p-2 w-full"
          />
        </div>

        {/* Time */}
        <div className="mb-4">
          <label htmlFor="time" className="block mb-1">
            Hora
          </label>
          <input
            type="time"
            id="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            required
            className="border border-gray-300 p-2 w-full"
          />
        </div>

        {/* Category */}
        <div className="mb-4">
          <label htmlFor="category" className="block mb-1">
            Categoría
          </label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(parseInt(e.target.value))}
            className="border border-gray-300 p-2 w-full"
          >
            <option value="9">Sub 9</option>
            <option value="11">Sub 11</option>
            <option value="13">Sub 13</option>
            <option value="15">Sub 15</option>
            <option value="17">Sub 17</option>
            <option value="19">Sub 19</option>
          </select>
        </div>

        {/* Add a upload image input */}
        <div className="mb-4">
          <label htmlFor="uploadImage" className="block mb-1">
            Subir Imágen
          </label>
          <input
            type="file"
            id="uploadImage"
            onChange={handleFileChange}
            className="border border-gray-300 p-2 w-full"
            key={selectedFile ? selectedFile.name : 'fileInput'}
          />
        </div>

        <Button type="submit" disabled={loading}>
          {loading ? "Guardando..." : "Crear Partido"}
        </Button>
      </form>
      <Footer />
      <Toaster />
    </div>
  );
};

export default CreateMatch;
