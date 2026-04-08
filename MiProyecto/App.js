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
    if (currentScreen === 'Función') return <FunctionScreen />;
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.navbar}>
        {['Home', 'Lista', 'Función'].map((screen) => (
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
      <View style={styles.content}>
        {renderScreen()}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  navbar: { flexDirection: 'row', backgroundColor: '#2196F3', paddingTop: 10 },
  navItem: { flex: 1, padding: 15, alignItems: 'center' },
  activeItem: { borderBottomWidth: 3, borderBottomColor: '#fff' },
  navText: { color: 'rgba(255,255,255,0.7)', fontWeight: '600' },
  activeText: { color: '#fff' },
  content: { flex: 1 },
});