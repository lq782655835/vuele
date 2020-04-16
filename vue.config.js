const path = require('path');
const WebpackBundleAnalyzer = require('webpack-bundle-analyzer');

const {
  BundleAnalyzerPlugin,
} = WebpackBundleAnalyzer;

const outputDir = path.resolve(__dirname, './dist');
module.exports = {
  outputDir,
  runtimeCompiler: true,
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'scss',
      patterns: [
        path.resolve(__dirname, 'src/styles/mixins/index.scss'),
      ],
    },
  },
  configureWebpack: (config) => {
    if (process.env.NODE_ENV === 'production') {
      config.externals = {
        vue: {
          root: 'Vue',
          commonjs: 'vue',
          commonjs2: 'vue',
          amd: 'vue',
        },
        'element-ui': {
          root: 'ELEMENT',
          commonjs: 'element-ui',
          commonjs2: 'element-ui',
          amd: 'element-ui',
        },
      };
    }
    return {};
  },
  // configureWebpack: {
  //   plugins: [
  //     new BundleAnalyzerPlugin(),
  //   ],
  // },
  chainWebpack: (config) => {
    const { alias } = config.resolve;
    alias.set('@', path.resolve(__dirname, './src/'));
    // updateContext(config);
  },
};
