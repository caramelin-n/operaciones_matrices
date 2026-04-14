import { useState } from 'react';
import { MatrixInput } from './components/matrixInput';
import { ResultTable } from './components/resulltTable';
import './App.css';

// Lógica local de matrices
function addMatricesLocal(matrixA, matrixB) {
  if (matrixA.length !== matrixB.length || matrixA[0].length !== matrixB[0].length) {
    return { success: false, error: 'Las matrices deben tener las mismas dimensiones para suma' };
  }
  
  const result = matrixA.map((row, i) =>
    row.map((val, j) => val + matrixB[i][j])
  );
  
  return { success: true, result };
}

function multiplyMatricesLocal(matrixA, matrixB) {
  const rowsA = matrixA.length;
  const colsA = matrixA[0].length;
  const rowsB = matrixB.length;
  const colsB = matrixB[0].length;

  if (colsA !== rowsB) {
    return {
      success: false,
      error: `No se puede multiplicar: matriz A (${rowsA}x${colsA}) con matriz B (${rowsB}x${colsB})`
    };
  }

  const result = Array(rowsA)
    .fill(0)
    .map(() => Array(colsB).fill(0));

  for (let i = 0; i < rowsA; i++) {
    for (let j = 0; j < colsB; j++) {
      let sum = 0;
      for (let k = 0; k < colsA; k++) {
        sum += matrixA[i][k] * matrixB[k][j];
      }
      result[i][j] = sum;
    }
  }

  return { success: true, result };
}

function validateMatrix(matrix) {
  if (!Array.isArray(matrix) || matrix.length === 0) return false;
  return matrix.every(row =>
    Array.isArray(row) && row.length > 0 && row.every(val => !isNaN(val))
  );
}

