import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Text } from '@/components/ui/text';
import { PageTitle } from '@/components/PageTitle';
import { router, useLocalSearchParams } from 'expo-router';
import { ArrowLeft } from 'lucide-react-native';
import * as React from 'react';
import { View, ScrollView, Image, Pressable, KeyboardAvoidingView, Platform } from 'react-native';
import { useAuth } from '@/context/AuthContext';
import { useCart } from '@/context/CartContext';
import { useToast } from '@/context/ToastContext';

export default function CheckoutScreen() {
  const { isAuthenticated, isLoading: isAuthLoading, user } = useAuth();
  const { cartItems, clearCart } = useCart();
  const { showToast } = useToast();
  const { buyNowItem } = useLocalSearchParams();
  
  const [name, setName] = React.useState(user?.fullname || '');
  const [address, setAddress] = React.useState('');
  const [notes, setNotes] = React.useState('');

  // Autofill name when user data loads
  React.useEffect(() => {
    if (user?.fullname) {
      setName(user.fullname);
    }
  }, [user]);

  const checkoutItems = React.useMemo(() => {
    if (buyNowItem) {
      try {
        const item = JSON.parse(buyNowItem as string);
        return [item];
      } catch (e) {
        console.error('Failed to parse buyNowItem', e);
        return [];
      }
    }
    return cartItems.map(item => ({
      product: item,
      quantity: item.quantity
    }));
  }, [buyNowItem, cartItems]);

  React.useEffect(() => {
    if (!isAuthLoading && !isAuthenticated) {
      router.replace('/login');
    }
  }, [isAuthLoading, isAuthenticated]);

  const subtotal = checkoutItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const serviceFee = 5000;
  const total = subtotal + serviceFee;

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(val).replace('Rp', 'Rp ');
  };

  const handlePayment = () => {
    if (!name.trim() || !address.trim()) {
      showToast('Mohon lengkapi Nama dan Alamat pengiriman.', 'error');
      return;
    }

    if (!buyNowItem) {
      clearCart();
    }
    router.replace('/checkout-success');
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <View className="flex-1 bg-background">
        {/* Custom Header with Back Button */}
        <View className="px-4 pt-14 pb-4 bg-background border-b border-border/50">
          <Pressable 
            className="flex-row items-center gap-2 active:opacity-50"
            onPress={() => router.back()}
          >
            <ArrowLeft size={24} color="#000" />
          </Pressable>
        </View>

        <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
          <View className="p-4 pt-6 pb-40">
            <PageTitle 
              title="Checkout" 
              subtitle="Lengkapi data untuk menyelesaikan pesanan."
            />

            {/* Section 1: User Detail (Data Pengiriman) */}
            <View className="rounded-3xl border border-border bg-white p-6 shadow-sm">
              <View className="gap-6">
                <View className="gap-2">
                  <Text className="text-base font-inter-semibold text-foreground">Nama</Text>
                  <Input 
                    placeholder="Nama lengkap" 
                    value={name} 
                    onChangeText={setName}
                    className="bg-white"
                  />
                </View>

                <View className="gap-2">
                  <Text className="text-base font-inter-semibold text-foreground">Alamat</Text>
                  <Input 
                    placeholder="Alamat pengiriman" 
                    value={address} 
                    onChangeText={setAddress}
                    multiline
                    numberOfLines={4}
                    className="h-32 pt-4 bg-white"
                    textAlignVertical="top"
                  />
                </View>

                <View className="gap-2">
                  <Text className="text-base font-inter-semibold text-foreground">Catatan (Opsional)</Text>
                  <Input 
                    placeholder="Contoh: Tolong kirim cepat" 
                    value={notes} 
                    onChangeText={setNotes}
                    className="bg-white"
                  />
                </View>
              </View>
            </View>

            {/* Section 2: Order Summary (Ringkasan Pesanan) */}
            <View className="mt-6 rounded-3xl border border-border bg-white p-6 shadow-sm">
              <Text className="text-2xl font-bold text-foreground mb-1">Ringkasan Pesanan</Text>
              <Text className="text-muted-foreground mb-6">Berikut daftar semua item di keranjang kamu.</Text>

              {/* Item List */}
              <View className="gap-4 mb-6">
                {checkoutItems.map((item: any) => (
                  <View key={item.product._id?.$oid || item.product._id} className="flex-row items-center justify-between py-3 border-b border-border/50">
                    <View className="flex-row items-center gap-3">
                      <View className="h-12 w-12 rounded-xl bg-muted overflow-hidden">
                        <Image source={{ uri: item.product.imageUrl }} className="h-full w-full" resizeMode="cover" />
                      </View>
                      <View>
                        <Text className="font-bold text-foreground">{item.product.name}</Text>
                        <Text className="text-xs text-muted-foreground">Qty: {item.quantity}</Text>
                      </View>
                    </View>
                    <Text className="font-inter-semibold text-foreground">{formatCurrency(item.product.price * item.quantity)}</Text>
                  </View>
                ))}
              </View>

              {/* Pricing Breakdown */}
              <View className="gap-3">
                <View className="flex-row justify-between">
                  <Text className="text-muted-foreground text-lg">Subtotal</Text>
                  <Text className="text-foreground text-lg font-inter-semibold">{formatCurrency(subtotal)}</Text>
                </View>
                <View className="flex-row justify-between">
                  <Text className="text-muted-foreground text-lg">Biaya Layanan</Text>
                  <Text className="text-foreground text-lg font-inter-semibold">{formatCurrency(serviceFee)}</Text>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>

        {/* Sticky Footer for Actions */}
        <View className="absolute bottom-0 left-0 right-0 bg-white border-t border-border p-6 shadow-2xl">
          <View className="flex-row items-center justify-between mb-4">
            <View>
              <Text className="text-muted-foreground">Total Tagihan</Text>
              <Text className="text-2xl font-bold text-foreground">{formatCurrency(total)}</Text>
            </View>
            <Button className="h-14 px-8 rounded-2xl" onPress={handlePayment}>
              <Text className="font-bold">Bayar Sekarang</Text>
            </Button>
          </View>
          <Text className="text-xs text-muted-foreground text-center opacity-40">
            Dengan klik tombol "Bayar Sekarang", kamu setuju dengan S&K.
          </Text>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}
