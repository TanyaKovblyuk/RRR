module.exports = {
  entry: "./public/index.js",
  output: {
    path: __dirname+"/public",
    filename: "bundle.js",
    publicPath: "/static/"
  },

  module: {
    loaders: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: "babel",
      include: __dirname,
      query: {
        presets: [ 'es2015', 'react', 'react-hmre' ]
      }
    },
    {
        loaders: ['babel-loader'],
        include: [
          __dirname+"/app",
        ],
        test: /\.js$/,
    },
    {
      test   :/\.jsx?$/,
      exclude:/(node_modules)/,
      loader :'babel',
      query  :{ presets:['react','es2015'] }
    },
    { test: /\.scss$/, loader: 'style!css!sass!' },
    { test: /\.png$/, loader: "url-loader?mimetype=image/png" },
    ]
  },

  devServer: {
        historyApiFallBack: true,
        hot: true,
        inline: true,
        // port: 8081,
        proxy: {
            '/be/': {
                target: 'http://localhost:3000',
                secure: false,
                pathRewrite: {'^/be' : ''}
            }
        }
    },
}
