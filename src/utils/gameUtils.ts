import { Card, Difficulty } from "../types";
import md5 from "md5";

const publicKey = import.meta.env.VITE_PUBLIC_KEY as string;
const privateKey = import.meta.env.VITE_PRIVATE_KEY as string;
const baseUrl = import.meta.env.VITE_BASE_URL as string;

const ts = new Date().getTime();
const hash = md5(ts + privateKey + publicKey);

interface Thumbnail {
  path: string;
  extension: string;
}
interface Character {
  name: string;
  thumbnail: Thumbnail;
}
interface CharacterData {
  name: string;
  image: string;
}

const fetchMarvelCharacters = async () => {
  const url = `${baseUrl}/characters?ts=${ts}&apikey=${publicKey}&hash=${hash}&limit=50`;

  try {
    const response = await fetch(url);
    const { data } = await response.json();

    const filteredData: Character[] = data.results.filter(
      (char: Character) => !char.thumbnail.path.includes("image_not_available")
    );
    const characters: CharacterData[] = filteredData.map((char: Character) => ({
      name: char.name,
      image: `${char.thumbnail.path}.${char.thumbnail.extension}`,
    }));

    return characters;
  } catch (error) {
    console.error("Error fetching Marvel characters:", error);
    return [];
  }
};

export const getGridSize = (difficulty: Difficulty): { pairs: number } => {
  switch (difficulty) {
    case "easy":
      return { pairs: 6 };
    case "medium":
      return { pairs: 8 };
    case "hard":
      return { pairs: 15 };
    default:
      throw new Error("Invalid difficulty level");
  }
};

export const generateCards = async (
  difficulty: Difficulty
): Promise<Card[]> => {
  const { pairs } = getGridSize(difficulty);
  const characters = await fetchMarvelCharacters();
  const selectedCharacters = characters
    .sort(() => Math.random() - 0.5)
    .slice(0, pairs);

  const cards: Card[] = [...selectedCharacters, ...selectedCharacters]
    .sort(() => Math.random() - 0.5)
    .map((char, index) => ({
      id: index,
      image: char.image,
      isFlipped: false,
      isMatched: false,
    }));

  return cards;
};
