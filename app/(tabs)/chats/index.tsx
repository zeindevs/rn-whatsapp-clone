import { FlatList, ScrollView, View } from 'react-native';

import chats from '@/assets/data/chats.json';
import ChatRow from '@/components/ChatRow';
import Colors from '@/constants/Colors';
import { defaultStyles } from '@/constants/Styles';

const Page = () => {
  return (
    <View style={{ flex: 1, backgroundColor: Colors.light.background }}>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic">
        <FlatList
          data={chats}
          renderItem={({ item }) => <ChatRow {...item} />}
          keyExtractor={(item) => item.id.toString()}
          ItemSeparatorComponent={() => (
            <View style={[defaultStyles.separator, { marginLeft: 90 }]} />
          )}
          scrollEnabled={false}
        />
      </ScrollView>
    </View>
  );
};

export default Page;
