var webpack = require('webpack');
var path = require('path');

module.exports = {
  entry: [
    'webpack-hot-middleware/client',
    'webpack/hot/only-dev-server',
    './index.js'
  ],
  module: {
    loaders: [
      { test: /\.js$/, exclude: /node_modules/, loader: "react-hot!babel"},
      {
        test: /\.scss$/,
        loaders: ["style", "css?sourceMap", "sass?sourceMap"]
      },
      {test: /\.(png|jpg)$/, loader: 'url-loader?limit=250000'}
    ]
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '.jpg'],
    root: [
      path.resolve(__dirname, '../../src')
    ]
  },
  output: {
    path: __dirname + '../web',
    publicPath: 'http://localhost:3001/dist/js',
    filename: 'app.js'
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
  ],
  devServer: {
    hot: true,
    inline: true
  }
};
