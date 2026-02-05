import { $fetch } from './$fetch';

export interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  imageUrl: string;
  category: string;
}

const BASE_PATH = '/api/products';
export const ProductService = {
  getAllProducts: async (): Promise<Product[]> => {
    return await $fetch(BASE_PATH);
  },

  getProductById: async (id: string): Promise<Product> => {
    return await $fetch(`${BASE_PATH}/${id}`);
  },

  createProduct: async (productData: Partial<Product>): Promise<Product> => {
    return await $fetch(BASE_PATH, {
      method: 'POST',
      body: productData,
    });
  },

  updateProduct: async (id: string, productData: Partial<Product>): Promise<Product> => {
    return await $fetch(`${BASE_PATH}/${id}`, {
      method: 'PUT',
      body: productData,
    });
  },

  deleteProduct: async (id: string): Promise<{ success: boolean; message?: string }> => {
    return await $fetch(`${BASE_PATH}/${id}`, {
      method: 'DELETE',
    });
  },
};
