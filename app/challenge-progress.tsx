import { View, Text, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';

export default function ChallengeProgressScreen() {
  const [proofUri, setProofUri] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const pickMedia = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      quality: 1,
    });

    if (!result.canceled) {
      setProofUri(result.assets[0].uri);
    }
  };

  const submitProof = () => {
    if (!proofUri) {
      Alert.alert('Please select a file first');
      return;
    }

    console.log('Submitting proof:', proofUri);
    setSubmitted(true);
    Alert.alert('Proof submitted!');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Day 1 Challenge</Text>
      <Text style={styles.subtitle}>
        Both users must upload proof to complete the challenge
      </Text>

      <View style={styles.usersRow}>
        <View style={styles.userBlock}>
          <Ionicons name="person-circle-outline" size={50} color="#333" />
          <Text style={styles.userText}>User A</Text>
          <Text style={styles.statusText}>✅ Submitted</Text>
        </View>
        <View style={styles.userBlock}>
          <Ionicons name="person-circle-outline" size={50} color="#333" />
          <Text style={styles.userText}>You</Text>
          <Text style={styles.statusText}>
            {submitted ? '✅ Submitted' : '❌ Pending'}
          </Text>
        </View>
      </View>

      <TouchableOpacity style={styles.uploadBox} onPress={pickMedia}>
        {proofUri ? (
          <Image source={{ uri: proofUri }} style={styles.preview} />
        ) : (
          <Text style={styles.uploadText}>Tap to upload proof</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={submitProof}>
        <Text style={styles.buttonText}>Submit Proof</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#D0D4D5',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    fontStyle: 'italic',
    textAlign: 'center',
    marginBottom: 8,
    color: '#000',
  },
  subtitle: {
    textAlign: 'center',
    marginBottom: 24,
    fontSize: 15,
    fontWeight: 'bold',
    fontStyle: 'italic',
    color: '#000',
  },
  usersRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 24,
  },
  userBlock: {
    alignItems: 'center',
    gap: 4,
  },
  userText: {
    fontSize: 16,
    fontWeight: 'bold',
    fontStyle: 'italic',
    color: '#000',
  },
  statusText: {
    fontSize: 14,
    fontWeight: 'bold',
    fontStyle: 'italic',
    color: '#000',
  },
  uploadBox: {
    backgroundColor: '#E7E9EA',
    height: 200,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    borderWidth: 1.5,
    borderColor: '#000',
  },
  uploadText: {
    color: '#555',
    fontSize: 16,
    fontWeight: 'bold',
    fontStyle: 'italic',
  },
  preview: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  button: {
    backgroundColor: '#333333',
    paddingVertical: 16,
    borderRadius: 10,
    alignItems: 'center',
    elevation: 3,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    fontStyle: 'italic',
  },
});
