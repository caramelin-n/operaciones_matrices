#!/bin/bash

# Script de inicio rápido para macOS/Linux
# Este script abre tres terminales: una para cada servidor y el frontend

echo "======================================"
echo "OPERACIONES CON MATRICES"
echo "Iniciando todos los servidores..."
echo "======================================"

# Función para abrir terminal (macOS)
open_mac_terminal() {
    local title=$1
    local command=$2
    
    osascript <<EOF
tell application "Terminal"
    do script "cd '$PWD' && $command"
    set current settings of front window to settings set "Basic"
end tell
EOF
}

# Función para abrir terminal (Linux con gnome-terminal)
open_linux_terminal() {
    local title=$1
    local command=$2
    gnome-terminal --title="$title" -- bash -c "cd '$PWD' && $command; exec bash"
}

# Detectar SO
if [[ "$OSTYPE" == "darwin"* ]]; then
    echo "Abriendo terminales en macOS..."
    open_mac_terminal "Frontend" "cd front/operaciones_matrices && npm install && npm run dev"
    sleep 1
    open_mac_terminal "Node.js Server" "cd server-node && npm install && npm start"
    sleep 1
    open_mac_terminal "Python Server" "cd server-python && pip install -r requirements.txt && python app.py"
elif [[ "$OSTYPE" == "linux-gnu"* ]]; then
    echo "Abriendo terminales en Linux..."
    open_linux_terminal "Frontend" "cd front/operaciones_matrices && npm install && npm run dev"
    sleep 1
    open_linux_terminal "Node.js Server" "cd server-node && npm install && npm start"
    sleep 1
    open_linux_terminal "Python Server" "cd server-python && pip install -r requirements.txt && python app.py"
else
    echo "Sistema operativo no soportado."
    exit 1
fi

echo "======================================"
echo "Servidores iniciados:"
echo "Frontend:  http://localhost:5173"
echo "Node.js:   http://localhost:3001"
echo "Python:    http://localhost:3002"
echo "======================================"
