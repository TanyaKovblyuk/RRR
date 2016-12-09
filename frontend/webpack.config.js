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
        //hot: true,
        inline: true,
        proxy: {
            '/be/': {
                target: 'http://localhost:3000',
                secure: false,
                pathRewrite: {'^/be' : ''}
            },
            '/ant-eater/**': {
                target: 'http://localhost:8080',
                secure: false,
                pathRewrite: function (path, req) { return path.replace(path, '') }
            },
            '/ant-eater': {
                target: 'http://localhost:8080',
                secure: false,
                pathRewrite: function (path, req) { return path.replace(path, '') }
            }
        }
    },
}
