const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

/**
 * @param {boolean} isProd
 * @returns {string}
 */
const localIdentClassesName = (isProd) => !isProd ? '[path][name][local]' : '[local]_[hash:base64:10]';

/**
 * @param {boolean} isProd
 * @returns {[{loader: string}]|[*]}
 */
const getScssLoaders = (isProd) => {
  const def = !isProd
    ? [{ loader: 'style-loader' }]
    : [MiniCssExtractPlugin.loader];

  def.push({
    loader: 'css-loader',
    //раскоментировать чтобы заработали модульные стили
    options: {
      modules: {
        localIdentName: localIdentClassesName(isProd)
      }
    }
  });

  if (isProd) {
    def.push({ loader: 'postcss-loader' });
  }

  def.push({
    loader: 'sass-loader'
  });

  return def;
};

/**
 * @param {boolean} isProd
 * @returns {[{loader: string}]|[*]}
 */
const getCssLoaders = (isProd) => {
  const def = !isProd
    ? [{ loader: 'style-loader' }]
    : [MiniCssExtractPlugin.loader];

  def.push({
    loader: 'css-loader'
  });

  if (isProd) {
    def.push({ loader: 'postcss-loader' });
  }

  return def;
};

module.exports = (env, options) => {
  const isProd = options.mode === 'production';

  const conf = {
    entry: {
      main: path.resolve(__dirname, './src/index.js'),
    },
    resolve: {
      extensions: ['*', '.js', '.jsx'],
    },
    output: {
      path: path.resolve(__dirname, './dist'),
      filename: '[name].bundle.js',
      clean: true,
    },
    devtool: isProd ? false : 'eval-cheap-module-source-map',
    module: {
      rules: [
        // JavaScript
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: ['babel-loader', 'eslint-loader'],
        },
        {
          test: /\.(scss)$/,
          use: getScssLoaders(isProd),
          exclude: /node_modules/
        },
        {
          test: /\.(css)$/,
          use: getCssLoaders(isProd)
          // exclude: /node_modules/,
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        title: 'webpack Boilerplate',
        template: path.resolve(__dirname, './src/template.html'), // шаблон
        filename: 'index.html', // название выходного файла
      }),
      new webpack.SourceMapDevToolPlugin({
        filename: '[file].map',
        test: /\.jsx?|\.js?$/,
        exclude: [
          '*.css', '*.styles.min.css', '*.scss'
        ]
      }),
      new MiniCssExtractPlugin({
        filename: 'styles.min.css?v='
      }),
    ],
    devServer: {
      historyApiFallback: true,
      open: true,
      compress: true,
      client: {
        overlay: {
          errors: true,
          warnings: false,
        },
      }
    },

  };

  return conf;
};