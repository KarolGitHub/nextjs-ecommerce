/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');

module.exports = {
  reactStrictMode: true,
  sassOptions: {
    includePaths: [path.join(__dirname, 'src/styles')],
  },
  images: {
    domains: ['openui5.hana.ondemand.com'],
  },
  env: {
    BASE_URL: 'YOUR_URL',
    MONGODB_URL:
      'YOUR_MONGODB_URL',
    ACCESS_TOKEN_SECRET: 'YOUR_ACCESS_TOKEN',
    REFRESH_TOKEN_SECRET:
      'YOUR_REFRESH_TOKEN',
  },
};
