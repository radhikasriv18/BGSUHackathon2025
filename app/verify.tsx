import { View, Text, TextInput, StyleSheet, Button, Alert } from 'react-native';
import { useState } from 'react';
import { useRouter, useLocalSearchParams } from 'expo-router';

export default function Verify() {
  const router = useRouter();
  const { email } = useLocalSearchParams(); // ⬅️ Get email passed from signup
  const [otp, setOtp] = useState(['', '', '', '']);

  const handleChange = (text: string, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = text.slice(-1); // only keep last char
    setOtp(newOtp);
  };

  const handleVerify = async () => {
    const code = otp.join('');
    if (code.length < 4) {
      Alert.alert('Invalid OTP', 'Please enter the full code');
      return;
    }

    try {
      const res = await fetch('https://your-backend.com/auth/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          otp: code,
        }),
      });

      const data = await res.json();

      if (res.ok && data.status === 'verified') {
        router.replace('/onboarding' as const);
      } else {
        Alert.alert('OTP Failed', data.message || 'Invalid OTP');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Something went wrong. Please try again.');
    }
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
