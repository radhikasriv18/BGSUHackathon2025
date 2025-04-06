import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useState } from 'react';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function CreateChallengeScreen() {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [customChallenge, setCustomChallenge] = useState('');
  const [description, setDescription] = useState('');
  const [friendEmail, setFriendEmail] = useState('');
  const router = useRouter();

  const categories = [
    'Morning Walk',
    'No Sugar',
    'Drink 2L Water',
    '10 Min Meditation',
    'Custom',
  ];

  const handleInvite = async () => {
    const challengeName =
      selectedCategory === 'Custom' ? customChallenge : selectedCategory;

    if (!challengeName || !description || !friendEmail) {
      Alert.alert('Please fill out all fields.');
      return;
    }

    const access_token = await AsyncStorage.getItem('access_token');
    if (!access_token) {
      Alert.alert('Error', 'Please log in again.');
      return;
    }

    const payload = {
      access_token,
      challenge_name: challengeName,
      description,
      user_invitation: friendEmail,
    };

    try {
      const res = await fetch('http://127.0.0.1:8000/createchallenges', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (res.ok) {
        Alert.alert('Challenge sent successfully!');
        router.push('/challenges');
      } else {
        Alert.alert('Error', data?.message || 'Could not send challenge.');
      }
    } catch (err) {
      console.error('API error:', err);
      Alert.alert('Something went wrong. Try again.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create New Challenge</Text>

      <Text style={styles.label}>Choose a Category</Text>
      <View style={styles.categoryWrap}>
        {categories.map((item) => (
          <TouchableOpacity
            key={item}
            style={[
              styles.categoryBox,
              selectedCategory === item && styles.selectedBox,
            ]}
            onPress={() => setSelectedCategory(item)}
          >
            <Text
              style={[
                styles.categoryText,
                selectedCategory === item && styles.selectedText,
              ]}
            >
              {item}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {selectedCategory === 'Custom' && (
        <TextInput
          style={styles.input}
          placeholder="Enter your own challenge name"
          placeholderTextColor="#555"
          value={customChallenge}
          onChangeText={setCustomChallenge}
        />
      )}

      <Text style={styles.label}>Description</Text>
      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="What will this challenge include?"
        placeholderTextColor="#555"
        value={description}
        onChangeText={setDescription}
        multiline
      />

      <Text style={styles.label}>Invite Friend (Email)</Text>
      <TextInput
        style={styles.input}
        placeholder="friend@example.com"
        keyboardType="email-address"
        autoCapitalize="none"
        placeholderTextColor="#555"
        value={friendEmail}
        onChangeText={setFriendEmail}
      />

      <TouchableOpacity style={styles.button} onPress={handleInvite}>
        <Text style={styles.buttonText}>Invite Friend</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#D0D4D5',
    padding: 24,
  },
  title: {
    fontSize: 42,
    fontWeight: 'bold',
    fontStyle: 'italic',
    textAlign: 'center',
    color: '#000',
    marginBottom: 20,
  },
  label: {
    fontWeight: 'bold',
    fontStyle: 'italic',
    fontSize: 16,
    marginBottom: 6,
    color: '#000',
  },
  categoryWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 16,
  },
  categoryBox: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    backgroundColor: '#E7E9EA',
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: '#000',
  },
  selectedBox: {
    backgroundColor: '#000',
  },
  categoryText: {
    color: '#000',
    fontWeight: '600',
    fontStyle: 'italic',
  },
  selectedText: {
    color: '#fff',
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
    marginBottom: 14,
    color: '#000',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  button: {
    marginTop: 20,
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
