import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Text } from '@/components/ui/text';
import { router } from 'expo-router';
import { Mail, ArrowLeft } from 'lucide-react-native';
import * as React from 'react';
import { Image, type ImageStyle, View, ScrollView, Pressable, KeyboardAvoidingView, Platform } from 'react-native';

const IMAGE_STYLE: ImageStyle = {
  height: 60,
  width: 60,
};

export default function ForgotPasswordScreen() {
  const [email, setEmail] = React.useState('');
  const [otp, setOtp] = React.useState('');

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <ScrollView className="flex-1 bg-background" contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
        <View className="flex-1 p-8 pt-10 items-center">
          {/* Logo Section */}
          <View className="items-center justify-center h-20 w-20 rounded-full bg-orange-50 mb-6">
            <Image 
              source={require('@/assets/images/fox.png')} 
              style={IMAGE_STYLE} 
              resizeMode="contain" 
            />
          </View>

          <Text className="text-4xl font-inter-bold text-foreground mb-2">MIF Store</Text>
          <Text className="text-muted-foreground text-lg mb-12">Reset password Anda</Text>

          {/* Form Section */}
          <View className="w-full gap-6">
            <View className="gap-2">
              <Text className="text-base font-inter-semibold text-foreground ml-1">Email Terdaftar</Text>
              <Input
                icon={Mail}
                placeholder="contoh@email.com"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
              />
            </View>

            <View className="gap-2">
              <Text className="text-base font-inter-semibold text-foreground ml-1">Kode OTP</Text>
              <View className="flex-row gap-2">
                <View className="flex-1">
                  <Input
                    placeholder="123456"
                    value={otp}
                    onChangeText={setOtp}
                    keyboardType="number-pad"
                    className="bg-muted/30"
                  />
                </View>
                <Button 
                  variant="outline" 
                  className="h-16 rounded-2xl border-primary px-6"
                  onPress={() => {}}
                >
                  <Text className="text-primary font-inter-bold">Kirim OTP</Text>
                </Button>
              </View>
            </View>

            <Button 
              className="h-16 w-full rounded-2xl mt-4" 
              onPress={() => {}}
            >
              <Text className="font-inter-bold text-lg uppercase text-primary-foreground">VERIFIKASI</Text>
            </Button>
          </View>

          {/* Footer Section */}
          <View className="mt-auto pt-8 pb-4">
            <Pressable 
              className="flex-row items-center gap-2"
              onPress={() => router.push('/login')}
            >
              <ArrowLeft size={20} color="#f97316" />
              <Text className="text-primary font-inter-bold text-lg">Kembali ke Login</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
