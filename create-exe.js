const { app, BrowserWindow } = require('electron')
const { spawn } = require('child_process')
const path = require('path')

app.whenReady().then(() => {
    // Запускаем ваш сервер
    const server = spawn('cmd.exe', ['/c', 'npm run dev'], {
        cwd: __dirname,
        shell: true
    })

    // Создаем окно браузера
    const win = new BrowserWindow({
        width: 1200,
        height: 800,
        autoHideMenuBar: true
    })

    // Через 3 секунды открываем localhost
    setTimeout(() => {
        win.loadURL('http://localhost:3000')
    }, 3000)
})