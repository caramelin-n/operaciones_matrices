import { useState } from 'react';
import './matrixInput.css';

export function MatrixInput({ 
  title, 
  onMatrixChange, 
  rows, 
  cols 
}) {
  const [matrix, setMatrix] = useState(
    Array(rows).fill(0).map(() => Array(cols).fill(0))
  );
  const [error, setError] = useState('');

  // Manejar cambio de valores en los inputs
  const handleValueChange = (rowIndex, colIndex, value) => {
    const newMatrix = matrix.map(row => [...row]);
    
    // Intentar convertir a número
    const numValue = isNaN(value) ? value : Number(value);
    newMatrix[rowIndex][colIndex] = numValue;
    
    setMatrix(newMatrix);
    
    // Validar que sea número
    if (value !== '' && isNaN(numValue)) {
      setError(`Valor no numérico en [${rowIndex},${colIndex}]`);
    } else {
      setError('');
    }
    
    onMatrixChange(newMatrix);
  };

  // Resetear matriz
  const handleReset = () => {
    const newMatrix = Array(rows).fill(0).map(() => Array(cols).fill(0));
    setMatrix(newMatrix);
    setError('');
    onMatrixChange(newMatrix);
  };

  return (
    <div className="matrix-input-container">
      <h3>{title}</h3>
      <div className="matrix-inputs">
        {matrix.map((row, rowIndex) => (
          <div key={rowIndex} className="matrix-row">
            {row.map((value, colIndex) => (
              <input
                key={`${rowIndex}-${colIndex}`}
                type="number"
                value={value === 0 && matrix[rowIndex][colIndex] === 0 ? '' : value}
                placeholder="0"
                onChange={(e) => handleValueChange(rowIndex, colIndex, e.target.value)}
                className="matrix-cell"
                step="0.01"
              />
            ))}
          </div>
        ))}
      </div>
      {error && <p className="error-message">{error}</p>}
      <button onClick={handleReset} className="reset-btn">Limpiar</button>
    </div>
  );
}
