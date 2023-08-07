const path = require('path')

module.exports = {
    entry: {
        loader: './src/loader.js',
        background: './src/background.js',
        devtools: './src/devtools/main.js',
        inject_profiler: './src/content-scripts/inject-profiler.js',
        content_script: './src/content-scripts/content-script.js'
    },
    output: {
        filename: '[name].js',
        path: path.join(__dirname, 'public')
    },
    resolve: {
        extensions: ['.js', '.ts'],
    },
    module: {
        rules: [
            {
                test: /\.ts?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    mode: 'production',

}
