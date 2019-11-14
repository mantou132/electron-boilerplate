import path from 'path';

import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';

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
      {
        test: /\.node$/,
        use: 'node-loader',
      },
      {
        test: /\.node$/,
        use: {
          // 模块中的动态链接库带上，如果是 neon 构建的模块，则会有多份 dylib
          // 在问题没有解决之前，可以考虑在打包时移除 dist/src 目录
          loader: '@zeit/webpack-asset-relocator-loader',
          options: {},
        },
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.node'],
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
