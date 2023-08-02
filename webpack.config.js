const path = require('path')

module.exports = {
    entry: {
        loader: './src/loader.js',
        background: './src/background.js',
        devtools: './src/devtools/main.js',
        content_script: './src/content-scripts/inject-profiler.js'
    },
    output: {
        filename: '[name].js',
        path: path.join(__dirname, 'public')
    },
    resolve: {
        extensions: ['.js'],
    },
    mode: 'production'
}
