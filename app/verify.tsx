import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState } from 'react';
import { useRouter } from 'expo-router';

export default function Verify() {
  const router = useRouter();
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

    const token = await AsyncStorage.getItem('access_token');
    if (!token) {
      Alert.alert('Error', 'No token found. Please log in again.');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('http://127.0.0.1:8000/otp', {
        method: 'POST',
        body: JSON.stringify({ entered_otp: code, access_token: token }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        router.replace('/onboarding');
      } else {
        Alert.alert('OTP Failed', data.message || 'Invalid OTP');
      }
    } catch (error) {
      console.error('OTP verification error:', error);
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

      <Text style={styles.resend}>Didn’t get the code? <Text style={styles.resendStrong}>Resend</Text></Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    backgroundColor: '#D0D4D5',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    fontStyle: 'italic',
    textAlign: 'center',
    color: '#000',
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    fontStyle: 'italic',
    textAlign: 'center',
    color: '#000',
    marginBottom: 30,
  },
  otpRow: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginBottom: 30,
  },
  otpInput: {
    width: 60,
    height: 60,
    borderWidth: 1.5,
    borderColor: '#000',
    textAlign: 'center',
    fontSize: 22,
    borderRadius: 12,
    backgroundColor: '#E7E9EA',
    fontWeight: 'bold',
    fontStyle: 'italic',
    color: '#000',
  },
  button: {
    backgroundColor: '#333333',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 4,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    fontStyle: 'italic',
  },
  resend: {
    color: '#000',
    textAlign: 'center',
    marginTop: 24,
    fontSize: 16,
    fontWeight: 'bold',
    fontStyle: 'italic',
  },
  resendStrong: {
    fontWeight: 'bold',
    fontStyle: 'italic',
    color: '#000',
  },
});
