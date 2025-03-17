import { View, Text, Button } from 'react-native';
import { useRouter } from 'expo-router';

export default function NotFoundScreen() {
  const router = useRouter();

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Sayfa Bulunamadı 😢</Text>
      <Button title="Ana Sayfaya Dön" onPress={() => router.replace('/')} />
    </View>
  );
}
