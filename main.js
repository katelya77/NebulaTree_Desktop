const { app, BrowserWindow, Menu, session } = require('electron');
const path = require('path');

// 隐藏菜单栏
Menu.setApplicationMenu(null);

function createWindow() {
    const mainWindow = new BrowserWindow({
        width: 1280,
        height: 800,
        title: 'NebulaTree',
        icon: path.join(__dirname, 'icon.png'), // 可选：如果你有图标文件
        autoHideMenuBar: true, // 自动隐藏菜单栏
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            // 允许加载远程内容（CDN）
            webSecurity: true,
            // 允许运行不安全内容（如有需要可设为 true）
            allowRunningInsecureContent: false
        }
    });

    // 设置摄像头权限 - 自动授予
    session.defaultSession.setPermissionRequestHandler((webContents, permission, callback) => {
        const allowedPermissions = ['media', 'mediaKeySystem', 'geolocation', 'notifications', 'fullscreen'];
        if (allowedPermissions.includes(permission)) {
            callback(true); // 授予权限
        } else {
            callback(false);
        }
    });

    // 也可以设置权限检查处理器
    session.defaultSession.setPermissionCheckHandler((webContents, permission, requestingOrigin) => {
        // 允许所有媒体相关权限
        if (permission === 'media') {
            return true;
        }
        return true;
    });

    // 加载 index.html
    mainWindow.loadFile('index.html');

    // 开发时可以打开 DevTools（生产环境可注释掉）
    // mainWindow.webContents.openDevTools();

    // 窗口关闭时的处理
    mainWindow.on('closed', () => {
        app.quit();
    });
}

// Electron 准备就绪时创建窗口
app.whenReady().then(() => {
    createWindow();

    // macOS 特殊处理：点击 dock 图标时重新创建窗口
    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });
});

// 所有窗口关闭时退出应用（Windows/Linux）
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

// 处理证书错误（开发环境）
app.on('certificate-error', (event, webContents, url, error, certificate, callback) => {
    // 在开发环境中忽略证书错误
    event.preventDefault();
    callback(true);
});
