import React, { useState, useMemo } from 'react';
import { ScrollView, View, Pressable, ActivityIndicator, RefreshControl } from 'react-native';
import { Text } from '@/components/ui/text';
import { ProductCard } from '@/components/ProductCard';
import { PageTitle } from '@/components/PageTitle';
import { LayoutGrid, Tv, Layers, BookOpen, Wrench, Gamepad2 } from 'lucide-react-native';
import { cn } from '@/lib/utils';
import { useAsyncFetch } from '@/hooks/useAsyncFetch';
import { ProductService, Product } from '@/service/products';
import { useToast } from '@/context/ToastContext';

const CATEGORIES = [
  { id: 'all', label: 'Semua', icon: LayoutGrid },
  { id: 'streaming', label: 'Streaming & Hiburan', icon: Tv },
  { id: 'editing', label: 'Desain & Editing', icon: Layers },
  { id: 'education', label: 'Edukasi', icon: BookOpen },
  { id: 'utilities', label: 'Utilitas', icon: Wrench },
  { id: 'gaming', label: 'Gaming', icon: Gamepad2 },
];

export default function ProdukScreen() {
  const { showToast } = useToast();
  const [selectedCategory, setSelectedCategory] = useState('all');

  const { data: products, isLoading, execute } = useAsyncFetch<Product[]>(
    ProductService.getAllProducts,
    {
      onError: () => showToast('Gagal mengambil data produk', 'error'),
    }
  );

  const filteredProducts = useMemo(() => {
    if (!products) return [];
    if (selectedCategory === 'all') return products;
    return products.filter((p) => p.category === selectedCategory);
  }, [products, selectedCategory]);

  return (
    <ScrollView 
      className="flex-1 bg-background" 
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl refreshing={isLoading} onRefresh={execute} colors={['#FF8C00']} />
      }
    >
      <View className="p-4 pt-10">
        <PageTitle 
          title="Katalog Aplikasi" 
          subtitle="Temukan aplikasi premium terbaik untuk kebutuhanmu."
        />

        {/* Categories Section */}
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false} 
          className="py-6 mb-2"
          contentContainerStyle={{ gap: 20 }}
        >
          {CATEGORIES.map((cat) => {
            const Icon = cat.icon;
            const isActive = selectedCategory === cat.id;
            return (
              <Pressable 
                key={cat.id} 
                onPress={() => setSelectedCategory(cat.id)}
                className="items-center gap-2"
              >
                <View 
                  className={cn(
                    "h-20 w-20 items-center justify-center rounded-[28px] shadow-sm",
                    isActive ? "bg-primary" : "bg-border"
                  )}
                >
                  <Icon 
                    size={28} 
                    color={isActive ? "#fff" : "#71717a"} 
                    strokeWidth={isActive ? 2.5 : 2}
                  />
                </View>
                <Text 
                  className={cn(
                    "text-xs font-inter-semibold text-center mt-1",
                    isActive ? "text-primary" : "text-muted-foreground"
                  )}
                >
                  {cat.label}
                </Text>
              </Pressable>
            );
          })}
        </ScrollView>

        {isLoading ? (
          <View className="py-20 items-center justify-center">
            <ActivityIndicator size="large" color="#FF8C00" />
            <Text className="mt-4 text-muted-foreground">Memuat katalog...</Text>
          </View>
        ) : (
          /* Product Grid */
          <View className="flex-row flex-wrap justify-between gap-y-4 pt-4 pb-10">
            {filteredProducts.map((product, index) => (
              <View key={`${product._id.$oid}-${index}`} style={{ width: '48%' }}>
                <ProductCard 
                  product={product as any} 
                  variant="grid" 
                />
              </View>
            ))}
            {!isLoading && filteredProducts.length === 0 && (
              <View className="w-full py-20 items-center justify-center">
                <Text className="text-muted-foreground">Tidak ada produk di kategori ini.</Text>
              </View>
            )}
          </View>
        )}
      </View>
    </ScrollView>
  );
}
