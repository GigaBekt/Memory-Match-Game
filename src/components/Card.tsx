import { ImageBroken, Shield } from "@phosphor-icons/react";
import React, { useState, memo, useCallback } from "react";

interface CardProps {
  image: string;
  isFlipped: boolean;
  isMatched: boolean;
  onClick: () => void;
}

const Card: React.FC<CardProps> = memo(
  ({ image, isFlipped, isMatched, onClick }) => {
    const [imageError, setImageError] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const handleImageError = useCallback(() => {
      setImageError(true);
      setIsLoading(false);
    }, []);

    const handleImageLoad = useCallback(() => {
      setIsLoading(false);
    }, []);

    return (
      <div
        onClick={!isFlipped && !isMatched ? onClick : undefined}
        className={`relative w-full aspect-[3/4] cursor-pointer transition-all duration-500 transform-gpu perspective-1000 ${
          isFlipped ? "rotate-y-180" : ""
        } ${!isFlipped && !isMatched ? "hover:scale-105" : ""}`}
        role="button"
        tabIndex={!isFlipped && !isMatched ? 0 : -1}
        aria-label={isFlipped ? "Card revealed" : "Hidden card"}
      >
        <div
          className={`absolute w-full h-full backface-hidden rounded-xl transition-all duration-300 ${
            isFlipped ? "opacity-0" : "opacity-100"
          } ${
            !isFlipped && !isMatched
              ? "hover:shadow-xl hover:shadow-red-500/20"
              : ""
          }`}
        >
          <div className="w-full h-full bg-gradient-to-br from-red-600 to-red-800 rounded-xl shadow-lg flex items-center justify-center">
            <Shield className="w-1/3 h-1/3 text-white animate-pulse" />
          </div>
        </div>
        <div
          className={`absolute w-full h-full rotate-y-180 ${
            isFlipped ? "opacity-100" : "opacity-0 backface-hidden"
          }`}
        >
          <div
            className={`w-full h-full rounded-xl shadow-lg overflow-hidden ${
              isMatched ? "ring-4 ring-green-500 ring-opacity-50" : ""
            } bg-gradient-to-br from-gray-700 to-gray-900 relative`}
          >
            {isLoading && !imageError && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-800">
                <div className="w-8 h-8 border-4 border-red-500 border-t-transparent rounded-full animate-spin"></div>
              </div>
            )}
            {imageError ? (
              <div className="w-full h-full flex items-center justify-center bg-gray-800">
                <ImageBroken className="w-1/3 h-1/3 text-gray-400" />
              </div>
            ) : (
              <img
                src={image}
                alt="Marvel Character"
                className={`w-full h-full object-cover transition-opacity duration-300 ${
                  isLoading ? "opacity-0" : "opacity-100"
                }`}
                onError={handleImageError}
                onLoad={handleImageLoad}
                loading="lazy"
              />
            )}
          </div>
        </div>
      </div>
    );
  }
);

export default Card;
