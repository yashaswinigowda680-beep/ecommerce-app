import { create } from 'zustand';
import axios from 'axios';

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  thumbnail: string;
}

interface ProductStore {
  products: Product[];
  loading: boolean;
  fetchProducts: () => Promise<void>;
}

export const useProductStore = create<ProductStore>((set) => ({
  products: [],
  loading: false,

  fetchProducts: async () => {
    set({ loading: true });

    try {
      const response = await axios.get(
        'https://dummyjson.com/products'
      );

      set({
        products: response.data.products,
        loading: false,
      });
    } catch (error) {
      console.error(error);
      set({ loading: false });
    }
  },
}));