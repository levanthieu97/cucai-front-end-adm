const path = require('path');

function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  lintOnSave: true,
  publicPath: '/',
  outputDir: 'build',
  assetsDir: 'assets',
  runtimeCompiler: undefined,
  productionSourceMap: undefined,
  parallel: undefined,
  css: undefined,
  configureWebpack: {
    resolve: {
      alias: {
        '@': resolve('src'),
        core: resolve('src/core'),
        components: resolve('src/components'),
        modules: resolve('src/modules'),
        router: resolve('src/router'),
        store: resolve('src/store'),
        locales: resolve('src/locales'),
        assets: resolve('src/assets'),
        fonts: resolve('src/assets/fonts'),
        images: resolve('src/assets/images')
      }
    }
  }
};