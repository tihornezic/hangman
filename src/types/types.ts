export type QuotableResponse = {
  _id: string;
  content: string;
  author: string;
  authorSlug: string;
  length: number;
  tags: string[];
};

export type HighScoreResponse = {
  id: number;
  quoteId: string;
  length: number;
  uniqueCharacters: number;
  userName: string;
  errors: number;
  duration: number;
};

export enum EnumGameStatus {
  not_started = "Not started",
  in_progress = "In progress",
  lose = "Lose",
  win = "Win",
}