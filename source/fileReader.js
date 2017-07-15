'use strict';

const fs = require('fs');

function readFile( file ) {
    try {
        return fs.readFileSync(file,'utf-8');
    } catch (err) {
        return ''
    }
}

module.exports = {
    readFile
}