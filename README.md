<p align="center">
  <a href="README.md"><img alt="简体中文-当前" src="https://img.shields.io/badge/%E7%AE%80%E4%BD%93%E4%B8%AD%E6%96%87-%E5%BD%93%E5%89%8D-22d3ee?style=for-the-badge&labelColor=0b1220"></a>
  <a href="README.en.md"><img alt="English-Readme" src="https://img.shields.io/badge/English-Readme-a855f7?style=for-the-badge&labelColor=0b1220"></a>
</p>

# NebulaTree Desktop (Electron)

赛博朋克风 3D 粒子树 + MediaPipe 手势识别（Three.js + Electron 桌面应用）。

- 平台：Windows（Electron）
- 图形：Three.js（WebGL 后处理：Bloom 等）
- 视觉：MediaPipe Tasks Vision（手势与关键点）
- UI：Tailwind + 自定义 HUD / 赛博加载界面

## 目录结构

```
NebulaTree_Desktop/
├─ index.html          # 前端页面（含 import map & 逻辑）
├─ main.js             # Electron 主进程
├─ package.json        # 脚本与打包配置
├─ .gitignore          # 忽略构建产物
└─ README.md           # 使用说明
```


---

## 本地运行（开发模式）

前置：Node.js LTS（建议 18+）

```powershell
# 进入项目目录
cd C:\Users\Katelya\Desktop\NebulaTree_Desktop

# 安装依赖
npm install

# 启动开发调试
npm start
```

首次启动会提示摄像头授权。界面在模型与摄像头加载时会显示「加载进度条」。

---

## 打包（Windows 便携版 EXE）

本项目使用 electron-builder 生成「单文件便携版」可执行程序（portable）。

> 若在国内网络环境，可配置镜像以加速依赖下载：
>
> ```powershell
> $env:ELECTRON_BUILDER_BINARIES_MIRROR="https://npmmirror.com/mirrors/electron-builder-binaries/"
> ```

构建命令：

```powershell
npm run build
```

默认产物：
- 主要：dist\NebulaTree.exe（若 electron-builder 成功生成 portable）
- 备用：dist\win-unpacked\NebulaTree.exe（未签名的解包目录，可直接运行）

如果遇到 electron-builder 在下载/解压 `winCodeSign` 时报「无法创建符号链接/权限不足」：
- 方案 A（推荐）：在 Windows 设置 → 开发者选项 中开启「开发人员模式」（允许符号链接）后重试。
- 方案 B（应急）：使用 `dist\win-unpacked\NebulaTree.exe` 作为便携运行文件（可直接双击运行）。

---

## Electron 重要设置

- 摄像头权限：主进程里通过 `setPermissionRequestHandler` 默认允许 `media`。
- webPreferences：开发方便起见已开启 `nodeIntegration: true` 与 `contextIsolation: false`。
- CSP 策略（index.html `<meta http-equiv="Content-Security-Policy">`）：
  - 允许从 jsDelivr / unpkg / esm.sh / Google Fonts / storage.googleapis.com 加载资源
  - 允许 `mediastream:`、`blob:`、WebGL 运行所需的源

如需更严格的生产安全策略，可在上云前收敛：
- 关闭 `nodeIntegration` 与开启 `contextIsolation`
- 移除 `'unsafe-inline'` / `'unsafe-eval'`，将脚本改为文件形式并加 Subresource Integrity

---

## 常见问题（FAQ）

- Q：启动时出现红色错误窗口「Failed to fetch」？
  - A：通常是 CSP 未允许 `storage.googleapis.com` 或外部 CDN。当前已默认允许；若网络被拦截，建议科学上网或使用离线资源。

- Q：打包时报 `winCodeSign` 提示无法创建符号链接？
  - A：Windows 未开启符号链接权限。开启「开发人员模式」或以管理员身份运行 PowerShell；不行就直接用 `dist\\win-unpacked\\NebulaTree.exe`。

- Q：摄像头权限弹窗不出现/无法获取摄像头？
  - A：检查是否有其它程序占用摄像头；或在 Windows 隐私设置中开启应用的摄像头权限。

---


## 许可

本项目默认以 MIT 许可证发布（可按需修改）。
