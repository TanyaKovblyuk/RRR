module.exports = {
  entry: "./app/public/index.js",
  output: {
    path: __dirname+"/public",
    filename: "bundle.js",
    publicPath: "/static/"
  },

  module: {
    loaders: [
    {
        loaders: ['babel-loader'],
        include: [
          __dirname+"/app",
        ],
        test: /\.js$/,
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
