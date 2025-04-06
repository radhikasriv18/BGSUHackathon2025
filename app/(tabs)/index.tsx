import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const samplePosts = [
  { id: 1, username: '@ananya', caption: 'Day 5! Crushed my squats 💪' },
  { id: 2, username: '@rahul', caption: 'Mindfulness challenge ✅' },
  { id: 3, username: '@sita', caption: 'Healthy lunch with quinoa 🥗' },
];

export default function Home() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* Top Bar */}
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
              <Ionicons name="person-circle-outline" size={26} color="#333" />
              <Text style={styles.username}>{post.username}</Text>
            </View>
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
    marginBottom: 20,
  },
  heading: {
    fontSize: 26,
    fontWeight: 'bold',
    fontStyle: 'italic',
    color: '#000',
  },
  feedItem: {
    backgroundColor: '#fff',
    padding: 18,
    borderRadius: 14,
    marginBottom: 16,
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
    gap: 6,
  },
  username: {
    fontWeight: 'bold',
    fontStyle: 'italic',
    fontSize: 15,
    color: '#333',
  },
  caption: {
    fontSize: 16,
    color: '#1a1a1a',
    fontStyle: 'italic',
    lineHeight: 22,
  },
});
