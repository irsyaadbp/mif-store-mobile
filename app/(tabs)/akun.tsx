import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { router } from 'expo-router';
import { View, ScrollView } from 'react-native';
import { useAuth } from '@/context/AuthContext';
import { useCart } from '@/context/CartContext';
import { LogOut } from 'lucide-react-native';
import React from 'react';

export default function AkunScreen() {
  const { user, logout, isAuthenticated, isLoading } = useAuth();
  const { clearCart } = useCart();

  React.useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.replace('/login');
    }
  }, [isLoading, isAuthenticated]);

  const handleLogout = async () => {
    clearCart();
    await logout();
    router.replace('/login');
  };

  return (
    <ScrollView className="flex-1 bg-background" showsVerticalScrollIndicator={false}>
      <View className="p-4 pt-10">
        <View className="flex-1 items-center justify-center gap-8 py-10">
          {/* Avatar Placeholder */}
          <View className="h-28 w-28 items-center justify-center rounded-full border-4 border-white bg-orange-50 shadow-md">
            <Text className="text-4xl font-bold text-orange-400">
              {user?.fullname?.charAt(0) || '🦊'}
            </Text>
          </View>

          {isAuthenticated ? (
            <View className="w-full items-center px-6">
              {/* User Info Stack */}
              <View className="mb-10 items-center gap-1">
                <Text className="text-center font-inter-bold text-3xl text-foreground">
                  {user?.fullname}
                </Text>
                <Text className="text-center text-lg text-muted-foreground">{user?.email}</Text>
              </View>

              {/* Action Section */}
              <View className="w-full">
                <Button
                  variant="outline"
                  className="h-16 w-full rounded-2xl border-destructive/20 active:bg-destructive/10"
                  onPress={handleLogout}>
                  <LogOut size={22} color="#ef4444" className="mr-3" />
                  <Text className="text-lg font-bold text-destructive">Keluar Akun</Text>
                </Button>
              </View>
            </View>
          ) : (
            <View className="w-full items-center gap-8 px-6">
              <View className="items-center gap-3">
                <Text className="text-center font-inter-bold text-2xl text-foreground">
                  Selamat Datang
                </Text>
                <Text className="text-center text-muted-foreground">
                  Masuk untuk melihat profil dan pesananmu.
                </Text>
              </View>

              <Button className="h-16 w-full rounded-2xl" onPress={() => router.push('/login')}>
                <Text className="text-lg font-bold text-white">Masuk ke Akun</Text>
              </Button>
            </View>
          )}
        </View>
      </View>
    </ScrollView>
  );
}
