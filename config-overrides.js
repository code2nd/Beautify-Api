const {
  override,
  fixBabelImports,
  addLessLoader,
  addWebpackAlias
} = require('customize-cra');
const path = require('path');

module.exports = override(
  // 配置路径别名
  addWebpackAlias({
    '@': path.resolve(__dirname, './src')
  }),
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    // style: 'css',
    style: true,
    // productionSourceMap: false,
  }),
  addLessLoader({
    javascriptEnabled: true,
    modifyVars: { '@primary-color': '#00a8ff' },
  })
);
