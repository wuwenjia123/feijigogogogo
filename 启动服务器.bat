@echo off
chcp 65001 >nul
title 飞机大战 - 仅启动服务器
cd /d "%~dp0"

python -V >nul 2>&1
if errorlevel 1 (
    echo ❌ 没装 Python，请先安装 Python 3.x 并加入 PATH。
    pause
    exit /b 1
)

netstat -ano | findstr ":8000 " | findstr LISTENING >nul 2>&1
if %errorlevel%==0 (
    echo ⚠  8000 端口已占用，服务器应该已经在跑了。
    echo    浏览器访问: http://localhost:8000/
    pause
    exit /b 0
)

echo 飞机大战 HTTP 服务器启动中 (端口 8000) ...
echo   工作目录: %~dp0
echo   浏览器访问: http://localhost:8000/
echo   关闭本窗口 = 停止服务器。
echo.
python -m http.server 8000
pause
