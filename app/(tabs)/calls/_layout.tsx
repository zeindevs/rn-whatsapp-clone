import { Ionicons } from '@expo/vector-icons';
import { Stack } from 'expo-router';
import { TouchableOpacity } from 'react-native';

import Colors from '@/constants/Colors';

const Layout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: 'Calls',
          headerTitleAlign: 'center',
          headerLargeTitle: true,
          headerShadowVisible: false,
          // headerTransparent: true,
          headerBlurEffect: 'regular',
          headerStyle: {
            backgroundColor: Colors.light.background,
          },
          headerSearchBarOptions: {
            placeholder: 'Search',
          },
          headerRight: () => (
            <TouchableOpacity>
              <Ionicons
                name="call-outline"
                color={Colors.light.primary}
                size={26}
              />
            </TouchableOpacity>
          ),
        }}
      />
    </Stack>
  );
};

export default Layout;
