
var path = require('path');
var async = require('simpleasync');

function install(ajgenesis, cb) {
    ajgenesis.createDirectory('ajgenesis');
    ajgenesis.createDirectory(path.join('ajgenesis', 'modules'));
    ajgenesis.createDirectory(path.join('ajgenesis', 'modules', 'entity'));
    
    async()
    .then(function (data, next) {
        ajgenesis.copyDirectory(path.join(__dirname, 'module'), path.join('ajgenesis', 'modules', 'angular'), cb);
    })
    .fail(function (err) {
        cb(err, null);
    })
    .run();
}

module.exports = {
    install: install
}