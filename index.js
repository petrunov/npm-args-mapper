const { spawnSync } = require('child_process');

// ToDo: Load this config from .args-mapperrc file
const additionalArgs = process.argv.slice(3),
  mapper = {
    'test:unit' : {type: 'npm', args: ['--reporter']},
    'test:ocapi': {type: 'npm', args: ['--instance']},
    'ls'        : {type: 'shell', args: ['-la']},
  };

exports = () => {
  let cmdWithArgs,
      cmd,
      argsDescription,
      argDelimiter = '',
      commands = process.argv[2].split('=')[1];

  for (cmd in mapper) {
    additionalArgs.map(arg => {
      argsDescription = mapper[cmd];
      if (argsDescription.args[0] === arg.split('=')[0]) {
        switch (argsDescription.type) {
          case 'npm':
            argDelimiter = '-- ';
            break;
        }
        cmdWithArgs = `${cmd} ${argDelimiter}${arg}`;
        commands = commands.replace(cmd, cmdWithArgs);
      }
    });
  }

  commands.split(' && ').map(cmd => {
    console.log(cmd);
    let result = spawnSync(cmd, [], {shell: true});
    console.log(result.stdout.toString('utf8'));
    console.log(result.stderr.toString('utf8'));
  });
}
