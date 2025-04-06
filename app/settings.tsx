import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function Settings() {
  const router = useRouter();

  const handleProfile = () => {
    router.push('/profile');
  };

  const handleLogout = () => {
    // TODO: Clear token/session from AsyncStorage if using auth
    router.replace('/login');
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
