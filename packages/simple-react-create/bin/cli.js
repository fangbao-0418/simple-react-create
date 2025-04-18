#!/usr/bin/env node

var program = require('commander')
var version = require('../package.json').version
program.version(version, '-v, --version', 'output the version number');

program.command('init', 'init project', {executableFile: 'simple-react-create-init'})

program.command('start', 'start named service', {executableFile: 'simple-react-create-start'})

program.command('build', 'build the project', {executableFile: 'simple-react-create-build'})

program.parse(process.argv)

