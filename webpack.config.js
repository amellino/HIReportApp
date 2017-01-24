module.exports = {
    entry: './src/app.jsx',
    output: {
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            {
                test: /\.jsx$/,
                exclude: /node_modules/,
                loader: 'babel-loader?presets[]=react,presets[]=es2015'
            }
        ]
    }
};
