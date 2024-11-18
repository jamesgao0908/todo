开发时
frontend
💻开发时默认使用 .env.development --- npm start  
backend 
NODE_ENV=development node index.js


上线时
frontend
📦打包默认使用 .env.production
npm run build
backend
跑一次
NODE_ENV=development node index.js
一直跑
pm2 start ecosystem.config.js --env production 


Ps
1. 后端只有.env.production被上传到了服务器，.env.development 没有上传因为没有必要
