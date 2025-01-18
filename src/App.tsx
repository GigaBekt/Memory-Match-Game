import { useState, useEffect, useCallback } from "react";
import { GameState, Difficulty } from "./types";
import GameBoard from "./components/GameBoard";
import StartScreen from "./components/StartScreen";
import WinScreen from "./components/WinScreen";
import { generateCards } from "./utils/gameUtils";
import Loader from "./components/Loader";
import { ArrowLeft } from "@phosphor-icons/react";

const initialGameState = (difficulty: Difficulty): GameState => ({
  cards: [],
  moves: 0,
  startTime: null,
  endTime: null,
  difficulty,
  gameStarted: false,
  firstCard: null,
  secondCard: null,
});

function App() {
  const [gameState, setGameState] = useState<GameState>(
    initialGameState("easy")
  );
  const [loading, setLoading] = useState<boolean>(false);

  const startGame = useCallback(async (difficulty: Difficulty) => {
    setLoading(true);
    const cards = await generateCards(difficulty);
    setGameState({
      ...initialGameState(difficulty),
      cards,
      gameStarted: true,
      startTime: Date.now(),
    });
    setLoading(false);
  }, []);

  const handleCardClick = useCallback((id: number) => {
    setGameState((prevState) => {
      const { cards, firstCard, secondCard, moves } = prevState;

      if (secondCard !== null || firstCard === id) return prevState;

      const newCards = cards.map((card) =>
        card.id === id ? { ...card, isFlipped: true } : card
      );

      if (firstCard === null) {
        return { ...prevState, cards: newCards, firstCard: id };
      }

      return {
        ...prevState,
        cards: newCards,
        secondCard: id,
        moves: moves + 1,
      };
    });
  }, []);

  useEffect(() => {
    const { cards, firstCard, secondCard } = gameState;
    if (firstCard === null || secondCard === null) return;
    const first = cards[firstCard];
    const second = cards[secondCard];
    if (first.image === second.image) {
      const newCards = cards.map((card) =>
        card.id === firstCard || card.id === secondCard
          ? { ...card, isMatched: true }
          : card
      );

      const allMatched = newCards.every((card) => card.isMatched);
      setGameState((prevState) => ({
        ...prevState,
        cards: newCards,
        firstCard: null,
        secondCard: null,
        endTime: allMatched ? Date.now() : null,
      }));
    } else {
      const timeoutId = setTimeout(() => {
        const newCards = cards.map((card) =>
          card.id === firstCard || card.id === secondCard
            ? { ...card, isFlipped: false }
            : card
        );
        setGameState((prevState) => ({
          ...prevState,
          cards: newCards,
          firstCard: null,
          secondCard: null,
        }));
      }, 1000);

      return () => clearTimeout(timeoutId);
    }
  }, [gameState.firstCard, gameState.secondCard]);

  const { gameStarted, moves, startTime, endTime, cards, difficulty } =
    gameState;

  const endGame = useCallback(() => {
    setGameState(initialGameState(difficulty));
  }, [difficulty]);

  if (loading) {
    return <Loader />;
  }

  if (!gameStarted) {
    return <StartScreen onStart={startGame} />;
  }

  return (
    <div className="min-h-screen bg-gray-900 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-gray-800 rounded-lg shadow-xl p-6 mb-8">
          <div className="flex justify-between items-center mb-6">
            <div
              onClick={endGame}
              className="flex items-center space-x-2 text-white"
            >
              <ArrowLeft size={24} />
              <span className="text-lg font-semibold">Back To Home</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-lg font-semibold text-white">
                Moves: {moves}
              </span>
            </div>
          </div>
          <GameBoard
            cards={cards}
            onCardClick={handleCardClick}
            difficulty={difficulty}
          />
        </div>
      </div>
      {endTime && (
        <WinScreen
          moves={moves}
          time={endTime - startTime!}
          onRestart={() => startGame(difficulty)}
        />
      )}
    </div>
  );
}

export default App;
