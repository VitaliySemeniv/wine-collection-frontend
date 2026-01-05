import { createContext, useContext, useEffect, useState } from 'react';
import { Loader } from '../components/Loader';
import { mockProducts } from '../mocks/products';
import type { Product } from '../../../types/Product';

export type CartItem = {
  itemId: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
  category: string;
};

type CartContextType = {
  cart: CartItem[];
  addToCart: (productId: number, quantity?: number) => Promise<void>;
  removeFromCart: (productId: number) => Promise<void>;
  changeQuantity: (productId: number, quantity: number) => Promise<void>;
  clearCart: () => Promise<void>;
  getTotalCount: () => number;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

const mapProductToCartItem = (product: Product, quantity: number): CartItem => ({
  itemId: product.id,
  name: product.name,
  price: product.price,
  image: product.image,
  category: product.category,
  quantity,
});

const mockCart: CartItem[] = [
  mapProductToCartItem(mockProducts[0], 2),
  mapProductToCartItem(mockProducts[1], 1),
];

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setCart(mockCart);
    setLoading(false);
  }, []);

  const addToCart = async (productId: number, quantity = 1) => {
    const product = mockProducts.find((p) => p.id === productId);
    if (!product) return;

    setCart((prev) => {
      const existing = prev.find((item) => item.itemId === productId);

      if (existing) {
        return prev.map((item) =>
          item.itemId === productId ? { ...item, quantity: item.quantity + quantity } : item,
        );
      }

      return [...prev, mapProductToCartItem(product, quantity)];
    });
  };

  const removeFromCart = async (productId: number) => {
    setCart((prev) => prev.filter((item) => item.itemId !== productId));
  };

  const changeQuantity = async (productId: number, quantity: number) => {
    if (quantity < 1) return;

    setCart((prev) =>
      prev.map((item) => (item.itemId === productId ? { ...item, quantity } : item)),
    );
  };

  const clearCart = async () => {
    setCart([]);
  };

  const getTotalCount = () => cart.reduce((sum, item) => sum + item.quantity, 0);

  if (loading) return <Loader />;

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        changeQuantity,
        clearCart,
        getTotalCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useCart = () => {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }

  return context;
};
