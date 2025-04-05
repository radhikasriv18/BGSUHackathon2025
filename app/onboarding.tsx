import { View, Text, TextInput, StyleSheet, Button, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import { useRouter } from 'expo-router';

export default function Onboarding() {
  const router = useRouter();

  const [gender, setGender] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [smoking, setSmoking] = useState('');
  const [alcohol, setAlcohol] = useState('');

  const handleSubmit = () => {
    if (!gender || !height || !weight || !smoking || !alcohol) {
      alert('Please fill in all fields');
      return;
    }

    const userData = {
      gender,
      height,
      weight,
      smoking,
      alcohol,
    };

    console.log('User Onboarding Info:', userData);
    // TODO: Send this to backend

   router.replace('/(tabs)' as const);
 // Navigate to main screen after onboarding
  };

  const SelectButton = ({ label, value, setter }: { label: string; value: string; setter: (val: string) => void }) => (
    <TouchableOpacity
      style={[styles.option, value === label && styles.optionSelected]}
      onPress={() => setter(label)}
    >
      <Text>{label}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tell us about yourself</Text>

      <Text style={styles.label}>Gender</Text>
      <View style={styles.row}>
        <SelectButton label="Male" value={gender} setter={setGender} />
        <SelectButton label="Female" value={gender} setter={setGender} />
        <SelectButton label="Other" value={gender} setter={setGender} />
      </View>

      <Text style={styles.label}>Height (cm)</Text>
      <TextInput style={styles.input} keyboardType="numeric" onChangeText={setHeight} value={height} />

      <Text style={styles.label}>Weight (kg)</Text>
      <TextInput style={styles.input} keyboardType="numeric" onChangeText={setWeight} value={weight} />

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

      <Button title="Continue" onPress={handleSubmit} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, marginTop: 40 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  label: { marginTop: 15, marginBottom: 5, fontWeight: '600' },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    padding: 10,
  },
  row: {
    flexDirection: 'row',
    gap: 10,
    flexWrap: 'wrap',
  },
  option: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#aaa',
    borderRadius: 6,
    marginBottom: 10,
  },
  optionSelected: {
    backgroundColor: '#add8e6',
    borderColor: '#007aff',
  },
});
