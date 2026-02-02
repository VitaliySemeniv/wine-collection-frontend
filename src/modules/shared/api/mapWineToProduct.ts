import type { Product } from '../../../types/Product';
import type { WineApi, WineListItemApi } from '../../../types/WineApi';

export const mapWineListItemToProduct = (wine: WineListItemApi): Product => ({
  id: wine.id,
  name: wine.name,
  volume: Number(wine.volume),
  description: '',
  image: wine.image ?? '/mock-images/prestige-chianti-docg.png',
  price: Number(wine.price),

  category: 'classic',
  type: 'red',
  country: '',
  mood: 'romantic',
  purpose: 'celebration',

  inStock: true,
});

export const mapWineToProduct = (wine: WineApi): Product => ({
  id: wine.id,
  name: wine.name,
  volume: Number(wine.volume),
  description: wine.description ?? '',
  image: wine.image ?? '/mock-images/prestige-chianti-docg.png',
  price: Number(wine.price),

  category: wine.category?.name?.toLowerCase() ?? '',

  type: wine.wine_type?.name?.toLowerCase() ?? '',

  country: wine.country?.name ?? '',

  inStock: wine.in_stock,

  mood: wine.moods?.[0]?.name?.toLowerCase() ?? '',

  purpose: wine.purpose?.name?.toLowerCase()?.replace(/\s+/g, ' ') ?? '',
});
