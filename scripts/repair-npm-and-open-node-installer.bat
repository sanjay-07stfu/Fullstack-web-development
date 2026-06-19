@echo off
REM This script will attempt to remove the user-level broken npm folder and open the Node.js download page.
REM You will be prompted by UAC to run as Administrator — accept the prompt.
powershell -NoProfile -Command "Start-Process powershell -ArgumentList '-NoProfile','-ExecutionPolicy','Bypass','-Command',\"Remove-Item -LiteralPath 'C:\\Users\\yedag\\node_modules\\npm' -Recurse -Force -ErrorAction SilentlyContinue; Remove-Item -LiteralPath 'C:\\Users\\yedag\\node_modules\\.npm-*' -Recurse -Force -ErrorAction SilentlyContinue; Remove-Item -LiteralPath 'C:\\Users\\yedag\\node_modules\\.corepack-*' -Recurse -Force -ErrorAction SilentlyContinue; Start-Process 'https://nodejs.org/en/download/'\" -Verb RunAs"
pause
