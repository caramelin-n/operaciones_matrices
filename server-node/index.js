const express = require('express');
const cors = require('cors');
const { addMatrices, multiplyMatrices, validateMatrix } = require('./utils/matrixMath');

const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Validar matriz en el request
const validateMatrixMiddleware = (req, res, next) => {
  const { matrixA, matrixB } = req.body;

  if (!matrixA || !matrixB) {
    return res.status(400).json({
      success: false,
      error: 'Se requieren matrixA y matrixB',
    });
  }

  if (!validateMatrix(matrixA)) {
    return res.status(400).json({
      success: false,
      error: 'matrixA no es válida. Todos los elementos deben ser números',
    });
  }

  if (!validateMatrix(matrixB)) {
    return res.status(400).json({
      success: false,
      error: 'matrixB no es válida. Todos los elementos deben ser números',
    });
  }

  next();
};

// Rutas

/**
 * POST /api/sum
 * Suma dos matrices
 */
app.post('/api/sum', validateMatrixMiddleware, (req, res) => {
  const { matrixA, matrixB } = req.body;
  const result = addMatrices(matrixA, matrixB);

  if (result.success) {
    res.json(result);
  } else {
    res.status(400).json(result);
  }
});

/**
 * POST /api/multiply
 * Multiplica dos matrices
 */
app.post('/api/multiply', validateMatrixMiddleware, (req, res) => {
  const { matrixA, matrixB } = req.body;
  const result = multiplyMatrices(matrixA, matrixB);

  if (result.success) {
    res.json(result);
  } else {
    res.status(400).json(result);
  }
});

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', server: 'Node.js' });
});

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    error: 'Error interno del servidor',
  });
});

app.listen(PORT, () => {
  console.log(`Servidor Node.js ejecutándose en http://localhost:${PORT}`);
});
