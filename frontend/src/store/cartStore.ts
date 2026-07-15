import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface CartItem {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
  quantity: number;
}

interface CartStore {
  cart: CartItem[];

  addToCart: (product: CartItem) => void;

  removeFromCart: (id: number) => void;

  increaseQuantity: (id: number) => void;

  decreaseQuantity: (id: number) => void;

  clearCart: () => void;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      cart: [],

      addToCart: (product) => {
        const existing = get().cart.find(
          (item) => item.id === product.id
        );

        if (existing) {
          set({
            cart: get().cart.map((item) =>
              item.id === product.id
                ? {
                    ...item,
                    quantity: item.quantity + 1,
                  }
                : item
            ),
          });
        } else {
          set({
            cart: [
              ...get().cart,
              {
                ...product,
                quantity: 1,
              },
            ],
          });
        }
      },

      removeFromCart: (id) =>
        set({
          cart: get().cart.filter(
            (item) => item.id !== id
          ),
        }),

      increaseQuantity: (id) =>
        set({
          cart: get().cart.map((item) =>
            item.id === id
              ? {
                  ...item,
                  quantity: item.quantity + 1,
                }
              : item
          ),
        }),

      decreaseQuantity: (id) =>
        set({
          cart: get().cart
            .map((item) =>
              item.id === id
                ? {
                    ...item,
                    quantity: item.quantity - 1,
                  }
                : item
            )
            .filter((item) => item.quantity > 0),
        }),

      clearCart: () =>
        set({
          cart: [],
        }),
    }),
    {
      name: 'cart-storage',
    }
  )
);