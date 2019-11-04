import * as path from 'path';

import * as webpack from 'webpack';
import * as HtmlWebpackPlugin from 'html-webpack-plugin';

const commonConfig: webpack.Configuration = {
  node: {
    __dirname: false,
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    publicPath: './',
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
  },
  devtool: 'source-map',
};

const configs: webpack.Configuration[] = [
  {
    ...commonConfig,
    entry: { index: './src/main' },
    target: 'electron-main',
  },
  {
    ...commonConfig,
    entry: { renderer: './src/renderer' },
    target: 'electron-renderer',
    plugins: [
      new HtmlWebpackPlugin({
        filename: 'renderer.html',
        template: 'public/renderer.html',
      }),
    ],
  },
  {
    ...commonConfig,
    entry: { preload: './src/preload' },
    target: 'electron-renderer',
  },
];

module.exports = configs;
