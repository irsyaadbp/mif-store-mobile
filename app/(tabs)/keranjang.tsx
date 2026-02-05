import React, { useState, useMemo } from 'react';
import { View, ScrollView } from 'react-native';
import { Text } from '@/components/ui/text';
import { Button } from '@/components/ui/button';
import { PageTitle } from '@/components/PageTitle';
import { CartItem } from '@/components/CartItem';
import { router } from 'expo-router';

import { useCart } from '@/context/CartContext';

import { useAuth } from '@/context/AuthContext';

export default function KeranjangScreen() {
  const { cartItems, updateQuantity, removeFromCart, totalAmount } = useCart();
  const { isAuthenticated } = useAuth();

  const formattedTotal = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(totalAmount);

  return (
    <View className="flex-1 bg-background">
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="p-4 pb-32 pt-10">
          <PageTitle title="Keranjang" subtitle="Ringkasan produk yang akan kamu checkout." />

          <View className="pb-12">
            {cartItems.map((item) => (
              <CartItem
                key={item._id}
                product={item as any}
                quantity={item.quantity}
                onUpdateQuantity={(q: number) => updateQuantity(item._id, q)}
                onRemove={() => removeFromCart(item._id)}
              />
            ))}

            {cartItems.length === 0 && (
              <View className="items-center gap-4 py-20">
                <Text className="text-muted-foreground">Keranjangmu masih kosong.</Text>
                <Button variant="secondary" onPress={() => router.push('/produk')}>
                  <Text>Mulai Belanja</Text>
                </Button>
              </View>
            )}
          </View>
        </View>
      </ScrollView>

      {/* Sticky Footer */}
      {cartItems.length > 0 && (
        <View className="absolute bottom-0 left-0 right-0 border-t border-border bg-white px-6 py-4 shadow-2xl">
          <View className="mb-6 flex-row items-center justify-between">
            <Text className="text-xl font-bold text-foreground">Total</Text>
            <Text className="text-xl font-bold text-foreground">
              {formattedTotal.replace('Rp', 'Rp ')}
            </Text>
          </View>

          <View className="flex-row gap-4">
            <Button
              variant="outline"
              className="h-14 flex-1 rounded-2xl border-secondary"
              onPress={() => router.push('/produk')}>
              <Text className="font-bold text-secondary">Lanjut Belanja</Text>
            </Button>
            <Button
              variant="default"
              className="h-14 flex-1 rounded-2xl"
              onPress={() => {
                if (!isAuthenticated) {
                  router.push('/login?redirectTo=/checkout');
                } else {
                  router.push('/checkout');
                }
              }}>
              <Text className="font-bold text-primary-foreground">Checkout</Text>
            </Button>
          </View>
          {!isAuthenticated && (
            <Text className="mt-4 text-center text-xs text-muted-foreground opacity-40">
              Kamu akan diarahkan ke halaman login
            </Text>
          )}
        </View>
      )}
    </View>
  );
}
