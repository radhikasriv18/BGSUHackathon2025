import { Tabs } from 'expo-router';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{ headerShown: false }}
      tabBar={({ state, descriptors, navigation }) => (
        <View style={styles.tabBar}>
          {state.routes.map((route, index) => {
            const { options } = descriptors[route.key];
            const label = options.title || route.name;
            const isFocused = state.index === index;

            const iconName = {
              index: isFocused ? 'home' : 'home-outline',
              create: isFocused ? 'add-circle' : 'add-circle-outline',
              challenges: isFocused ? 'trophy' : 'trophy-outline',
            }[route.name] || 'ellipse-outline';

            const onPress = () => {
              if (!isFocused) {
                navigation.navigate(route.name);
              }
            };

            return (
              <TouchableOpacity key={route.key} onPress={onPress} style={styles.tab}>
                <Ionicons
                  name={iconName}
                  size={26}
                  color={isFocused ? '#333333' : '#888'}
                />
                <Text style={[styles.label, isFocused && styles.focusedLabel]}>
                  {label}
                </Text>

                {route.name === 'challenges' && (
                  <View style={styles.badge} />
                )}
              </TouchableOpacity>
            );
          })}
        </View>
      )}
    >
      <Tabs.Screen name="index" options={{ title: 'Home' }} />
      <Tabs.Screen name="create" options={{ title: 'Create' }} />
      <Tabs.Screen name="challenges" options={{ title: 'Challenges' }} />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: 'row',
    backgroundColor: '#A1A4A5', // 💥 Darker grey than before
    borderTopWidth: 0.5,
    borderColor: '#888',
    height: 65,
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingBottom: 6,
  },
  tab: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontSize: 12,
    color: '#888',
    fontWeight: 'bold',
    fontStyle: 'italic',
    marginTop: 2,
  },
  focusedLabel: {
    color: '#333333',
  },
  badge: {
    position: 'absolute',
    top: 4,
    right: -8,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#333',
  },
});
