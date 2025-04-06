import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function Home() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* Top Bar */}
      <View style={styles.topBar}>
        <Image source={require('@/assets/images/fitnesslogo.png')} style={styles.logo} />
        <TouchableOpacity onPress={() => router.push('/settings')}>
          <Ionicons name="settings-outline" size={24} color="black" />
        </TouchableOpacity>
      </View>

      <Text style={styles.heading}>Community Feed</Text>

      <ScrollView>
        {/* Sample Feed Post */}
        <View style={styles.feedItem}>
          <Text style={styles.username}>@ananya</Text>
          <Image
            source={{ uri: 'https://via.placeholder.com/300' }}
            style={styles.postImage}
          />
          <Text style={styles.caption}>Day 5! Crushed my squats 💪</Text>
        </View>

        {/* Duplicate or loop real posts here */}
        <View style={styles.feedItem}>
          <Text style={styles.username}>@rahul</Text>
          <Image
            source={{ uri: 'https://via.placeholder.com/300/aaa' }}
            style={styles.postImage}
          />
          <Text style={styles.caption}>Mindfulness challenge ✅</Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', paddingTop: 60, paddingHorizontal: 20 },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    width: 120,
    height: 30,
    resizeMode: 'contain',
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  feedItem: {
    backgroundColor: '#f5f5f5',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  username: {
    fontWeight: '600',
    marginBottom: 10,
  },
  postImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
  },
  caption: {
    fontSize: 14,
    color: '#444',
  },
});
