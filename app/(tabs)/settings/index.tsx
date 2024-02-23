import { useAuth } from '@clerk/clerk-expo';
import { Ionicons } from '@expo/vector-icons';
import { FlatList, ScrollView, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import BoxedIcon from '@/components/BoxedIcon';
import { Text, View } from '@/components/Themed';
import Colors from '@/constants/Colors';
import { defaultStyles } from '@/constants/Styles';

const Page = () => {
  const { signOut } = useAuth();

  const devices = [
    {
      name: 'Broadcast Lists',
      icon: 'megaphone',
      backgroundColor: Colors.light.green,
    },
    {
      name: 'Starred Messages',
      icon: 'star',
      backgroundColor: Colors.light.yellow,
    },
    {
      name: 'Linked Devices',
      icon: 'laptop-outline',
      backgroundColor: Colors.light.green,
    },
  ];

  const items = [
    {
      name: 'Account ',
      icon: 'key',
      backgroundColor: Colors.light.primary,
    },
    {
      name: 'Privacy',
      icon: 'lock-closed',
      backgroundColor: '#33A5D1',
    },
    {
      name: 'Chats',
      icon: 'logo-whatsapp',
      backgroundColor: Colors.light.green,
    },
    {
      name: 'Notifications',
      icon: 'notifications',
      backgroundColor: Colors.light.red,
    },
    {
      name: 'Storage and Data',
      icon: 'repeat',
      backgroundColor: Colors.light.green,
    },
  ];

  const support = [
    {
      name: 'Help',
      icon: 'information',
      backgroundColor: Colors.light.primary,
    },
    {
      name: 'Tell a Friend',
      icon: 'heart',
      backgroundColor: Colors.light.red,
    },
  ];

  return (
    <View style={styles.container}>
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <View style={defaultStyles.block}>
          <FlatList
            data={devices}
            scrollEnabled={false}
            ItemSeparatorComponent={() => (
              <View style={defaultStyles.separator} />
            )}
            renderItem={({ item }) => (
              <TouchableOpacity style={defaultStyles.item}>
                <BoxedIcon
                  name={item.icon}
                  backgroundColor={item.backgroundColor}
                />
                <Text style={{ fontSize: 18, flex: 1 }}>{item.name}</Text>
                <Ionicons
                  name="chevron-forward"
                  size={20}
                  color={Colors.light.gray}
                />
              </TouchableOpacity>
            )}
          />
        </View>

        <View style={defaultStyles.block}>
          <FlatList
            data={items}
            scrollEnabled={false}
            ItemSeparatorComponent={() => (
              <View style={defaultStyles.separator} />
            )}
            renderItem={({ item }) => (
              <TouchableOpacity style={defaultStyles.item}>
                <BoxedIcon
                  name={item.icon}
                  backgroundColor={item.backgroundColor}
                />
                <Text style={{ fontSize: 18, flex: 1 }}>{item.name}</Text>
                <Ionicons
                  name="chevron-forward"
                  size={20}
                  color={Colors.light.gray}
                />
              </TouchableOpacity>
            )}
          />
        </View>

        <View style={defaultStyles.block}>
          <FlatList
            data={support}
            scrollEnabled={false}
            ItemSeparatorComponent={() => (
              <View style={defaultStyles.separator} />
            )}
            renderItem={({ item }) => (
              <TouchableOpacity style={defaultStyles.item}>
                <BoxedIcon
                  name={item.icon}
                  backgroundColor={item.backgroundColor}
                />
                <Text style={{ fontSize: 18, flex: 1 }}>{item.name}</Text>
                <Ionicons
                  name="chevron-forward"
                  size={20}
                  color={Colors.light.gray}
                />
              </TouchableOpacity>
            )}
          />
        </View>

        <View style={defaultStyles.block}>
          <TouchableOpacity onPress={() => signOut()}>
            <Text
              style={{
                color: Colors.light.primary,
                fontSize: 18,
                textAlign: 'center',
                paddingVertical: 14,
              }}
            >
              Log Out
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.light.background,
  },
});

export default Page;
