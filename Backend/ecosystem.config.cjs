module.exports = {
    apps : [
      {
        name: 'Backend server',
        script: 'node --loader ts-node/esm server.ts',
        instances: 1,
        cron_restart: '0 0 * * *',
        env: {
          NODE_ENV: 'development'
        },
        env_production: {
          NODE_ENV: 'production'
        }
      },
      {
        name: 'Frontend app',
        script: 'cd ../Frontend/app && yarn start',
        instances: 1,
        cron_restart: '0 0 * * *',
        env: {
          NODE_ENV: 'development'
        },
        env_production: {
          NODE_ENV: 'production'
        }
      },
    ]
}
