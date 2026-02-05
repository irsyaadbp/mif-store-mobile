import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { PageTitle } from '@/components/PageTitle';
import { router } from 'expo-router';
import { View, ScrollView } from 'react-native';

export default function AkunScreen() {
  return (
    <ScrollView className="flex-1 bg-background" showsVerticalScrollIndicator={false}>
      <View className="p-4 pt-10">
        <PageTitle 
          title="Akun" 
          subtitle="Atur profil, alamat, dan pantau pesananmu di sini."
        />

        <View className="flex-1 items-center justify-center py-20 gap-6">
          <View className="h-32 w-32 rounded-full bg-muted items-center justify-center border-4 border-white shadow-sm">
            <Text className="text-4xl">🦊</Text>
          </View>
          
          <View className="items-center gap-2">
            <Text className="text-2xl font-bold text-foreground text-center">
              Selamat Datang di MIF Store
            </Text>
            <Text className="text-muted-foreground text-center px-8">
              Silakan masuk ke akunmu untuk pengalaman belanja yang lebih personal.
            </Text>
          </View>

          <Button 
            className="w-full h-14 rounded-2xl" 
            onPress={() => router.push('/login')}
          >
            <Text className="font-bold">Masuk ke Akun</Text>
          </Button>
        </View>
      </View>
    </ScrollView>
  );
}
