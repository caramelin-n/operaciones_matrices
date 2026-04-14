/**
 * Suma dos matrices
 * @param {number[][]} matrixA - Primera matriz
 * @param {number[][]} matrixB - Segunda matriz
 * @returns {object} { success: boolean, result?: number[][], error?: string }
 */
function addMatrices(matrixA, matrixB) {
  // Validar que las dimensiones sean iguales
  if (matrixA.length !== matrixB.length || matrixA[0].length !== matrixB[0].length) {
    return {
      success: false,
      error: 'Las matrices deben tener las mismas dimensiones para suma',
    };
  }

  const result = matrixA.map((row, i) => {
    return row.map((val, j) => {
      return val + matrixB[i][j];
    });
  });

  return { success: true, result };
}

/**
 * Multiplica dos matrices
 * @param {number[][]} matrixA - Primera matriz (m x n)
 * @param {number[][]} matrixB - Segunda matriz (n x p)
 * @returns {object} { success: boolean, result?: number[][], error?: string }
 */
function multiplyMatrices(matrixA, matrixB) {
  const rowsA = matrixA.length;
  const colsA = matrixA[0].length;
  const rowsB = matrixB.length;
  const colsB = matrixB[0].length;

  // Validar: número de columnas de A debe ser igual al número de filas de B
  if (colsA !== rowsB) {
    return {
      success: false,
      error: `No se puede multiplicar: matriz A (${rowsA}x${colsA}) con matriz B (${rowsB}x${colsB}). Las columnas de A deben ser iguales a las filas de B`,
    };
  }

  // Crear matriz resultado (rowsA x colsB)
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

/**
 * Valida que todos los elementos de la matriz sean números válidos
 * @param {any[][]} matrix - Matriz a validar
 * @returns {boolean}
 */
function validateMatrix(matrix) {
  if (!Array.isArray(matrix) || matrix.length === 0) return false;
  
  return matrix.every(row => 
    Array.isArray(row) && 
    row.length > 0 && 
    row.every(val => typeof val === 'number' && !isNaN(val))
  );
}

module.exports = {
  addMatrices,
  multiplyMatrices,
  validateMatrix,
};
