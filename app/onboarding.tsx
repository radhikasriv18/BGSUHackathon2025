import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { useState } from 'react';
import { useRouter } from 'expo-router';

export default function Onboarding() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [goal, setGoal] = useState('');
  const [age, setAge] = useState('');

  const handleContinue = () => {
    // TODO: Save to backend or local storage
    if (name && goal && age) {
      router.replace('/(tabs)');
    } else {
      alert('Please fill all fields');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome!</Text>
      <TextInput style={styles.input} placeholder="Your Name" onChangeText={setName} />
      <TextInput style={styles.input} placeholder="Your Goal (e.g. Lose weight)" onChangeText={setGoal} />
      <TextInput style={styles.input} placeholder="Your Age" keyboardType="numeric" onChangeText={setAge} />
      <Button title="Continue" onPress={handleContinue} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, marginTop: 80 },
  title: { fontSize: 26, fontWeight: 'bold', marginBottom: 20 },
  input: { borderWidth: 1, padding: 10, marginVertical: 10, borderRadius: 5 },
});
