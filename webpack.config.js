const path = require('path')
const PrebuildExtensionPlugin = require('./platforms/PrebuildExtensionPlugin')

module.exports = (env) => {
    const plugin = new PrebuildExtensionPlugin(env.mode, env.platform)

    return {
        entry: {
            popup: './src/popup/index.ts',
            background: './src/background/background.js',
            devtools: './src/devtools/index.ts',
            content_script: './src/content-scripts/content-script.ts',

            inject_profiler: './src/content-scripts/injection/inject-profiler.js'
        },
        output: {
            filename: '[name].js',
            path: plugin.getDestinationPath()
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
        plugins: [plugin]
    }
}
