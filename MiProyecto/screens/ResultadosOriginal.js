// ============================================================
// ResultadosOriginal.js - Pantalla final con el puntaje
// Se muestra automáticamente al terminar las 10 preguntas
// ============================================================

import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";

// Importamos los estilos compartidos y los colores
import styles, { COLORES } from "./OriginalStyles";

// ── Ya no recibe 'navigation' ni 'route' ─────────────────────
// Ahora recibe directamente: puntaje, total y jugarDeNuevo
// Estas props vienen del App.js
export default function ResultadosOriginal({ puntaje, total, jugarDeNuevo, irAHome }) {

  // ── Calculamos el porcentaje para la barra de progreso ────
  const porcentaje = Math.round((puntaje / total) * 100);

  // ── Mensaje y color según qué tan bien le fue al usuario ──
  const obtenerMensaje = () => {
    if (puntaje >= 9) return { texto: "¡Excelente! ¡Eres un experto en Simpsons! 🏆", color: COLORES.amarillo };
    if (puntaje >= 7) return { texto: "¡Muy bien! Conoces bastante Springfield 🌟",   color: "#4CAF50" };
    if (puntaje >= 5) return { texto: "No está mal... pero puedes mejorar 😅",         color: "#FF9800" };
    return             { texto: "¡D'oh! Necesitas ver más Simpsons 😂",                color: "#f44336" };
  };

  const mensaje = obtenerMensaje();

  return (
    <SafeAreaView style={styles.fondo}>
      <View style={styles.contenedor}>

        {/* Título */}
        <Text style={styles.titulo}>¡Juego Terminado!</Text>

        {/* Emoji que cambia según el resultado */}
        <Text style={styles.emoji}>
          {puntaje >= 7 ? "🏆" : puntaje >= 5 ? "😅" : "😂"}
        </Text>

        {/* Número grande del puntaje: "7 / 10" */}
        <View style={styles.cajaPuntaje}>
          <Text style={styles.numeroPuntaje}>{puntaje}</Text>
          <Text style={styles.totalPuntaje}>/ {total}</Text>
        </View>

        {/* Porcentaje de aciertos */}
        <Text style={styles.porcentaje}>{porcentaje}% correcto</Text>

        {/* Barra de progreso visual */}
        <View style={styles.barraFondo}>
          <View
            style={[
              styles.barraRelleno,
              {
                // El ancho de la barra depende del porcentaje obtenido
                width: `${porcentaje}%`,
                // El color de la barra depende del mensaje
                backgroundColor: mensaje.color,
              },
            ]}
          />
        </View>

        {/* Mensaje personalizado */}
        <Text style={[styles.mensaje, { color: mensaje.color }]}>
          {mensaje.texto}
        </Text>

        {/* Botón para volver a jugar → llama jugarDeNuevo que viene de App.js */}
        <TouchableOpacity
          style={styles.botonJugarDeNuevo}
          onPress={jugarDeNuevo}
        >
          <Text style={styles.textoBotonPrincipal}>Jugar de nuevo</Text>
        </TouchableOpacity>

        {/* Botón para ir al menú principal */}
        <TouchableOpacity
          style={styles.botonInicio}
          onPress={irAHome}
        >
          <Text style={styles.textoBotonSecundario}>Ir al inicio</Text>
        </TouchableOpacity>

      </View>
    </SafeAreaView>
  );
}
