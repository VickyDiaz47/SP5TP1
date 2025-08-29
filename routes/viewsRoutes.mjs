import express from 'express';
import methodOverride from 'method-override';
import {
  obtenerTodosLosPaisesController,
  crearPaisController,
  actualizarPaisController,
  eliminarPaisController,
  mostrarFormularioNuevoController,
  mostrarFormularioEdicionController
} from '../controllers/paisesController.mjs';


const router = express.Router();

// Importante: methodOverride ANTES de las rutas
router.use(methodOverride('_method'));

//ruta al index.ejs
router.get('/', (req, res) => {
  res.render('index', { title: 'Inicio' , layout: false });
});

// Dashboard (usa controlador que ya maneja web/API)
router.get('/dashboard', obtenerTodosLosPaisesController);

// Formulario de nuevo pais
router.get('/paises/nuevo', mostrarFormularioNuevoController);

// Crear nuevo héroe (POST)
router.post('/paises', crearPaisController);

// Formulario de edición (vista directa)
router.get('/paises/editar/:id', mostrarFormularioEdicionController);

// Actualizar (PUT vía method-override)
router.put('/paises/:id', actualizarPaisController);

// Eliminar (DELETE vía method-override)
router.delete('/paises/:id', eliminarPaisController);

export default router;