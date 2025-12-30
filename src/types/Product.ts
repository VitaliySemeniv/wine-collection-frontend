import type { Category } from './Category';
import type { WineMood } from './WineMood';
import type { WineType } from './WineType';

export type Product = {
  id: number;
  name: string;
  volume: number;
  description: string;
  image: string;
  price: number;
  category: Category;
  type: WineType;
  country: string;
  inStock: boolean;
  mood: WineMood;
};
