import type { CartApiResponse } from '../api/cart';
import { mockCart } from './cart';

const delay = (ms = 300) => new Promise((r) => setTimeout(r, ms));

export const getCartMock = async (): Promise<CartApiResponse> => {
  await delay();
  return mockCart;
};

export const addToCartMock = async (wine: number, quantity = 1): Promise<CartApiResponse> => {
  await delay();

  const existing = mockCart.items.find((i) => i.wine_id === wine);

  if (existing) {
    existing.quantity += quantity;
    existing.subtotal = Number(existing.wine_price) * existing.quantity;
  } else {
    mockCart.items.push({
      id: Date.now(),
      wine_id: wine,
      wine_name: `Wine #${wine}`,
      wine_price: '150',
      quantity,
      subtotal: 150 * quantity,
    });
  }

  mockCart.total_price = mockCart.items.reduce((sum, i) => sum + i.subtotal, 0);

  return mockCart;
};

export const updateQuantityMock = async (
  wine_id: number,
  quantity: number,
): Promise<CartApiResponse> => {
  await delay();

  const item = mockCart.items.find((i) => i.wine_id === wine_id);
  if (item) {
    item.quantity = quantity;
    item.subtotal = Number(item.wine_price) * quantity;
  }

  mockCart.total_price = mockCart.items.reduce((sum, i) => sum + i.subtotal, 0);

  return mockCart;
};

export const removeOneMock = async (wine_id: number): Promise<CartApiResponse> => {
  await delay();

  mockCart.items = mockCart.items.filter((i) => i.wine_id !== wine_id);

  mockCart.total_price = mockCart.items.reduce((sum, i) => sum + i.subtotal, 0);

  return mockCart;
};

export const clearCartMock = async (): Promise<void> => {
  await delay();
  mockCart.items = [];
  mockCart.total_price = 0;
};
