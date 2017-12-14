module.exports = (argv, mapper) => {
  const { spawnSync } = require('child_process');
  const additionalArgs = argv.slice(3);

  let cmdWithArgs,
      cmd,
      argsDescription,
      argDelimiter = '',
      commands = argv[2].split('=')[1];

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
};