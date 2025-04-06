import { StyleSheet, TextInput, ScrollView, Image, View, Alert, TouchableOpacity, Text, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as FileSystem from 'expo-file-system';
import { useState } from 'react';
import { ThemedText } from '@/components/ThemedText';


export default function CreatePostScreen() {
  // const [media, setMedia] = useState<string | null>(null);
  const [caption, setCaption] = useState('');

  // const saveBase64AsImage = async (base64: string) => {
  //   const fileName = `upload_${Date.now()}.jpg`;
  //   const fileUri = `${FileSystem.cacheDirectory}${fileName}`;
  
  //   await FileSystem.writeAsStringAsync(fileUri, base64, {
  //     encoding: FileSystem.EncodingType.Base64,
  //   });
  
  //   return fileUri; // ✅ This is now a file:// URI
  // };
  

  // const pickMedia = async () => {
  //   const result = await ImagePicker.launchImageLibraryAsync({
  //     mediaTypes: ImagePicker.MediaTypeOptions.Images,
  //     allowsEditing: true,
  //     quality: 1,
  //     base64: true, // ensure we get base64
  //   });
    
  //   if (!result.canceled && result.assets.length > 0) {
  //     const asset = result.assets[0];
    
  //     if (asset.base64) {
  //       const localUri = await saveBase64AsImage(asset.base64);
  //       setMedia(localUri);
  //       console.log("Local file saved:", localUri);
  //     } else {
  //       console.warn('Base64 data not available from selected image.');
  //       alert('Failed to read image data. Please try a different image.');
  //     }
  //   }
  // };
  
  
  const handlePost = async () => {
    // if (!media) {
    //   alert('Please select an image or video.');
    //   return;
    // }

    const token = await AsyncStorage.getItem('access_token');
    console.log(token);
    if (!token) {
      Alert.alert('Error', 'Authentication error. Please log in again.');
      return;
    }   

    // const fileName = media.split('/').pop() || `upload_${Date.now()}.jpg`;
    // const mimeType = 'image/jpeg';

    const formData = new FormData();
    formData.append('caption', caption);
    formData.append('access_token', token);
  
    // console.log('Selected media URI:', media);


    console.log(formData)
    try {
      const response = await fetch('http://127.0.0.1:8000/uploadposts', {
        method: 'POST',
        // headers: {
        //   'Content-Type': 'multipart/form-data',
        // },
        body: formData, // ✅ Let fetch set Content-Type and boundary
      });
  
      const result = await response.json();
      console.log(result.message)
      if (response.ok) {
        alert('Post submitted!');
        setCaption('');
      } else {
        alert('Failed to upload post: ' + JSON.stringify(result));
      }
    } catch (error) {
      console.error('Upload error:', error);
      alert('Error uploading post. See console for details.');
    }
  };
  

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <ThemedText style={styles.title} type="title">
        Create Post
      </ThemedText>

      {/* <TouchableOpacity style={styles.mediaButton} onPress={pickMedia}>
        <Text style={styles.mediaButtonText}>+ Add Photo or Video</Text>
      </TouchableOpacity> */}

      {/* {media && (
        <Image source={{ uri: media }} style={styles.preview} resizeMode="cover" />
      )} */}

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
    justifyContent: 'center',
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