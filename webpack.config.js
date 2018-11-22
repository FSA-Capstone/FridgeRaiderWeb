const webpack = require('webpack');

module.exports = {
    entry: ['babel-polyfill', './src/index.js'],
    plugins:[
      new webpack.DefinePlugin({
        'process.env': {
          'API_URL': '"https://fridge-raider-server.herokuapp.com"'
        }
      })
    ],
     module: {
       rules: [
         {
           test: /\.js$/,
           loader: 'babel-loader',
           exclude: /node_modules/
         }
       ]
     },
   };