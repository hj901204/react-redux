const path = require('path')
// temp build dirname
module.exports = {
  dist: path.resolve('./build'),
  temp: path.resolve('./node_modules/.cloud-cache')
}
