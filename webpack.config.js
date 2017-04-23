const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const DashboardPlugin = require('webpack-dashboard/plugin');
const webpack = require('webpack');
const path = require('path');

const config = {
  context: path.resolve(__dirname, 'src'),
  entry: {
    app: './app.js',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js',
  },

  module: {
    rules: [
    {
      test: /\.scss$/,
      use: ExtractTextPlugin.extract({
        fallback: "style-loader",
        use: "css-loader!sass-loader",
      })
    },

    {
      test: /\.js$/,
      exclude: /(node_modules|bower_components)/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['env']
        }
      }
    }
    ]
  },

  devServer: {
    port: 4000, //Tell dev-server which port to run
    open: true, // to open the local server in browser
    contentBase: path.resolve(__dirname,'src'),
  },
  plugins: [
  new ExtractTextPlugin("css/styles.css"),
  new HtmlWebpackPlugin({
    title: "Webpack Boilerplate 🤖", //Remove or change to change title in index.html
    template: 'index.ejs'
  }),
  new DashboardPlugin()
  ]
};

module.exports = config;