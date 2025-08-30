

export async function obtenerGini(codigoISO) {
  try {
    const response = await fetch(
      `http://api.worldbank.org/v2/country/${codigoISO}/indicator/SI.POV.GINI?format=json`
    );

    if (!response.ok) {
      console.error(`Error HTTP al pedir GINI de ${codigoISO}:`, response.status);
      return null;
    }

    const data = await response.json();

    if (!Array.isArray(data) || !data[1] || !data[1].length) {
      console.warn(`No se encontraron datos GINI para ${codigoISO}`);
      return null;
    }

    // Agarro el valor más reciente
    const gini = data[1][0]?.value ?? null;
    return gini;
  } catch (error) {
    console.error(`Error obteniendo GINI de ${codigoISO}:`, error.message);
    return null; // lo importante → NO lanza, devuelve null
  }
}




/* export async function obtenerGini(codigoISO) {
  try {
    const response = await fetch(
      `https://api.worldbank.org/v2/country/${codigoISO}/indicator/SI.POV.GINI?format=json&per_page=1`
    );

    if (!response.ok) {
      console.error(`World Bank API error: HTTP ${response.status}`);
      return null;
    }

    const data = await response.json();

    if (Array.isArray(data) && data[1] && data[1].length > 0) {
      return data[1][0].value;
    }

    return null;
  } catch (error) {
    console.error("Error obteniendo GINI:", error.message);
    return null; // 👈 nunca explota, siempre vuelve null
  }
}
 */