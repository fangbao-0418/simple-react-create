const spawn = require('cross-spawn');

function init () {
  let command;
  let args;
  const dependencies = ['simple-react-cra-template']
  command = 'yarnpkg';
  args = ['add', '--cws', '--exact'];
  [].push.apply(args, dependencies);
  const child = spawn(command, args, { stdio: 'inherit' });
  child.on('close', code => {
    if (code !== 0) {
      reject({
        command: `${command} ${args.join(' ')}`,
      });
      return;
    }
    resolve();
  });
}

init();