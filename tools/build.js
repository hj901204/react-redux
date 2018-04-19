
'use strict'

/*
  build script
 */
const path = require('path')
const yargs = require('yargs')
const webpack = require('webpack')
const config = require('./config')
const webpackClientConfig = require('./webpack/webpack.client.config')
const fse = require('fs-extra')
const copyServer = require('./utils/copyServer')

process.env.NODE_ENV = 'production'

// build
const build = (names, argv) => {
  names = Array.isArray(names) ? names : [names]
  const promises = names.map(async (name) => {
    console.log(`\n${name} client & server build start .....\n`)
    await copyServer(name, argv)
    await fse.remove(path.resolve(config.dist, name, 'public', 'static'))
    const clientConfig = webpackClientConfig(name, argv)
    await runWebpack(clientConfig)
    console.log(`\n${name} client & server build end .....\n`)
  })

  return Promise.all(promises)
    .then(() => {
      console.log('build success')
    })
}

// webpack build
const runWebpack = (webpackConfig) => {
  return new Promise((resolve, reject) => {
    const compiler = webpack(webpackConfig)
    // compiler.apply(new ProgressPlugin())
    compiler.run((err, stats) => {
      if (err) {
        reject(err)
        return
      }
      const info = stats.toJson()
      if (stats.hasErrors()) {
        info.warnings.forEach(err => console.error(err))
      }

      if (stats.hasWarnings()) {
        info.warnings.forEach(err => console.warn(err + '\n'))
      }

      process.stdout.write(stats.toString({
        chunks: false,
        colors: true
      }))

      resolve()
    })
  })
}

build(yargs.argv._, yargs.argv)
  .catch(err => console.log(err))
