:: ====================================================
:: Script de inicio de proyecto LavApp
:: Autor: Equipo LavApp
:: Versión: 1.0
:: Descripción: Script seguro para iniciar servicios de
:: desarrollo de LavApp (Frontend y Backend)
:: ====================================================
@echo off
:: Configurar codificación UTF-8
chcp 65001 > nul
setlocal EnableDelayedExpansion
title LavApp - Script de inicio

:: Saltar a la ejecución principal, evitando la definición de funciones
goto :main

:: ====================================================
:: Definición de funciones
:: ====================================================
:loading
set /a counter=0
set "spinner=\|/-"
:spin
set /a counter+=1
if !counter! gtr %~2 goto :eof
for /l %%i in (0,1,3) do (
    cls
    echo %~1
    echo !spinner:~%%i,1!
    timeout /t 0 /nobreak >nul
)
goto spin

:: ====================================================
:: Inicio del script principal
:: ====================================================
:main
echo Verificando requisitos previos...

:: Verificar Python
python --version >nul 2>&1
if %errorlevel% neq 0 (
    echo Python no esta instalado. Por favor, instale Python y vuelva a intentar.
    pause
    exit /b 1
)

:: Verificar Node.js
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo Node.js no esta instalado. Por favor, instale Node.js y vuelva a intentar.
    pause
    exit /b 1
)

echo Requisitos previos verificados correctamente.

echo Configurando el proyecto
call :loading "Preparando entorno..." 12

:: Configurar el backend
cd backend
echo Verificando entorno virtual de Python...

IF EXIST "venv\Scripts\activate.bat" (
    echo Usando entorno virtual existente...
    call venv\Scripts\activate
) ELSE (
    echo Creando nuevo entorno virtual...
    python -m venv venv
    call venv\Scripts\activate
)

call :loading "Configurando entorno virtual..." 8

echo Instalando dependencias del backend...
call :loading "Instalando requerimientos de Python..." 15
pip install -r requirements.txt

:: Configurar el frontend
cd ..\frontend
echo Instalando dependencias del frontend...
call :loading "Instalando módulos de Node..." 20
call npm install

:: Iniciar servicios
echo Iniciando servicios...
call :loading "Iniciando backend..." 10

:: Iniciar backend en una nueva ventana
start cmd /k "cd ../backend && call venv\Scripts\activate && python main.py"

call :loading "Esperando backend..." 8
timeout /t 5 >nul

call :loading "Iniciando frontend..." 10

:: Iniciar frontend en una nueva ventana
start cmd /k "cd ../frontend && npm run dev"

call :loading "Esperando frontend..." 8
timeout /t 5 >nul

:: Abrir el navegador
start http://localhost:5173

echo Servicios iniciados correctamente.
echo Backend corriendo en http://localhost:8001
echo Frontend corriendo en http://localhost:5173

pause