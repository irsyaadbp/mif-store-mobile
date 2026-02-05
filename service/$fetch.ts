import AsyncStorage from '@react-native-async-storage/async-storage';
import Constants from 'expo-constants';

// Dynamically determine the machine IP for development
const hostUri = Constants.expoConfig?.hostUri?.split(':')[0];
const BASE_URL = process.env.EXPO_PUBLIC_API_URL ? process.env.EXPO_PUBLIC_API_URL : `http://${hostUri}:5001`;

interface FetchOptions extends RequestInit {
  body?: any;
}

/**
 * Reusable fetch utility with automatic token injection and base URL.
 * 
 * Usage:
 * const data = await $fetch('/endpoint', { 
 *   method: 'POST', 
 *   body: { key: 'value' } 
 * });
 */
export async function $fetch(url: string, options: FetchOptions = {}) {
  const fullUrl = url.startsWith('http') ? url : `${BASE_URL}${url.startsWith('/') ? '' : '/'}${url}`;
  
  // Get token from AsyncStorage
  const token = await AsyncStorage.getItem('@mif_store_token');
  
  const headers = new Headers(options.headers || {});
  
  // Add JSON content type if body is present and not already set
  if (options.body && !headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json');
  }
  
  // Add Authorization header if token exists
  if (token && !headers.has('Authorization')) {
    headers.set('Authorization', `Bearer ${token}`);
  }

  const config: RequestInit = {
    ...options,
    headers,
    body: options.body && typeof options.body !== 'string' 
      ? JSON.stringify(options.body) 
      : options.body,
  };

  try {
    const response = await fetch(fullUrl, config);
    
    // Handle non-2xx responses
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `Fetch failed: ${response.status}`);
    }

    // Parse JSON response
    return await response.json();
  } catch (error) {
    console.error('API Fetch Error:', error);
    throw error;
  }
}
