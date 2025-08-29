import paisRepository from '../repositories/PaisRepository.mjs';
import Pais from '../models/Pais.mjs';

export async function obtenerPaisPorId(id) {
  return await paisRepository.obtenerPorId(id);
}

export async function obtenerTodosLosPaises() {
  try {
    // 🔹 Filtra solo los que tengan creador = "Virginia"
    return await Pais.find({ creador: "VirginiaD." });
  } catch (error) {
    throw new Error('Error al obtener países: ' + error.message);
  }
}

export async function buscarPaisPorAtributo(atributo, valor) {
  return await paisRepository.buscarPorAtributo(atributo, valor);
}

export async function obtenerPaisesHispanohablantes() {
  return await paisRepository.obtenerHispanohablantes();
}

/*---------------*/
export async function crearPais(datos) {
  const nuevoPais = new Pais(datos);
  return await nuevoPais.save();
}

export async function actualizarPais(id, datosActualizados) {
  return await paisRepository.actualizar(id, datosActualizados);
}

export async function eliminarPais(id) {
  return await paisRepository.eliminar(id);
}

export async function eliminarPaisPorNombre(nombre) {
  return await paisRepository.eliminarPorNombre(nombre);
}


