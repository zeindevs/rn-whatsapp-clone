import { StyleSheet } from 'react-native';

import { Text, View } from '@/components/Themed';

const Page = () => {
  return (
    <View style={styles.container}>
      <Text style={{}}>Communities</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Page;
