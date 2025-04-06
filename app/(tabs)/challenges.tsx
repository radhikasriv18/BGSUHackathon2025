import { StyleSheet, Text, View, ScrollView, Button, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function ChallengesScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.greeting}>Hi Radhika</Text>

      {/* Streak Section */}
      <View style={styles.streakContainer}>
        <Ionicons name="flame-outline" size={20} color="#ff5c5c" />
        <Text style={styles.streakText}>6-day streak</Text>
      </View>

      {/* Daily Challenge Card */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Daily Challenge</Text>
        <Text>Walk 5,000 steps today</Text>
        <View style={styles.rowBetween}>
          <Text>Matched with: @rahul</Text>
          <Text>7 hrs left</Text>
        </View>
        <View style={styles.row}>
          <Button title="Mark as Done" onPress={() => {}} />
          <Button title="Skip" onPress={() => {}} />
        </View>
      </View>

      {/* Opponent Match Card */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>You vs @rahul</Text>
        <View style={styles.row}>
          <Image source={require('@/assets/images/fitnesslogo.png')} style={styles.logo} />
          <View>
            <Text>Both need to submit proof!</Text>
            <Button title="View Progress" onPress={() => {}} />
          </View>
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
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  streakContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#ffe5e5',
    padding: 10,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  streakText: {
    fontSize: 16,
    color: '#ff5c5c',
    fontWeight: '600',
  },
  card: {
    backgroundColor: '#f5f5f5',
    padding: 15,
    borderRadius: 10,
    gap: 10,
  },
  cardTitle: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
    alignItems: 'center',
  },
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  logo: {
    width: 60,
    height: 60,
    marginRight: 10,
  },
});
