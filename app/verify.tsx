// 📄 verify.tsx (Styled Version)
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { useState } from 'react';
import { useRouter, useLocalSearchParams } from 'expo-router';

export default function Verify() {
  const router = useRouter();
  const { email } = useLocalSearchParams();
  const [otp, setOtp] = useState(['', '', '', '']);
  const [loading, setLoading] = useState(false);

  const handleChange = (text, index) => {
    const newOtp = [...otp];
    newOtp[index] = text.slice(-1);
    setOtp(newOtp);
  };

  const handleVerify = async () => {
    const code = otp.join('');
    if (code.length < 4) {
      Alert.alert('Invalid OTP', 'Please enter the full 4-digit code.');
      return;
    }
    setLoading(true);
    try {
      const res = await fetch('http://127.0.0.1:8000/otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp: code }),
      });
      const data = await res.json();
      if (res.ok && data.status === 'verified') {
        router.replace('/onboarding');
      } else {
        Alert.alert('OTP Failed', data.message || 'Invalid OTP');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Verify OTP</Text>
      <Text style={styles.subtitle}>We've sent a 4-digit code to your email.</Text>

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

      <TouchableOpacity style={styles.button} onPress={handleVerify} disabled={loading}>
        {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Verify</Text>}
      </TouchableOpacity>

      <Text style={styles.resend}>Didn’t get the code? <Text style={{ fontWeight: '600' }}>Resend</Text></Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    backgroundColor: '#f0f4f8',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#1d3557',
  },
  subtitle: {
    textAlign: 'center',
    color: '#555',
    marginBottom: 30,
    fontSize: 16,
  },
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
    borderRadius: 10,
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#0077ff',
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  resend: {
    color: '#0077cc',
    textAlign: 'center',
    marginTop: 20,
  },
});
