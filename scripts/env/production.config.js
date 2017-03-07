var webpack = require('webpack');
var path = require('path');

module.exports = {
  entry: [
    './index.js'
  ],
  devtool: 'cheap-module-source-map',
  module: {
    loaders: [
      { test: /\.js$/, exclude: /node_modules/, loader: "babel?compact=false" },
      { test: /\.json$/, exclude: /node_modules/, loader: 'json-loader' },
      {
        test: /\.less$/,
        loader: "style!css!less"
      },
      {
        test: /\.s?css$/,
        loaders: ["style", "css", "sass"]
      },
      {test: /\.(png|jpg)$/, loader: 'url-loader?limit=250000'}
    ]
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '.jpg', '.json', 'index.json'],
    root: [
      path.resolve(__dirname, '../../src')
    ]
  },
  output: {
    path: path.join(__dirname + '/../../web/dist/js'),
    publicPath: 'http://localhost:3001/',
    filename: 'app.js'
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify("production")
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    new webpack.optimize.DedupePlugin()
  ]
};
