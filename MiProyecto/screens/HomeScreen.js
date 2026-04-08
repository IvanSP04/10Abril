import { View, Text, StyleSheet } from 'react-native';

export default function HomeScreen() {
  return (
    <View style={styles.center}>
      <Text style={styles.title}>🍩 App Simpsons</Text>
      <Text style={styles.subtitle}>Selecciona una opción del menú</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 28, fontWeight: 'bold', color: '#FFD700' },
  subtitle: { fontSize: 14, color: '#666', marginTop: 8 },
});