import { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';

import HomeScreen from './screens/HomeScreen';
import ListScreen from './screens/ListScreen';
import FunctionScreen from './screens/FunctionScreen';
import Original from './screens/Original';
import ResultadosOriginal from './screens/ResultadosOriginal';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('Home');

  // ── Esta variable controla si mostrar el resultado o el quiz ─
  // Cuando el usuario termina el quiz, pasamos a 'Resultado'
  const [triviaScreen, setTriviaScreen] = useState('quiz');
  const [puntajeFinal, setPuntajeFinal] = useState({ puntaje: 0, total: 0 });

  const renderScreen = () => {
    if (currentScreen === 'Home') return <HomeScreen />;
    if (currentScreen === 'Lista') return <ListScreen />;
    if (currentScreen === 'Buscar') return <FunctionScreen />;

    // ── Cuando el tab activo es 'Original' ───────────────────
    if (currentScreen === 'Original') {
      if (triviaScreen === 'quiz') {
        // Mostramos el quiz y le pasamos una función para ir al resultado
        return (
          <Original
            irAResultado={(puntaje, total) => {
              setPuntajeFinal({ puntaje, total });
              setTriviaScreen('resultado');
            }}
          />
        );
      }
      if (triviaScreen === 'resultado') {
        // Mostramos el resultado y le pasamos función para volver a jugar
        return (
          <ResultadosOriginal
            puntaje={puntajeFinal.puntaje}
            total={puntajeFinal.total}
            jugarDeNuevo={() => setTriviaScreen('quiz')}
            irAHome={() => setCurrentScreen('Home')}
          />
        );
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.navbar}>
        {/* Agregamos 'Original' a la lista de tabs */}
        {['Home', 'Lista', 'Buscar', 'Original'].map(screen => (
          <TouchableOpacity
            key={screen}
            style={[styles.navItem, currentScreen === screen && styles.activeItem]}
            onPress={() => {
              setCurrentScreen(screen);
              // Si vuelve a tocar Original, reinicia el quiz
              if (screen === 'Original') setTriviaScreen('quiz');
            }}
          >
            <Text style={[styles.navText, currentScreen === screen && styles.activeText]}>
              {screen}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <View style={{ flex: 1 }}>
        {renderScreen()}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  navbar: { flexDirection: 'row', backgroundColor: '#FFD700', paddingTop: 10 },
  navItem: { flex: 1, padding: 15, alignItems: 'center' },
  activeItem: { borderBottomWidth: 3, borderBottomColor: '#000' },
  navText: { color: 'rgba(0,0,0,0.5)', fontWeight: '600' },
  activeText: { color: '#000' },
});