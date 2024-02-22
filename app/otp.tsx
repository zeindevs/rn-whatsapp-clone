import { useState } from 'react';
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Linking,
  Platform,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import MaskInput from 'react-native-mask-input';

import { Text, View } from '@/components/Themed';
import Colors from '@/constants/Colors';

const GER_PHONE = [
  '+',
  '(',
  /\d/,
  /\d/,
  ')',
  ' ',
  /\d/,
  /\d/,
  /\d/,
  '-',
  /\d/,
  /\d/,
  /\d/,
  /\d/,
  '-',
  /\d/,
  /\d/,
  /\d/,
  /\d/,
  /\d/,
];

const Page = () => {
  const [loading, setLoading] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const router = useRouter();
  const keyboardVerticalOffset = Platform.OS === 'ios' ? 90 : 0;
  const { bottom } = useSafeAreaInsets();

  const openLink = () => {
    Linking.openURL('https://galaxies.dev');
  };

  const sendOTP = async () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      router.push(`/verify/${phoneNumber}`);
    }, 2000);
  };

  const trySignIn = async () => {};

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      keyboardVerticalOffset={keyboardVerticalOffset}
    >
      <View style={styles.container}>
        {loading && (
          <View style={[StyleSheet.absoluteFill, styles.loading]}>
            <ActivityIndicator size="large" color={Colors.light.primary} />
            <Text style={{ fontSize: 18, padding: 10 }}>Sending code...</Text>
          </View>
        )}
        <Text style={styles.description}>
          WhatsApp will need to verify your account. Carriear changes may apply.
        </Text>

        <View style={styles.list}>
          <View style={styles.listItem}>
            <Text style={styles.listItemText}>Germany</Text>
            <Ionicons
              name="chevron-forward"
              size={20}
              color={Colors.light.gray}
            />
          </View>
          <View style={styles.separator}></View>

          <MaskInput
            style={styles.input}
            keyboardType="numeric"
            value={phoneNumber}
            autoFocus
            placeholder="+49 your phone number"
            onChangeText={(masked, unmasked) => {
              setPhoneNumber(masked);
            }}
            mask={GER_PHONE}
          />
        </View>

        <Text style={styles.legal}>
          You must be{' '}
          <Text style={styles.link} onPress={openLink}>
            at least 16 years old
          </Text>{' '}
          to register. Learn how WhatsApp works with the{' '}
          <Text style={styles.link} onPress={openLink}>
            Meta Companies
          </Text>
        </Text>

        <View style={{ flex: 1 }} />

        <TouchableOpacity
          style={[
            styles.button,
            phoneNumber !== '' ? styles.enabled : null,
            { marginBottom: bottom },
          ]}
          disabled={phoneNumber === ''}
          onPress={sendOTP}
        >
          <Text
            style={[
              styles.buttonText,
              phoneNumber !== '' ? styles.enabled : null,
            ]}
          >
            Next
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
    backgroundColor: Colors.light.background,
    gap: 20,
  },
  description: {
    fontSize: 14,
    color: Colors.light.gray,
  },
  list: {
    backgroundColor: '#fff',
    width: '100%',
    borderRadius: 10,
    padding: 10,
  },
  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 6,
    marginBottom: 10,
    backgroundColor: '#fff',
  },
  listItemText: {
    fontSize: 18,
    color: Colors.light.primary,
  },
  separator: {
    width: '100%',
    height: StyleSheet.hairlineWidth,
    backgroundColor: Colors.light.gray,
    opacity: 0.3,
  },
  legal: {
    fontSize: 12,
    textAlign: 'center',
    color: '#000',
  },
  link: {
    color: Colors.light.primary,
  },
  button: {
    width: '100%',
    alignItems: 'center',
    backgroundColor: Colors.light.lightGray,
    padding: 10,
    borderRadius: 10,
  },
  enabled: {
    backgroundColor: Colors.light.primary,
    color: '#fff',
  },
  buttonText: {
    color: Colors.light.gray,
    fontSize: 22,
    fontWeight: '500',
  },
  input: {
    backgroundColor: '#fff',
    width: '100%',
    fontSize: 16,
    padding: 6,
    marginTop: 10,
  },
  loading: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 10,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Page;
