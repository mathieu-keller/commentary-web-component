const path = require('path');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const NullPlugin = require('webpack-null-plugin');

module.exports = env => {
  var bundleAnalyze = env && env.ANALYZE;
  return {
    entry: './src/App.ts',
    mode: 'production',
    watch: true,
    devtool: 'inline-source-map',
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
    ],
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
  };
};
