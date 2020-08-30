const path = require('path');
// const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = (env, options) => {
  const isProduction = options.mode === 'production';
  const config = {
    mode: isProduction ? 'production' : 'development',
    devtool: isProduction ? 'none' : 'source-map',
    watch: !isProduction,
    resolve: {
      extensions: ['.js', '.jsx'],
    },
    entry: './src/index.jsx',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'script.js',
    },
    module: {
      rules: [
        {
          test: /\.(js?x)$/,
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
            },
          },
        },
        {
          enforce: 'pre',
          test: /\.(js?x)$/,
          exclude: /(node_modules|bower_components)/,
          loader: 'eslint-loader',
        },
        {
          test: /\.(css|scss|sass)$/,
          exclude: /\.module\.(css|scss|sass)$/,
          use: [
            // 'style-loader',
            !isProduction ? 'style-loader' : MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader',
              options: {
                importLoaders: 1,
              },
            },
            'sass-loader'
          ],
        },
        {
          test: /\.module\.(css|scss|sass)$/,
          use: [
            'style-loader',
            {
              loader: 'css-loader',
              options: {
                importLoaders: 1,
                modules: true,
              },
            },
            'sass-loader'
          ],
        },
        {
          test: /\.(png|jpg|svg|gif)$/,
          use: [
            {
              loader: 'url-loader',
              options: {
                limit: 8000,
              }
            }
          ]
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/,
          use: 'file-loader?name=./fonts/[name].[ext]'
        },
        {
          test: /\.(mp3)$/,
          use: 'file-loader?name=./audio/[name].[ext]'
        }
      ],
    },
    devServer: {
      contentBase: './dist',
      port: 3000,
    },
    plugins: [
      // new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({
        template: 'public/index.html',
        favicon: 'src/assets/img/icons-bird.png'
      }),
      new MiniCssExtractPlugin({ filename: 'style.css' })
    ],
  };
  return config;
};
