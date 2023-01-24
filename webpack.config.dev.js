const webpack = require("webpack");
const path = require("path");
const nodeExternals = require("webpack-node-externals");

var config = {
    mode: "development",
};

var client = Object.assign({}, config, {
    name: "client",
    target: "web",
    devtool: 'inline-source-map',
    entry: path.resolve(__dirname, "src/client/index.tsx"),
    output: {
      globalObject: 'this',
      path: path.resolve(__dirname, 'build'),
      filename: 'bundle.js',
      publicPath: '/',
    },
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
    plugins: [
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify('development'),
          WEBPACK: true,
        },
      }),
      /*
       * Uglifies JS which improves performance
       * React will throw console warnings if this is not implemented
       */
    ],
    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.json'],
      alias: {
        '@interviewApp': path.resolve(__dirname),
      },
    },
    module: {
      rules: [
        {
          test: /\.(ts|tsx)$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
          },
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
});

var server = Object.assign({}, config, {
    name: "server",
    devtool: 'inline-source-map',
    target: 'node',
    externals: [nodeExternals()],
      entry: path.resolve(__dirname, "src/server/index.tsx"),
    output: {
      globalObject: 'this',
      path: path.resolve(__dirname, "build")
      publicPath: '../',
      filename: 'server.js',
      library: 'app',
      libraryTarget: 'commonjs2',
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify('test'),
        },
      }),
      /*
       * Uglifies JS which improves performance
       * React will throw console warnings if this is not implemented
       */
    ],
    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.json'],
      alias: {
        '@interviewApp': path.resolve(__dirname),
      },
    },
    module: {
      rules: [
        {
          test: /\.(ts|tsx)$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
          },
        },
        {
          test: /\.scss$/i,
          use: ['style-loader', 'css-loader', 'sass-loader'],
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
    }
});

module.exports = [client, server];
