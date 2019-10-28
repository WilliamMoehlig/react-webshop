/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');

module.exports = {
  process(src, filename) {
    return `module.exports = ${JSON.stringify(path.relative(path.resolve(__dirname, '..'), filename))};`;
  },
};
