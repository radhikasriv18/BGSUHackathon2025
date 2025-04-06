import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ScrollView,
} from 'react-native';
import { useState } from 'react';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

const categories = [
  'Morning Walk',
  'Daily Steps',
  'Healthy Meal',
  'Workout',
  'Meditation',
  'No Sugar',
  'Drink 2L Water',
  'Custom',
];

export default function CreateChallengeScreen() {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [description, setDescription] = useState('');
  const [friendEmail, setFriendEmail] = useState('');
  const router = useRouter();

  const handleCreateChallenge = async () => {
    if (!selectedCategory || !description || !friendEmail) {
      Alert.alert('Please fill out all fields.');
      return;
    }

    const token = await AsyncStorage.getItem('access_token');
    if (!token) {
      Alert.alert('Authentication error. Please log in again.');
      return;
    }

    const payload = {
      access_token: token,
      challenge_name: selectedCategory,
      description,
      user_invitation: friendEmail,
    };

    try {
      const res = await fetch('http://127.0.0.1:8000/createchallenges', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (res.ok) {
        Alert.alert('Challenge created!');
        router.replace('/challenges'); // or route to confirmation
      } else {
        Alert.alert('Failed to create challenge', data.message || 'Try again.');
      }
    } catch (err) {
      console.error('Create challenge error:', err);
      Alert.alert('Something went wrong. Check console for details.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Create New Challenge</Text>

      <Text style={styles.label}>Choose a category</Text>
      <View style={styles.categoriesContainer}>
        {categories.map((cat) => (
          <TouchableOpacity
            key={cat}
            style={[
              styles.categoryBox,
              selectedCategory === cat && styles.selectedCategoryBox,
            ]}
            onPress={() => setSelectedCategory(cat)}
          >
            <Text
              style={[
                styles.categoryText,
                selectedCategory === cat && styles.selectedCategoryText,
              ]}
            >
              {cat}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.label}>Description</Text>
      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="What will this challenge include?"
        placeholderTextColor="#555"
        value={description}
        onChangeText={setDescription}
        multiline
      />

      <Text style={styles.label}>Invite Friend (email)</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter email address"
        keyboardType="email-address"
        autoCapitalize="none"
        placeholderTextColor="#555"
        value={friendEmail}
        onChangeText={setFriendEmail}
      />

      <TouchableOpacity style={styles.button} onPress={handleCreateChallenge}>
        <Text style={styles.buttonText}>Invite Friend</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: '#D0D4D5',
    flexGrow: 1,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    fontStyle: 'italic',
    textAlign: 'center',
    color: '#000',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    fontStyle: 'italic',
    marginBottom: 8,
    color: '#000',
  },
  input: {
    backgroundColor: '#E7E9EA',
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: '#000',
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 16,
    fontWeight: 'bold',
    fontStyle: 'italic',
    color: '#000',
    marginBottom: 16,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  categoriesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 20,
  },
  categoryBox: {
    backgroundColor: '#fff',
    borderColor: '#000',
    borderWidth: 1,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 14,
  },
  selectedCategoryBox: {
    backgroundColor: '#333',
  },
  categoryText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000',
    fontStyle: 'italic',
  },
  selectedCategoryText: {
    color: '#fff',
  },
  button: {
    marginTop: 12,
    backgroundColor: '#333333',
    borderRadius: 10,
    paddingVertical: 16,
    alignItems: 'center',
    elevation: 3,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontStyle: 'italic',
    fontSize: 16,
  },
});
