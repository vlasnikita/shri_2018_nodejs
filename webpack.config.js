const path = require('path');

module.exports = {
  entry: './src/app.js',
  target: 'node',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      { test: /\.hbs$/, loader: "handlebars-loader" }
    ]
  }
};