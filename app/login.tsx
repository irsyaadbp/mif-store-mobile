import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Text } from '@/components/ui/text';
import { RelativePathString, router, useLocalSearchParams } from 'expo-router';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react-native';
import * as React from 'react';
import {
  Image,
  type ImageStyle,
  View,
  ScrollView,
  Pressable,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
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
  const { redirectTo, buyNowItem } = useLocalSearchParams();

  const { isLoading, execute: handleLogin } = useAsyncFetch(() => login({ email, password }), {
    immediate: false,
    onSuccess: () => {
      showToast(`Berhasil masuk!`, 'success');
      if (redirectTo) {
        router.replace({
          pathname: redirectTo as RelativePathString,
          params: buyNowItem ? { buyNowItem } : {},
        });
      } else {
        router.replace('/(tabs)');
      }
    },
    onError: (error: any) => {
      showToast(error.message || 'Login gagal. Cek kembali email dan password anda.', 'error');
    },
  });

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0} // Adjust based on header height if needed
    >
      <ScrollView className="flex-1 bg-background" contentContainerStyle={{ flexGrow: 1 }}>
        <View className="flex-1 items-center p-8 pt-20">
          {/* Logo Section */}
          <View className="mb-6 h-20 w-20 items-center justify-center rounded-full bg-orange-50">
            <Image
              source={require('@/assets/images/fox.png')}
              style={IMAGE_STYLE}
              resizeMode="contain"
            />
          </View>

          <Text className="mb-2 font-inter-bold text-4xl text-foreground">MIF Store</Text>
          <Text className="mb-12 text-lg text-muted-foreground">Selamat datang kembali!</Text>

          {/* Form Section */}
          <View className="w-full gap-6">
            <View className="gap-2">
              <Text className="ml-1 font-inter-semibold text-base text-foreground">
                Email Address
              </Text>
              <Input
                icon={Mail}
                placeholder="email@anda.com"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
              />
            </View>

            <View className="gap-2">
              <Text className="ml-1 font-inter-semibold text-base text-foreground">Password</Text>
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
                      className="mr-2 text-muted-foreground"
                    />
                  </Pressable>
                }
              />
              <Pressable className="mt-1 items-end" onPress={() => router.push('/forgot-password')}>
                <Text className="font-inter-bold text-primary">Lupa Password?</Text>
              </Pressable>
            </View>

            <Button
              className="mt-4 h-16 w-full rounded-2xl"
              onPress={handleLogin}
              disabled={isLoading || !email || !password}>
              {isLoading ? (
                <ActivityIndicator color="white" />
              ) : (
                <Text className="font-inter-bold text-lg uppercase text-white">Masuk Sekarang</Text>
              )}
            </Button>
          </View>

          {/* Footer Section */}
          <View className="mt-auto pt-8">
            <Text className="text-center text-muted-foreground">
              Belum punya akun?{' '}
              <Text
                className="font-inter-bold text-primary"
                onPress={() => router.push('/register')}>
                Daftar disini
              </Text>
            </Text>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
