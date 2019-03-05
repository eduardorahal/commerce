var convict = require('convict');

const config_convict = convict({
    env: {
      format: ['prod', 'dev', 'test'],
      default: 'dev',
      arg: 'nodeEnv',
      env: 'NODE_ENV'
    }
   });  
process.env.NODE_ENV = config_convict._instance.env;
module.exports = config_convict;