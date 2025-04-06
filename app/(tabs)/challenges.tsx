import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useUser } from '../contexts/userContext';
import { useState } from 'react';
import { useRouter } from 'expo-router';

export default function ChallengesScreen() {
  const { user } = useUser();
  const router = useRouter();
  const [hasChallenge, setHasChallenge] = useState(false);

  if (!hasChallenge) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.title}>You haven’t started any challenges yet.</Text>
        <Text style={styles.subtitle}>Create one and invite a friend to get going!</Text>

        <TouchableOpacity style={styles.button} onPress={() => router.push('/createchallenge')}>
          <Text style={styles.buttonText}>Create Your First Challenge</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.greeting}>Hi {user?.name || 'User'}</Text>

      <View style={styles.streakContainer}>
        <Ionicons name="flame-outline" size={20} color="#ff5c5c" />
        <Text style={styles.streakText}>6-day streak</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Challenge Title</Text>
        <Text style={styles.cardDesc}>Description goes here...</Text>

        <View style={styles.avatarRow}>
          <View style={styles.avatar}>
            <Ionicons name="person-circle" size={40} color="#666" />
            <Text style={styles.username}>User A</Text>
          </View>
          <View style={styles.avatar}>
            <Ionicons name="person-circle" size={40} color="#666" />
            <Text style={styles.username}>User B</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.postButton} onPress={() => router.push('/upload-proof')}>
          <Text style={styles.buttonText}>Post Proof</Text>
        </TouchableOpacity>

        <Text style={styles.sectionLabel}>Day 1</Text>
        <View style={styles.proofRow}>
          <Text style={styles.proofText}>User A</Text>
          <Text style={styles.proofText}>✅</Text>
        </View>
        <View style={styles.proofRow}>
          <Text style={styles.proofText}>User B</Text>
          <Text style={styles.proofText}>❌</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 100,
    gap: 20,
    backgroundColor: '#D0D4D5',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 14,
    padding: 30,
    backgroundColor: '#D0D4D5',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    fontStyle: 'italic',
    textAlign: 'center',
    color: '#000',
  },
  subtitle: {
    textAlign: 'center',
    fontSize: 15,
    fontWeight: 'bold',
    fontStyle: 'italic',
    color: '#000',
  },
  button: {
    backgroundColor: '#333333',
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontStyle: 'italic',
    fontSize: 15,
    textAlign: 'center',
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
    fontStyle: 'italic',
    color: '#000',
  },
  streakContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#fceaea',
    padding: 10,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  streakText: {
    fontSize: 16,
    color: '#ff5c5c',
    fontWeight: 'bold',
    fontStyle: 'italic',
  },
  card: {
    backgroundColor: '#E7E9EA',
    padding: 16,
    borderRadius: 12,
    gap: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    fontStyle: 'italic',
    color: '#000',
  },
  cardDesc: {
    fontSize: 15,
    fontStyle: 'italic',
    color: '#000',
  },
  avatarRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  avatar: {
    alignItems: 'center',
    gap: 4,
  },
  username: {
    fontSize: 14,
    color: '#000',
    fontWeight: 'bold',
    fontStyle: 'italic',
  },
  postButton: {
    backgroundColor: '#333333',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  sectionLabel: {
    marginTop: 10,
    fontWeight: 'bold',
    fontStyle: 'italic',
    fontSize: 15,
    color: '#000',
  },
  proofRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    marginTop: 4,
  },
  proofText: {
    fontSize: 15,
    fontWeight: 'bold',
    fontStyle: 'italic',
    color: '#000',
  },
});
