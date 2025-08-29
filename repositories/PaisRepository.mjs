import Pais from '../models/Pais.mjs';
import IRepository from './IRepository.mjs';

class PaisRepository extends IRepository {
    async obtenerPorId(id) {
      return await Pais.findById(id);  
    }
    
    async obtenerTodos() {
        return await Pais.find({});
    }  
    
    async buscarPorAtributo(atributo, valor) {
        try {
        const filtro = {};
        filtro[atributo] = valor;
        return await Pais.find(filtro);
    } catch (error) {
        console.error(`Error al buscar por ${atributo}:`, error);
        throw error;
    }
    }
    
    async obtenerHispanohablantes() {
        try {
        return await Pais.find({ idioma: /español/i });
    } catch (error) {
        console.error('Error al obtener paises que hablan español:', error);
        throw error;
    }
  }

  async actualizar(id, datosActualizados) {
    return await Pais.findByIdAndUpdate(id, datosActualizados, {
      new: true, // Para que devuelva el objeto actualizado
      runValidators: true // Para que respete las validaciones del esquema
    });
  }


  async eliminar(id) {
    return await Pais.findByIdAndDelete(id);
  }


  async eliminarPorNombre(nombre) {
    return await Pais.findOneAndDelete({ nombre: nombre });
  }

}
export default new PaisRepository();