// ============================================================
// originalStyles.js - Estilos compartidos para ambas pantallas
// OriginalScreen.js y ResultadoScreen.js usan este archivo
// ============================================================

import { StyleSheet } from "react-native";

// ── Colores principales del juego ─────────────────────────────
// Si quieres cambiar un color, solo lo cambias aquí y se aplica en toda la app
export const COLORES = {
  fondo: "#1a1a2e",        // azul muy oscuro (fondo de toda la app)
  fondoTarjeta: "#2a2a4e", // azul oscuro (fondo de botones y cajas)
  fondoImagen: "#2a2a3e",  // azul oscuro para el fondo de la imagen
  amarillo: "#FFD700",     // amarillo Simpsons (color principal)
  blanco: "#fff",
  gris: "#aaa",
  verde: "#2d6a2d",        // botón correcto
  rojo: "#6a2d2d",         // botón incorrecto
};

// ── Estilos compartidos ───────────────────────────────────────
const originalStyles = StyleSheet.create({

  // -- Contenedores --

  // Fondo principal de cualquier pantalla
  fondo: {
    flex: 1,
    backgroundColor: COLORES.fondo,
    paddingHorizontal: 14,
    paddingTop: 14,
    paddingBottom: 10,
  },

  // Centrado vertical y horizontal (pantalla de carga)
  centrado: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORES.fondo,
  },

  // Contenedor interior de ResultadoScreen
  contenedor: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },

  // -- Encabezado de OriginalScreen --

  // Fila con "Pregunta X/10" y el puntaje
  encabezado: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },

  // Texto "Pregunta X/10"
  contador: {
    color: COLORES.gris,
    fontSize: 14,
  },

  puntajePill: {
    backgroundColor: "rgba(255, 215, 0, 0.18)",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 18,
  },

  // -- Pregunta y tarjeta --
  tarjetaPregunta: {
    backgroundColor: "#111431",
    borderRadius: 20,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.16,
    shadowRadius: 12,
    elevation: 5,
  },

  // -- Textos --

  // "Cargando personajes..."
  textoEspera: {
    color: COLORES.amarillo,
    marginTop: 10,
    fontSize: 16,
  },

  // Puntaje en el encabezado "⭐ 3"
  puntaje: {
    color: COLORES.amarillo,
    fontSize: 18,
    fontWeight: "bold",
  },

  // Pregunta principal del quiz
  enunciado: {
    color: COLORES.blanco,
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 16,
    lineHeight: 26,
  },

  // Título de ResultadoScreen "¡Juego Terminado!"
  titulo: {
    color: COLORES.amarillo,
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 16,
  },

  // Emoji grande 🏆
  emoji: {
    fontSize: 64,
    marginBottom: 16,
  },

  // "80% correcto"
  porcentaje: {
    color: COLORES.gris,
    fontSize: 16,
    marginBottom: 16,
  },

  // Mensaje final "¡Eres un experto!"
  mensaje: {
    fontSize: 18,
    textAlign: "center",
    marginBottom: 32,
    fontWeight: "bold",
    lineHeight: 26,
  },

  // -- Puntaje final --

  // Fila con el número grande y el "/10"
  cajaPuntaje: {
    flexDirection: "row",
    alignItems: "flex-end",
    marginBottom: 8,
  },

  // Número grande (ej: "7")
  numeroPuntaje: {
    color: COLORES.blanco,
    fontSize: 72,
    fontWeight: "bold",
    lineHeight: 80,
  },

  // El "/10" al lado del número
  totalPuntaje: {
    color: COLORES.gris,
    fontSize: 32,
    marginBottom: 12,
    marginLeft: 4,
  },

  // -- Barra de progreso --

  // Fondo gris de la barra
  barraFondo: {
    width: "100%",
    height: 12,
    backgroundColor: COLORES.fondoTarjeta,
    borderRadius: 6,
    marginBottom: 24,
    overflow: "hidden", // el relleno no se sale de los bordes redondeados
  },

  // Relleno de color (el ancho se pone dinámico desde el componente)
  barraRelleno: {
    height: "100%",
    borderRadius: 6,
  },

  // -- Imagen del personaje --

  imagen: {
    width: "100%",
    height: 180,
    borderRadius: 18,
    marginBottom: 16,
    backgroundColor: COLORES.fondoImagen,
  },

  // -- Opciones de respuesta --

  // Agrupa los 4 botones
  contenedorOpciones: {
    marginTop: 10,
    paddingBottom: 20,
  },

  // Estilo base de cada botón (se combina con botonNormal/Correcto/Incorrecto)
  boton: {
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 16,
    alignItems: "center",
    minHeight: 58,
    justifyContent: "center",
    marginBottom: 10,
  },

  // Sin responder todavía
  botonNormal: {
    backgroundColor: "#22254b",
    borderWidth: 1,
    borderColor: "#4e54a9",
  },

  // Respuesta correcta → verde
  botonCorrecto: {
    backgroundColor: COLORES.verde,
  },

  // Respuesta incorrecta elegida → rojo
  botonIncorrecto: {
    backgroundColor: COLORES.rojo,
  },

  // Texto dentro de los botones de opción
  textoBoton: {
    color: COLORES.blanco,
    fontSize: 16,
    textAlign: "center",
    lineHeight: 22,
    fontWeight: "600",
  },

  scrollContainer: {
    paddingBottom: 28,
  },

  // -- Botones de ResultadoScreen --

  // Botón amarillo principal "Jugar de nuevo"
  botonJugarDeNuevo: {
    backgroundColor: COLORES.amarillo,
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 12,
    marginBottom: 12,
    width: "100%",
    alignItems: "center",
  },

  // Texto del botón amarillo (oscuro para contrastar con el fondo amarillo)
  textoBotonPrincipal: {
    color: COLORES.fondo,
    fontSize: 18,
    fontWeight: "bold",
  },

  // Botón secundario "Ir al inicio" (solo borde, sin relleno)
  botonInicio: {
    borderWidth: 1,
    borderColor: COLORES.amarillo,
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 12,
    width: "100%",
    alignItems: "center",
  },

  // Texto del botón secundario
  textoBotonSecundario: {
    color: COLORES.amarillo,
    fontSize: 16,
  },
});

export default originalStyles;
