module.exports = {
  apps: [
    {
      name: 'todo-app',             // 应用名称
      script: './index.js',         // 启动文件
      instances: 1,                 // 实例数量，生产环境推荐根据CPU核数调整
      autorestart: true,            // 自动重启
      watch: false,                 // 是否监控文件变化（生产环境建议关闭）
      max_memory_restart: '1G',     // 内存占用超过1GB时重启
      env: {
        NODE_ENV: 'development',    // 开发环境变量
        PORT: 3000,
      },
      env_production: {
        NODE_ENV: 'production',     // 生产环境变量
        PORT: 8000,                 // 替换为你的生产端口
      },
    },
  ],
};
