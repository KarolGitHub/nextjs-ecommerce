/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');

module.exports = {
  reactStrictMode: true,
  sassOptions: {
    includePaths: [path.join(__dirname, 'src/styles')],
  },
  env: {
    BASE_URL: 'http://localhost:3000',
    MONGODB_URL:
      'mongodb+srv://Mavri:1bhdyHbCyu2proGs@cluster0.k1qpw.mongodb.net/nextjs-ecommerce?retryWrites=true&w=majority',
  },
};
