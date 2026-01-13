import type { CartApiResponse } from '../api/cart';

export const mockCart: CartApiResponse = {
  id: 'mock-cart-id',
  total_price: 320,
  items: [
    {
      id: 1,
      wine_id: 1,
      wine_name: 'Chardonnay',
      wine_price: '120',
      quantity: 1,
      subtotal: 120,
    },
    {
      id: 2,
      wine_id: 2,
      wine_name: 'Merlot',
      wine_price: '200',
      quantity: 1,
      subtotal: 200,
    },
  ],
};
