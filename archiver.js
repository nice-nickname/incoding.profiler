const path = require('path')
const Zip = require('adm-zip')

const zip = new Zip()
zip.addLocalFolder(path.join(__dirname, 'public'))
zip.writeZip('build/incoding.profiler.zip')

console.log('Zip created successfully!');
