import express from 'express';
import { validarPais } from '../validations/validacionesPaises.mjs';
import { manejarErroresDeValidacion } from '../validations/manejarErroresValidacion.mjs';
import {
  obtenerPaisPorIdController,
  obtenerTodosLosPaisesController,
  buscarPaisPorAtributoController,
  obtenerPaisesHispanohablantesController,
  crearPaisController,
  actualizarPaisController,
  eliminarPaisController,
  eliminarPaisPorNombreController,
} from '../controllers/paisesController.mjs';



const router = express.Router();

//rutas de lectura GET
router.get('/paises', obtenerTodosLosPaisesController);
router.get('/paises/hispanohablantes', obtenerPaisesHispanohablantesController);
router.get('/paises/buscar/:atributo/:valor', buscarPaisPorAtributoController);
router.get('/paises/:id', obtenerPaisPorIdController);

//ruta de creacion - PUT
router.post('/paises', validarPais, manejarErroresDeValidacion, crearPaisController);

//ruta de actualizacion - PUT
router.put('/paises/:id', actualizarPaisController);

//rutas de eliminacion - DELETE
router.delete('/paises/:id', eliminarPaisController);
router.delete('/paises/nombre/:nombre', eliminarPaisPorNombreController);

export default router;