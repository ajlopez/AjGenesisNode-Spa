
var generatetask = require('../module/generate'),
    path = require('path'),
    fs = require('fs'),
    ajgenesis = require('ajgenesis');

exports['generate'] = function (test) {
    test.async();
    
    var cwd = process.cwd();
    
    process.chdir('test');
    
    var model = ajgenesis.loadModel();
    
    test.ok(model.entities);
    test.ok(Array.isArray(model.entities));
    test.equal(model.entities.length, 2);
    test.ok(model.api);
    
    ajgenesis.createDirectory('build');
    var publicdir = path.join('build', 'public');
    
    if (fs.existsSync(publicdir))
        removeDirSync(publicdir);
        
    ajgenesis.createDirectory('build', 'public');
    
    process.chdir('build');
    
    generatetask(model, [], ajgenesis, function (err, result) {
        test.equal(err, null);
        test.equal(result, null);

        test.ok(fs.existsSync(path.join('public', 'spa')));
        test.ok(fs.existsSync(path.join('public', 'spa', 'index.html')));
        test.ok(fs.existsSync(path.join('public', 'spa', 'css')));
        test.ok(fs.existsSync(path.join('public', 'spa', 'js')));
        
        process.chdir(cwd);
        
        test.done();
    });    
}

function removeDirSync(dirname) {
    var filenames = fs.readdirSync(dirname);
    
    filenames.forEach(function (filename) {
        filename = path.join(dirname, filename);
        
        if (isDirectory(filename))
            removeDirSync(filename);
        else
            removeFileSync(filename);
    });
    
    fs.rmdirSync(dirname);
}

function removeFileSync(filename) {
    fs.unlinkSync(filename);
}

function isDirectory(filename)
{
    try {
        var stats = fs.lstatSync(filename);
        return stats.isDirectory();
    }
    catch (err)
    {
        return false;
    }
}

