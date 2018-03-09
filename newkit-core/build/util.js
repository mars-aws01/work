const path = require('path');
const root = folder => {
  return path.join(__dirname, '../', folder);
};

module.exports = {
  root
};
