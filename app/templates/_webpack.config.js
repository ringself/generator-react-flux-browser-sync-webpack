module.exports = {
  entry: {
    app: './js/app.js'
  },
  output: {
    path: './build',
    filename: '<%= _.slugify(appName) %>.debug.js'
  },
  module: {
    loaders: [
      { test: /\.js$/, exclude: /(node_modules|bower_components)/,  loader: 'babel-loader' },
      { test: /\.css$/,  loader: 'style!css' },
      { test: /\.scss$/, loader: 'style!css!sass?outputStyle=expanded' }
    ]
  }
};
