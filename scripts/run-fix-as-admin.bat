@echo off
REM Run the PowerShell fix script as Administrator. You will see a UAC prompt — accept it.
SET SCRIPT=%~dp0fix-npm-permissions-and-install.ps1
powershell -NoProfile -Command "Start-Process powershell -ArgumentList '-NoProfile -ExecutionPolicy Bypass -File "%SCRIPT%"' -Verb RunAs"
pause
