import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function ChallengesScreen() {
  const [challenges, setChallenges] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchChallenges = async () => {
      const token = await AsyncStorage.getItem('access_token');
      if (!token) {
        Alert.alert('Error', 'Authentication failed. Please log in again.');
        return;
      }

      try {
        const formData = new FormData();
        formData.append('access_token', token);

        const res = await fetch('http://127.0.0.1:8000/viewchallenges', {
          method: 'POST',
          body: formData,
        });

        const data = await res.json();
        if (res.ok) {
          setChallenges(data); // ✅ expected to be an array
        } else {
          console.error('Fetch failed:', data);
        }
      } catch (err) {
        console.error('API error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchChallenges();
  }, []);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header Row with Button */}
      <View style={styles.header}>
        <Text style={styles.heading}>Challenges</Text>
        <TouchableOpacity
          style={styles.createButton}
          onPress={() => router.push('/createchallenge')}
        >
          <Ionicons name="add-circle-outline" size={24} color="#fff" />
          <Text style={styles.createButtonText}>New</Text>
        </TouchableOpacity>
      </View>

      {challenges.length === 0 ? (
        <View style={styles.center}>
          <Text style={styles.emptyText}>You haven’t started any challenges yet.</Text>
          <Text style={styles.subText}>Invite a friend and get going!</Text>
        </View>
      ) : (
        <ScrollView contentContainerStyle={styles.list}>
          {challenges.map((item, index) => (
            <View key={index} style={styles.card}>
              <Text style={styles.cardTitle}>{item.title || 'Challenge'}</Text>
              <Text>{item.description || 'No description provided.'}</Text>
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
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heading: {
    fontSize: 26,
    fontWeight: 'bold',
    fontStyle: 'italic',
    color: '#000',
  },
  subText: {
    marginTop: 6,
    fontStyle: 'italic',
    fontSize: 14,
    color: '#555',
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    fontStyle: 'italic',
    textAlign: 'center',
    color: '#000',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  createButton: {
    backgroundColor: '#333',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  createButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontStyle: 'italic',
    fontSize: 14,
  },
  list: {
    gap: 16,
    paddingBottom: 40,
  },
  card: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 6,
  },
});
