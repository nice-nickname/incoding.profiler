const fs = require('fs')
const path = require('path')
const archiver = require('archiver')

const archiveDevtools = async (format) => {
    const outputFile = path.join(__dirname, 'build', `incoding.profiler.${format}`)
    const archive = archiver(format, {
        zlib: {
            level: 9
        }
    })

    archive.pipe(fs.createWriteStream(outputFile))

    await archive.directory('public/', false)
            .finalize()
}

archiveDevtools('zip')
archiveDevtools('tar')
