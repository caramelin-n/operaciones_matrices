# 🧮 Operaciones con Matrices - Suma y Multiplicación

Sistema completo para realizar operaciones de suma y multiplicación de matrices con:
- **Frontend**: React + Vite
- **Backend**: Node.js (Express) y Python (Flask)
- **Modes**: Local, Cliente-Servidor Node.js, Cliente-Servidor Python

## 📋 Características

✅ **Interfaz de usuario intuitiva**
- Solicita dimensiones de matrices (1-10 filas/columnas)
- Entrada visual de datos en grid
- Validación de valores numéricos
- Tres modos de operación simultáneos

✅ **Tres modos de operación**
1. **Operación Local**: Cálculo en el navegador sin servidor
2. **Con Node.js**: Envía datos al servidor Express (puerto 3001)
3. **Con Python**: Envía datos al servidor Flask (puerto 3002)

✅ **Operaciones soportadas**
- Suma de matrices (mismas dimensiones)
- Multiplicación de matrices (columnas A = filas B)

✅ **Validaciones**
- Comprobación de valores numéricos
- Validación de dimensiones para cada operación
- Manejo de errores en cliente y servidor

---

## 🚀 Instalación y Ejecución

### Opción 1: Instalar dependencias primero

#### Frontend (React + Vite)

```bash
cd front/operaciones_matrices

# Instalar dependencias
npm install

# Ejecutar servidor de desarrollo (http://localhost:5173)
npm run dev
```

#### Backend Node.js

```bash
cd server-node

# Instalar dependencias
npm install

# Ejecutar servidor (http://localhost:3001)
npm start

# O en modo desarrollo con nodemon
npm run dev
```

#### Backend Python

```bash
cd server-python

# Crear ambiente virtual (recomendado)
python -m venv venv

# Activar ambiente virtual
# En Windows:
venv\Scripts\activate
# En macOS/Linux:
source venv/bin/activate

# Instalar dependencias
pip install -r requirements.txt

# Ejecutar servidor (http://localhost:3002)
python app.py
```

### Opción 2: Ejecutar todo en paralelo

**En Terminal 1 (Frontend)**:
```bash
cd front/operaciones_matrices
npm install
npm run dev
```

**En Terminal 2 (Node.js)**:
```bash
cd server-node
npm install
npm start
```

**En Terminal 3 (Python)**:
```bash
cd server-python
pip install -r requirements.txt
python app.py
```

---

## 💻 Uso de la Aplicación

### 1. Configurar Dimensiones
- Ingresa número de filas y columnas para Matriz A (ej: 2x3)
- Ingresa número de filas y columnas para Matriz B (ej: 3x2)
- Selecciona la operación: **Suma** o **Multiplicación**
- Haz clic en **Continuar**

### 2. Cargar Valores
- Completa los campos numéricos para ambas matrices
- Puedes incluir decimales (ej: 3.14, -2, 0)

### 3. Ejecutar Operaciones
Tienes 3 opciones simultáneas:

**Operación Local**
- Calcula en el navegador instantáneamente
- No requiere servidor

**Con Servidor Node.js**
- Envía datos a `http://localhost:3001`
- Requiere que el servidor esté ejecutándose
- Respuesta rápida con Express

**Con Servidor Python**
- Envía datos a `http://localhost:3002`
- Requiere que el servidor esté ejecutándose
- Procesamiento con Flask

### 4. Ver Resultados
- Compara resultados de los 3 modos
- Visualiza dimensiones de la matriz resultado
- Los valores decimales se muestran con 2 decimales

---

## 📁 Estructura del Proyecto

```
suma_multi_matrices/
├── front/
│   └── operaciones_matrices/          # Frontend React + Vite
│       ├── src/
│       │   ├── App.jsx                # Componente principal
│       │   ├── App.css                # Estilos principales
│       │   ├── components/
│       │   │   ├── matrixInput.jsx    # Componente de entrada
│       │   │   ├── matrixInput.css
│       │   │   ├── resulltTable.jsx   # Componente de resultado
│       │   │   └── resultTable.css
│       │   └── main.jsx
│       ├── package.json
│       └── vite.config.js
│
├── server-node/                       # Backend Node.js + Express
│       ├── index.js                   # Servidor principal
│       ├── package.json
│       └── utils/
│           └── matrixMath.js          # Funciones matemáticas
│
├── server-python/                     # Backend Python + Flask
│       ├── app.py                     # Servidor principal
│       ├── requirements.txt
│       └── logic/
│           └── matrix_ops.py          # Funciones matemáticas
│
└── README.md                          # Documentación general
```

---

## 🔌 API Endpoints

### Node.js (Puerto 3001)

**POST** `/api/sum`
```json
{
  "matrixA": [[1, 2], [3, 4]],
  "matrixB": [[5, 6], [7, 8]]
}
```
**Respuesta**:
```json
{
  "success": true,
  "result": [[6, 8], [10, 12]]
}
```

**POST** `/api/multiply`
```json
{
  "matrixA": [[1, 2], [3, 4]],
  "matrixB": [[5, 6], [7, 8]]
}
```

**GET** `/health`
```json
{
  "status": "OK",
  "server": "Node.js"
}
```

### Python (Puerto 3002)

Mismos endpoints que Node.js:
- `/api/sum`
- `/api/multiply`
- `/health`

---

## ⚠️ Resolución de Problemas

### "Error de conexión en Node.js"
- Verifica que el servidor esté corriendo: `npm start` en `server-node/`
- Revisa que el puerto 3001 esté disponible
- Ubica en el navegador: `http://localhost:3001/health`

### "Error de conexión en Python"
- Verifica que el servidor esté corriendo: `python app.py` en `server-python/`
- Revisa que el puerto 3002 esté disponible
- Comprueba que Flask y flask-cors estén instalados
- Ubica en el navegador: `http://localhost:3002/health`

### "Módulos no encontrados en Python"
```bash
pip install -r requirements.txt
```

### Los valores no se cargan correctamente
- Asegúrate de ingresar números válidos
- Los campos vacíos se tratan como 0
- Evita caracteres especiales excepto decimales (.)

---

## 🔐 Validaciones Implementadas

1. **Dimensiones**: Mínimo 1x1, máximo 10x10
2. **Valores numéricos**: Se aceptan enteros y decimales
3. **Suma**: Requiere matrices con dimensiones iguales
4. **Multiplicación**: Requiere columnas(A) = filas(B)
5. **CORS**: Habilitado en ambos servidores para acceso desde frontend

---

## 🛠️ Tecnologías Utilizadas

- **Frontend**: React 18, Vite, CSS3
- **Backend Node.js**: Express.js, CORS
- **Backend Python**: Flask, Flask-CORS
- **Matemáticas**: Algoritmos implementados manualmente
- **Validación**: Schemas personalizados en cliente y servidor

---

## 📝 Autor
Seminario de Programación - Operaciones con Matrices

---

## 📄 Licencia
ISC

