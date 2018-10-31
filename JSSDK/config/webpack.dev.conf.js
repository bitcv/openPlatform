const path = require('path');
const webpack = require('webpack')
const packageInfo = require('../package')

module.exports = {
  mode: 'production',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'bcvwallet.min.js',
    library: 'bcvWallet',
    libraryTarget: 'umd'
  },
  devServer: {
    host: '0.0.0.0',
    openPage: 'demo.html',
    contentBase: [path.resolve(__dirname, '../demo')],
    proxy: {
      '/index.php': {
        target: 'http://sdkdemo.bitcv.com',
        changeOrigin: true
      }
    }
  },
  module: {
    rules: [
      {
        enforce: "pre",
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "eslint-loader",
        options: {}
      },
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  },
  plugins: [
    new webpack.BannerPlugin(`${packageInfo.name} v${packageInfo.version}`)
  ]
};
