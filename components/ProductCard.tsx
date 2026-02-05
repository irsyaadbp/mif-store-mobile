import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { cn } from '@/lib/utils';
import { router } from 'expo-router';
import React from 'react';
import { View, Image, Dimensions, Pressable } from 'react-native';

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
      <Pressable 
        onPress={() => {
          // @ts-ignore - Dynamic route indexing lag
          router.push({ pathname: "/product-details/[id]", params: { id: product._id.$oid } });
        }}
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
      </Pressable>
    );
  }

  // Grid variant for the 2-column grid section
  if (variant === 'grid') {
    return (
      <Pressable 
        onPress={() => {
          // @ts-ignore - Dynamic route indexing lag
          router.push({ pathname: "/product-details/[id]", params: { id: product._id.$oid } });
        }}
        className={cn("overflow-hidden rounded-3xl border border-border bg-white shadow-sm", className)}
      >
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
            <Button 
              variant="outline" 
              size="sm" 
              className="h-9 rounded-xl border-secondary"
              // Detail button also navigates but doesn't block the card tap if pressed directly
              onPress={() => {
                // @ts-ignore - Dynamic route indexing lag
                router.push({ pathname: "/product-details/[id]", params: { id: product._id.$oid } });
              }}
            >
              <Text className="text-xs font-bold text-secondary">Detail</Text>
            </Button>
            <Button variant="default" size="sm" className="h-9 rounded-xl" onPress={() => {}}>
              <Text className="text-xs font-bold">+ Keranjang</Text>
            </Button>
          </View>
        </View>
      </Pressable>
    );
  }

  // Default Full-width variant
  return (
    <Pressable 
      onPress={() => {
        // @ts-ignore - Dynamic route indexing lag
        router.push({ pathname: "/product-details/[id]", params: { id: product._id.$oid } });
      }}
      className={cn("mb-4 overflow-hidden rounded-3xl border border-border bg-white shadow-sm", className)}
    >
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
          <Button 
            className="h-12 w-full rounded-2xl border-secondary" 
            variant="outline"
            onPress={() => {
              // @ts-ignore - Dynamic route indexing lag
              router.push({ pathname: "/product-details/[id]", params: { id: product._id.$oid } });
            }}
          >
            <Text className="font-bold text-secondary">Lihat Detail</Text>
          </Button>
          <Button className="h-12 w-full rounded-2xl" variant="default" onPress={() => {}}>
            <Text className="font-bold">+ Keranjang</Text>
          </Button>
        </View>
      </View>
    </Pressable>
  );
}
