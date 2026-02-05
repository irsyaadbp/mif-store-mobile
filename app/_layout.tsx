import '@/global.css';

import { NAV_THEME } from '@/lib/theme';
import { ThemeProvider } from '@react-navigation/native';
import { PortalHost } from '@rn-primitives/portal';
import { CartProvider } from '@/context/CartContext';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useColorScheme } from 'nativewind';

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
        <ToastProvider>
          <CartProvider>
            <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
            <Stack>
              <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
              <Stack.Screen name="checkout" options={{ headerShown: false }} />
              <Stack.Screen name="product-details/[id]" options={{ headerShown: false }} />
              <Stack.Screen name="login" options={{ headerShown: false }} />
              <Stack.Screen name="register" options={{ headerShown: false }} />
              <Stack.Screen name="forgot-password" options={{ headerShown: false }} />
            </Stack>
            <PortalHost />
            <ToastContainer />
          </CartProvider>
        </ToastProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
