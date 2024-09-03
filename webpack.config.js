const path = require('path')
const webpack = require('webpack')
const PrebuildWebpackPlugin = require('./platforms/prebuild-webpack-plugin')

module.exports = (env) => {
    const buildPlugin = new PrebuildWebpackPlugin(env)
    const definePlugin = new webpack.DefinePlugin({
        __FIREFOX__: buildPlugin.platform === 'firefox',
        __CHROME__: buildPlugin.platform === 'chrome',
        __EDGE__: buildPlugin.platform === 'edge'
    })

    return {
        entry: {
            popup: './src/popup/index.ts',
            devtools: './src/devtools/index.ts',
            background: './src/background/background.ts',
            content_script: './src/content-scripts/content-script.ts',
            inject_profiler: './src/content-scripts/injections/index.js'
        },
        output: {
            filename: '[name].js',
            path: buildPlugin.getDestinationPath()
        },
        resolve: {
            extensions: ['.js', '.ts'],
            alias: {
                '@devtools': path.resolve(__dirname, 'src/devtools/'),
                '@content-scripts': path.resolve(__dirname, 'src/content-scripts/'),
                '@connection': path.resolve(__dirname, 'src/shared/connection/'),
                '@background': path.resolve(__dirname, 'src/background'),
                '@popup': path.resolve(__dirname, 'src/popup')
            }
        },
        module: {
            rules: [
                {
                    test: /\.ts?$/,
                    use: 'ts-loader',
                    exclude: /node_modules/,
                },
                {
                    test: /\.css$/,
                    loader: 'lit-css-loader',
                    options: {
                        specifier: 'lit-element'
                    }
                }
            ],
        },
        plugins: [buildPlugin, definePlugin]
    }
}
