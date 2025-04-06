import { StyleSheet, TextInput, Button, ScrollView, Image, View, TouchableOpacity, Text } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useState } from 'react';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

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
    justifyContent: 'center', // 💡 Vertically center when content is small
    backgroundColor: '#f7f7f7',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  mediaButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  mediaButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 15,
  },
  preview: {
    width: '100%',
    height: 200,
    borderRadius: 12,
    backgroundColor: '#eee',
  },
  input: {
    minHeight: 80,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 10,
    fontSize: 14,
    backgroundColor: '#fff',
    textAlignVertical: 'top',
  },
  postButton: {
    backgroundColor: '#28C76F',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  postButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 15,
  },
});
