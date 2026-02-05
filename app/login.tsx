import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Text } from '@/components/ui/text';
import { Link, router, useNavigation } from 'expo-router';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react-native';
import { useColorScheme } from 'nativewind';
import * as React from 'react';
import { Image, type ImageStyle, View, ScrollView, Pressable, ActivityIndicator, KeyboardAvoidingView, Platform } from 'react-native';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/context/ToastContext';
import { useAsyncFetch } from '@/hooks/useAsyncFetch';
import { Icon } from '@/components/ui/icon';

const IMAGE_STYLE: ImageStyle = {
  height: 60,
  width: 60,
};

export default function LoginScreen() {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [showPassword, setShowPassword] = React.useState(false);
  
  const { login } = useAuth();
  const { showToast } = useToast();

  const { isLoading, execute: handleLogin } = useAsyncFetch(
    () => login({ email, password }),
    {
      immediate: false,
      onSuccess: () => {
        showToast('Berhasil masuk!', 'success');
        router.replace('/(tabs)');
      },
      onError: (error: any) => {
        showToast(error.message || 'Login gagal. Cek kembali email dan password anda.', 'error');
      }
    }
  );

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
      style={{ flex: 1 }}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0} // Adjust based on header height if needed
    >
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
              secureTextEntry={!showPassword}
              rightElement={
                <Pressable onPress={() => setShowPassword(!showPassword)}>
                  <Icon 
                    as={showPassword ? EyeOff : Eye} 
                    size={20} 
                    className="text-muted-foreground mr-2" 
                  />
                </Pressable>
              }
            />
            <Pressable 
              className="items-end mt-1"
              onPress={() => router.push('/forgot-password')}
            >
              <Text className="text-primary font-inter-bold">Lupa Password?</Text>
            </Pressable>
          </View>

          <Button 
            className="h-16 w-full rounded-2xl mt-4" 
            onPress={handleLogin}
            disabled={isLoading || !email || !password}
          >
            {isLoading ? (
              <ActivityIndicator color="white" />
            ) : (
              <Text className="font-inter-bold text-lg uppercase text-white">Masuk Sekarang</Text>
            )}
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
    </KeyboardAvoidingView>
  );
}
