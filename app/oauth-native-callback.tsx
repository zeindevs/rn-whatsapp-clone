import { useRouter } from 'expo-router';
import { useEffect } from 'react';

import { View } from '@/components/Themed';

export default function OAuthNativeCallback() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/(tabs)/chats');
  }, []);

  return <View />;
}
