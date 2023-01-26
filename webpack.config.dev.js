const webpack = require('webpack');
const path = require('path');
const nodeExternals = require('webpack-node-externals');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

var config = {
  mode: 'development',
  plugins: [new webpack.HotModuleReplacementPlugin()],
  optimization: {
    minimizer: [
      // we specify a custom UglifyJsPlugin here to get source maps in production
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        uglifyOptions: {
          compress: false,
          ecma: 6,
          mangle: true,
        },
        sourceMap: true,
      }),
    ],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {test: /\.(png|jpe?g|gif)$/i, loader: 'file-loader'},
      {
        test: /\.svg$/,
        use: [
          {
            loader: 'svg-url-loader',
            options: {
              limit: 10000,
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json'],
    alias: {
      '@interviewApp': path.resolve(__dirname),
    },
  },
};

var client = Object.assign({}, config, {
  name: 'client',
  devtool: 'inline-source-map',
  target: 'web',
  entry: path.resolve(__dirname, 'src/client/index.tsx'),
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'build'),
  },
});

var server = Object.assign({}, config, {
  name: 'server',
  target: 'node',
  externals: [nodeExternals()],
  entry: path.resolve(__dirname, 'src/server/index.tsx'),
  output: {
    filename: 'server.js',
    path: path.resolve(__dirname, 'build'),
  },
});

module.exports = [client, server];
