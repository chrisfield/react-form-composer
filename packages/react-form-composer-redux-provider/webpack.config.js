const path = require('path');
module.exports = {
  output: {
    path: path.join(__dirname, './lib'),
    filename: 'index.js',
    globalObject: 'this',
    library: 'react-form-composer-redux-provider',
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      }
    ]
  },
  externals: {
    // Don't bundle react, redux, react-redux, redux-form-composer
    react: {
      commonjs: "react",
      commonjs2: "react",
      amd: "React",
      root: "React"   
    },
    "redux": {
      commonjs: "redux",          
      commonjs2: "redux",          
      amd: "Redux",
      root: "Redux"
    },
    "react-redux": {
      commonjs: "react-redux",          
      commonjs2: "react-redux",          
      amd: "ReactRedux",
      root: "ReactRedux"
    },
    "react-form-composer": {
      commonjs: "react-form-composer",          
      commonjs2: "react-form-composer",          
      amd: "ReactFormComposer",
      root: "ReactFormComposer"
    }
  }
};