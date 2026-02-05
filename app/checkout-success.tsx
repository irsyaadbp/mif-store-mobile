import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { router } from 'expo-router';
import { Check, ShoppingBag } from 'lucide-react-native';
import React from 'react';
import { View } from 'react-native';

export default function CheckoutSuccessScreen() {
  return (
    <View className="flex-1 bg-white items-center justify-center p-6">
      {/* Success Icon */}
      <View className="mb-8 h-32 w-32 items-center justify-center rounded-full bg-green-100">
        <Check size={64} color="#22c55e" strokeWidth={3} />
      </View>

      {/* Content */}
      <View className="items-center gap-2 mb-12">
        <Text className="text-3xl font-bold text-foreground text-center">
          Pembayaran Berhasil!
        </Text>
        <Text className="text-center text-muted-foreground text-lg px-4">
          Terima kasih telah berbelanja di MIF Store. Pesananmu sedang diproses.
        </Text>
      </View>

      {/* Action Buttons */}
      <View className="w-full gap-4">
        <Button
          className="h-14 w-full rounded-2xl"
          onPress={() => router.replace('/(tabs)')}>
          <Text className="text-lg font-bold text-white">Kembali ke Beranda</Text>
        </Button>
        <Button
          variant="outline"
          className="h-14 w-full rounded-2xl border-secondary"
          onPress={() => router.replace('/(tabs)/produk')}>
          <Text className="text-lg font-bold text-secondary">Belanja Lagi</Text>
        </Button>
      </View>
    </View>
  );
}
