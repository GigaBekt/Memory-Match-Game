import React from "react";
import { Difficulty } from "../types";
import { Shield } from "lucide-react";

interface StartScreenProps {
  onStart: (difficulty: Difficulty) => void;
}

const StartScreen: React.FC<StartScreenProps> = ({ onStart }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 space-y-8 p-4">
      <div className="text-center">
        <Shield className="w-20 h-20 text-red-600 mx-auto mb-4" />
        <h1 className="text-5xl font-bold text-white mb-2">Marvel Memory</h1>
        <p className="text-gray-400 text-xl">Match the MCU characters</p>
      </div>
      <div className="flex flex-col space-y-4 w-full max-w-xs">
        <button
          onClick={() => onStart("easy")}
          className="px-8 py-4 bg-green-600 text-white rounded-lg hover:bg-green-700 transition shadow-lg text-lg font-semibold"
        >
          Easy (3x4)
        </button>
        <button
          onClick={() => onStart("medium")}
          className="px-8 py-4 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition shadow-lg text-lg font-semibold"
        >
          Medium (4x4)
        </button>
        {/* <button
          onClick={() => onStart('hard')}
          className="px-8 py-4 bg-red-600 text-white rounded-lg hover:bg-red-700 transition shadow-lg text-lg font-semibold"
        >
          Hard (5x6)
        </button> */}
      </div>
    </div>
  );
};

export default StartScreen;
