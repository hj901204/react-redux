const fse = require('fs-extra')
const path = require('path')
const config = require('../config')

const ecosystem = {
  name: 'cloud-package-front',
  script: './front/index.js',
  watch: false,
  instances: 1,
  node_args: '--harmony',
  exec_interpreter: 'node',
  log_date_format: 'YYYY-MM-DD HH:mm Z',
  merge_logs: false,
  env: {
    NODE_ENV: 'production'
  },
  error_file: './front/logs/error/error.log',
  out_file: './front/logs/out/out.log'
}

module.exports = function(names, argv) {
  names = Array.isArray(names) ? names : [names]
  const apps = names.map(name => {
    return {
      name: `sbh-${name}`,
      script: `./${name}/index.js`,
      watch: false,
      instances: 1,
      node_args: '--harmony',
      exec_interpreter: 'node',
      log_date_format: 'YYYY-MM-DD HH:mm Z',
      merge_logs: false,
      env: {
        NODE_ENV: argv.env
      },
      error_file: `./${name}/logs/error/error.log`,
      out_file: `./${name}/logs/out/out.log`
    }
  })

  const dist = path.resolve(`${config.dist}/ecosystem.json`)
  return fse.outputJson(dist, {apps}, {spaces: 2})
}
