import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView, Alert, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState } from 'react';
import { useRouter } from 'expo-router';

export default function Onboarding() {
  const router = useRouter();

  const [dob, setDob] = useState('');
  const [gender, setGender] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [smoking, setSmoking] = useState('');
  const [alcohol, setAlcohol] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!dob || !gender || !height || !weight || !smoking || !alcohol) {
      Alert.alert('Missing Info', 'Please fill in all fields');
      return;
    }

    const token = await AsyncStorage.getItem('access_token');
    if (!token) {
      Alert.alert('Error', 'Authentication error. Please log in again.');
      return;
    }

    const heightInt = parseInt(height);
    const weightInt = parseInt(weight);
    if (isNaN(heightInt) || isNaN(weightInt)) {
      Alert.alert('Invalid Data', 'Height and weight must be numbers.');
      return;
    }

    const userData = {
      access_token: token,
      dob,
      gender,
      height: heightInt,
      weight: weightInt,
      smoking,
      alcohol,
    };

    try {
      setLoading(true);
      const response = await fetch('http://127.0.0.1:8000/onboarding', {
        method: 'POST',
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        router.replace('/(tabs)');
      } else {
        Alert.alert('Failed', data.message || 'Could not save onboarding info');
      }
    } catch (error) {
      console.error('Onboarding Error:', error);
      Alert.alert('Error', 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const SelectButton = ({ label, value, setter }) => (
    <TouchableOpacity
      style={[styles.option, value === label && styles.optionSelected]}
      onPress={() => setter(label)}
    >
      <Text style={[styles.optionText, value === label && styles.optionTextSelected]}>{label}</Text>
    </TouchableOpacity>
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Let's Get to Know You</Text>

      <Text style={styles.label}>Date of Birth (YYYY-MM-DD)</Text>
      <TextInput
        style={styles.input}
        placeholder="1995-06-15"
        value={dob}
        onChangeText={setDob}
        placeholderTextColor="#555"
      />

      <Text style={styles.label}>Gender</Text>
      <View style={styles.row}>
        <SelectButton label="Male" value={gender} setter={setGender} />
        <SelectButton label="Female" value={gender} setter={setGender} />
        <SelectButton label="Other" value={gender} setter={setGender} />
      </View>

      <Text style={styles.label}>Height (cm)</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        onChangeText={setHeight}
        value={height}
        placeholderTextColor="#555"
      />

      <Text style={styles.label}>Weight (kg)</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        onChangeText={setWeight}
        value={weight}
        placeholderTextColor="#555"
      />

      <Text style={styles.label}>Do you smoke?</Text>
      <View style={styles.row}>
        <SelectButton label="Yes" value={smoking} setter={setSmoking} />
        <SelectButton label="Occasionally" value={smoking} setter={setSmoking} />
        <SelectButton label="No" value={smoking} setter={setSmoking} />
      </View>

      <Text style={styles.label}>Do you drink alcohol?</Text>
      <View style={styles.row}>
        <SelectButton label="Yes" value={alcohol} setter={setAlcohol} />
        <SelectButton label="Occasionally" value={alcohol} setter={setAlcohol} />
        <SelectButton label="No" value={alcohol} setter={setAlcohol} />
      </View>

      <TouchableOpacity style={styles.button} onPress={handleSubmit} disabled={loading}>
        {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Continue</Text>}
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: '#D0D4D5',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    fontStyle: 'italic',
    textAlign: 'center',
    marginBottom: 20,
    color: '#000',
  },
  label: {
    fontWeight: 'bold',
    fontStyle: 'italic',
    marginTop: 15,
    marginBottom: 5,
    color: '#000',
    fontSize: 16,
  },
  input: {
    backgroundColor: '#E7E9EA',
    borderWidth: 1.5,
    borderColor: '#000',
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 10,
    fontWeight: 'bold',
    fontStyle: 'italic',
    color: '#000',
    fontSize: 16,
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 10,
  },
  option: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    backgroundColor: '#E7E9EA',
    borderRadius: 10,
    marginRight: 8,
    marginBottom: 8,
    borderWidth: 1.5,
    borderColor: '#000',
  },
  optionSelected: {
    backgroundColor: '#333333',
  },
  optionText: {
    color: '#000',
    fontWeight: 'bold',
    fontStyle: 'italic',
  },
  optionTextSelected: {
    color: '#fff',
  },
  button: {
    backgroundColor: '#333333',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 20,
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
});
