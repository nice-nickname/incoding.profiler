const path = require('path')
const fse = require('fs-extra')
const chalk = require('chalk')

const pluginName = 'prebuild-extension-plugin'

module.exports = class PrebuildWebpackPlugin {

    constructor(env) {
        this.mode = this.validateMode(env.mode)
        this.platform = this.validatePlatform(env.platform)

        this.welcome()
    }

    apply(compiler) {
        compiler.hooks.initialize.tap(pluginName, () => {
            const publicPath = path.join(__dirname, `../public`)
            const platformPath = path.join(__dirname, `../platforms/${this.platform}`)
            const destination = this.getDestinationPath()

            fse.copySync(publicPath, destination)
            fse.copySync(platformPath, destination)
        });
    }

    getDestinationPath() {
        return path.join(__dirname, `../${this.mode}/${this.platform}`)
    }

    validateMode(mode) {
        if (!mode) {
            return 'debug'
        }

        if (mode !== 'debug' && mode !== 'release') {
            console.error(`Value '${mode}' is not valid for mode.`)
            process.exit(1)
        }

        return mode
    }

    validatePlatform(platform) {
        const manifest = path.join(__dirname, `../platforms/${platform}`, 'manifest.json')

        if (!fse.existsSync(manifest)) {
            console.error(`Platform '${platform}' is not supported.`)
            process.exit(1)
        }

        return platform
    }

    welcome() {
        const mode = chalk.bold(chalk.greenBright(this.mode))
        const platform = chalk.bold(chalk.yellowBright(this.platform))

        console.log(
            `incoding.profiler started in ${mode} mode, target platform ${platform}\n`
        )
    }
}
