import { MatchData } from "@/interfaces";
import axios from "axios";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const createMatch = async (
  matchData: MatchData,
) => {
  const form = new FormData();

  // Append the match data as a JSON string
  form.append("matchData", JSON.stringify(matchData));

  try {
    // Perform the request, tracking upload progress
    const result = await axios.post(`${BACKEND_URL}/createMatch`, form, {
      headers: {
        "Content-Type": "multipart/form-data",
      }
    });

    return result;
  } catch (error) {
    console.error("Error creating match:", error);
    throw error; // Re-throw the error to handle it in the caller function
  }
};

export const uploadPhotos = async (matchId: string, files: File[]) => {
  const form = new FormData();

  // Append each file individually to the form data
  files.forEach((file) => {
    form.append("photos", file); // Append each file with the field name 'photos'
  });

  // Append the match data as a JSON string
  form.append("matchId", JSON.stringify(matchId));

  try {
    // Perform the request, tracking upload progress
    const result = await axios.post(`${BACKEND_URL}/createMatch`, form, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return result;
  } catch (error) {
    console.error("Error creating match:", error);
    throw error; // Re-throw the error to handle it in the caller function
  }
}

export const getAllMatches = async () => {
  try {
    const result = await axios.get(`${BACKEND_URL}/getAllMatches`);
    console.log(result.data);
    return result.data;
  } catch (error) {
    console.error("Error getting the matches", error);
    throw error;
  }
}

export const getImagesByMatchId = async (matchId: string) => {
  try {
    const result = await axios.get(`${BACKEND_URL}/getImagesByMatch?matchId=${matchId}`);
    console.log(result.data);
    return result.data;
  } catch (error) {
    console.error("Error getting the photos", error);
    throw error;
  }
}
