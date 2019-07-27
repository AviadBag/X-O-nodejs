const fs = require('fs');

function read_file(path, callback) {
    fs.readFile(path, "utf8", function(err, data) {
        callback(path, err, data)
    })
}

module.exports = read_file;