function App() {
  // Estado para las dimensiones
  const [rowsA, setRowsA] = useState(2);
  const [colsA, setColsA] = useState(2);
  const [rowsB, setRowsB] = useState(2);
  const [colsB, setColsB] = useState(2);
  const [dimensionsSet, setDimensionsSet] = useState(false);

  // Estado para las matrices
  const [matrixA, setMatrixA] = useState([]);
  const [matrixB, setMatrixB] = useState([]);

  // Estado para los resultados
  const [resultLocal, setResultLocal] = useState(null);
  const [resultNode, setResultNode] = useState(null);
  const [resultPython, setResultPython] = useState(null);

  // Estado para errores
  const [errorLocal, setErrorLocal] = useState('');
  const [errorNode, setErrorNode] = useState('');
  const [errorPython, setErrorPython] = useState('');

  // Estado de carga
  const [loadingNode, setLoadingNode] = useState(false);
  const [loadingPython, setLoadingPython] = useState(false);

  // Modo actual
  const [mode, setMode] = useState('sum'); // 'sum' o 'multiply'

  // Configurar dimensiones
  const handleSetDimensions = () => {
    if (rowsA < 1 || colsA < 1 || rowsB < 1 || colsB < 1) {
      alert('Las dimensiones deben ser mayores a 0');
      return;
    }

    setDimensionsSet(true);
    setMatrixA(Array(rowsA).fill(0).map(() => Array(colsA).fill(0)));
    setMatrixB(Array(rowsB).fill(0).map(() => Array(colsB).fill(0)));
    setResultLocal(null);
    setResultNode(null);
    setResultPython(null);
    setErrorLocal('');
    setErrorNode('');
    setErrorPython('');
  };

  // Realizar operación LOCAL
  const handleOperationLocal = () => {
    setErrorLocal('');

    if (!validateMatrix(matrixA) || !validateMatrix(matrixB)) {
      setErrorLocal('Por favor carga valores numéricos en ambas matrices');
      return;
    }

    let result;
    if (mode === 'sum') {
      result = addMatricesLocal(matrixA, matrixB);
    } else {
      result = multiplyMatricesLocal(matrixA, matrixB);
    }

    if (result.success) {
      setResultLocal(result.result);
    } else {
      setErrorLocal(result.error);
    }
  };

  // Realizar operación con SERVIDOR NODE.JS
  const handleOperationNode = async () => {
    setErrorNode('');
    setLoadingNode(true);

    if (!validateMatrix(matrixA) || !validateMatrix(matrixB)) {
      setErrorNode('Por favor carga valores numéricos en ambas matrices');
      setLoadingNode(false);
      return;
    }

    try {
      const endpoint = mode === 'sum' ? '/api/sum' : '/api/multiply';
      const response = await fetch(`http://localhost:3001${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ matrixA, matrixB })
      });

      const data = await response.json();

      if (data.success) {
        setResultNode(data.result);
      } else {
        setErrorNode(data.error || 'Error en el servidor');
      }
    } catch (err) {
      setErrorNode(`Error de conexión: ${err.message}. ¿Está el servidor Node.js ejecutándose en puerto 3001?`);
    } finally {
      setLoadingNode(false);
    }
  };

  // Realizar operación con SERVIDOR PYTHON
  const handleOperationPython = async () => {
    setErrorPython('');
    setLoadingPython(true);

    if (!validateMatrix(matrixA) || !validateMatrix(matrixB)) {
      setErrorPython('Por favor carga valores numéricos en ambas matrices');
      setLoadingPython(false);
      return;
    }

    try {
      const endpoint = mode === 'sum' ? '/api/sum' : '/api/multiply';
      const response = await fetch(`http://localhost:3002${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ matrixA, matrixB })
      });

      const data = await response.json();

      if (data.success) {
        setResultPython(data.result);
      } else {
        setErrorPython(data.error || 'Error en el servidor');
      }
    } catch (err) {
      setErrorPython(`Error de conexión: ${err.message}. ¿Está el servidor Python ejecutándose en puerto 3002?`);
    } finally {
      setLoadingPython(false);
    }
  };

  const operationName = mode === 'sum' ? 'SUMA' : 'MULTIPLICACIÓN';

  if (!dimensionsSet) {
    return (
      <div className="app-container">
        <header className="header">
          <h1>Operaciones con Matrices</h1>
          <p>Configura las dimensiones de tus matrices</p>
        </header>

        <div className="dimensions-setup">
          <div className="matrix-config">
            <h3>Matriz A</h3>
            <div className="dimension-input">
              <label>Filas:</label>
              <input
                type="number"
                min="1"
                max="10"
                value={rowsA}
                onChange={(e) => setRowsA(Math.max(1, parseInt(e.target.value)) || 1)}
              />
            </div>
            <div className="dimension-input">
              <label>Columnas:</label>
              <input
                type="number"
                min="1"
                max="10"
                value={colsA}
                onChange={(e) => setColsA(Math.max(1, parseInt(e.target.value)) || 1)}
              />
            </div>
          </div>

          <div className="matrix-config">
            <h3>Matriz B</h3>
            <div className="dimension-input">
              <label>Filas:</label>
              <input
                type="number"
                min="1"
                max="10"
                value={rowsB}
                onChange={(e) => setRowsB(Math.max(1, parseInt(e.target.value)) || 1)}
              />
            </div>
            <div className="dimension-input">
              <label>Columnas:</label>
              <input
                type="number"
                min="1"
                max="10"
                value={colsB}
                onChange={(e) => setColsB(Math.max(1, parseInt(e.target.value)) || 1)}
              />
            </div>
          </div>

          <div className="operation-mode">
            <h3>Operación</h3>
            <div className="mode-buttons">
              <button
                className={`mode-btn ${mode === 'sum' ? 'active' : ''}`}
                onClick={() => setMode('sum')}
              >
                Suma
              </button>
              <button
                className={`mode-btn ${mode === 'multiply' ? 'active' : ''}`}
                onClick={() => setMode('multiply')}
              >
                Multiplicación
              </button>
            </div>
          </div>

          <button onClick={handleSetDimensions} className="start-btn">
            Continuar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="app-container">
      <header className="header">
        <h1>Operaciones de {operationName}</h1>
        <p>
          Matriz A: {rowsA}x{colsA} | Matriz B: {rowsB}x{colsB}
        </p>
        <button
          onClick={() => {
            setDimensionsSet(false);
            setResultLocal(null);
            setResultNode(null);
            setResultPython(null);
          }}
          className="reset-dimensions-btn"
        >
          Cambiar dimensiones
        </button>
      </header>

      <div className="matrices-section">
        <MatrixInput
          title="Matriz A"
          rows={rowsA}
          cols={colsA}
          onMatrixChange={setMatrixA}
        />
        <MatrixInput
          title="Matriz B"
          rows={rowsB}
          cols={colsB}
          onMatrixChange={setMatrixB}
        />
      </div>

      <div className="operations-section">
        <div className="operation-group">
          <h2>Operación Local (Sin servidor)</h2>
          <button onClick={handleOperationLocal} className="operation-btn local-btn">
            Calcular {operationName} (Local)
          </button>
          <ResultTable
            result={resultLocal}
            title="Resultado Local"
            error={errorLocal}
          />
        </div>

        <div className="operation-group">
          <h2>Con Servidor Node.js</h2>
          <button 
            onClick={handleOperationNode} 
            className="operation-btn nodejs-btn"
            disabled={loadingNode}
          >
            {loadingNode ? 'Cargando...' : `Calcular ${operationName} (Node.js)`}
          </button>
          <ResultTable
            result={resultNode}
            title="Resultado Node.js"
            error={errorNode}
          />
        </div>

        <div className="operation-group">
          <h2>Con Servidor Python</h2>
          <button 
            onClick={handleOperationPython} 
            className="operation-btn python-btn"
            disabled={loadingPython}
          >
            {loadingPython ? 'Cargando...' : `Calcular ${operationName} (Python)`}
          </button>
          <ResultTable
            result={resultPython}
            title="Resultado Python"
            error={errorPython}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
