// 📄 signup.tsx (Styled Version)
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useState } from 'react';
import { useRouter } from 'expo-router';

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d).{6,}$/;

export default function Signup() {
  const router = useRouter();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const validateInputs = () => {
    if (!firstName || !lastName || !username || !email || !password || !confirmPassword) {
      setErrorMessage('Please fill in all required fields.');
      return false;
    }
    if (firstName.length < 2 || lastName.length < 2 || username.length < 3) {
      setErrorMessage('Name and username must be at least 3 characters.');
      return false;
    }
    if (!emailRegex.test(email)) {
      setErrorMessage('Please enter a valid email address.');
      return false;
    }
    if (!passwordRegex.test(password)) {
      setErrorMessage('Password must be at least 6 characters and contain 1 letter & 1 number.');
      return false;
    }
    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match.');
      return false;
    }
    if (phone && phone.length !== 10) {
      setErrorMessage('Phone number must be 10 digits.');
      return false;
    }
    setErrorMessage('');
    return true;
  };

  const handleSignup = async () => {
    if (!validateInputs()) return;
    setLoading(true);
    try {
      const response = await fetch('http://127.0.0.1:8000/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          first_name: firstName,
          last_name: lastName,
          username,
          email,
          password,
          phone: phone || null,
        }),
      });
      const data = await response.json();
      if (response.ok) {
        router.replace({ pathname: '/verify' });
      } else {
        setErrorMessage(data.message || 'Signup failed. Try again.');
      }
    } catch (error) {
      console.error('Signup error:', error);
      setErrorMessage('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Account</Text>
      <Text style={styles.subtitle}>Join the health community 🚀</Text>

      {errorMessage !== '' && <Text style={styles.error}>{errorMessage}</Text>}

      <TextInput style={styles.input} placeholder="First Name" onChangeText={setFirstName} />
      <TextInput style={styles.input} placeholder="Last Name" onChangeText={setLastName} />
      <TextInput style={styles.input} placeholder="Username" onChangeText={setUsername} />
      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        autoCapitalize="none"
        onChangeText={setEmail}
      />

      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.passwordInput}
          placeholder="Password"
          secureTextEntry={!showPassword}
          onChangeText={setPassword}
        />
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
          <Icon name={showPassword ? 'eye-off' : 'eye'} size={22} color="#555" />
        </TouchableOpacity>
      </View>

      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.passwordInput}
          placeholder="Confirm Password"
          secureTextEntry={!showConfirmPassword}
          onChangeText={setConfirmPassword}
        />
        <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
          <Icon name={showConfirmPassword ? 'eye-off' : 'eye'} size={22} color="#555" />
        </TouchableOpacity>
      </View>

      <TextInput
        style={styles.input}
        placeholder="Phone Number (optional)"
        keyboardType="phone-pad"
        onChangeText={setPhone}
        maxLength={10}
      />

      <TouchableOpacity style={styles.button} onPress={handleSignup} disabled={loading}>
        {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Create Account</Text>}
      </TouchableOpacity>

      <Text style={styles.link} onPress={() => router.push('/login')}>
        Already have an account? <Text style={{ fontWeight: '600' }}>Login</Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, backgroundColor: '#f0f4f8', justifyContent: 'center' },
  title: { fontSize: 28, fontWeight: 'bold', textAlign: 'center', color: '#1d3557' },
  subtitle: { fontSize: 16, color: '#555', marginBottom: 20, textAlign: 'center' },
  error: { color: 'red', textAlign: 'center', marginBottom: 10 },
  input: {
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 14,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 14,
    backgroundColor: '#fff',
  },
  passwordInput: {
    flex: 1,
    paddingVertical: 10,
  },
  button: {
    backgroundColor: '#0077ff',
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 4,
  },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: '600' },
  link: { color: '#0077cc', marginTop: 20, textAlign: 'center' },
});
