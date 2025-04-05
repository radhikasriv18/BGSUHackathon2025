import { View, Text, TextInput, StyleSheet, Button, Alert } from 'react-native';
import { useState } from 'react';
import { useRouter } from 'expo-router';

export default function Verify() {
  const router = useRouter();
  const [otp, setOtp] = useState(['', '', '', '']);

  const handleChange = (text: string, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = text.slice(-1); // only keep last char
    setOtp(newOtp);
  };

  const handleVerify = () => {
    const code = otp.join('');
    if (code.length < 4) {
      Alert.alert('Invalid OTP', 'Please enter the full code');
      return;
    }

    console.log('Entered OTP:', code);
    // TODO: Send OTP to backend for verification
    router.replace('/onboarding' as const);


  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Verify OTP</Text>
      <Text style={styles.subtitle}>We've sent a 4-digit code to your email/phone.</Text>

      <View style={styles.otpRow}>
        {otp.map((digit, index) => (
          <TextInput
            key={index}
            style={styles.otpInput}
            keyboardType="numeric"
            maxLength={1}
            value={digit}
            onChangeText={(text) => handleChange(text, index)}
          />
        ))}
      </View>

      <Button title="Verify" onPress={handleVerify} />
      <Text style={styles.resend}>Didn’t get the code? Resend</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, marginTop: 80 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10, textAlign: 'center' },
  subtitle: { textAlign: 'center', marginBottom: 30, color: '#555' },
  otpRow: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginBottom: 30,
  },
  otpInput: {
    width: 50,
    height: 50,
    borderWidth: 1,
    borderColor: '#aaa',
    textAlign: 'center',
    fontSize: 20,
    borderRadius: 8,
  },
  resend: {
    color: 'blue',
    textAlign: 'center',
    marginTop: 20,
  },
});
