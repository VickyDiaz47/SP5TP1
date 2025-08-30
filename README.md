# WorldApp - Gestión de Países

Proyecto desarrollado en **Node.js, Express, MongoDB y EJS** para la Diplomatura en Desarrollo FullStack (Nodo Tecnológico - Catamarca).

## 🚀 Funcionalidades

- Listar países cargados en la base de datos.
- Crear, editar y eliminar países.
- Filtrar países hispanohablantes.
- Obtención automática del índice **GINI** (si está disponible).
- Selección de zona horaria desde API externa.
- Panel de administración con vistas renderizadas en **EJS**.

## 🛠️ Tecnologías

- Node.js
- Express
- MongoDB + Mongoose
- EJS + Express Layouts
- CSS (estilos personalizados)
- APIs externas (WorldBank, WorldTimeAPI)

## 📦 Instalación

1. Clonar este repositorio:
   ```bash
   git clone https://github.com/VickyDiaz47/SP5TP1.git
   ```

2. Instalar dependencias:
   ```bash
   npm install
   ```

3. Configurar variables de entorno en un archivo `.env`:
   ```
   PORT=3000
   MONGO_URI=mongodb://localhost:27017/superapp
   ```

4. Iniciar el servidor:
   ```bash
   node app.mjs
   ```

## 👩‍💻 Autora

**Virginia Díaz**  
Proyecto académico para la Diplomatura en Desarrollo FullStack.
