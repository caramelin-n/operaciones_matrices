"""
Módulo de operaciones matemáticas con matrices
"""


def add_matrices(matrix_a, matrix_b):
    """
    Suma dos matrices
    
    Args:
        matrix_a (list): Primera matriz
        matrix_b (list): Segunda matriz
    
    Returns:
        dict: { 'success': bool, 'result': list, 'error': str }
    """
    # Validar que las dimensiones sean iguales
    if len(matrix_a) != len(matrix_b) or len(matrix_a[0]) != len(matrix_b[0]):
        return {
            'success': False,
            'error': 'Las matrices deben tener las mismas dimensiones para suma'
        }
    
    result = []
    for i in range(len(matrix_a)):
        row = []
        for j in range(len(matrix_a[0])):
            row.append(matrix_a[i][j] + matrix_b[i][j])
        result.append(row)
    
    return {'success': True, 'result': result}


def multiply_matrices(matrix_a, matrix_b):
    """
    Multiplica dos matrices (A x B)
    
    Args:
        matrix_a (list): Primera matriz (m x n)
        matrix_b (list): Segunda matriz (n x p)
    
    Returns:
        dict: { 'success': bool, 'result': list, 'error': str }
    """
    rows_a = len(matrix_a)
    cols_a = len(matrix_a[0])
    rows_b = len(matrix_b)
    cols_b = len(matrix_b[0])
    
    # Validar: número de columnas de A debe ser igual al número de filas de B
    if cols_a != rows_b:
        return {
            'success': False,
            'error': f'No se puede multiplicar: matriz A ({rows_a}x{cols_a}) con matriz B ({rows_b}x{cols_b}). '
                    f'Las columnas de A deben ser iguales a las filas de B'
        }
    
    # Crear matriz resultado (rows_a x cols_b)
    result = [[0 for _ in range(cols_b)] for _ in range(rows_a)]
    
    for i in range(rows_a):
        for j in range(cols_b):
            for k in range(cols_a):
                result[i][j] += matrix_a[i][k] * matrix_b[k][j]
    
    return {'success': True, 'result': result}


def validate_matrix(matrix):
    """
    Valida que la matriz sea correcta (todos sean números)
    
    Args:
        matrix (list): Matriz a validar
    
    Returns:
        bool: True si es válida, False si no
    """
    if not isinstance(matrix, list) or len(matrix) == 0:
        return False
    
    for row in matrix:
        if not isinstance(row, list) or len(row) == 0:
            return False
        for val in row:
            if not isinstance(val, (int, float)) or (isinstance(val, float) and val != val):  # val != val es NaN check
                return False
    
    return True
