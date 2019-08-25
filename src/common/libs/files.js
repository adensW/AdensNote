const fs = require('fs')
class Files {
  readFile (path, callback) {
    fs.readFile(path, (err, content) => {
      if (err) {
        callback(err, null)
        return
      }
      callback(null, content.toString('utf8'))
    })
  }
  writeFile (path, content, callback) {
    fs.writeFileSync(path, content, 'utf8', callback)
  }
  getFiles (path, callback) {
    fs.readdir(path, function (err, files) {
      if (err) {
        callback(err)
      } else {
        callback(null, files)
      }
    })
  }
}
export default new Files()
