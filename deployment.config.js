module.exports = {
  apps: [{
    name: "BASISTHAN_BACKEND",
    exec_mode: "cluster",
    instances: "2",
    script: 'pnpm',
    args: 'start',
    env_local: {
      APP_ENV: 'local',
      PORT: 3002
    },
    env_development: {
      APP_ENV: 'dev',
      PORT: 3002 // APP_ENV=dev
    },
    env_production: {
      APP_ENV: 'prod',
      PORT: 3002 // APP_ENV=prod
    }
  }]
}
