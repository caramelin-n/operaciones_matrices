@echo off
REM Script de inicio rápido para Windows
REM Este script abre tres terminales: una para cada servidor y el frontend

echo ======================================
echo OPERACIONES CON MATRICES
echo Iniciando todos los servidores...
echo ======================================

REM Abrir Terminal 1: Frontend React + Vite
start cmd /k "cd front\operaciones_matrices && npm install && npm run dev"

REM Abrir Terminal 2: Servidor Node.js
start cmd /k "cd server-node && npm install && npm start"

REM Abrir Terminal 3: Servidor Python
start cmd /k "cd server-python && pip install -r requirements.txt && python app.py"

echo ======================================
echo Las 3 ventanas se abrirán en 5 segundos...
echo 
echo Frontend:  http://localhost:5173
echo Node.js:   http://localhost:3001
echo Python:    http://localhost:3002
echo ======================================
timeout /t 5
