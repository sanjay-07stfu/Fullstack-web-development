# Run this script AS ADMINISTRATOR in PowerShell
# It will take ownership of C:\Users\yedag\node_modules, grant full control,
# remove npm/corepack temp folders, clear npm cache, and run the install in the project.

Write-Host "*** Running fix-npm-permissions-and-install.ps1 ***"

# Stop node processes if any
Get-Process node -ErrorAction SilentlyContinue | ForEach-Object { Stop-Process -Id $_.Id -Force }

# Take ownership of the user-level node_modules folder
Write-Host "Taking ownership of C:\Users\yedag\node_modules (may require admin)..."
try {
    takeown /F "C:\Users\yedag\node_modules" /R /D Y | Out-Null
} catch {
    Write-Warning "takeown failed or not required: $_"
}

# Grant current user full control
Write-Host "Granting full control to current user on C:\Users\yedag\node_modules..."
$u = $env:USERNAME
try {
    icacls "C:\Users\yedag\node_modules" /grant "$u:F" /T | Out-Null
} catch {
    Write-Warning "icacls failed or not required: $_"
}

# Remove npm/corepack temporary folders (safe cleanup)
Write-Host "Removing .npm-* and .corepack-* temp folders under C:\Users\yedag\node_modules (if present)..."
Get-ChildItem -Path "C:\Users\yedag\node_modules" -Force -Filter ".npm-*" -ErrorAction SilentlyContinue | Remove-Item -Force -Recurse -ErrorAction SilentlyContinue
Get-ChildItem -Path "C:\Users\yedag\node_modules" -Force -Filter ".corepack-*" -ErrorAction SilentlyContinue | Remove-Item -Force -Recurse -ErrorAction SilentlyContinue

# Optional: remove problematic leftover folders created by npm (if present)
$patterns = @(".npm-*", ".corepack-*")
foreach ($p in $patterns) {
    Get-ChildItem -Path "C:\Users\yedag\node_modules" -Force -Filter $p -ErrorAction SilentlyContinue | ForEach-Object {
        try { Remove-Item -LiteralPath $_.FullName -Recurse -Force -ErrorAction SilentlyContinue } catch { Write-Warning "Could not remove $_.FullName: $_" }
    }
}

# Clear npm cache
Write-Host "Clearing npm cache..."
npm cache clean --force

# Change to project and run install
$project = "C:\Users\yedag\OneDrive\Desktop\fullstack web developer\Fullstack-web-development"
Write-Host "Running npm install in $project..."
Set-Location -LiteralPath $project
npm install tailwindcss @tailwindcss/vite

Write-Host "Script finished. Check the output above for errors. If install succeeds, you can close this window."