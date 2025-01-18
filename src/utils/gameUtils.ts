import { Card, Difficulty } from '../types';

const marvelCharacters = [
  {
    name: 'Iron Man',
    image: 'https://images.pexels.com/photos/12903779/pexels-photo-12903779.jpeg?auto=compress&cs=tinysrgb&w=300'
  },
  {
    name: 'Spider-Man',
    image: 'https://images.pexels.com/photos/12903775/pexels-photo-12903775.jpeg?auto=compress&cs=tinysrgb&w=300'
  },
  {
    name: 'Captain America',
    image: 'https://images.pexels.com/photos/5011647/pexels-photo-5011647.jpeg?auto=compress&cs=tinysrgb&w=300'
  },
  {
    name: 'Thor',
    image: 'https://images.pexels.com/photos/8017959/pexels-photo-8017959.jpeg?auto=compress&cs=tinysrgb&w=300'
  },
  {
    name: 'Black Widow',
    image: 'https://images.pexels.com/photos/8017932/pexels-photo-8017932.jpeg?auto=compress&cs=tinysrgb&w=300'
  },
  {
    name: 'Doctor Strange',
    image: 'https://images.pexels.com/photos/8017943/pexels-photo-8017943.jpeg?auto=compress&cs=tinysrgb&w=300'
  },
  {
    name: 'Black Panther',
    image: 'https://images.pexels.com/photos/8017925/pexels-photo-8017925.jpeg?auto=compress&cs=tinysrgb&w=300'
  },
  {
    name: 'Captain Marvel',
    image: 'https://images.pexels.com/photos/8017937/pexels-photo-8017937.jpeg?auto=compress&cs=tinysrgb&w=300'
  },
  {
    name: 'Scarlet Witch',
    image: 'https://images.pexels.com/photos/8017929/pexels-photo-8017929.jpeg?auto=compress&cs=tinysrgb&w=300'
  },
  {
    name: 'Ant-Man',
    image: 'https://images.pexels.com/photos/8017950/pexels-photo-8017950.jpeg?auto=compress&cs=tinysrgb&w=300'
  },
  {
    name: 'Star-Lord',
    image: 'https://images.pexels.com/photos/8017947/pexels-photo-8017947.jpeg?auto=compress&cs=tinysrgb&w=300'
  },
  {
    name: 'Vision',
    image: 'https://images.pexels.com/photos/8017941/pexels-photo-8017941.jpeg?auto=compress&cs=tinysrgb&w=300'
  },
  {
    name: 'Loki',
    image: 'https://images.pexels.com/photos/8017935/pexels-photo-8017935.jpeg?auto=compress&cs=tinysrgb&w=300'
  },
  {
    name: 'Thanos',
    image: 'https://images.pexels.com/photos/8017953/pexels-photo-8017953.jpeg?auto=compress&cs=tinysrgb&w=300'
  },
  {
    name: 'Hulk',
    image: 'https://images.pexels.com/photos/8017956/pexels-photo-8017956.jpeg?auto=compress&cs=tinysrgb&w=300'
  }
];

export const getGridSize = (difficulty: Difficulty): { pairs: number } => {
  switch (difficulty) {
    case 'easy':
      return { pairs: 6 };
    case 'medium':
      return { pairs: 8 };
    case 'hard':
      return { pairs: 15 };
  }
};

export const generateCards = (difficulty: Difficulty): Card[] => {
  const { pairs } = getGridSize(difficulty);
  const selectedCharacters = marvelCharacters
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