# npm-args-mapper
 Can map any argument passed to npm run-script after the '--' delimiter to any command chained with '&amp;&amp;'.

 Very early stage of development.
 Support is needed for this package - feel free to contribute.
 
# How to use
 * npm install args-mapper
 * Create a script in package.json that executes more than one command, e.g: "test": "npm run test:unit && npm run test:e2e"
 * Change this to be executed through args-mapper, i.e: "test": "args-mapper --cmd=\\"npm run test:unit && npm run test:e2e\\""
 * Create a JSON .args-mapperrc file in the project root directory to map any argument to these commands, e.g:
```
  {
    "test:unit" : {
      "type": "npm", 
      "args": ["--foo"]
    },
    "test:e2e": {
      "type": "npm", 
      "args": ["--bar"]
    }
  }
```
 * Running a command like npm run test -- --foo="123" --bar="456" should now distribute each of the passed arguments to the respective command as described in the .args-mapperrc file.
