@echo off
setlocal

cd /d "%~dp0"
set "PRISMA_LOG=%TEMP%\statecraft-prisma-generate.log"

echo.
echo Statecraft Online - test and run helper
echo =======================================
echo.

where node >nul 2>nul
if errorlevel 1 (
  echo ERROR: Node.js was not found on PATH. Install Node.js 20+ and try again.
  set "RESULT=1"
  goto finish
)

where npm.cmd >nul 2>nul
if errorlevel 1 (
  echo ERROR: npm.cmd was not found on PATH. Install npm 10+ and try again.
  set "RESULT=1"
  goto finish
)

if not exist ".env" (
  if exist ".env.example" (
    echo Creating .env from .env.example...
    copy ".env.example" ".env" >nul
  ) else (
    echo WARNING: .env is missing and .env.example was not found.
  )
)

if not exist "node_modules" (
  echo Installing dependencies...
  call npm.cmd install
  if errorlevel 1 goto failed
) else (
  echo Dependencies already installed.
)

tasklist /FI "IMAGENAME eq node.exe" 2>nul | find /I "node.exe" >nul
if not errorlevel 1 (
  echo.
  echo Note: node.exe processes are already running.
  echo If Prisma generation fails with EPERM, close existing API/web server windows and run this file again.
)

echo.
echo Generating Prisma client...
call npm.cmd run prisma:generate > "%PRISMA_LOG%" 2>&1
if errorlevel 1 (
  type "%PRISMA_LOG%"
  goto prisma_failed
)
type "%PRISMA_LOG%"
goto after_prisma

:after_prisma

echo.
echo Running typecheck...
call npm.cmd run typecheck
if errorlevel 1 goto failed

echo.
echo Running tests...
call npm.cmd test
if errorlevel 1 goto failed

echo.
echo Building app...
call npm.cmd run build
if errorlevel 1 goto failed

echo.
echo Validation passed.
echo.
echo Database note:
echo   If the API cannot find demo data, make sure PostgreSQL is running and run:
echo   npm.cmd run db:push
echo   npm.cmd run prisma:seed
echo.

choice /m "Start API and web dev servers now"
if errorlevel 2 goto done

echo.
echo Starting API on http://localhost:4000 ...
start "Statecraft API" cmd /k "cd /d %CD% && npm.cmd run dev:api"

echo Starting web app on http://localhost:5173 ...
start "Statecraft Web" cmd /k "cd /d %CD% && npm.cmd run dev:web"

echo.
echo Open http://localhost:5173 in your browser.
echo Health check: http://localhost:4000/health
goto done

:prisma_failed
echo.
echo WARNING: Prisma client generation failed.
echo On Windows this is often caused by a running API server locking Prisma's query engine DLL.
echo Close existing Statecraft API/web terminal windows and run test-and-run.bat again if you need a fresh Prisma client.
if exist "node_modules\.prisma\client\index.js" (
  echo.
  echo Existing Prisma client found, so validation will continue.
  goto after_prisma
)
echo.
echo ERROR: No existing Prisma client was found, so validation cannot continue.
set "RESULT=1"
goto finish

:failed
echo.
echo ERROR: A command failed. Fix the message above, then run test-and-run.bat again.
set "RESULT=1"
goto finish

:done
echo.
echo Done.
set "RESULT=0"

:finish
echo.
echo Press any key to close this window.
pause >nul
endlocal
exit /b %RESULT%
