import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useState } from 'react';
import { useRouter } from 'expo-router';

export default function CreateChallengeScreen() {
  const [challengeName, setChallengeName] = useState('');
  const [description, setDescription] = useState('');
  const [friendEmail, setFriendEmail] = useState('');
  const router = useRouter();

  const handleInvite = () => {
    if (!challengeName || !description || !friendEmail) {
      Alert.alert('Please fill out all fields.');
      return;
    }

    console.log('Challenge Created:', {
      challengeName,
      description,
      invitedEmail: friendEmail,
    });

    router.push('/challenge-progress');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create New Challenge</Text>

      <Text style={styles.label}>Challenge Name</Text>
      <TextInput
        style={styles.input}
        placeholder="e.g., Morning Walk"
        placeholderTextColor="#555"
        value={challengeName}
        onChangeText={setChallengeName}
      />

      <Text style={styles.label}>Description of the challenge</Text>
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
        placeholder="enter email address"
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
    fontSize: 46,
    fontWeight: 'bold',
    fontStyle: 'italic',
    marginBottom: 24,
    textAlign: 'center',
    color: '#000',
  },
  label: {
    fontWeight: 'bold',
    fontStyle: 'italic',
    marginBottom: 6,
    marginTop: 14,
    fontSize: 16,
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
    color: '#000',
    fontWeight: 'bold',
    fontStyle: 'italic',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  button: {
    marginTop: 28,
    backgroundColor: '#333333',
    borderRadius: 10,
    paddingVertical: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
    elevation: 3,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontStyle: 'italic',
    fontSize: 16,
  },
});
