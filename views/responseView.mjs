// src/views/responseView.mjs

export function renderizarPais(pais) {
  return {
    id: pais._id,
    nombre: pais.nombre,
    nombreOficial: pais.nombreOficial,
    capital: pais.capital,
    idioma: pais.idioma,
    area: pais.area,
    population: pais.population,
    gini: pais.gini,
    borders: pais.borders,
    timezones: pais.timezones,
    creador: pais.creador,
    createdAt: pais.createdAt
  };
}

export function renderizarListaPaises(paises) {
  return paises.map(renderizarPais);
}

