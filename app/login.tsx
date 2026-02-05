import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Text } from '@/components/ui/text';
import { Link, router } from 'expo-router';
import { Mail, Lock } from 'lucide-react-native';
import { useColorScheme } from 'nativewind';
import * as React from 'react';
import { Image, type ImageStyle, View, ScrollView, Pressable } from 'react-native';

const IMAGE_STYLE: ImageStyle = {
  height: 60,
  width: 60,
};

export default function LoginScreen() {
  const { colorScheme } = useColorScheme();
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  return (
    <ScrollView className="flex-1 bg-background" contentContainerStyle={{ flexGrow: 1 }}>
      <View className="flex-1 p-8 pt-20 items-center">
        {/* Logo Section */}
        <View className="items-center justify-center h-20 w-20 rounded-full bg-orange-50 mb-6">
          <Image 
            source={require('@/assets/images/fox.png')} 
            style={IMAGE_STYLE} 
            resizeMode="contain" 
          />
        </View>

        <Text className="text-4xl font-inter-bold text-foreground mb-2">MIF Store</Text>
        <Text className="text-muted-foreground text-lg mb-12">Selamat datang kembali!</Text>

        {/* Form Section */}
        <View className="w-full gap-6">
          <View className="gap-2">
            <Text className="text-base font-inter-semibold text-foreground ml-1">Email Address</Text>
            <Input
              icon={Mail}
              placeholder="email@anda.com"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
            />
          </View>

          <View className="gap-2">
            <Text className="text-base font-inter-semibold text-foreground ml-1">Password</Text>
            <Input
              icon={Lock}
              placeholder="Masukkan password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
            <Pressable className="items-end mt-1">
              <Text className="text-primary font-inter-bold">Lupa Password?</Text>
            </Pressable>
          </View>

          <Button 
            className="h-16 w-full rounded-2xl mt-4" 
            onPress={() => router.replace('/(tabs)')}
          >
            <Text className="font-inter-bold text-lg uppercase">Masuk Sekarang</Text>
          </Button>
        </View>

        {/* Footer Section */}
        <View className="mt-auto pt-8">
          <Text className="text-muted-foreground text-center">
            Belum punya akun?{' '}
            <Text 
              className="text-primary font-inter-bold" 
              onPress={() => router.push('/register')}
            >
              Daftar disini
            </Text>
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}
