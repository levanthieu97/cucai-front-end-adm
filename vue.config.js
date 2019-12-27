const path = require('path');

function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  // warnings are only logged to the terminal and does not fail the compilation.
  lintOnSave: true,
  /* 
  example: 
  - root domain http://www.cucaishop.com/, here publicPath is '/' end domain 
  - http://www.cucaishop.com/home/ set publicPath to 'my-app'
  */
  publicPath: '/',
  //The directory where the production build files will be generated
  outputDir: 'build',
  /*
  'pages' build app in multi-page mode
  */
  //A directory (relative to outputDir) to nest generated static assets (js, css, img, fonts) under.
  assetsDir: 'assets',
  runtimeCompiler: undefined,
  //Setting this to false can speed up production builds if you don't need source maps for production.
  productionSourceMap: undefined,
  parallel: undefined,
  css: undefined,
  configureWebpack: {
    devtool: 'source-map',
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
        images: resolve('src/assets/images'),
        utilities: resolve('src/utilities')
      }
    },
  }
};