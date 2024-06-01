const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
module.exports = {
  entry: './src/index.ts',          // Entry point of your application
  output: {
    filename: 'bundle.js',          // Output bundle file
    path: path.resolve(__dirname, 'dist'), // Output directory
    publicPath: '/'                 // Public URL of the output directory when referenced in a browser
  },
  resolve: {
    extensions: ['.ts', '.js']      // Resolve these extensions
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',            // Use ts-loader for TypeScript files
        exclude: /node_modules/
      }
    ]
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        { from: 'src/index.html', to: 'index.html' }, // Copy index.html to dist directory,
        { from: 'src/styles', to: 'styles' }, // Copy everything from src/styles to dist/styles,
      ]
    })
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'), // Serve static content from the dist directory,
      
    },
    compress: true,                // Enable gzip compression
    port: 9000,                    // Port number for the dev server
    open: true,                    // Automatically open the browser
    historyApiFallback: true       // Serve index.html in place of 404 responses to allow client-side routing
  },
  mode: 'development'                // Set the mode to development for better debugging
};
