
import mongoose from 'mongoose';

// Schema para Paises
const paisSchema = new mongoose.Schema({
  imagen: { type: String, default: '' },
  nombre: { type: String, required: true },
  nombreOficial: { type: String, required: true },
  capital: { type: String, required: true },
  idioma: { type: String, required: true },
  borders: [String],
  area: { type: Number, min: 0 },
  population: { type: Number, min: 0 },
  gini: { type: Number, min: 0, max: 100, default: null },
  codigoISO: { type: String, required: true, uppercase: true, minlength: 2, maxlength: 3 },
  timezones: { type: String, required: true },
  creador: { type: String, default: 'VirginiaD.' },
  createdAt: { type: Date, default: Date.now }
});

// Modelo -> Clase Pais
const Pais = mongoose.model('Pais', paisSchema, 'Grupo-09');
export default Pais;