var webpack = require('webpack');

module.exports = {
    entry: './src/index.js',
    output: {
        filename: './build/bundle.min.js',
        path: __dirname
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: "babel-loader",
                exclude: /(node_modules|bower_components)/,
                query: {
                    cacheDirectory: true,
                    optional: ['runtime'],
                    stage: 0
                }
            }
        ]
    },
    resolve: {
        modulesDirectories: ['node_modules'],
        extensions: ['', '.js', '.jsx']
    },
    plugins: [
        new webpack.ProvidePlugin({
            // Automtically detect jQuery and $ as free var in modules
            // and inject the jquery library
            // This is required by many jquery plugins
            jQuery: "jquery",
            $: "jquery"
        })
    ]
};
