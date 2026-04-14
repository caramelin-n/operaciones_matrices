"""
Servidor Flask para operaciones de matrices
"""

from flask import Flask, request, jsonify
from flask_cors import CORS
from logic.matrix_ops import add_matrices, multiply_matrices, validate_matrix

app = Flask(__name__)
CORS(app)

# Validar matriz en los requests
def validate_request_matrices():
    """
    Middleware para validar matrices en el request
    """
    data = request.get_json()
    
    if not data or 'matrixA' not in data or 'matrixB' not in data:
        return False, {'success': False, 'error': 'Se requieren matrixA y matrixB'}
    
    matrix_a = data.get('matrixA')
    matrix_b = data.get('matrixB')
    
    if not validate_matrix(matrix_a):
        return False, {'success': False, 'error': 'matrixA no es válida. Todos los elementos deben ser números'}
    
    if not validate_matrix(matrix_b):
        return False, {'success': False, 'error': 'matrixB no es válida. Todos los elementos deben ser números'}
    
    return True, (matrix_a, matrix_b)


# Rutas

@app.route('/api/sum', methods=['POST'])
def sum_matrices():
    """
    POST /api/sum
    Suma dos matrices
    """
    is_valid, result_or_data = validate_request_matrices()
    
    if not is_valid:
        return jsonify(result_or_data), 400
    
    matrix_a, matrix_b = result_or_data
    result = add_matrices(matrix_a, matrix_b)
    
    if result['success']:
        return jsonify(result), 200
    else:
        return jsonify(result), 400


@app.route('/api/multiply', methods=['POST'])
def multiply_matrices_route():
    """
    POST /api/multiply
    Multiplica dos matrices
    """
    is_valid, result_or_data = validate_request_matrices()
    
    if not is_valid:
        return jsonify(result_or_data), 400
    
    matrix_a, matrix_b = result_or_data
    result = multiply_matrices(matrix_a, matrix_b)
    
    if result['success']:
        return jsonify(result), 200
    else:
        return jsonify(result), 400


@app.route('/health', methods=['GET'])
def health():
    """
    Health check del servidor
    """
    return jsonify({'status': 'OK', 'server': 'Python'}), 200


@app.errorhandler(404)
def not_found(error):
    """
    Manejo de rutas no encontradas
    """
    return jsonify({'success': False, 'error': 'Ruta no encontrada'}), 404


@app.errorhandler(500)
def server_error(error):
    """
    Manejo de errores internos del servidor
    """
    return jsonify({'success': False, 'error': 'Error interno del servidor'}), 500


if __name__ == '__main__':
    print("Servidor Python ejecutándose en http://localhost:3002")
    app.run(debug=True, port=3002)
