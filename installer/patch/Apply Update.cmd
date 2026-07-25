@echo off
setlocal
powershell.exe -NoProfile -ExecutionPolicy Bypass -File "%~dp0Apply-Update.ps1"
set "PATCH_EXIT=%ERRORLEVEL%"
echo.
if not "%PATCH_EXIT%"=="0" (
  echo The update was not installed. Read the error above.
) else (
  echo Update complete. You can launch Surfin' the Net normally.
)
pause
exit /b %PATCH_EXIT%
