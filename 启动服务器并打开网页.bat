@echo off
chcp 65001 >nul
title 飞机大战 - 服务器启动器 v1
cd /d "%~dp0"

echo.
echo ╔════════════════════════════════════════════════════════════╗
echo ║         飞机大战 HTTP 服务器启动器                          ║
echo ╠════════════════════════════════════════════════════════════╣
echo ║  工作目录: %~dp0
echo ║  访问地址: http://localhost:8000/                          ║
echo ╚════════════════════════════════════════════════════════════╝
echo.

rem 检查 python 是否可用
python -V >nul 2>&1
if errorlevel 1 (
    echo ❌ 没有检测到 python！请先安装 Python 3.x 并加入 PATH。
    echo    下载地址: https://www.python.org/downloads/
    echo.
    pause
    exit /b 1
)

rem 检查 8000 端口是否已被占用（避免重复启动报错）
netstat -ano | findstr ":8000 " | findstr LISTENING >nul 2>&1
if %errorlevel%==0 (
    echo ⚠  端口 8000 已经在监听（服务器可能已启动），直接打开浏览器...
    timeout /t 1 /nobreak >nul
    start "" "http://localhost:8000/"
    echo.
    echo ✅ 浏览器已打开。如需查看日志请在此窗口停留。
    echo    关闭此窗口 = 停止服务器。
    echo.
    pause
    exit /b 0
)

echo ✅ 启动 HTTP 服务器 (端口 8000) ...
echo    最小化此窗口 = 后台运行；关闭此窗口 = 停止服务器。
echo.
echo 💡 3秒后自动打开浏览器跳转 http://localhost:8000/ ...
timeout /t 3 /nobreak >nul
start "" "http://localhost:8000/"

rem 启动服务器（当前窗口会阻塞，Ctrl+C 停止）
echo.
echo ─────────────────────────────────────────────────────────────
python -m http.server 8000
rem 如果被Ctrl+C或关闭，会执行到这里
echo.
echo ─────────────────────────────────────────────────────────────
echo 🛑 服务器已停止。
pause
