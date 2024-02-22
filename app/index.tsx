import { Image, StyleSheet, TouchableOpacity } from 'react-native';

import { Text, View } from '@/components/Themed';
import welcomeImage from '@/assets/images/welcome.png';
import Colors from '@/constants/Colors';
import { Link } from 'expo-router';

const welcome_image = Image.resolveAssetSource(welcomeImage).uri;

const Page = () => {
  const openLink = () => {};

  return (
    <View style={styles.container}>
      <Image source={{ uri: welcome_image }} style={styles.welcome} />
      <Text style={styles.description}>
        <Text style={styles.link} onPress={openLink}>
          Privacy Policy
        </Text>
        . {'Tap "Agree & Continue" to accept the'}
        <Text style={styles.link}>Terms of Service</Text>
      </Text>
      <Link href={`/otp`} replace asChild>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Agree & Continue</Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  welcome: {
    width: '100%',
    height: 300,
    marginBottom: 80,
  },
  headline: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 20,
  },
  description: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 80,
    color: Colors.light.gray,
  },
  link: {
    color: Colors.light.primary,
  },
  button: {
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 22,
    color: Colors.light.primary,
    fontWeight: 'bold',
  },
});

export default Page;
