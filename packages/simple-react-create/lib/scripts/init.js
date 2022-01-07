"use strict";

var _program$args;

var spawn = require('cross-spawn');

var path = require('path');

var fs = require('fs-extra');

var program = require('commander');

var chalk = require('chalk');

program.parse(process.argv);
var templateName = ((_program$args = program.args) === null || _program$args === void 0 ? void 0 : _program$args[0]) || 'simple-react-cra-template';

function init() {
  var appPath = process.cwd();
  var command = 'yarnpkg';
  var args;
  var dependencies = ['simple-react-cra-template'];
  args = ['add', '--cwd', '--exact'];
  [].push.apply(args, dependencies);
  spawn.sync(command, args, {
    stdio: 'inherit'
  });
  var templatePath = path.dirname(require.resolve("".concat(templateName, "/package.json"), {
    paths: [appPath]
  }));
  var templateDir = path.join(templatePath, 'template');

  if (fs.existsSync(templateDir)) {
    fs.copySync(templateDir, appPath);
    spawn.sync(command, ['install'], {
      stdio: 'inherit'
    });
  } else {
    console.error("Could not locate supplied template: ".concat(chalk.green(templateDir)));
    return;
  }
}

init();