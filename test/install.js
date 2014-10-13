
var entity = require('..');
var path = require('path');
var fs = require('fs');
var ajgenesis = require('ajgenesis');

exports['Install module'] = function (test) {
    test.async();
    
    var cwd = process.cwd();
    
    process.chdir(__dirname);
    
    entity.install(ajgenesis, function (err, data) {
        test.ok(!err);
        test.ok(fs.existsSync('ajgenesis'));
        test.ok(fs.existsSync(path.join('ajgenesis', 'modules')));
        test.ok(fs.existsSync(path.join('ajgenesis', 'modules', 'angular')));
        test.ok(fs.existsSync(path.join('ajgenesis', 'modules', 'angular', 'generate.js')));
        test.ok(fs.existsSync(path.join('ajgenesis', 'modules', 'angular', 'templates')));
        
        process.chdir(cwd);
        test.done();
    });
}