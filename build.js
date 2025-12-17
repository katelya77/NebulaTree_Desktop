const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

console.log('🔨 开始打包 NebulaTree...');

// 设置环境变量禁用代码签名
process.env.CSC_IDENTITY_AUTO_DISCOVERY = 'false';
process.env.WIN_CSC_LINK = '';
process.env.WIN_CSC_KEY_PASSWORD = '';

// 运行 electron-builder，但跳过符号链接问题
try {
  execSync('electron-builder --win --publish never', {
    stdio: 'inherit',
    env: {
      ...process.env,
      CSC_IDENTITY_AUTO_DISCOVERY: 'false'
    }
  });
  
  // 检查输出目录
  const distDir = path.join(__dirname, 'dist');
  const portableExe = path.join(distDir, 'NebulaTree.exe');
  
  if (fs.existsSync(portableExe)) {
    console.log('\n✅ 打包成功！');
    console.log(`📦 文件位置: ${portableExe}`);
    console.log('✨ 可以直接运行该 EXE 文件');
  } else {
    console.log('\n⚠️  未找到输出文件');
  }
} catch (error) {
  console.error('❌ 打包失败:', error.message);
  process.exit(1);
}
