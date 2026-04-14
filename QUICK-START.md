# 🚀 INICIO RÁPIDO - En 5 Minutos

## Paso 1: Abre 3 Terminales

### Terminal 1: Frontend
```bash
cd front/operaciones_matrices
npm install
npm run dev
```
✅ Abre: http://localhost:5173

### Terminal 2: Node.js Server
```bash
cd server-node
npm install
npm start
```
✅ Servidor en puerto 3001

### Terminal 3: Python Server
```bash
cd server-python
pip install -r requirements.txt
python app.py
```
✅ Servidor en puerto 3002

---

## Paso 2: Usa la Aplicación

1. **Abre** http://localhost:5173 en el navegador
2. **Elige** dimensiones (ej: 2 filas × 3 columnas)
3. **Selecciona** operación: Suma o Multiplicación
4. **Haz clic** en "Continuar"
5. **Ingresa** valores numéricos en las matrices
6. **Presiona** cualquiera de los 3 botones para calcular:
   - Calcular (Local)
   - Calcular (Node.js)
   - Calcular (Python)
7. **Compara** los 3 resultados

---

## Paso 3: Verifica que Todo Funciona

### Prueba 1: Suma Simple
- Matriz A: `[[1, 2], [3, 4]]`
- Matriz B: `[[5, 6], [7, 8]]`
- Resultado: `[[6, 8], [10, 12]]`

### Prueba 2: Multiplicación
- Matriz A: `[[1, 2]]` (1×2)
- Matriz B: `[[3], [4]]` (2×1)
- Resultado: `[[11]]`

---

## ⚠️ Si Algo No Funciona

**Frontend no carga**
```bash
npm install  # en front/operaciones_matrices
npm run dev
```

**Node.js no conecta**
```bash
npm install  # en server-node
npm start
```

**Python no conecta**
```bash
pip install -r requirements.txt  # en server-python
python app.py
```

---

## 🎯 Prueba Rápida de APIs

Abre `test-api.html` en el navegador para probar:
- ✅ Conexión a servidores
- ✅ Endpoint /api/sum
- ✅ Endpoint /api/multiply
- ✅ Endpoint /health

---

## 📚 Documentación Completa

- **Guía de Instalación**: [SETUP.md](SETUP.md)
- **Verificación del Proyecto**: [VERIFICACION.md](VERIFICACION.md)
- **README Principal**: [README.md](README.md)

---

## 💡 Tips

1. **Deja los servidores corriendo** mientras pruebas la aplicación
2. **Usa números simples** (1, 2, 3) para primeras pruebas
3. **Revisa la consola del navegador** (F12) si hay errores
4. **Los servidores dan errores claros** si las dimensiones no son válidas

---

**¿Todo funciona?** 🎉 **¡Felicidades! El proyecto está listo para usar.**
