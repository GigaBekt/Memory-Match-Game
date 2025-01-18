export type Difficulty = 'easy' | 'medium' | 'hard';

export interface Card {
  id: number;
  image: string;
  isFlipped: boolean;
  isMatched: boolean;
}

export interface GameState {
  cards: Card[];
  moves: number;
  startTime: number | null;
  endTime: number | null;
  difficulty: Difficulty;
  gameStarted: boolean;
  firstCard: number | null;
  secondCard: number | null;
}