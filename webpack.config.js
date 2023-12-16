const path = require('path')
const PrebuildExtensionPlugin = require('./platforms/PrebuildExtensionPlugin')

module.exports = (env) => {
    const plugin = new PrebuildExtensionPlugin(env.mode, env.platform)

    return {
        entry: {
            loader: './src/index.js',
            background: './src/background/background.js',
            devtools: './src/devtools/index.ts',
            inject_profiler: './src/content-scripts/inject-profiler.js',
            content_script: './src/content-scripts/content-script.js'
        },
        output: {
            filename: '[name].js',
            path: plugin.getDestinationPath()
        },
        resolve: {
            extensions: ['.js', '.ts'],
            alias: {
                '@devtools': path.resolve(__dirname, 'src/devtools/')
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
        plugins: [plugin]
    }
}
