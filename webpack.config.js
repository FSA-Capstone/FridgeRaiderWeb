const webpack = require('webpack');

module.exports = {
    entry: ['babel-polyfill', './src/index.js'],
    plugins:[
      new webpack.DefinePlugin({
        'process.env': {
          'API_URL': 'http://localhost:3000'
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
