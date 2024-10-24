import { MatchCardProps } from "@/interfaces";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "../ui/card";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";

const MatchCard: React.FC<MatchCardProps> = ({ match, isEditable }) => {
  const navigate = useNavigate();
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  // Split the date string into its components
  const [year, month, day] = match.date.split("T")[0].split("-").map(Number);

  // Create the Date object, remembering that months are zero-indexed
  const date = new Date(year, month - 1, day);

  const formattedDate = date.toLocaleDateString("es-EC", {
    month: "long",
    day: "numeric",
  });
  const [hours, minutes] = match.time.split(":").map(Number);
  const timeDate = new Date();
  timeDate.setHours(hours, minutes, 0, 0); // Set hours and minutes on a Date object

  const formattedTime = timeDate.toLocaleTimeString("es-EC", {
    year: "2-digit",
    hour: "numeric",
    minute: "numeric",
  });

  const formattedDateTime = formattedDate + " " + formattedTime;

  date.setDate(date.getDate() + 1);
  date.setFullYear(date.getFullYear());

  const dateTime = formattedDateTime;

  const gotoMatch = (matchId: string) => {
    navigate(`/match?matchId=${matchId}`);
  };

  return (
    <>
      <Card
        key={match._id}
        className="shadow-md hover:shadow-lg transition-shadow duration-300" // Add cursor pointer for better UX
      >
        <CardContent
          className="cursor-pointer"
          onClick={() => gotoMatch(match._id)}
        >
          <CardHeader>
            <h1 className="text-lg font-bold">{match.matchName}</h1>
            <img
              src={`${BACKEND_URL}/uploads/${match.mainImagePath}`}
              alt={match.matchName}
              className="w-full h-48 object-cover rounded-md"
            />
          </CardHeader>
          <p>{dateTime}</p>
        </CardContent>
        {isEditable && (
          <CardFooter className="justify-end">
            <Button onClick={() => navigate(`/addPhotos?matchId=${match._id}`)}>
              Añadir Fotos
            </Button>
          </CardFooter>
        )}
      </Card>
    </>
  );
};

export default MatchCard;
