@echo off
title Insure Audit Expert Runner
echo ===================================================
echo   Insure Audit Expert - Production Server Launcher
echo ===================================================
echo.
echo [1/2] Starting Production Web Server on port 3000...
start "Insure Audit Expert - Server (Port 3000)" cmd /k "node .output/server/index.mjs"
timeout /t 2 >nul

echo [2/2] Starting High-Speed Cloudflare Tunnel...
start "Insure Audit Expert - Public Tunnel" cmd /k "cloudflared tunnel --url http://127.0.0.1:3000"

echo.
echo ===================================================
echo   Done! Both windows are now running:
echo   - Local URL: http://localhost:3000
echo   - Check the Tunnel window for your public HTTPS link!
echo ===================================================
timeout /t 4 >nul

