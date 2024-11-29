@echo off
setlocal

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

echo Instalando dependencias del backend...
pip install -r requirements.txt

:: Configurar el frontend
cd ..\frontend
echo Instalando dependencias del frontend...
call npm install

:: Iniciar servicios
echo Iniciando servicios...

:: Iniciar backend en una nueva ventana
start cmd /k "cd ../backend && call venv\Scripts\activate && python main.py"

:: Esperar unos segundos para que el backend inicie
timeout /t 5

:: Iniciar frontend en una nueva ventana
start cmd /k "cd ../frontend && npm run dev"

:: Esperar unos segundos para que el frontend inicie
timeout /t 5

:: Abrir el navegador
start http://localhost:5173

echo Servicios iniciados correctamente.
echo Backend corriendo en http://localhost:8001
echo Frontend corriendo en http://localhost:5173

pause