import { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';

import HomeScreen from './screens/HomeScreen';
import ListScreen from './screens/ListScreen';
import FunctionScreen from './screens/FunctionScreen';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('Home');

  const renderScreen = () => {
    if (currentScreen === 'Home') return <HomeScreen />;
    if (currentScreen === 'Lista') return <ListScreen />;
    if (currentScreen === 'Buscar') return <FunctionScreen />;
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.navbar}>
        {['Home', 'Lista', 'Buscar'].map(screen => (
          <TouchableOpacity
            key={screen}
            style={[styles.navItem, currentScreen === screen && styles.activeItem]}
            onPress={() => setCurrentScreen(screen)}
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