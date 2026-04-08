import { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, ActivityIndicator, StyleSheet } from 'react-native';

export default function FunctionScreen() {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetch('https://thesimpsonsapi.com/api/characters?limit=50')
      .then(res => res.json())
      .then(data => {
        const list = Array.isArray(data) ? data : data.data || data.characters || [];
        setCharacters(list);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const filtered = search
    ? characters.filter(c => c.name?.toLowerCase().includes(search.toLowerCase()))
    : characters;

  if (loading) return <ActivityIndicator style={styles.center} size="large" color="#FFD700" />;

  return (
    <View style={{ flex: 1 }}>
      <Text style={styles.searchLabel}>🔍 Buscar personaje:</Text>
      <View style={styles.buttonRow}>
        {['Homer', 'Bart', 'Lisa', 'Marge'].map(name => (
          <TouchableOpacity key={name} style={styles.chip} onPress={() => setSearch(name)}>
            <Text style={styles.chipText}>{name}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <TouchableOpacity style={styles.clearBtn} onPress={() => setSearch('')}>
        <Text style={styles.clearText}>Limpiar</Text>
      </TouchableOpacity>
      <FlatList
        data={filtered}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>{item.name}</Text>
            <Text style={styles.cardSub}>{item.occupation || 'Sin ocupación'}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  card: { margin: 10, padding: 15, backgroundColor: '#FFF9C4', borderRadius: 10 },
  cardTitle: { fontSize: 16, fontWeight: 'bold' },
  cardSub: { fontSize: 13, color: '#555', marginTop: 4 },
  searchLabel: { fontSize: 16, fontWeight: 'bold', margin: 10 },
  buttonRow: { flexDirection: 'row', flexWrap: 'wrap', paddingHorizontal: 10 },
  chip: { backgroundColor: '#FFD700', padding: 8, borderRadius: 20, margin: 4 },
  chipText: { fontWeight: 'bold' },
  clearBtn: { margin: 10, backgroundColor: '#eee', padding: 8, borderRadius: 8, alignItems: 'center' },
  clearText: { color: '#333' },
});