import { DarkTheme, DefaultTheme, Stack, ThemeProvider } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useColorScheme } from 'react-native';

import { AnimatedSplashOverlay } from '@/components/animated-icon';
import { CartProvider } from '@/context/CartContext';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <CartProvider>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <AnimatedSplashOverlay />
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="index" />
          <Stack.Screen name="login" />
          <Stack.Screen name="registro" options={{ headerShown: true, title: 'Crear Cuenta' }} />
          <Stack.Screen name="productos" />
          <Stack.Screen name="carrito" />
          <Stack.Screen name="explore" />
          <Stack.Screen name="perfil" options={{ headerShown: true, title: 'Mi Perfil' }} />
          <Stack.Screen name="home" options={{ headerShown: false }} />
        </Stack>
      </ThemeProvider>
    </CartProvider>
  );
}