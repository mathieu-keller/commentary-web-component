const path = require('path');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const NullPlugin = require('webpack-null-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = env => {
  var bundleAnalyze = env && env.ANALYZE;
  var production = env && env.production;
  var keepItSmall= !!(bundleAnalyze || production);
  return {
    entry: './src/App.ts',
    mode: production ? 'production' : 'development',
    devtool: keepItSmall? false:'inline-source-map',
    optimization: {
      // We no not want to minimize our code.
      minimize: keepItSmall,
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
    plugins: [
      bundleAnalyze ? new BundleAnalyzerPlugin() : new NullPlugin(),
      new HtmlWebpackPlugin(
        Object.assign(
          {},
          {
            inject: true,
            template: './src/index.html',
          }, keepItSmall ? {
            minify: {
              removeComments: true,
              collapseWhitespace: true,
              removeRedundantAttributes: true,
              useShortDoctype: true,
              removeEmptyAttributes: true,
              removeStyleLinkTypeAttributes: true,
              keepClosingSlash: true,
              minifyJS: true,
              minifyCSS: true,
              minifyURLs: true,
            },
          } : undefined,
        ),
      )
    ],
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
  };
};
