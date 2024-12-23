const dotenv = require('dotenv');
const fs = require('fs')

const envFile = `.env.${process.env.NODE_ENV || 'development'}`;
if (fs.existsSync(envFile)) {
  dotenv.config({ path: envFile });
  console.log(`Loaded environment variables from ${envFile}`);
} else {
  console.error(`Environment file ${envFile} not found!`);
  process.exit(1);
}

const config = {
  port: process.env.PORT,
  db: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
  },
  host: process.env.HOST,
};

module.exports = config;