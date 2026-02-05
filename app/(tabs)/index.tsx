import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { Text } from '@/components/ui/text';
import { Link, router } from 'expo-router';
import { StarIcon } from 'lucide-react-native';
import { useColorScheme } from 'nativewind';
import * as React from 'react';
import { Image, type ImageStyle, View, ScrollView } from 'react-native';
import { PageTitle } from '@/components/PageTitle';
import { SectionTitle } from '@/components/SectionTitle';
import { ProductCard } from '@/components/ProductCard';

const LOGO = {
  light: require('@/assets/images/fox.png'),
  dark: require('@/assets/images/fox.png'),
};

const IMAGE_STYLE: ImageStyle = {
  height: 76,
  width: 76,
};

const FEATURED_PRODUCTS = [
  {
    _id: { $oid: '696404bfc570f2dcb2f1df64' },
    name: 'Canva Premium',
    description: 'Edit Tugas Desain denggan Mudah Menggunakan Canva',
    price: 15000,
    imageUrl: 'https://logokeren.id/wp-content/uploads/2025/04/Screenshot-2025-04-18-232844.png',
    category: 'editing',
  },
  {
    _id: { $oid: '696405e5c570f2dcb2f1df6e' },
    name: 'CapCut Premium',
    description: 'Edit Video Impian denggan Mudah Menggunakan CapCut',
    price: 20000,
    imageUrl:
      'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/9d2b8def-7b8d-4476-800d-597e3fcb5f07/dftx2j7-b924eb9e-1b99-4574-b7b7-ab481550c7fc.jpg/v1/fit/w_400,h_400,q_70,strp/capcut_logo_render_by_ijungakrom_dftx2j7-375w-2x.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9NDAwIiwicGF0aCI6Ii9mLzlkMmI4ZGVmLTdiOGQtNDQ3Ni04MDBkLTU5N2UzZmNiNWYwNy9kZnR4Mmo3LWI5MjRlYjllLTFiOTktNDU3NC1iN2I3LWFiNDgxNTUwYzdmYy5qcGciLCJ3aWR0aCI6Ijw9NDAwIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmltYWdlLm9wZXJhdGlvbnMiXX0.xXE-DZNjmNghKlc9ZhpTM83Pwew3lRe_5gyveag3Kvc',
    category: 'editing',
  },
];

export default function Screen() {
  const { colorScheme } = useColorScheme();

  return (
    <ScrollView className="flex-1 bg-background">
      <View className="p-4 pt-10">
        <PageTitle
          title="MIF Store"
          subtitle="Marketplace aplikasi premium. Jelajahi katalog, lihat detail, masukkan ke keranjang, lalu checkout."
        />

        <SectionTitle
          title="Produk Pilihan"
          buttonLabel="Lihat Semua Produk"
          onButtonPress={() => router.push('/produk')}
        />

        <View className="gap-2">
          {FEATURED_PRODUCTS.map((product) => (
            <ProductCard key={product._id.$oid} product={product as any} />
          ))}
        </View>
      </View>
    </ScrollView>
  );
}
