import { useEffect, useState } from 'react';
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch('http://127.0.0.1:8000home');
        const data = await res.json();
        setPosts(data.reverse()); // Newest first
      } catch (err) {
        console.error('Failed to fetch posts:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Community Feed</Text>

      <TouchableOpacity style={styles.settingsButton} onPress={() => router.push('/settings')}>
        <Ionicons name="settings-outline" size={24} color="#000" />
      </TouchableOpacity>

      {loading ? (
        <ActivityIndicator size="large" color="#000" />
      ) : (
        posts.map((post) => (
          <View key={post.id} style={styles.postCard}>
            <View style={styles.userRow}>
              <Ionicons name="person-circle-outline" size={28} color="#000" />
              <Text style={styles.username}>{post.username}</Text>
            </View>

            {post.image_url && (
              <Image
                source={{ uri: `http://127.0.0.1:8000${post.image_url}` }}
                style={styles.image}
              />
            )}

            <Text style={styles.caption}>{post.caption}</Text>
            <Text style={styles.timestamp}>
              {new Date(post.created_at).toLocaleString()}
            </Text>
          </View>
        ))
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    gap: 16,
    flexGrow: 1,
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
  settingsButton: {
    position: 'absolute',
    top: 60,
    right: 24,
  },
  postCard: {
    backgroundColor: '#E7E9EA',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  userRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  username: {
    marginLeft: 8,
    fontWeight: 'bold',
    fontStyle: 'italic',
    fontSize: 16,
    color: '#000',
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
    backgroundColor: '#ccc',
  },
  caption: {
    fontSize: 15,
    fontWeight: 'bold',
    fontStyle: 'italic',
    color: '#000',
    marginBottom: 6,
  },
  timestamp: {
    fontSize: 12,
    color: '#333',
    fontStyle: 'italic',
    textAlign: 'right',
  },
});
