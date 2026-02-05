import React from 'react';
import { View, Image } from 'react-native';
import { Text } from '@/components/ui/text';
import { Button } from '@/components/ui/button';

interface Product {
  _id: { $oid: string };
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category: string;
}

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const formattedPrice = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(product.price);

  return (
    <View className="mb-4 overflow-hidden rounded-3xl border border-border bg-white shadow-sm">
      {/* Image Container */}
      <View className="relative h-48 w-full bg-muted">
        <Image source={{ uri: product.imageUrl }} className="h-full w-full" resizeMode="cover" />
      </View>

      {/* Content Container */}
      <View className="gap-3 p-4">
        <View>
          <Text className="text-xl font-bold text-foreground">{product.name}</Text>
          <Text className="text-lg text-muted-foreground">
            {formattedPrice.replace('Rp', 'Rp ')}
          </Text>
        </View>

        {/* Action Buttons */}
        <View className="flex-row gap-3 pt-2">
          <Button className="h-14 flex-1 rounded-2xl border-secondary" variant="outline">
            <Text className="font-bold text-secondary">Lihat Detail</Text>
          </Button>
          <Button className="h-14 flex-1 rounded-2xl" variant="default">
            <Text className="font-bold">+ Keranjang</Text>
          </Button>
        </View>
      </View>
    </View>
  );
}
