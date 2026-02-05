import { Tabs } from 'expo-router';
import { Home, Package, ShoppingCart, User } from 'lucide-react-native';
import { Icon } from '@/components/ui/icon';
import { useColorScheme } from 'nativewind';
import { NAV_THEME } from '@/lib/theme';
import { useCart } from '@/context/CartContext';

export default function TabLayout() {
  const { colorScheme } = useColorScheme();
  const { cartItems } = useCart();
  
  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <Tabs
      screenOptions={{
        headerTitle: '🦊MIF Store',
        headerTitleAlign: 'center',
        tabBarActiveTintColor: NAV_THEME[colorScheme ?? 'light']?.colors?.primary,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Beranda',
          tabBarIcon: ({ color }) => <Icon as={Home} color={color} />,
        }}
      />
      <Tabs.Screen
        name="produk"
        options={{
          title: 'Produk',
          tabBarIcon: ({ color }) => <Icon as={Package} color={color} />,
        }}
      />
      <Tabs.Screen
        name="keranjang"
        options={{
          title: 'Keranjang',
          tabBarIcon: ({ color }) => <Icon as={ShoppingCart} color={color} />,
          tabBarBadge: totalItems > 0 ? totalItems : undefined,
          tabBarBadgeStyle: {
            backgroundColor: NAV_THEME[colorScheme ?? 'light']?.colors?.primary,
            color: 'white',
            fontSize: 10,
          }
        }}
      />
      <Tabs.Screen
        name="akun"
        options={{
          title: 'Akun',
          tabBarIcon: ({ color }) => <Icon as={User} color={color} />,
        }}
      />
    </Tabs>
  );
}
