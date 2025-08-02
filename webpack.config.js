import path from 'path';
import HtmlPlugin from 'html-webpack-plugin';

const devConfig = {
  devtool: 'eval-source-map',
  devServer: { watchFiles: ['./src/template.html'] },
};

export default {
  mode: process.env.NODE_ENV,
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(import.meta.dirname, 'dist'),
    clean: true,
  },
  plugins: [new HtmlPlugin({ template: './src/template.html' })],
  module: {
    rules: [{ test: /\.css/i, use: ['style-loader', 'css-loader'] }],
  },

  ...(process.env.NODE_ENV === 'development' ? devConfig : {}),
};
