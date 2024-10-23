export interface MatchData {
  matchName: string;
  date: string;
  time: string;
  category: number;
}

export interface Match {
  _id: string;
  matchName: string;
  date: string;
  time: string;
  category: number;
  mainImagePath: string;
}

export interface MatchCardProps {
  match: Match;
  isEditable: boolean;
}

export interface Photo {
  id: string;
  src: string;
  alt: string;
  title: string;
}

export interface PhotoCardProps {
  photo: Photo;
}
