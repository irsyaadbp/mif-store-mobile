import '@/global.css';

import { NAV_THEME } from '@/lib/theme';
import { ThemeProvider } from '@react-navigation/native';
import { PortalHost } from '@rn-primitives/portal';
import { AuthProvider } from '@/context/AuthContext';
import { CartProvider } from '@/context/CartContext';
import { Stack, router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useColorScheme } from 'nativewind';
import { Pressable } from 'react-native';
import { ArrowLeft } from 'lucide-react-native';

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

import { SafeAreaProvider } from 'react-native-safe-area-context';

import {
  useFonts,
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
  Inter_800ExtraBold,
} from '@expo-google-fonts/inter';
import * as SplashScreen from 'expo-splash-screen';
import React, { useEffect } from 'react';
import { ToastProvider } from '@/context/ToastContext';
import { ToastContainer } from '@/components/ui/toast';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const { colorScheme } = useColorScheme();
  const [interLoaded, interError] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
    Inter_800ExtraBold,
  });

  useEffect(() => {
    if (interLoaded || interError) {
      SplashScreen.hideAsync();
    }
  }, [interLoaded, interError]);

  if (!interLoaded && !interError) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <ThemeProvider value={NAV_THEME[colorScheme ?? 'light']}>
        <AuthProvider>
          <ToastProvider>
            <CartProvider>
              <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
            <Stack>
              <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
              <Stack.Screen name="checkout" options={{ headerShown: false }} />
              <Stack.Screen name="product-details/[id]" options={{ headerShown: false }} />
              <Stack.Screen name="checkout-success" options={{ headerShown: false }} />
              <Stack.Screen 
                name="login" 
                options={{ 
                  headerShown: true,
                  headerTransparent: true,
                  headerTitle: '',
                  headerLeft: () => (
                    <Pressable onPress={() => router.replace('/(tabs)')} className="ml-4 h-10 w-10 items-center justify-center rounded-full bg-background/80 shadow-sm border border-border">
                      <ArrowLeft size={24} color={colorScheme === 'dark' ? '#fff' : '#000'} />
                    </Pressable>
                  ),
                }} 
              />
              <Stack.Screen 
                name="register" 
                options={{ 
                  headerShown: true,
                  headerTransparent: true,
                  headerTitle: '',
                  headerLeft: () => (
                    <Pressable onPress={() => router.back()} className="ml-4 h-10 w-10 items-center justify-center rounded-full bg-background/80 shadow-sm border border-border">
                      <ArrowLeft size={24} color={colorScheme === 'dark' ? '#fff' : '#000'} />
                    </Pressable>
                  ),
                }} 
              />
              <Stack.Screen 
                name="forgot-password" 
                options={{ 
                  headerShown: true,
                  headerTransparent: true,
                  headerTitle: '',
                  headerLeft: () => (
                    <Pressable onPress={() => router.back()} className="ml-4 h-10 w-10 items-center justify-center rounded-full bg-background/80 shadow-sm border border-border">
                      <ArrowLeft size={24} color={colorScheme === 'dark' ? '#fff' : '#000'} />
                    </Pressable>
                  ),
                }} 
              />
            </Stack>
            <PortalHost />
            <ToastContainer />
          </CartProvider>
        </ToastProvider>
        </AuthProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
