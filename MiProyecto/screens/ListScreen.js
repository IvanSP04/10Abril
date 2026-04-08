import { useState, useEffect } from 'react';
import { View, FlatList, Text, ActivityIndicator, StyleSheet } from 'react-native';

export default function ListScreen() {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://thesimpsonsapi.com/api/characters?limit=20')
      .then(res => res.json())
      .then(data => {
        setCharacters(data.results);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return <ActivityIndicator style={styles.center} size="large" color="#FFD700" />;

  return (
    <FlatList
      data={characters}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <View style={styles.card}>
          <Text style={styles.cardTitle}>{item.name}</Text>
          <Text style={styles.cardSub}>👔 {item.occupation || 'Sin ocupación'}</Text>
          <Text style={styles.cardSub}>🎂 {item.age} años</Text>
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  card: { margin: 10, padding: 15, backgroundColor: '#FFF9C4', borderRadius: 10 },
  cardTitle: { fontSize: 16, fontWeight: 'bold' },
  cardSub: { fontSize: 13, color: '#555', marginTop: 4 },
});