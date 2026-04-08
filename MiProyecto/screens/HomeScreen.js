import { View, Text, StyleSheet } from 'react-native';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>🏠 Bienvenido</Text>
      <Text style={styles.subtitle}>App del Taller</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 32, fontWeight: 'bold', color: '#2196F3' },
  subtitle: { fontSize: 16, color: '#666', marginTop: 8 },
});