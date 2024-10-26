import { getAllMatches } from "@/services/match.services";
import { useEffect, useState } from "react";
import MatchCard from "../MatchCard/MatchCard";
import { Match } from "@/interfaces";

const MatchesGallery = ({isEditable = false}) => {
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    const getMatches = async () => {
      try {
        const result = await getAllMatches();
        setMatches(result);
      } catch (error) {
        console.error("Error getting the matches", error);
      }
    };

    getMatches();
  }, []);

  return (
    <div className="flex flex-wrap justify-center gap-4">
      {matches.length > 0 && matches.map((match: Match) => (
        <MatchCard
          isEditable={isEditable}
          key={match._id}
          match={{
            _id: match._id,
            matchName: match.matchName, // Pass the correct image URL here
            date: match.date, // Use a more descriptive alt text
            time: match.time,
            category: match.category,
            mainImagePath: match.mainImagePath,
          }}
        />
      ))}
    </div>
  );
};

export default MatchesGallery;
