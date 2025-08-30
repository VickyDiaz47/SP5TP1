export async function obtenerZonasHorarias() {
  try {
    const response = await fetch("http://worldtimeapi.org/api/timezone");

    if (!response.ok) {
      console.error("🌐 Error HTTP al pedir zonas horarias:", response.status);
      return [];
    }

    const zonas = await response.json();
    return Array.isArray(zonas) ? zonas : [];
  } catch (error) {
    console.error("❌ Error obteniendo zonas horarias:", error.message);
    return []; // 🔑 no rompe → devuelve lista vacía
  }
}
