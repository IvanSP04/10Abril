import { useState, useEffect } from 'react';
import {
  View, Text, Image, TouchableOpacity,
  ActivityIndicator, StyleSheet, SafeAreaView
} from 'react-native';

export default function FunctionScreen() {
  const [personaje, setPersonaje] = useState(null);
  const [frase, setFrase] = useState('');
  const [loading, setLoading] = useState(true);

  const obtenerFrase = async () => {
    setLoading(true);
    try {
      const res = await fetch('https://thesimpsonsapi.com/api/characters?limit=50');
      const data = await res.json();
      const personajes = data.results.filter(p => p.phrases?.length > 0 && p.portrait_path);
      const random = personajes[Math.floor(Math.random() * personajes.length)];
      const fraseRandom = random.phrases[Math.floor(Math.random() * random.phrases.length)];
      setPersonaje(random);
      setFrase(fraseRandom);
    } catch (e) {
      console.log(e);
    }
    setLoading(false);
  };

  useEffect(() => {
    obtenerFrase();
  }, []);

  if (loading) return <ActivityIndicator style={styles.center} size="large" color="#FFD700" />;

  return (
    <SafeAreaView style={styles.fondo}>
      <Text style={styles.titulo}>💬 Frases de Springfield</Text>

      <View style={styles.tarjeta}>
        <Image
          source={{ uri: `https://cdn.thesimpsonsapi.com/500${personaje.portrait_path}` }}
          style={styles.imagen}
          resizeMode="contain"
        />
        <Text style={styles.nombre}>{personaje.name}</Text>
        <Text style={styles.ocupacion}>{personaje.occupation || 'Springfield'}</Text>
        <Text style={styles.frase}>"{frase}"</Text>
      </View>

      <TouchableOpacity style={styles.boton} onPress={obtenerFrase}>
        <Text style={styles.botonTexto}>🎲 Otra frase</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  fondo: { flex: 1, backgroundColor: '#1a1a2e', alignItems: 'center', paddingTop: 20 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  titulo: { color: '#FFD700', fontSize: 22, fontWeight: 'bold', marginBottom: 20 },
  tarjeta: {
    backgroundColor: '#2a2a4e', borderRadius: 20, padding: 20,
    alignItems: 'center', width: '90%', elevation: 5
  },
  imagen: { width: 150, height: 150, borderRadius: 15, backgroundColor: '#111', marginBottom: 10 },
  nombre: { color: '#FFD700', fontSize: 20, fontWeight: 'bold', marginBottom: 4 },
  ocupacion: { color: '#aaa', fontSize: 14, marginBottom: 16 },
  frase: { color: '#fff', fontSize: 16, textAlign: 'center', lineHeight: 24, fontStyle: 'italic' },
  boton: {
    marginTop: 30, backgroundColor: '#FFD700', paddingVertical: 14,
    paddingHorizontal: 40, borderRadius: 12
  },
  botonTexto: { color: '#1a1a2e', fontSize: 18, fontWeight: 'bold' },
});