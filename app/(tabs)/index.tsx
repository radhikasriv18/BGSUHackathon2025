import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const samplePosts = [
  { id: 1, username: '@ananya', image: 'https://via.placeholder.com/300', caption: 'Day 5! Crushed my squats 💪' },
  { id: 2, username: '@rahul', image: 'https://via.placeholder.com/300/aaa', caption: 'Mindfulness challenge ✅' },
  { id: 3, username: '@sita', image: 'https://via.placeholder.com/300/888', caption: 'Healthy lunch with quinoa 🥗' },
];

export default function Home() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* Top Bar with Title + Settings Button */}
      <View style={styles.topBar}>
        <Text style={styles.heading}>Community Feed</Text>
        <TouchableOpacity onPress={() => router.push('/settings')}>
          <Ionicons name="settings-outline" size={26} color="#000" />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {samplePosts.map((post) => (
          <View key={post.id} style={styles.feedItem}>
            <View style={styles.userRow}>
              <Ionicons name="person-circle" size={28} color="#000" style={{ marginRight: 6 }} />
              <Text style={styles.username}>{post.username}</Text>
            </View>
            <Image source={{ uri: post.image }} style={styles.postImage} />
            <Text style={styles.caption}>{post.caption}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#D0D4D5',
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  heading: {
    fontSize: 26,
    fontWeight: 'bold',
    fontStyle: 'italic',
    color: '#000',
  },
  feedItem: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 12,
    marginBottom: 18,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  userRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  username: {
    fontWeight: 'bold',
    fontStyle: 'italic',
    fontSize: 16,
    color: '#000',
  },
  postImage: {
    width: '100%',
    height: 220,
    borderRadius: 10,
    marginBottom: 10,
  },
  caption: {
    fontSize: 15,
    fontWeight: 'bold',
    fontStyle: 'italic',
    color: '#000',
  },
});
