import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function Settings() {
  const router = useRouter();

  const handleProfile = () => {
    router.push('/profile');
  };

  const handleLogout = async () => {
  try {
    await AsyncStorage.removeItem('access_token');
    Alert.alert('Logged out', 'You have been successfully logged out.');
    router.replace('/login');
  } catch (error) {
    console.error('Logout error:', error);
    Alert.alert('Error', 'Failed to log out. Please try again.');
  }
};
  const handleBackToHome = () => {
    router.replace('/(tabs)');// 👈 Navigates back to Home screen in (tabs)
  };

  return (
    <View style={styles.container}>
      {/* Back to Home Button */}
      <TouchableOpacity onPress={handleBackToHome} style={styles.backButton}>
        <Ionicons name="arrow-back" size={24} color="#000" />
      </TouchableOpacity>

      <Text style={styles.heading}>Settings</Text>

      <TouchableOpacity style={styles.option} onPress={handleProfile}>
        <Ionicons name="person-outline" size={22} color="#000" style={styles.icon} />
        <Text style={styles.label}>Profile</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.option} onPress={handleLogout}>
        <Ionicons name="log-out-outline" size={22} color="#000" style={styles.icon} />
        <Text style={styles.label}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 24,
    backgroundColor: '#D0D4D5',
  },
  backButton: {
    marginBottom: 20,
  },
  heading: {
    fontSize: 26,
    fontWeight: 'bold',
    fontStyle: 'italic',
    color: '#000',
    marginBottom: 30,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#aaa',
  },
  icon: {
    marginRight: 12,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    fontStyle: 'italic',
    color: '#000',
  },
});
