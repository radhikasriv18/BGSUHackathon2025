import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { useState } from 'react';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const options = {
  headerShown: false,
};

export default function Login() {
  const router = useRouter();
  const [usernameOrEmail, setUsernameOrEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = async () => {
    if (!usernameOrEmail || !password) {
      setErrorMessage('Please enter both username/email and password.');
      return;
    }
    setErrorMessage('');
    setLoading(true);

    try {
      const response = await fetch('http://127.0.0.1:8000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ identifier: usernameOrEmail, password }),
      });
      const data = await response.json();
      console.log(data)
<<<<<<< HEAD
      if (response.ok ) {
        await AsyncStorage.setItem('access_token', data.access_token);
=======
      if (response.ok) {
        await AsyncStorage.setItem('authToken', data.token);
>>>>>>> 2b9858169baea7b8a2aae99c132ec3ac108a8c4b
        router.replace('/(tabs)');
      } else {
        setErrorMessage(data.message || 'Invalid login credentials.');
      }
    } catch (error) {
      console.error('Login error:', error);
      setErrorMessage('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome Back</Text>
      <Text style={styles.subtitle}>Log in to continue</Text>

      {errorMessage !== '' && <Text style={styles.error}>{errorMessage}</Text>}

      <TextInput
        style={styles.input}
        placeholder="Username or Email"
        placeholderTextColor="#555"
        onChangeText={setUsernameOrEmail}
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#555"
        secureTextEntry
        onChangeText={setPassword}
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin} disabled={loading}>
        {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Login</Text>}
      </TouchableOpacity>

      <Text style={styles.link} onPress={() => router.push('/signup')}>
        Don't have an account? <Text style={styles.linkStrong}>Sign up</Text>
      </Text>
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
    marginBottom: 6,
    textAlign: 'center',
    color: '#000',
  },
  subtitle: {
    fontSize: 20,
    color: '#000',
    marginBottom: 20,
    textAlign: 'center',
    fontWeight: 'bold',
    fontStyle: 'italic',
  },
  input: {
    backgroundColor: '#E7E9EA',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderWidth: 1.5,
    borderColor: '#000',
    marginBottom: 16,
    fontSize: 16,
    fontWeight: 'bold',
    fontStyle: 'italic',
    color: '#000',
  },
  button: {
    backgroundColor: '#333333',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 6,
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
  link: {
    color: '#000',
    marginTop: 24,
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
    fontStyle: 'italic',
  },
  linkStrong: {
    fontWeight: 'bold',
    fontStyle: 'italic',
    color: '#000',
  },
  error: {
    color: '#000',
    textAlign: 'center',
    marginBottom: 12,
    fontSize: 16,
    fontWeight: 'bold',
    fontStyle: 'italic',
  },
});
