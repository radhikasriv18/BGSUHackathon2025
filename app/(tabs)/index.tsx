import React, { useEffect, useState } from 'react';
  import { useFocusEffect } from 'expo-router';

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // useEffect(() => {
  //   fetch('http://127.0.0.1:8000/home') // Use 10.0.2.2 for Android emulator
  //     .then((res) => res.json())
  //     .then((data) => {
  //       console.log('Fetched data:', data);
  //       setPosts(data);
  //       setLoading(false);
  //     })
  //     .catch((error) => {
  //       console.error('Error fetching posts:', error);
  //       setLoading(false);
  //     });
  // }, []);



// remove current useEffect and replace with:
useFocusEffect(
  React.useCallback(() => {
    setLoading(true);
    fetch('http://127.0.0.1:8000/home')
      .then((res) => res.json())
      .then((data) => {
        setPosts(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching posts:', error);
        setLoading(false);
      });
  }, [])
);

  return (
    <View style={styles.container}>
      {/* Top Bar */}
      <View style={styles.topBar}>
        <Text style={styles.heading}>Community Feed</Text>
        <TouchableOpacity onPress={() => router.push('/settings')}>
          <Ionicons name="settings-outline" size={26} color="#000" />
        </TouchableOpacity>
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#000" />
      ) : (
        <ScrollView showsVerticalScrollIndicator={false}>
          {posts.map((post, index) => (
            <View key={post.id || index} style={styles.feedItem}>
              <View style={styles.userRow}>
                <Ionicons
                  name="person-circle-outline"
                  size={26}
                  color="#333"
                />
                <Text style={styles.username}>@{post.username}</Text>
              </View>
              <Text style={styles.caption}>{post.caption}</Text>
              <Text style={styles.timestamp}>
                {new Date(post.created_at).toLocaleString()}
              </Text>
            </View>
          ))}
        </ScrollView>
      )}
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
    marginBottom: 4,
  },
  timestamp: {
    fontSize: 12,
    color: '#666',
    fontStyle: 'italic',
  },
});
