module.exports = {
  entry: './src/main.js',
  output: {
    path: './build',
    filename: 'main.js'
  },
  module: {
    loaders: [
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader'}
    ]
  }
}
