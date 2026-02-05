import AsyncStorage from '@react-native-async-storage/async-storage';
import { $fetch } from './$fetch';

export interface User {
  id: string;
  fullname: string;
  email: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

const BASE_PATH = '/api/auth';
const KEY_TOKEN = '@mif_store_token';
const KEY_USER = '@mif_store_user';

export const AuthService = {
  register: async (userData: any): Promise<AuthResponse> => {
    const response = await $fetch(`${BASE_PATH}/register`, {
      method: 'POST',
      body: userData,
    });

    if (response.token) {
      await AsyncStorage.setItem(KEY_TOKEN, response.token);
      await AsyncStorage.setItem(KEY_USER, JSON.stringify(response.user));
    }

    return response;
  },
  login: async (credentials: any): Promise<AuthResponse> => {
    const response = await $fetch(`${BASE_PATH}/login`, {
      method: 'POST',
      body: credentials,
    });

    if (response.token) {
      await AsyncStorage.setItem(KEY_TOKEN, response.token);
      await AsyncStorage.setItem(KEY_USER, JSON.stringify(response.user));
    }

    return response;
  },

  logout: async (): Promise<void> => {
    await AsyncStorage.removeItem(KEY_TOKEN);
    await AsyncStorage.removeItem(KEY_USER);
  },

  getCurrentUser: async (): Promise<User | null> => {
    const userJson = await AsyncStorage.getItem(KEY_USER);
    return userJson ? JSON.parse(userJson) : null;
  },
};
