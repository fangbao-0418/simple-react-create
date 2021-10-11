const spawn = require('cross-spawn');
const path = require('path');
const fs = require('fs-extra');

function init () {
  const appPath = process.cwd();
  const templateName = 'simple-react-cra-templat';
  console.log(appPath, 'appPath')
  let command;
  let args;
  const dependencies = ['simple-react-cra-template']
  command = 'yarnpkg';
  args = ['add', '--cws', '--exact'];
  [].push.apply(args, dependencies);
  const child = spawn(command, args, { stdio: 'inherit' });
  child.on('close', code => {
    if (code !== 0) {
      return;
    }
  });

  const templatePath = path.dirname(
    require.resolve(`${templateName}/package.json`, { paths: [appPath] })
  );

  const templateDir = path.join(templatePath, 'template');
  if (fs.existsSync(templateDir)) {
    fs.copySync(templateDir, appPath);
  } else {
    console.error(
      `Could not locate supplied template: ${chalk.green(templateDir)}`
    );
    return;
  }
}

init();