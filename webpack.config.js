module.exports = {
    entry: './index.js',
    output: {
        filename: 'bundle.js',
        path: __dirname
    },
    loaders: [
        // the optional 'runtime' transformer tells babel to require the runtime
        // instead of inlining it.
        {
            test: /\.js?$/,
            exclude: /(node_modules|bower_components)/,
            loader: 'babel-loader?optional[]=runtime'
        }
    ]
};