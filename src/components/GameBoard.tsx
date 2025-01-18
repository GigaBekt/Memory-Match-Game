import React, { memo } from "react";
import Card from "./Card";
import { Card as CardType } from "../types";

interface GameBoardProps {
  cards: CardType[];
  onCardClick: (id: number) => void;
  difficulty: string;
}

const GameBoard: React.FC<GameBoardProps> = memo(
  ({ cards, onCardClick, difficulty }) => {
    const gridConfig = {
      easy: "grid-cols-2 sm:grid-cols-3 md:grid-cols-4",
      medium: "grid-cols-2 sm:grid-cols-3 md:grid-cols-4",
      hard: "grid-cols-3 sm:grid-cols-4 md:grid-cols-5",
    };
    console.log(cards, "CARDS");
    return (
      <div
        className={`grid ${
          gridConfig[difficulty as keyof typeof gridConfig]
        } gap-4 p-4 max-w-6xl mx-auto`}
        role="grid"
        aria-label="Memory game board"
      >
        {cards?.map((card) => (
          <Card
            key={card.id}
            image={card.image}
            isFlipped={card.isFlipped}
            isMatched={card.isMatched}
            onClick={() => onCardClick(card.id)}
          />
        ))}
      </div>
    );
  }
);

GameBoard.displayName = "GameBoard";

export default GameBoard;
