@echo off
setlocal enabledelayedexpansion

:menu
cls
echo Pyhton es necesario tenerlo instalado
echo ================================
echo  Menu Principal
echo ================================
echo 1. Instalar Python
echo 2. Abrir index.html
echo 3. Salir
echo ================================
set /p option="Seleccione una opcion (1-3): "

if "%option%"=="1" (
    call :install_python
) else if "%option%"=="2" (
    call :open_index
) else if "%option%"=="3" (
    echo Saliendo...
    exit /b
) else (
    echo Opción no válida. Intente de nuevo.
    timeout /t 2 >nul
    goto menu
)

:install_python
:: Comprobar si Python está instalado
where python >nul 2>nul
if %errorlevel% neq 0 (
    echo Python no está instalado. Descargando e instalando...
    powershell -Command "(New-Object System.Net.WebClient).DownloadFile('https://www.python.org/ftp/python/3.9.7/python-3.9.7.exe', 'python_installer.exe')"
    start /wait python_installer.exe /quiet InstallAllUsers=1 PrependPath=1
    del python_installer.exe
    echo Python instalado correctamente.
) else (
    echo Python ya está instalado.
)

:: Instalar pyodbc sin mostrar en pantalla
pip install pyodbc >nul 2>nul
echo pyodbc instalado (si no estaba ya instalado).

goto menu

:open_index
:: Establecer el puerto
set puerto=8000

:: Clonar el repositorio si no existe
if not exist "C:\Lenguaje-de-marcas-proyecto" (
    git clone https://github.com/demonhd64/Lenguaje-de-marcas-proyecto.git C:\Lenguaje-de-marcas-proyecto
)

:: Asegurarse de moverse a C:
C:

:: Cambiar al directorio donde está el archivo index.html
cd C:\Lenguaje-de-marcas-proyecto\Proyecto\Principal

:: Iniciar el servidor HTTP
start cmd /k "python -m http.server %puerto%"

timeout /t 5

:: Abrir el archivo index.html en el navegador
start http://localhost:%puerto%/index.html

goto menu