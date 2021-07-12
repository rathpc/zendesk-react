'use strict';

const path = require('path');
const fs = require('fs');

const TerserPlugin = require('terser-webpack-plugin');

// Get the root path
const currentPath = fs.realpathSync(process.cwd());
const resolvePath = relativePath => path.resolve(currentPath, relativePath);

module.exports = {
  devtool: 'source-map',
  entry: {
    'zendesk-react': resolvePath('src/index'),
    'zendesk-react.min': resolvePath('src/index'),
  },
  mode: 'production',
  module: {
    rules: [{ test: /\.tsx?$/, exclude: /node_modules/, loader: 'babel-loader' }],
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        include: /\.min\.js$/,
        parallel: true,
        terserOptions: { sourceMap: true },
      }),
    ],
  },
  output: {
    path: resolvePath('dist/_bundles'),
    filename: `[name].js`,
    libraryTarget: 'umd',
    library: 'ZendeskReact',
    umdNamedDefine: true,
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },
};
