import { StyleSheet, TextInput, Button } from 'react-native';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function CreatePostScreen() {
  return (
    <ParallaxScrollView
  headerBackgroundColor={{ light: '#f0f0f0', dark: '#1a1a1a' }}
  headerImage={<></>} // 👈 Empty React fragment, satisfies the requirement
>
  <ThemedView style={styles.container}>
    <ThemedText type="title">Create Post</ThemedText>
    <TextInput
      placeholder="What's your health update?"
      style={styles.input}
      multiline
    />
    <Button title="Post" onPress={() => alert('Post submitted!')} />
  </ThemedView>
</ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 20,
    marginTop: 40,
    paddingHorizontal: 20,
  },
  input: {
    height: 100,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 8,
    textAlignVertical: 'top',
  },
});
