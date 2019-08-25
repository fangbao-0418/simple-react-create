#!/usr/bin/env node

var program = require('commander')
var version = require('../package.json').version
program.version(version, '-v, --version', 'output the version number');
// program
//   .option('-d, --debug', 'output extra debugging')
//   .option('-s, --small', 'small pizza size')
//   .option('-p, --pizza-type <type>', 'flavour of pizza')
//   .option('-v, --version', 'output the version number')

program.command('start', 'start named service', {executableFile: 'obe-start'})
.action(function (cmd, file) {
  // require('../lib/scripts/start')
  // console.log('xxxx')
})

program.parse(process.argv)

