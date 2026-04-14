import './resultTable.css';

export function ResultTable({ result, title, error }) {
  if (error) {
    return (
      <div className="result-container error-container">
        <h3>{title}</h3>
        <div className="error-message">{error}</div>
      </div>
    );
  }

  if (!result || result.length === 0) {
    return (
      <div className="result-container">
        <h3>{title}</h3>
        <p className="no-result">Realiza una operación para ver el resultado</p>
      </div>
    );
  }

  return (
    <div className="result-container">
      <h3>{title}</h3>
      <div className="matrix-result">
        <table>
          <tbody>
            {result.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {row.map((value, colIndex) => (
                  <td key={`${rowIndex}-${colIndex}`}>
                    {typeof value === 'number' 
                      ? (Number.isInteger(value) ? value : value.toFixed(2))
                      : value
                    }
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="result-dimensions">
        Dimensiones: {result.length} x {result[0]?.length || 0}
      </p>
    </div>
  );
}
