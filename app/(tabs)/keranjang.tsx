import { Text } from '@/components/ui/text';
import { View, ScrollView } from 'react-native';
import { PageTitle } from '@/components/PageTitle';

export default function KeranjangScreen() {
  return (
    <ScrollView className="flex-1 bg-background">
      <View className="p-4">
        <PageTitle 
          title="Keranjang" 
          subtitle="Ringkasan produk yang akan kamu checkout."
        />
        <View className="flex-1 items-center justify-center py-20">
          <Text className="text-foreground">Halaman Keranjang</Text>
        </View>
      </View>
    </ScrollView>
  );
}
