import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { useState } from 'react';
import { useRouter } from 'expo-router';

export default function Signup() {
  const router = useRouter();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState(''); // 🆕 Added
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phone, setPhone] = useState('');

  const handleSignup = () => {
    if (!firstName || !lastName || !username || !email || !password || !confirmPassword) {
      alert('Please fill in all required fields.');
      return;
    }

    if (password !== confirmPassword) {
      alert('Passwords do not match.');
      return;
    }

    // TODO: Connect to backend here
    console.log({
      firstName,
      lastName,
      username,
      email,
      password,
      phone: phone || null,
    });

    router.replace('/verify' as const);

  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>

      <TextInput style={styles.input} placeholder="First Name" onChangeText={setFirstName} />
      <TextInput style={styles.input} placeholder="Last Name" onChangeText={setLastName} />
      <TextInput style={styles.input} placeholder="Username" onChangeText={setUsername} /> {/* 🆕 Added */}
      <TextInput style={styles.input} placeholder="Email" onChangeText={setEmail} keyboardType="email-address" />
      <TextInput style={styles.input} placeholder="Password" secureTextEntry onChangeText={setPassword} />
      <TextInput style={styles.input} placeholder="Confirm Password" secureTextEntry onChangeText={setConfirmPassword} />
      <TextInput style={styles.input} placeholder="Phone Number (optional)" onChangeText={setPhone} keyboardType="phone-pad" />

      <Button title="Create Account" onPress={handleSignup} />

      <Text style={styles.link} onPress={() => router.push('/login' as const)}>
        Already have an account? Login
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, marginTop: 60 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  input: {
    borderWidth: 1,
    padding: 10,
    marginVertical: 8,
    borderRadius: 5,
    borderColor: '#ccc',
  },
  link: { color: 'blue', marginTop: 20, textAlign: 'center' },
});
