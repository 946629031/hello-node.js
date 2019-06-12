module.exports.test = 'B';

const modA = require('./05-modA');
console.log('modB: ', modA.test);

module.exports.test = 'BB';