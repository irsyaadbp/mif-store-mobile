import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { useCart } from '@/context/CartContext';
import { useToast } from '@/context/ToastContext';
import { router, useLocalSearchParams } from 'expo-router';
import { ArrowLeft, Minus, Plus } from 'lucide-react-native';
import * as React from 'react';
import { View, ScrollView, Image, Pressable, Dimensions, ActivityIndicator, RefreshControl } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useAsyncFetch } from '@/hooks/useAsyncFetch';
import { ProductService } from '@/service/products';

const { width } = Dimensions.get('window');

export default function ProductDetailScreen() {
  const { id } = useLocalSearchParams();
  const [qty, setQty] = React.useState(1);
  const insets = useSafeAreaInsets();
  const { addToCart } = useCart();
  const { showToast } = useToast();
  
  const getProduct = React.useCallback(() => 
    ProductService.getProductById(id as string), 
  [id]);

  const { data: product, isLoading, execute } = useAsyncFetch(
    getProduct,
    {
      onError: () => showToast('Gagal memuat detail produk', 'error'),
    }
  );

  if (isLoading && !product) {
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <ActivityIndicator size="large" color="#FF8C00" />
        <Text className="mt-4 text-muted-foreground">Memuat detail produk...</Text>
      </View>
    );
  }

  if (!product) {
    return (
      <View className="flex-1 items-center justify-center bg-white p-6">
        <Text className="text-xl font-bold text-center">Produk tidak ditemukan</Text>
        <Button 
          variant="outline" 
          className="mt-6 rounded-2xl px-10 border-secondary"
          onPress={() => router.back()}
        >
          <Text className="font-bold text-secondary">Kembali</Text>
        </Button>
      </View>
    );
  }

  const formattedPrice = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(product.price);

  const handleAddToCart = () => {
    addToCart(product as any, qty);
    showToast('Berhasil menambahkan keranjang', 'success');
  };

  const handleBuyNow = () => {
    addToCart(product as any, qty);
    showToast('Berhasil menambahkan keranjang', 'success');
    router.push('/checkout');
  };

  return (
    <View className="flex-1 bg-white">
      {/* Header Back Button */}
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

      <ScrollView 
        className="flex-1" 
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={execute} colors={['#FF8C00']} />
        }
      >
        {/* Product Image */}
        <View className="bg-muted" style={{ height: width }}>
          <Image 
            source={{ 
              uri: product.imageUrl,
              headers: {
                Accept: 'image/*',
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
              }
            }} 
            className="h-full w-full" 
            resizeMode="cover" 
          />
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
            <View className="h-[1px] bg-border my-4" />
            <Text className="text-lg font-inter-semibold text-foreground">Deskripsi</Text>
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
          <Text className="text-lg font-inter-bold text-foreground">Kuantitas</Text>
          <View className="flex-row items-center gap-2">
            <Pressable 
              className="h-10 w-10 rounded-xl border border-border items-center justify-center active:bg-muted"
              onPress={() => setQty(Math.max(1, qty - 1))}
            >
              <Minus size={20} color="#000" />
            </Pressable>
            
            <View className="h-10 min-w-[50px] px-2 rounded-xl border border-border items-center justify-center">
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
            onPress={handleAddToCart}
          >
            <Text className="font-inter-bold text-secondary">+ Keranjang</Text>
          </Button>
          <Button 
            variant="default" 
            className="h-14 flex-1 rounded-2xl"
            onPress={handleBuyNow}
          >
            <Text className="font-inter-bold text-primary-foreground">Beli Sekarang</Text>
          </Button>
        </View>
      </View>
    </View>
  );
}
