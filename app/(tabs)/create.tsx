import { StyleSheet, TextInput, ScrollView, View, Alert, TouchableOpacity, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState } from 'react';
import { ThemedText } from '@/components/ThemedText';

export default function CreatePostScreen() {
  const [caption, setCaption] = useState('');

  const handlePost = async () => {
    const token = await AsyncStorage.getItem('access_token');
    if (!token) {
      Alert.alert('Error', 'Authentication error. Please log in again.');
      return;
    }

    const formData = new FormData();
    formData.append('caption', caption);
    formData.append('access_token', token);

    try {
      const response = await fetch('http://127.0.0.1:8000/uploadposts', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();
      if (response.ok) {
        Alert.alert('Post submitted!');
        setCaption('');
      } else {
        Alert.alert('Failed to upload post', JSON.stringify(result));
      }
    } catch (error) {
      console.error('Upload error:', error);
      Alert.alert('Error uploading post. See console for details.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <ThemedText style={styles.title} type="title">
        Create Post
      </ThemedText>

      <TextInput
        placeholder="Write a caption..."
        placeholderTextColor="#555"
        style={styles.input}
        multiline
        value={caption}
        onChangeText={setCaption}
      />

      <TouchableOpacity style={styles.postButton} onPress={handlePost}>
        <Text style={styles.postButtonText}>Post</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    gap: 16,
    flexGrow: 1,
    justifyContent: 'center',
    backgroundColor: '#D0D4D5',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    fontStyle: 'italic',
    textAlign: 'center',
    color: '#000',
    marginBottom: 10,
  },
  input: {
    minHeight: 100,
    borderWidth: 1.5,
    borderColor: '#000',
    borderRadius: 10,
    padding: 12,
    fontSize: 16,
    fontWeight: 'bold',
    fontStyle: 'italic',
    backgroundColor: '#E7E9EA',
    textAlignVertical: 'top',
    color: '#000',
  },
  postButton: {
    backgroundColor: '#333333',
    paddingVertical: 16,
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  postButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontStyle: 'italic',
    fontSize: 16,
  },
});
