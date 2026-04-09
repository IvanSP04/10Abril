// ============================================================
// Original.js - Pantalla principal del quiz de Simpsons
// Integrante C - Función original con datos del API
// ============================================================

import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
} from "react-native";

// Importamos los estilos compartidos y los colores
import styles, { COLORES } from "./OriginalStyles";

// ── Cuántas preguntas tiene el juego ──────────────────────────
const TOTAL_PREGUNTAS = 10;

// ── Ya no recibe 'navigation', ahora recibe 'irAResultado' ───
// irAResultado es una función que viene del App.js para cambiar pantalla
export default function Original({ irAResultado }) {

  // ── Estados principales ───────────────────────────────────
  const [personajes, setPersonajes] = useState([]);          // lista de personajes de la API
  const [pregunta, setPregunta] = useState(null);            // pregunta actual
  const [opciones, setOpciones] = useState([]);              // 4 opciones de respuesta
  const [respuestaElegida, setRespuestaElegida] = useState(null); // lo que eligió el usuario
  const [puntaje, setPuntaje] = useState(0);                 // cuántas respuestas correctas
  const [numeroPregunta, setNumeroPregunta] = useState(1);   // en qué pregunta vamos
  const [cargando, setCargando] = useState(true);            // true mientras carga la API

  // ── 1. Al abrir la pantalla, traemos los personajes ───────
  useEffect(() => {
    obtenerPersonajes();
  }, []);

  // ── 2. Cuando ya tenemos personajes, generamos la 1ra pregunta
  useEffect(() => {
    if (personajes.length > 0) {
      generarPregunta();
    }
  }, [personajes]);

  // ── Trae personajes de la API ─────────────────────────────
  const obtenerPersonajes = async () => {
    try {
      // Pedimos 2 páginas para tener más variedad (20 personajes por página)
      const res1 = await fetch("https://thesimpsonsapi.com/api/characters?page=1");
      const res2 = await fetch("https://thesimpsonsapi.com/api/characters?page=2");
      const data1 = await res1.json();
      const data2 = await res2.json();

      // Unimos ambas páginas en un solo array (la API devuelve `results`, no `characters`)
      const todos = [...(data1.results || []), ...(data2.results || [])];

      // Solo guardamos los que tienen foto y al menos una frase
      const validos = todos.filter(
        (p) => p.phrases?.length > 0 && p.portrait_path
      );

      setPersonajes(validos);
      setCargando(false); // apagamos el indicador de carga
    } catch (error) {
      console.log("Error al cargar la API:", error);
    }
  };

  // ── Genera una pregunta aleatoria ─────────────────────────
  const generarPregunta = () => {
    setRespuestaElegida(null); // limpiamos la respuesta anterior

    // Elegimos un personaje al azar → será la respuesta correcta
    const indice = Math.floor(Math.random() * personajes.length);
    const correcto = personajes[indice];

    // Elegimos el tipo de pregunta: 0 o 1
    const tipo = Math.floor(Math.random() * 2);

    let nuevaPregunta = {};

    if (tipo === 0) {
      // Tipo 0: mostrar la FOTO → el usuario adivina el nombre
      nuevaPregunta = {
        tipo: "foto",
        enunciado: "¿Quién es este personaje?",
        imagen: `https://cdn.thesimpsonsapi.com/500${correcto.portrait_path}`,
        respuestaCorrecta: correcto.name,
      };
    } else {
      // Tipo 1: mostrar el NOMBRE → el usuario adivina la ocupación
      nuevaPregunta = {
        tipo: "ocupacion",
        enunciado: `¿Cuál es la ocupación de ${correcto.name}?`,
        imagen: `https://cdn.thesimpsonsapi.com/500${correcto.portrait_path}`,
        respuestaCorrecta: correcto.occupation,
      };
    }

    // ── Armamos las 4 opciones ─────────────────────────────
    // Tomamos 3 personajes distintos al correcto en orden aleatorio
    const otros = personajes
      .filter((p) => p.name !== correcto.name)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3);

    // Si es tipo ocupación usamos nombres de ocupación, si no usamos nombres
    const opcionesFalsas =
      tipo === 2
        ? otros.map((p) => p.occupation)
        : otros.map((p) => p.name);

    // Mezclamos la correcta con las 3 falsas en orden aleatorio
    const todasOpciones = [nuevaPregunta.respuestaCorrecta, ...opcionesFalsas]
      .sort(() => Math.random() - 0.5);

    setPregunta(nuevaPregunta);
    setOpciones(todasOpciones);
  };

  // ── Cuando el usuario toca una opción ────────────────────
  const elegirRespuesta = (opcion) => {
    // Si ya respondió esta pregunta, ignoramos el toque
    if (respuestaElegida) return;

    setRespuestaElegida(opcion);

    // Calculamos si acertó para tener el puntaje correcto al instante
    const acerto = opcion === pregunta.respuestaCorrecta;
    const nuevoPuntaje = acerto ? puntaje + 1 : puntaje;

    if (acerto) setPuntaje(nuevoPuntaje);

    // Después de 1.5 segundos, avanzamos
    setTimeout(() => {
      if (numeroPregunta >= TOTAL_PREGUNTAS) {
        // Terminamos las 10 preguntas → llamamos irAResultado con el puntaje
        // Esta función viene de App.js y muestra ResultadosOriginal
        irAResultado(nuevoPuntaje, TOTAL_PREGUNTAS);
      } else {
        // Siguiente pregunta
        setNumeroPregunta((prev) => prev + 1);
        generarPregunta();
      }
    }, 1500);
  };

  // ── Decide el color del botón según si es correcto o no ──
  const colorBoton = (opcion) => {
    if (!respuestaElegida) return styles.botonNormal;                       // aún no respondió
    if (opcion === pregunta.respuestaCorrecta) return styles.botonCorrecto; // siempre verde
    if (opcion === respuestaElegida) return styles.botonIncorrecto;         // la que eligió mal
    return styles.botonNormal;
  };

  // ── Pantalla de carga ─────────────────────────────────────
  if (cargando) {
    return (
      <View style={styles.centrado}>
        <ActivityIndicator size="large" color={COLORES.amarillo} />
        <Text style={styles.textoEspera}>Cargando personajes...</Text>
      </View>
    );
  }

  // ── Pantalla principal del quiz ───────────────────────────
  return (
    <SafeAreaView style={styles.fondo}>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Fila superior: número de pregunta y puntaje */}
        <View style={styles.encabezado}>
          <Text style={styles.contador}>
            Pregunta {numeroPregunta}/{TOTAL_PREGUNTAS}
          </Text>
          <View style={styles.puntajePill}>
            <Text style={styles.puntaje}>{puntaje}</Text>
          </View>
        </View>

        <View style={styles.tarjetaPregunta}>
          {/* Texto de la pregunta */}
          <Text style={styles.enunciado}>{pregunta?.enunciado}</Text>

          {/* Imagen del personaje (solo si la pregunta la tiene) */}
          {pregunta?.imagen && (
            <Image
              source={{ uri: pregunta.imagen }}
              style={styles.imagen}
              resizeMode="contain"
            />
          )}
        </View>

        {/* Los 4 botones de respuesta */}
        <View style={styles.contenedorOpciones}>
          {opciones.map((opcion, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.boton, colorBoton(opcion)]}
              onPress={() => elegirRespuesta(opcion)}
            >
              <Text style={styles.textoBoton} numberOfLines={2}>
                {opcion}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
