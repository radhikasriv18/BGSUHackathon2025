import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ProfileScreen() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      const token = await AsyncStorage.getItem('access_token');
      try {
        const res = await fetch('http://127.0.0.1:8000/user/profile', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        if (res.ok) setUser(data);
        else console.warn('Error fetching user:', data);
      } catch (e) {
        console.error('Fetch error:', e);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#0077ff" />
      </View>
    );
  }

  if (!user) {
    return (
      <View style={styles.centered}>
        <Text>Failed to load profile.</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.avatar}>
        <Ionicons name="person-circle" size={100} color="#777" />
      </View>

      <Text style={styles.name}>
        {user.first_name} {user.last_name}
      </Text>
      <Text style={styles.username}>@{user.user_name}</Text>
      <Text style={styles.email}>{user.email_address}</Text>

      <View style={styles.infoBox}>
        <Text style={styles.infoLabel}>Gender:</Text>
        <Text style={styles.infoText}>{user.gender}</Text>
      </View>
      <View style={styles.infoBox}>
        <Text style={styles.infoLabel}>Phone:</Text>
        <Text style={styles.infoText}>{user.phone_number}</Text>
      </View>
      <View style={styles.infoBox}>
        <Text style={styles.infoLabel}>Height / Weight:</Text>
        <Text style={styles.infoText}>
          {user.height} ft / {user.weight} kg
        </Text>
      </View>
      <View style={styles.infoBox}>
        <Text style={styles.infoLabel}>Smoke:</Text>
        <Text style={styles.infoText}>{user.smoke_habits}</Text>
      </View>
      <View style={styles.infoBox}>
        <Text style={styles.infoLabel}>Alcohol:</Text>
        <Text style={styles.infoText}>{user.alcohol_habits}</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: '#f2f2f2',
    alignItems: 'center',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatar: {
    marginBottom: 10,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1d3557',
  },
  username: {
    fontSize: 14,
    color: '#444',
    fontStyle: 'italic',
  },
  email: {
    fontSize: 14,
    color: '#777',
    marginBottom: 20,
  },
  infoBox: {
    width: '100%',
    padding: 12,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginVertical: 6,
  },
  infoLabel: {
    fontWeight: '600',
    color: '#333',
    fontSize: 14,
  },
  infoText: {
    fontSize: 15,
    color: '#000',
    marginTop: 4,
  },
});
