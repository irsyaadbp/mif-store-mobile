import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { router, useLocalSearchParams } from 'expo-router';
import { ArrowLeft, Minus, Plus } from 'lucide-react-native';
import * as React from 'react';
import { View, ScrollView, Image, Pressable, Dimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

const DUMMY_PRODUCTS = [
  // ... (keep dummy products)
  {
    "_id": { "$oid": "6963fca6605db1b0f8e6a553" },
    "name": "Netflix Premium",
    "description": "Nonton film 4K sepuasnya tanpa iklan dengan kualitas terbaik. Nikmati ribuan film dan serial TV populer di seluruh perangkat Anda.",
    "price": 35000,
    "imageUrl": "https://images.ctfassets.net/4cd45et68cgf/Rx83JoRDMkYNlMC9MKzcB/2b14d5a59fc3937afd3f03191e19502d/Netflix-Symbol.png?w=700&h=456",
    "category": "Streaming & Hiburan"
  },
  {
    "_id": { "$oid": "6963ff5c605db1b0f8e6a570" },
    "name": "Vidio Premium",
    "description": "Akses konten eksklusif Vidio, live sports, dan film Indonesia terbaik kapan saja dan di mana saja.",
    "price": 20000,
    "imageUrl": "https://images.seeklogo.com/logo-png/39/2/vidio-logo-png_seeklogo-395091.png",
    "category": "Streaming & Hiburan"
  },
  {
    "_id": { "$oid": "6963fdb2605db1b0f8e6a55c" },
    "name": "Spotify Premium",
    "description": "Dengarkan musik tanpa batas, offline, dan tanpa jeda iklan di Spotify. Rasakan kualitas suara premium.",
    "price": 25000,
    "imageUrl": "https://storage.googleapis.com/pr-newsroom-wp/1/2023/05/Spotify_Primary_Logo_RGB_Green.png",
    "category": "Streaming & Hiburan"
  }
];

export default function ProductDetailScreen() {
  const { id } = useLocalSearchParams();
  const [qty, setQty] = React.useState(1);
  const insets = useSafeAreaInsets();
  
  // Find product from dummy data based on ID
  const product = DUMMY_PRODUCTS.find(p => p._id.$oid === id) || DUMMY_PRODUCTS[0];

  const formattedPrice = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(product.price);

  return (
    <View className="flex-1 bg-white">
      {/* Custom Header */}
      <View 
        style={{ paddingTop: insets.top }}
        className="px-4 pb-4 absolute top-0 left-0 right-0 z-10 flex-row items-center"
      >
        <Pressable 
          className="h-10 w-10 rounded-full bg-white/90 items-center justify-center shadow-md border border-border/10 active:opacity-50"
          onPress={() => router.back()}
        >
          <ArrowLeft size={24} color="#000" />
        </Pressable>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Product Image */}
        <View className="bg-muted" style={{ height: width }}>
          <Image source={{ uri: product.imageUrl }} className="h-full w-full" resizeMode="contain" />
        </View>

        {/* Product Info */}
        <View className="p-6 gap-4 pb-48">
          <View className="gap-2">
            <Text className="text-3xl font-inter-bold text-foreground">
              {product.name}
            </Text>
            <Text className="text-2xl font-inter-bold text-primary">
              {formattedPrice.replace('Rp', 'Rp ')}
            </Text>
            <View className="h-[1px] bg-border my-2" />
            <Text className="text-base text-muted-foreground leading-6">
              {product.description}
            </Text>
          </View>
        </View>
      </ScrollView>

      {/* Sticky Footer for Quantity and Actions */}
      <View className="absolute bottom-0 left-0 right-0 bg-white border-t border-border p-6 shadow-2xl gap-6">
        {/* Quantity Selector Row */}
        <View className="flex-row items-center justify-between">
          <Text className="text-lg font-inter-bold text-foreground">Quantity</Text>
          <View className="flex-row items-center gap-1">
            <Pressable 
              className="h-10 w-10 rounded-xl border border-border items-center justify-center active:bg-muted"
              onPress={() => setQty(Math.max(1, qty - 1))}
            >
              <Minus size={20} color="#000" />
            </Pressable>
            
            <View className="h-10 px-6 rounded-xl border border-border items-center justify-center">
              <Text className="text-lg font-inter-bold">{qty}</Text>
            </View>

            <Pressable 
              className="h-10 w-10 rounded-xl border border-border items-center justify-center active:bg-muted"
              onPress={() => setQty(qty + 1)}
            >
              <Plus size={20} color="#000" />
            </Pressable>
          </View>
        </View>

        {/* Action Buttons Row */}
        <View className="flex-row gap-3">
          <Button 
            variant="outline" 
            className="h-14 flex-1 rounded-2xl border-secondary"
            onPress={() => {}}
          >
            <Text className="font-inter-bold text-secondary">+ Keranjang</Text>
          </Button>
          <Button 
            variant="default" 
            className="h-14 flex-1 rounded-2xl"
            onPress={() => {}}
          >
            <Text className="font-inter-bold text-primary-foreground">Beli Sekarang</Text>
          </Button>
        </View>
      </View>
    </View>
  );
}
