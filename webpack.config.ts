import * as path from 'path';

import * as webpack from 'webpack';
import * as HtmlWebpackPlugin from 'html-webpack-plugin';

const isDevelopment = process.env.NODE_ENV === 'development';

const commonConfig: webpack.Configuration = {
  mode: isDevelopment ? 'development' : 'production',
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
      {
        test: /\.(png|jpg|gif)$/,
        use: ['file-loader'],
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
  plugins: [
    new webpack.DefinePlugin({
      __public: isDevelopment ? `"${__dirname}/public"` : `process.resourcesPath + "/public"`,
    }),
  ],
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
      ...(commonConfig.plugins || []),
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
