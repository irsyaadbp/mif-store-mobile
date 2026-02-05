import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { useCart } from '@/context/CartContext';
import { useToast } from '@/context/ToastContext';
import { router, useLocalSearchParams } from 'expo-router';
import { ArrowLeft, CameraOff, Minus, Plus } from 'lucide-react-native';
import * as React from 'react';
import {
  View,
  ScrollView,
  Image,
  Pressable,
  Dimensions,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
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
  const [imgError, setImgError] = React.useState(false);

  const getProduct = React.useCallback(() => ProductService.getProductById(id as string), [id]);

  const {
    data: product,
    isLoading,
    execute,
  } = useAsyncFetch(getProduct, {
    onError: () => showToast('Gagal memuat detail produk', 'error'),
  });

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
        <Text className="text-center text-xl font-bold">Produk tidak ditemukan</Text>
        <Button
          variant="outline"
          className="mt-6 rounded-2xl border-secondary px-10"
          onPress={() => router.back()}>
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
        className="absolute left-0 right-0 top-0 z-10 flex-row items-center px-4 pb-4">
        <Pressable
          className="h-10 w-10 items-center justify-center rounded-full border border-border/10 bg-white/90 shadow-md active:opacity-50"
          onPress={() => router.back()}>
          <ArrowLeft size={24} color="#000" />
        </Pressable>
      </View>

      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={execute} colors={['#FF8C00']} />
        }>
        {/* Product Image */}
        <View className="items-center justify-center bg-muted" style={{ height: width }}>
          {imgError ? (
            <CameraOff size={64} color="#9ca3af" />
          ) : (
            <Image
              source={{
                uri: product.imageUrl,
                headers: {
                  Accept: 'image/*',
                  'User-Agent':
                    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
                },
              }}
              onError={() => setImgError(true)}
              className="h-full w-full"
              resizeMode="cover"
            />
          )}
        </View>

        {/* Product Info */}
        <View className="gap-4 p-6 pb-48">
          <View className="gap-2">
            <Text className="font-inter-bold text-3xl text-foreground">{product.name}</Text>
            <Text className="font-inter-bold text-2xl text-primary">
              {formattedPrice.replace('Rp', 'Rp ')}
            </Text>
            <View className="my-4 h-[1px] bg-border" />
            <Text className="font-inter-semibold text-lg text-foreground">Deskripsi</Text>
            <Text className="text-base leading-6 text-muted-foreground">{product.description}</Text>
          </View>
        </View>
      </ScrollView>

      {/* Sticky Footer for Quantity and Actions */}
      <View className="absolute bottom-0 left-0 right-0 gap-6 border-t border-border bg-white p-6 shadow-2xl">
        {/* Quantity Selector Row */}
        <View className="flex-row items-center justify-between">
          <Text className="font-inter-bold text-lg text-foreground">Kuantitas</Text>
          <View className="flex-row items-center gap-2">
            <Pressable
              className="h-10 w-10 items-center justify-center rounded-xl border border-border active:bg-muted"
              onPress={() => setQty(Math.max(1, qty - 1))}>
              <Minus size={20} color="#000" />
            </Pressable>

            <View className="h-10 min-w-[50px] items-center justify-center rounded-xl border border-border px-2">
              <Text className="font-inter-bold text-lg">{qty}</Text>
            </View>

            <Pressable
              className="h-10 w-10 items-center justify-center rounded-xl border border-border active:bg-muted"
              onPress={() => setQty(qty + 1)}>
              <Plus size={20} color="#000" />
            </Pressable>
          </View>
        </View>

        {/* Action Buttons Row */}
        <View className="flex-row gap-3">
          <Button
            variant="outline"
            className="h-14 flex-1 rounded-2xl border-secondary"
            onPress={handleAddToCart}>
            <Text className="font-inter-bold text-secondary">+ Keranjang</Text>
          </Button>
          <Button variant="default" className="h-14 flex-1 rounded-2xl" onPress={handleBuyNow}>
            <Text className="font-inter-bold text-primary-foreground">Beli Sekarang</Text>
          </Button>
        </View>
      </View>
    </View>
  );
}
