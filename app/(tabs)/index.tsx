import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { router } from 'expo-router';
import * as React from 'react';
import { View, ScrollView, ActivityIndicator, RefreshControl } from 'react-native';
import { PageTitle } from '@/components/PageTitle';
import { SectionTitle } from '@/components/SectionTitle';
import { ProductCard } from '@/components/ProductCard';
import { useAsyncFetch } from '@/hooks/useAsyncFetch';
import { ProductService } from '@/service/products';
import { useToast } from '@/context/ToastContext';

export default function Screen() {
  const { showToast } = useToast();
  
  const { data: products, isLoading, execute } = useAsyncFetch(
    ProductService.getAllProducts,
    {
      onError: () => showToast('Gagal mengambil data produk', 'error'),
    }
  );

  const featuredProducts = React.useMemo(() => {
    if (!products) return [];
    return [...products].sort(() => Math.random() - 0.5).slice(0, 3);
  }, [products]);

  const allProducts = React.useMemo(() => {
    if (!products) return [];
    return products.slice(0, 4);
  }, [products]);

  return (
    <ScrollView 
      className="flex-1 bg-background" 
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl refreshing={isLoading} onRefresh={execute} colors={['#FF8C00']} />
      }
    >
      <View className="px-4 pb-20 pt-10">
        <PageTitle
          title="MIF Store"
          subtitle="Marketplace aplikasi premium. Jelajahi katalog, lihat detail, masukkan ke keranjang, lalu checkout."
        />

        {isLoading ? (
          <View className="py-20 items-center justify-center">
            <ActivityIndicator size="large" color="#FF8C00" />
            <Text className="mt-4 text-muted-foreground">Memuat produk...</Text>
          </View>
        ) : (
          <>
            {/* Produk Pilihan Section */}
            {featuredProducts.length > 0 && (
              <>
                <SectionTitle
                  title="Produk Pilihan"
                  buttonLabel="Lihat Semua"
                  onButtonPress={() => router.push('/produk')}
                />
                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  className="mb-8 flex-row gap-4"
                  contentContainerStyle={{ paddingBottom: 10 }}>
                  {featuredProducts.map((product, index) => (
                    <ProductCard
                      key={`choosen-product-${product._id.$oid}-${index}`}
                      product={product as any}
                      variant="horizontal"
                      className="mr-4"
                    />
                  ))}
                </ScrollView>
              </>
            )}

            {/* Semua Produk Section */}
            {allProducts.length > 0 && (
              <>
                <SectionTitle title="Semua Produk" />
                <View className="flex-row flex-wrap justify-between gap-y-4">
                  {allProducts.map((product, index) => (
                    <View key={`all-product-${product._id.$oid}-${index}`} style={{ width: '48%' }}>
                      <ProductCard product={product as any} variant="grid" />
                    </View>
                  ))}
                </View>

                <View className="mt-8 items-center">
                  <Button
                    variant="secondary"
                    className="h-14 rounded-2xl px-10"
                    onPress={() => router.push('/produk')}>
                    <Text className="font-bold">Lihat Semua Product</Text>
                  </Button>
                </View>
              </>
            )}
            
            {!isLoading && products?.length === 0 && (
              <View className="py-20 items-center justify-center">
                <Text className="text-muted-foreground">Tidak ada produk tersedia.</Text>
              </View>
            )}
          </>
        )}
      </View>
    </ScrollView>
  );
}
