import { Trophy } from "@phosphor-icons/react";
import React from "react";

interface WinScreenProps {
  moves: number;
  time: number;
  onRestart: () => void;
}

const WinScreen: React.FC<WinScreenProps> = ({ moves, time, onRestart }) => {
  const formatTime = (ms: number) => {
    const seconds = Math.floor(ms / 1000);
    const minutes = Math.floor(seconds / 60);
    return `${minutes}:${(seconds % 60).toString().padStart(2, "0")}`;
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-xl text-center">
        <Trophy className="w-16 h-16 text-yellow-400 mx-auto mb-4" />
        <h2 className="text-3xl font-bold text-indigo-600 mb-4">
          Congratulations!
        </h2>
        <p className="text-xl mb-2 text-gray-900">You completed the game in:</p>
        <p className="text-2xl font-bold mb-2 text-gray-900">
          {formatTime(time)}
        </p>
        <p className="text-xl mb-4 text-gray-900">with {moves} moves</p>
        <button
          onClick={onRestart}
          className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
        >
          Play Again
        </button>
      </div>
    </div>
  );
};

export default WinScreen;
