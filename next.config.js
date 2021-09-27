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
};
