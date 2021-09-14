const HtmlWebPackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const path = require('path')

module.exports = (env, argv = {}) => ({
  entry: {
    bundle: ['core-js/stable', './src/index.js'],
  },
  output: {
    path: path.resolve(__dirname, 'public'),
    publicPath: '/',
    filename: argv.mode === 'development' ? '[name].js' : '[name].[hash].js',
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: './src/index.html',
      filename: './index.html',
    }),
    new CleanWebpackPlugin({ verbose: true }),
    new MiniCssExtractPlugin({
      filename: argv.mode === 'development' ? '[name].css' : '[name].[hash].css',
      chunkFilename: argv.mode === 'development' ? '[id].css' : '[id].[hash].css',
    }),
  ],
  resolve: {
    extensions: ['.js'],
    alias: {

      actions: path.resolve(__dirname, 'src/redux/actions'),
      apis: path.resolve(__dirname, 'src/apis'),
      app: path.resolve(__dirname, 'src/app'),
      components: path.resolve(__dirname, 'src/components'),
      domain: path.resolve(__dirname, 'src/domain'),
      images: path.resolve(__dirname, 'src/images'),
      reducers: path.resolve(__dirname, 'src/redux/reducers'),
      utils: path.resolve(__dirname, 'src/utils'),
    },
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName: argv.mode === 'development' ? '[local]--[hash:base64:5]' : '[hash:base64]',
              },
              sourceMap: argv.mode === 'development',
            },
          },
        ],
      },
      {
        test: /\.(gif|svg)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
            },
          },
        ],
      },
    ],
  },
  devtool: argv.mode === 'development' ? 'source-map' : false,
  devServer: {
    contentBase: path.resolve(__dirname, 'public'),
    historyApiFallback: true,
    publicPath: '/',
    open: false,
    port: 3000,
    /*proxy: {
      '/transaction-api/': {
        target: 'http://localhost:9080/',
      },
    },*/
  },
})
