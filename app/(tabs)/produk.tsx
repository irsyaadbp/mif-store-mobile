import React, { useState, useMemo } from 'react';
import { ScrollView, View, Pressable } from 'react-native';
import { Text } from '@/components/ui/text';
import { ProductCard } from '@/components/ProductCard';
import { PageTitle } from '@/components/PageTitle';
import { LayoutGrid, Tv, Layers, BookOpen, Wrench, Gamepad2 } from 'lucide-react-native';
import { cn } from '@/lib/utils';

const DUMMY_PRODUCTS = [
  {
    "_id": { "$oid": "6963fca6605db1b0f8e6a553" },
    "name": "Netflix Premium",
    "description": "Nonton film 4K sepuasnya",
    "price": 35000,
    "stock": 100,
    "imageUrl": "https://images.ctfassets.net/4cd45et68cgf/Rx83JoRDMkYNlMC9MKzcB/2b14d5a59fc3937afd3f03191e19502d/Netflix-Symbol.png?w=700&h=456",
    "category": "streaming",
  },
  {
    "_id": { "$oid": "6963ff5c605db1b0f8e6a570" },
    "name": "Vidio Premium",
    "description": "Nonton film 4K sepuasnya",
    "price": 20000,
    "stock": 50,
    "imageUrl": "https://images.seeklogo.com/logo-png/39/2/vidio-logo-png_seeklogo-395091.png",
    "category": "streaming",
  },
  {
    "_id": { "$oid": "696403ffc570f2dcb2f1df60" },
    "name": "WeTV Premium",
    "description": "Nonton Drama China sepuasnya",
    "price": 20000,
    "stock": 10,
    "imageUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWNPi86mOZN770IAvg0C0uPhh138gjUl99iA&s",
    "category": "streaming",
  },
  {
    "_id": { "$oid": "696404bfc570f2dcb2f1df64" },
    "name": "Canva Premium",
    "description": "Edit Tugas Desain denggan Mudah Menggunakan Canva",
    "price": 15000,
    "stock": 10,
    "imageUrl": "https://logokeren.id/wp-content/uploads/2025/04/Screenshot-2025-04-18-232844.png",
    "category": "editing",
  },
  {
    "_id": { "$oid": "696405e5c570f2dcb2f1df6e" },
    "name": "CapCut Premium",
    "description": "Edit Video Impian denggan Mudah Menggunakan CapCut",
    "price": 20000,
    "stock": 10,
    "imageUrl": "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/9d2b8def-7b8d-4476-800d-597e3fcb5f07/dftx2j7-b924eb9e-1b99-4574-b7b7-ab481550c7fc.jpg/v1/fit/w_400,h_400,q_70,strp/capcut_logo_render_by_ijungakrom_dftx2j7-375w-2x.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9NDAwIiwicGF0aCI6Ii9mLzlkMmI4ZGVmLTdiOGQtNDQ3Ni04MDBkLTU5N2UzZmNiNWYwNy9kZnR4Mmo3LWI5MjRlYjllLTFiOTktNDU3NC1iN2I3LWFiNDgxNTUwYzdmYy5qcGciLCJ3aWR0aCI6Ijw9NDAwIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmltYWdlLm9wZXJhdGlvbnMiXX0.xXE-DZNjmNghKlc9ZhpTM83Pwew3lRe_5gyveag3Kvc",
    "category": "editing",
  },
  {
    "_id": { "$oid": "696406e5c570f2dcb2f1df7a" },
    "name": "Duolingo Super",
    "description": "Belajar bahasa dengan lebih efektif tanpa iklan",
    "price": 15000,
    "stock": 25,
    "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Duolingo_logo_%282019%29.svg/1200px-Duolingo_logo_%282019%29.svg.png",
    "category": "education",
  },
  {
    "_id": { "$oid": "696407e5c570f2dcb2f1df82" },
    "name": "NordVPN",
    "description": "Layanan VPN terbaik untuk keamanan internet Anda",
    "price": 45000,
    "stock": 15,
    "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/NordVPN_logo.svg/1200px-NordVPN_logo.svg.png",
    "category": "utilities",
  },
  {
    "_id": { "$oid": "696408e5c570f2dcb2f1df8a" },
    "name": "Genshin Impact",
    "description": "Top up Genesis Crystals dengan harga termurah",
    "price": 100000,
    "stock": 50,
    "imageUrl": "https://upload.wikimedia.org/wikipedia/id/f/f6/Genshin_Impact_logo.png",
    "category": "gaming",
  }
];

const CATEGORIES = [
  { id: 'all', label: 'Semua', icon: LayoutGrid },
  { id: 'streaming', label: 'Streaming & Hiburan', icon: Tv },
  { id: 'editing', label: 'Desain & Editing', icon: Layers },
  { id: 'education', label: 'Edukasi', icon: BookOpen },
  { id: 'utilities', label: 'Utilitas', icon: Wrench },
  { id: 'gaming', label: 'Gaming', icon: Gamepad2 },
];

export default function ProdukScreen() {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredProducts = useMemo(() => {
    if (selectedCategory === 'all') return DUMMY_PRODUCTS;
    return DUMMY_PRODUCTS.filter((p) => p.category === selectedCategory);
  }, [selectedCategory]);

  return (
    <ScrollView className="flex-1 bg-background" showsVerticalScrollIndicator={false}>
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
                    color={isActive ? "#000000" : "#71717a"} 
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

        {/* Product Grid */}
        <View className="flex-row flex-wrap justify-between gap-y-4 pt-4 pb-10">
          {filteredProducts.map((product) => (
            <View key={product._id.$oid} style={{ width: '48%' }}>
              <ProductCard 
                product={product as any} 
                variant="grid" 
              />
            </View>
          ))}
          {filteredProducts.length === 0 && (
            <View className="w-full py-20 items-center justify-center">
              <Text className="text-muted-foreground">Tidak ada produk di kategori ini.</Text>
            </View>
          )}
        </View>
      </View>
    </ScrollView>
  );
}
