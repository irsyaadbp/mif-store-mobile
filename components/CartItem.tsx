import React from 'react';
import { View, Image, Pressable } from 'react-native';
import { Text } from '@/components/ui/text';
import { Button } from '@/components/ui/button';
import { Minus, Plus, Trash2 } from 'lucide-react-native';
import { cn } from '@/lib/utils';

interface Product {
  _id: { $oid: string };
  name: string;
  price: number;
  imageUrl: string;
}

interface CartItemProps {
  product: Product;
  quantity: number;
  onUpdateQuantity: (newQty: number) => void;
  onRemove: () => void;
}

export function CartItem({ product, quantity, onUpdateQuantity, onRemove }: CartItemProps) {
  const formattedPrice = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(product.price * quantity);

  return (
    <View className="relative mb-4 flex-row items-center justify-between rounded-3xl border border-border bg-white p-4 shadow-sm">
      {/* Trash Icon at Top Right */}
      <Pressable 
        onPress={onRemove}
        className="absolute top-4 right-4 z-10 p-1 active:opacity-50"
      >
        <Trash2 size={20} color="#ef4444" />
      </Pressable>

      <View className="flex-row items-center flex-1 gap-4">
        {/* Image */}
        <View className="h-20 w-20 overflow-hidden rounded-2xl bg-muted">
          <Image source={{ uri: product.imageUrl }} className="h-full w-full" resizeMode="cover" />
        </View>

        {/* Details & Controls */}
        <View className="flex-1 gap-2 pr-8">
          <Text className="text-lg font-bold text-foreground" numberOfLines={1}>
            {product.name}
          </Text>
          
          <View className="flex-row items-center gap-3">
            <View className="flex-row items-center rounded-xl border border-border bg-muted/50">
              <Pressable 
                onPress={() => onUpdateQuantity(Math.max(1, quantity - 1))}
                className="p-2 active:opacity-50"
              >
                <Minus size={16} color="#000" />
              </Pressable>
              
              <Text className="w-8 text-center font-bold">{quantity}</Text>
              
              <Pressable 
                onPress={() => onUpdateQuantity(quantity + 1)}
                className="p-2 active:opacity-50"
              >
                <Plus size={16} color="#000" />
              </Pressable>
            </View>
          </View>
        </View>
      </View>

      {/* Price */}
      <View className="items-end justify-end mt-auto">
        <Text className="text-lg font-bold text-foreground">
          {formattedPrice.replace('Rp', 'Rp ')}
        </Text>
      </View>
    </View>
  );
}
