module.exports = {
  appId: 'com.example.electron-boilerplate',
  // 只打包 dist 中的文件
  files: ['dist/**/*'],
  directories: {
    output: 'build',
  },
  extraResources: './public',
};
