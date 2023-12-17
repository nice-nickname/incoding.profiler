const path = require('path')
const PrebuildExtensionPlugin = require('./platforms/PrebuildExtensionPlugin')

module.exports = (env) => {
    const plugin = new PrebuildExtensionPlugin(env.mode, env.platform)

    return {
        entry: {
            loader: './src/index.js',
            background: './src/background/background.js',
            devtools: './src/devtools/index.ts',
            inject_profiler: './src/content-scripts/injection/inject-profiler.js',
            content_script: './src/content-scripts/content-script.ts'
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
                '@connection': path.resolve(__dirname, 'src/connection/')
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
