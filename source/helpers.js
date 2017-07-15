'use strict';

function ArrayToStringArrayRepresentation(arr) {
    return "["+ arr.map( item => `"${item}"` ) +"]";
}

module.exports = {
    ArrayToStringArrayRepresentation
};