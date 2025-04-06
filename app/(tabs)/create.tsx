import { StyleSheet, TextInput, ScrollView, Image, View, TouchableOpacity, Text } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useState } from 'react';
import { ThemedText } from '@/components/ThemedText';

export default function CreatePostScreen() {
  const [media, setMedia] = useState<string | null>(null);
  const [caption, setCaption] = useState('');

  const pickMedia = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled && result.assets.length > 0) {
      setMedia(result.assets[0].uri);
    }
  };

  const handlePost = () => {
    alert('Post submitted!');
    console.log({ caption, media });
    setCaption('');
    setMedia(null);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <ThemedText style={styles.title} type="title">
        Create Post
      </ThemedText>

      <TouchableOpacity style={styles.mediaButton} onPress={pickMedia}>
        <Text style={styles.mediaButtonText}>+ Add Photo or Video</Text>
      </TouchableOpacity>

      {media && (
        <Image source={{ uri: media }} style={styles.preview} resizeMode="cover" />
      )}

      <TextInput
        placeholder="Write a caption..."
        style={styles.input}
        multiline
        value={caption}
        onChangeText={setCaption}
        placeholderTextColor="#555"
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
    fontSize: 46,
    fontWeight: 'bold',
    fontStyle: 'italic',
    textAlign: 'center',
    color: '#000',
    marginBottom: 10,
  },
  mediaButton: {
    backgroundColor: '#333333',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  mediaButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontStyle: 'italic',
    fontSize: 16,
  },
  preview: {
    width: '100%',
    height: 220,
    borderRadius: 12,
    backgroundColor: '#E7E9EA',
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
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 4,
  },
  postButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontStyle: 'italic',
    fontSize: 16,
  },
});
