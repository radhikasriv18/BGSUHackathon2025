import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
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
    if (
      !firstName ||
      !lastName ||
      !username ||
      !email ||
      !password ||
      !confirmPassword
    ) {
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
      setErrorMessage(
        'Password must be at least 6 characters and contain 1 letter & 1 number.'
      );
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
      const response = await fetch('https://your-backend.com/api/signup/', {
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
        // You can show a success message here if you want
        // router.replace({ pathname: '/verifyotp', params: { email } });
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
      <Text style={styles.title}>Sign Up</Text>

      {errorMessage !== '' && <Text style={styles.errorText}>{errorMessage}</Text>}

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

      <Button title={loading ? 'Creating Account...' : 'Create Account'} onPress={handleSignup} disabled={loading} />

      <Text style={styles.link} onPress={() => router.push('/login')}>
        Already have an account? Login
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, marginTop: 60 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  errorText: {
    color: 'red',
    marginBottom: 10,
    textAlign: 'center',
    fontSize: 14,
  },
  input: {
    borderWidth: 1,
    padding: 10,
    marginVertical: 8,
    borderRadius: 5,
    borderColor: '#ccc',
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    marginVertical: 8,
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  passwordInput: {
    flex: 1,
    paddingVertical: 10,
  },
  eye: {
    fontSize: 18,
    padding: 5,
  },
  link: { color: 'blue', marginTop: 20, textAlign: 'center' },
});
