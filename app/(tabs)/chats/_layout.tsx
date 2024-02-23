import { Ionicons } from '@expo/vector-icons';
import { Link, Stack } from 'expo-router';
import { Image, Text, TouchableOpacity, View } from 'react-native';

import Colors from '@/constants/Colors';

const Layout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: 'Chats',
          headerTitleAlign: 'center',
          headerLargeTitle: true,
          headerShadowVisible: false,
          // headerTransparent: true,
          headerBlurEffect: 'regular',
          headerLeft: () => (
            <TouchableOpacity>
              <Ionicons
                name="ellipsis-horizontal-circle-outline"
                color={Colors.light.primary}
                size={26}
              />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <View style={{ flexDirection: 'row', gap: 16 }}>
              <TouchableOpacity>
                <Ionicons name="camera-outline" color={Colors.light.primary} size={26} />
              </TouchableOpacity>
              <Link href="/(modals)/new-chat" asChild>
                <TouchableOpacity>
                  <Ionicons name="add-circle" color={Colors.light.primary} size={26} />
                </TouchableOpacity>
              </Link>
            </View>
          ),
          headerStyle: {
            backgroundColor: '#fff',
          },
          headerSearchBarOptions: {
            placeholder: 'Search',
          },
        }}
      />

      <Stack.Screen
        name="[id]"
        options={{
          title: '',
          headerBackTitleVisible: false,
          headerTitle: () => (
            <View
              style={{
                flexDirection: 'row',
                width: 220,
                alignItems: 'center',
                gap: 10,
                paddingBottom: 4,
              }}>
              <Image
                source={{
                  uri: 'https://pbs.twimg.com/profile_images/1564203599747600385/f6Lvcpcu_400x400.jpg',
                }}
                style={{ width: 35, height: 35, borderRadius: 50 }}
              />
              <Text style={{ fontSize: 16, fontWeight: '500' }}>Simon Grimm</Text>
            </View>
          ),
          headerRight: () => (
            <View style={{ flexDirection: 'row', gap: 16 }}>
              <TouchableOpacity>
                <Ionicons name="videocam-outline" color={Colors.light.primary} size={26} />
              </TouchableOpacity>
              <TouchableOpacity>
                <Ionicons name="call-outline" color={Colors.light.primary} size={26} />
              </TouchableOpacity>
            </View>
          ),
          headerStyle: {
            backgroundColor: Colors.light.background,
          },
        }}
      />
    </Stack>
  );
};

export default Layout;
