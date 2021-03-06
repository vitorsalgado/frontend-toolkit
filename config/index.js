'use strict'

const Joi = require('joi')
const EnvSchema = require('./env.schema')
const { resolvePath } = require('./utils')

const EnvVars = Joi.attempt(process.env, EnvSchema)

module.exports = {
  isProduction: EnvVars.NODE_ENV === 'production',
  isTest: EnvVars.NODE_ENV === 'test',
  isDebugMode: EnvVars.DEBUG_MODE,

  publicPath: EnvVars.ASSET_PATH,
  useSourceMap: EnvVars.USE_SOURCE_MAP ? 'source-map' : false,

  devServer: {
    devURL: EnvVars.DEV_SERVER || `http://0.0.0.0:${EnvVars.DEV_SERVER_PORT}`,
    port: EnvVars.DEV_SERVER_PORT
  },

  testing: {
    debug: EnvVars.TEST_DEBUG,
    headless: EnvVars.TEST_HEADLESS,
    incognito: EnvVars.TEST_INCOGNITO
  },

  paths: {
    sources: resolvePath('src'),
    build: resolvePath('dist'),
    indexHTML: resolvePath('./site/index.html'),
    indexJS: resolvePath('./src/index.tsx'),
    packageJSON: resolvePath('package.json'),
    nodeModules: resolvePath('node_modules')
  },

  analyser: {
    port: EnvVars.ANALYSER_PORT
  },

  envsAsString: {
    'process.env': Object
      .keys(EnvVars)
      .reduce((env, key) => {
        env[key] = JSON.stringify(EnvVars[key])
        return env
      }, {})
  },

  vars: EnvVars
}
