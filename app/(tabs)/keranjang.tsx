import React, { useState, useMemo } from 'react';
import { View, ScrollView } from 'react-native';
import { Text } from '@/components/ui/text';
import { Button } from '@/components/ui/button';
import { PageTitle } from '@/components/PageTitle';
import { CartItem } from '@/components/CartItem';
import { router } from 'expo-router';

const INITIAL_CART = [
  {
    product: {
      _id: { $oid: '6963ff5c605db1b0f8e6a570' },
      name: 'Vidio Premium',
      price: 20000,
      imageUrl: 'https://images.seeklogo.com/logo-png/39/2/vidio-logo-png_seeklogo-395091.png',
    },
    quantity: 3,
  },
  {
    product: {
      _id: { $oid: '6963ff5c605db1b0f8e6a571120' },
      name: 'Vidio Premium',
      price: 20000,
      imageUrl: 'https://images.seeklogo.com/logo-png/39/2/vidio-logo-png_seeklogo-395091.png',
    },
    quantity: 3,
  },
  {
    product: {
      _id: { $oid: '6963ff5c605db1b0f8e6a5670' },
      name: 'Vidio Premium',
      price: 20000,
      imageUrl: 'https://images.seeklogo.com/logo-png/39/2/vidio-logo-png_seeklogo-395091.png',
    },
    quantity: 3,
  },
  {
    product: {
      _id: { $oid: '6963ff5c605db1b0f8e6a5750' },
      name: 'Vidio Premium',
      price: 20000,
      imageUrl: 'https://images.seeklogo.com/logo-png/39/2/vidio-logo-png_seeklogo-395091.png',
    },
    quantity: 3,
  },
  {
    product: {
      _id: { $oid: '6963ff5c605db1b0f8e6a5740' },
      name: 'Vidio Premium',
      price: 20000,
      imageUrl: 'https://images.seeklogo.com/logo-png/39/2/vidio-logo-png_seeklogo-395091.png',
    },
    quantity: 3,
  },
  {
    product: {
      _id: { $oid: '6963ff5c605db1b0f8e6a5703' },
      name: 'Vidio Premium',
      price: 20000,
      imageUrl: 'https://images.seeklogo.com/logo-png/39/2/vidio-logo-png_seeklogo-395091.png',
    },
    quantity: 3,
  },
  {
    product: {
      _id: { $oid: '6963ff5c605db1b0f8e6a5702' },
      name: 'Vidio Premium',
      price: 20000,
      imageUrl: 'https://images.seeklogo.com/logo-png/39/2/vidio-logo-png_seeklogo-395091.png',
    },
    quantity: 3,
  },
  {
    product: {
      _id: { $oid: '6963ff5c605db1b0f8e6a5701' },
      name: 'Vidio Premium',
      price: 20000,
      imageUrl: 'https://images.seeklogo.com/logo-png/39/2/vidio-logo-png_seeklogo-395091.png',
    },
    quantity: 3,
  },
];

export default function KeranjangScreen() {
  const [cart, setCart] = useState(INITIAL_CART);

  const total = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  }, [cart]);

  const updateQuantity = (productId: string, newQty: number) => {
    setCart((prev) =>
      prev.map((item) =>
        item.product._id.$oid === productId ? { ...item, quantity: newQty } : item
      )
    );
  };

  const removeItem = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product._id.$oid !== productId));
  };

  const formattedTotal = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(total);

  return (
    <View className="flex-1 bg-background">
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="p-4 pb-32 pt-10">
          <PageTitle title="Keranjang" subtitle="Ringkasan produk yang akan kamu checkout." />

          <View className="pb-12">
            {cart.map((item) => (
              <CartItem
                key={item.product._id.$oid}
                product={item.product as any}
                quantity={item.quantity}
                onUpdateQuantity={(q: number) => updateQuantity(item.product._id.$oid, q)}
                onRemove={() => removeItem(item.product._id.$oid)}
              />
            ))}

            {cart.length === 0 && (
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
      {cart.length > 0 && (
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
              onPress={() => router.push('/checkout')}>
              <Text className="font-bold text-primary-foreground">Checkout</Text>
            </Button>
          </View>
          <Text className="text-center text-xs text-muted-foreground opacity-40 mt-4">
            Login diperlukan saat melakukan pembayaran
          </Text>
        </View>
      )}
    </View>
  );
}
