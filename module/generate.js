
var path = require('path');
var fs = require('fs');
var models = require('./libs/models');
var utils = require('./libs/utils');

function generate(model, args, ajgenesis, cb) {
    models.completeModel(model);
    
    if (!model.builddir)
        model.builddir = '.';
        
    if (fs.existsSync(path.join(model.builddir, 'public')))
        model.builddir = path.join(model.builddir, 'public');
        
    model.builddir = path.join(model.builddir, 'spa');
    
    ajgenesis.createDirectory(model.builddir);
        
    if (!model.utils)
        model.utils = utils;
        
    var builddir = model.builddir;
    
    var cssdir = path.join(builddir, 'css');
    var jsdir = path.join(builddir, 'js');
    
    ajgenesis.createDirectory(cssdir);
    ajgenesis.createDirectory(jsdir);

    ajgenesis.fileTransform(path.join(__dirname, 'templates', 'index.html.tpl'), path.join(builddir, 'index.html'), model);
    
    ajgenesis.copyDirectory(path.join(__dirname, 'source'), builddir, cb);
}

module.exports = function (model, args, ajgenesis, cb) {
    generate(model, args, ajgenesis, cb);
}
