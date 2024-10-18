import { getAllMatches } from "@/services/match.services";
import { useEffect, useState } from "react";

const MatchesGallery = () => {
  const [matches, setMatches] = useState({});

  useEffect(() => {
    const getMatches = async () => {
      try {
        const result = await getAllMatches();
        console.log(result);
      } catch (error) {
        console.error("Error getting the matches", error);
      }
    };

    getMatches();
  }, []);
  return <div>MatchesGallery</div>;
};

export default MatchesGallery;
