import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Linking,
  Platform,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import MaskInput from 'react-native-mask-input';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Text, View } from '@/components/Themed';
import Colors from '@/constants/Colors';
import { useWarmUpBrowser } from '@/hooks/useWarmUpBrowser';
import {
  isClerkAPIResponseError,
  useOAuth,
  useSignIn,
  useSignUp,
} from '@clerk/clerk-expo';

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
  useWarmUpBrowser();
  const [loading, setLoading] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const router = useRouter();
  const keyboardVerticalOffset = Platform.OS === 'ios' ? 90 : 0;
  const { bottom } = useSafeAreaInsets();
  const { signUp } = useSignUp();
  const { signIn } = useSignIn();
  const { startOAuthFlow: googleAuth } = useOAuth({ strategy: 'oauth_google' });

  const openLink = () => {
    Linking.openURL('https://galaxies.dev');
  };

  const sendOTP = async () => {
    setLoading(true);
    try {
      await signUp!.create({
        phoneNumber,
      });

      signUp!.preparePhoneNumberVerification();

      router.push(`/verify/${phoneNumber}`);
    } catch (err) {
      if (isClerkAPIResponseError(err)) {
        if (err.errors[0].code === 'form_identifier_exists') {
          console.log('user exists');
          await trySignIn();
        } else {
          setLoading(false);
          Alert.alert('Error', err.errors[0].message);
        }
      }
    }
  };

  const trySignIn = async () => {
    const { supportedFirstFactors } = await signIn!.create({
      identifier: phoneNumber,
    });

    const firstPhoneFactor: any = supportedFirstFactors.find((factor) => {
      return factor.strategy === 'phone_code';
    });

    const { phoneNumberId } = firstPhoneFactor;

    await signIn!.prepareFirstFactor({
      strategy: 'phone_code',
      phoneNumberId,
    });

    router.push(`/verify/${phoneNumber}?signin=true`);
    setLoading(false);
  };

  const signInWithGoogle = async () => {
    try {
      const { createdSessionId, setActive } = await googleAuth();
      console.log('session id:', createdSessionId);

      if (!createdSessionId) {
        setActive!({ session: createdSessionId });
        router.replace('/(tabs)/chats');
      }
    } catch (err) {
      console.error('could authenticate OAuth: ', err);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior="padding"
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

        <View style={{ width: '100%' }}>
          <TouchableOpacity
            style={[styles.button, styles.enabled]}
            onPress={signInWithGoogle}
          >
            <Text
              style={[styles.buttonText, styles.enabledText, { fontSize: 18 }]}
            >
              Sign In with Google
            </Text>
          </TouchableOpacity>
        </View>

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
              phoneNumber !== '' ? styles.enabledText : null,
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
  enabledText: {
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
