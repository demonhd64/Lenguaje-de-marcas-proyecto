@echo off
setlocal enabledelayedexpansion

:: Asegurarse de moverse a C:
C:

:menu
cls
echo Python es necesario tenerlo instalado
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
    exit /b  :: Cerrar el cmd del menú al elegir la opción 2
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

goto menu

:open_index
:: Establecer el puerto
set puerto=8000

:: Ruta al directorio donde se almacenará el repositorio
set repo_dir=C:\Lenguaje-de-marcas-proyecto

:: Verificar si el directorio ya existe
if exist "%repo_dir%" (
    echo El repositorio ya existe. Actualizando con los últimos cambios...
    cd "%repo_dir%\Proyecto"
    git pull origin main
) else (
    echo Clonando el repositorio desde GitHub...
    git clone https://github.com/demonhd64/Lenguaje-de-marcas-proyecto.git "%repo_dir%"
    cd "%repo_dir%\Proyecto"
)

:: Iniciar el servidor HTTP en una nueva ventana de cmd
start cmd /k "python -m http.server %puerto%"

:: Esperar un momento para asegurar que el servidor se inicie antes de abrir el navegador
timeout /t 5

:: Abrir el archivo index.html en el navegador
start http://localhost:%puerto%/index.html

goto menu
