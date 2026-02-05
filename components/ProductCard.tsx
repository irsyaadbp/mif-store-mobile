import React from 'react';
import { View, Image, Dimensions } from 'react-native';
import { Text } from '@/components/ui/text';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

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
  variant?: 'full' | 'horizontal' | 'grid';
  className?: string;
}

const { width } = Dimensions.get('window');

export function ProductCard({ product, variant = 'full', className }: ProductCardProps) {
  const formattedPrice = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(product.price);

  // Horizontal variant for the horizontal scroll section
  if (variant === 'horizontal') {
    return (
      <View 
        className={cn("overflow-hidden rounded-3xl border border-border bg-white shadow-sm", className)}
        style={{ width: width * 0.7 }}
      >
        <View className="h-40 w-full bg-muted">
          <Image source={{ uri: product.imageUrl }} className="h-full w-full" resizeMode="cover" />
        </View>
        <View className="p-4 gap-1">
          <Text className="text-lg font-bold text-foreground" numberOfLines={1}>
            {product.name}
          </Text>
          <Text className="text-base text-primary font-inter-semibold">
            {formattedPrice.replace('Rp', 'Rp ')}
          </Text>
        </View>
      </View>
    );
  }

  // Grid variant for the 2-column grid section
  if (variant === 'grid') {
    return (
      <View className={cn("overflow-hidden rounded-3xl border border-border bg-white shadow-sm", className)}>
        <View className="h-32 w-full bg-muted">
          <Image source={{ uri: product.imageUrl }} className="h-full w-full" resizeMode="cover" />
        </View>
        <View className="p-3 gap-2">
          <View>
            <Text className="text-base font-bold text-foreground" numberOfLines={1}>
              {product.name}
            </Text>
            <Text className="text-sm text-primary font-inter-semibold">
              {formattedPrice.replace('Rp', 'Rp ')}
            </Text>
          </View>
          
          {/* Vertical Buttons for Grid */}
          <View className="gap-2 mt-1">
            <Button variant="outline" size="sm" className="h-9 rounded-xl border-secondary">
              <Text className="text-xs font-bold text-secondary">Detail</Text>
            </Button>
            <Button variant="default" size="sm" className="h-9 rounded-xl">
              <Text className="text-xs font-bold">+ Keranjang</Text>
            </Button>
          </View>
        </View>
      </View>
    );
  }

  // Default Full-width variant
  return (
    <View className={cn("mb-4 overflow-hidden rounded-3xl border border-border bg-white shadow-sm", className)}>
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

        {/* Responsive Action Buttons: Column on mobile (stacked) */}
        <View className="flex-col gap-2 pt-2">
          <Button className="h-12 w-full rounded-2xl border-secondary" variant="outline">
            <Text className="font-bold text-secondary">Lihat Detail</Text>
          </Button>
          <Button className="h-12 w-full rounded-2xl" variant="default">
            <Text className="font-bold">+ Keranjang</Text>
          </Button>
        </View>
      </View>
    </View>
  );
}
