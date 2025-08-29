import {
  obtenerPaisPorId,
  obtenerTodosLosPaises,
  buscarPaisPorAtributo,
  obtenerPaisesHispanohablantes, 
  crearPais,
  actualizarPais,
  eliminarPais,
  eliminarPaisPorNombre
} from '../services/paisesService.mjs';


import {
  renderizarPais,
  renderizarListaPaises
} from '../views/responseView.mjs';

export const getDashboard = async (req, res) => {
  const superPaises = await pais.find();
  res.render('dashboard', { paises, title: 'Dashboard' });
};


/*--------- API Controllers ---------*/

export async function obtenerPaisPorIdController(req, res) {
  try {
    const { id } = req.params;
    const pais = await obtenerPaisPorId(id);

    if (!pais) {
      return res.status(404).json({ mensaje: 'País no encontrado' });
    }

    res.status(200).json(renderizarPais(pais));
  } catch (error) {
    res.status(500).json({
      mensaje: 'Error al obtener el país',
      error: error.message
    });
  }
}

export async function obtenerTodosLosPaisesController(req, res) {
  try {
    const paises = await obtenerTodosLosPaises();
    const esAPI = req.originalUrl.startsWith('/api');

    if (esAPI) {
      return res.status(200).json(renderizarListaPaises(paises));
    }

    res.render('dashboard', {
      paises: paises,
      eliminado: req.query.eliminado
    });
  } catch (error) {
    const esAPI = req.originalUrl.startsWith('/api');
    if (esAPI) {
      return res.status(500).json({
        mensaje: 'Error al obtener los paises',
        error: error.message
      });
    }

    res.status(500).send('Error al cargar el dashboard');
  }
}

export async function buscarPaisPorAtributoController(req, res) {
  try {
    const { atributo, valor } = req.params;
    const paises = await buscarPaisPorAtributo(atributo, valor);

    if (paises.length === 0) {
      return res.status(404).json({ mensaje: 'No se encontraron paises con ese atributo' });
    }

    res.status(200).json(renderizarListaPaises(paises));
  } catch (error) {
    res.status(500).json({
      mensaje: 'Error al buscar los paises',
      error: error.message
    });
  }
}


export async function eliminarPaisPorNombreController(req, res) {
  try {
    const { nombre } = req.params;
    const paisEliminado = await eliminarPaisPorNombre(nombre);

    if (!paisEliminado) {
      return res.status(404).json({ mensaje: `No se encontró un país con el nombre "${nombre}"` });
    }

    res.status(200).json({
      mensaje: `País "${nombre}" eliminado con éxito`,
      pais: renderizarPais(paisEliminado)
    });
  } catch (error) {
    res.status(500).json({
      mensaje: 'Error al eliminar el país por nombre',
      error: error.message
    });
  }
}

export async function obtenerPaisesHispanohablantesController(req, res) {
  try {
    const paises = await obtenerPaisesHispanohablantes();

    if (paises.length === 0) {
      return res.status(404).json({ mensaje: 'No se encontraron países hispanohablantes' });
    }

    const esAPI = req.originalUrl.startsWith('/api');

    if (esAPI) {
      return res.status(200).json(renderizarListaPaises(paises));
    }

    res.render('dashboard', { 
      paises,
      title: 'Países hispanohablantes'
    });
  } catch (error) {
    const esAPI = req.originalUrl.startsWith('/api');

    if (esAPI) {
      return res.status(500).json({
        mensaje: 'Error al obtener los países hispanohablantes',
        error: error.message
      });
    }

    res.status(500).send('Error al obtener los países hispanohablantes');
  }
}

/*--------- Vista + API ---------*/

export async function crearPaisController(req, res) {
  try {
    const nuevoPais = await crearPais({
      ...req.body,
      creador: "VirginiaD."   // 👈 se agrega siempre
    });
    const esAPI = req.originalUrl.startsWith('/api');

    if (esAPI) {
      return res.status(201).json(renderizarPais(nuevoPais));
    }

    res.redirect('/dashboard');
  } catch (error) {
    const esAPI = req.originalUrl.startsWith('/api');

    if (esAPI) {
      return res.status(400).json({
        mensaje: 'Error al crear el país',
        error: error.message
      });
    }

    res.status(500).send('Error al crear el país');
  }
}

export async function actualizarPaisController(req, res) {
  try {
    const { id } = req.params;
    const datosActualizados = req.body;
    const paisActualizado = await actualizarPais(id, datosActualizados);

    if (!paisActualizado) {
      return res.status(404).json({ mensaje: 'País no encontrado' });
    }

    const esAPI = req.originalUrl.startsWith('/api');

    if (esAPI) {
      const todosLosPaises = await obtenerTodosLosPaises();
      return res.status(200).json(renderizarListaPaises(todosLosPaises));
    }

    res.redirect('/dashboard');
  } catch (error) {
    const esAPI = req.originalUrl.startsWith('/api');

    if (esAPI) {
      return res.status(500).json({
        mensaje: 'Error al actualizar el país',
        error: error.message
      });
    }

    res.status(500).send('Error al actualizar el país');
  }
}

export async function eliminarPaisController(req, res) {
  try {
    const { id } = req.params;
    const paisEliminado = await eliminarPais(id);

    if (!paisEliminado) {
      return res.status(404).json({ mensaje: 'País no encontrado' });
    }

    const esAPI = req.originalUrl.startsWith('/api');

    if (esAPI) {
      return res.status(200).json({
        mensaje: 'País eliminado con éxito',
        pais: renderizarPais(paisEliminado)
      });
    }

    res.redirect('/dashboard?eliminado=' + encodeURIComponent(paisEliminado.nombre));
  } catch (error) {
    const esAPI = req.originalUrl.startsWith('/api');

    if (esAPI) {
      return res.status(500).json({
        mensaje: 'Error al eliminar el país',
        error: error.message
      });
    }

    res.status(500).send('Error al eliminar el país');
  }
}

/*--------- Solo vistas ---------*/


export function mostrarFormularioNuevoController(req, res) {
  res.render('addPais');
}

export async function mostrarFormularioEdicionController(req, res) {
  try {
    const { id } = req.params;
    const pais = await obtenerPaisPorId(id);

    if (!pais) {
      return res.status(404).send('País no encontrado');
    }

    res.render('editPais', { pais });
  } catch (error) {
    console.error('Error al cargar edición:', error.message);
    res.status(500).send('Error al cargar el formulario de edición');
  }
}