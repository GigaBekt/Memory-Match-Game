import { useState, useEffect, useCallback } from "react";
import { GameState, Difficulty } from "./types";
import GameBoard from "./components/GameBoard";
import StartScreen from "./components/StartScreen";
import WinScreen from "./components/WinScreen";
import { generateCards } from "./utils/gameUtils";
import { ArrowLeft, Timer } from "lucide-react";

const initialGameState = (difficulty: Difficulty): GameState => ({
  cards: generateCards(difficulty),
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
  const [elapsedTime, setElapsedTime] = useState<number>(0);

  const startGame = useCallback((difficulty: Difficulty) => {
    setGameState({
      ...initialGameState(difficulty),
      gameStarted: true,
      startTime: Date.now(),
    });
    setElapsedTime(0);
  }, []);

  const handleCardClick = useCallback(
    (id: number) => {
      const { cards, firstCard, secondCard, moves } = gameState;

      if (secondCard !== null || firstCard === id) return;

      const newCards = cards.map((card) =>
        card.id === id ? { ...card, isFlipped: true } : card
      );

      if (firstCard === null) {
        setGameState({ ...gameState, cards: newCards, firstCard: id });
        return;
      }

      setGameState({
        ...gameState,
        cards: newCards,
        secondCard: id,
        moves: moves + 1,
      });
    },
    [gameState]
  );

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
      setGameState((prev) => ({
        ...prev,
        cards: newCards,
        firstCard: null,
        secondCard: null,
        endTime: allMatched ? Date.now() : null,
      }));
    } else {
      setTimeout(() => {
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
    }
  }, [gameState]);

  useEffect(() => {
    let timer: NodeJS.Timeout | undefined = undefined;
    if (gameState.gameStarted && !gameState.endTime) {
      timer = setInterval(() => {
        setElapsedTime(Date.now() - gameState.startTime!);
      }, 1000);
    } else if (gameState.endTime) {
      clearInterval(timer);
    }
    return () => clearInterval(timer);
  }, [gameState]);

  const { gameStarted, moves, startTime, endTime, cards, difficulty } =
    gameState;

  const endGame = () => {
    setGameState(initialGameState(difficulty));
  };

  const fetchItems = async () => {
    const data = await fetch(
      "https://developer.marvel.com/v1/public/characters"
    );
    const items = await data.json();
    console.log(items);
  };

  useEffect(() => {
    fetchItems();
  }, []);

  if (!gameStarted) {
    return <StartScreen onStart={startGame} />;
  }

  return (
    <div className="min-h-screen bg-gray-900 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-gray-800 rounded-lg shadow-xl p-6 mb-8">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center space-x-8">
              <div
                onClick={endGame}
                className="flex gap-2 items-center cursor-pointer"
              >
                <ArrowLeft className="w-5 h-5" />
                <p>Go Back</p>
              </div>
              <span className="text-lg font-semibold text-white">
                Moves: {moves}
              </span>
            </div>
            {startTime && !endTime && (
              <div className="flex items-center space-x-2 text-white">
                <Timer className="w-5 h-5" />
                <span className="text-lg font-semibold">
                  {Math.floor(elapsedTime / 1000)}s
                </span>
              </div>
            )}
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
