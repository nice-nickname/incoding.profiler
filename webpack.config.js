const path = require('path')
const webpack = require('webpack')
const PrebuildExtensionPlugin = require('./platforms/PrebuildExtensionPlugin')

module.exports = (env) => {
    const buildPlugin = new PrebuildExtensionPlugin(env.mode, env.platform)
    const definePlugin = new webpack.DefinePlugin({
        __FIREFOX__: buildPlugin.platform === 'firefox',
        __CHROME__: buildPlugin.platform === 'chrome',
        __EDGE__: buildPlugin.platform === 'edge'
    })

    return {
        entry: {
            popup: './src/popup/index.ts',
            devtools: './src/devtools/index.ts',
            background: './src/background/background.js',
            content_script: './src/content-scripts/content-script.ts',
            inject_profiler: './src/content-scripts/injection/inject-profiler.js'
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
                '@connection': path.resolve(__dirname, 'src/shared/connection/')
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
