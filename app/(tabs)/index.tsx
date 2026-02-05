import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { router } from 'expo-router';
import { useColorScheme } from 'nativewind';
import * as React from 'react';
import { View, ScrollView } from 'react-native';
import { PageTitle } from '@/components/PageTitle';
import { SectionTitle } from '@/components/SectionTitle';
import { ProductCard } from '@/components/ProductCard';

const DUMMY_PRODUCTS = [
  {
    "_id": { "$oid": "6963fca6605db1b0f8e6a553" },
    "name": "Netflix Premium",
    "description": "Nonton film 4K sepuasnya",
    "price": 35000,
    "imageUrl": "https://images.ctfassets.net/4cd45et68cgf/Rx83JoRDMkYNlMC9MKzcB/2b14d5a59fc3937afd3f03191e19502d/Netflix-Symbol.png?w=700&h=456",
    "category": "streaming",
  },
  {
    "_id": { "$oid": "6963ff5c605db1b0f8e6a570" },
    "name": "Vidio Premium",
    "description": "Nonton film 4K sepuasnya",
    "price": 20000,
    "imageUrl": "https://images.seeklogo.com/logo-png/39/2/vidio-logo-png_seeklogo-395091.png",
    "category": "streaming",
  },
  {
    "_id": { "$oid": "696403ffc570f2dcb2f1df60" },
    "name": "WeTV Premium",
    "description": "Nonton Drama China sepuasnya",
    "price": 20000,
    "imageUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWNPi86mOZN770IAvg0C0uPhh138gjUl99iA&s",
    "category": "streaming",
  },
  {
    "_id": { "$oid": "696404bfc570f2dcb2f1df64" },
    "name": "Canva Premium",
    "description": "Edit Tugas Desain denggan Mudah Menggunakan Canva",
    "price": 15000,
    "imageUrl": "https://logokeren.id/wp-content/uploads/2025/04/Screenshot-2025-04-18-232844.png",
    "category": "editing",
  },
  {
    "_id": { "$oid": "696405e5c570f2dcb2f1df6e" },
    "name": "CapCut Premium",
    "description": "Edit Video Impian denggan Mudah Menggunakan CapCut",
    "price": 20000,
    "imageUrl": "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/9d2b8def-7b8d-4476-800d-597e3fcb5f07/dftx2j7-b924eb9e-1b99-4574-b7b7-ab481550c7fc.jpg/v1/fit/w_400,h_400,q_70,strp/capcut_logo_render_by_ijungakrom_dftx2j7-375w-2x.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9NDAwIiwicGF0aCI6Ii9mLzlkMmI4ZGVmLTdiOGQtNDQ3Ni04MDBkLTU5N2UzZmNiNWYwNy9kZnR4Mmo3LWI5MjRlYjllLTFiOTktNDU3NC1iN2I3LWFiNDgxNTUwYzdmYy5qcGciLCJ3aWR0aCI6Ijw9NDAwIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmltYWdlLm9wZXJhdGlvbnMiXX0.xXE-DZNjmNghKlc9ZhpTM83Pwew3lRe_5gyveag3Kvc",
    "category": "editing",
  }
];

export default function Screen() {
  const featuredProducts = React.useMemo(() => {
    return [...DUMMY_PRODUCTS].sort(() => Math.random() - 0.5).slice(0, 3);
  }, []);

  const allProducts = DUMMY_PRODUCTS.slice(0, 4);

  return (
    <ScrollView className="flex-1 bg-background" showsVerticalScrollIndicator={false}>
      <View className="px-4 pt-10 pb-20">
        <PageTitle
          title="MIF Store"
          subtitle="Marketplace aplikasi premium. Jelajahi katalog, lihat detail, masukkan ke keranjang, lalu checkout."
        />

        {/* Produk Pilihan Section */}
        <SectionTitle
          title="Produk Pilihan"
          buttonLabel="Lihat Semua"
          onButtonPress={() => router.push('/produk')}
        />
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          className="flex-row gap-4 mb-8"
          contentContainerStyle={{ paddingBottom: 10 }}
        >
          {featuredProducts.map((product) => (
            <ProductCard 
              key={product._id.$oid} 
              product={product as any} 
              variant="horizontal" 
              className="mr-4"
            />
          ))}
        </ScrollView>

        {/* Semua Produk Section */}
        <SectionTitle title="Semua Produk" />
        <View className="flex-row flex-wrap justify-between gap-y-4">
          {allProducts.map((product) => (
            <View key={product._id.$oid} style={{ width: '48%' }}>
              <ProductCard 
                product={product as any} 
                variant="grid" 
              />
            </View>
          ))}
        </View>

        <View className="mt-8 items-center">
          <Button 
            variant="secondary" 
            className="rounded-2xl px-10 h-14"
            onPress={() => router.push('/produk')}
          >
            <Text className="font-bold">Lihat Semua Product</Text>
          </Button>
        </View>
      </View>
    </ScrollView>
  );
}
