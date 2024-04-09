## Installation
Pull the project: `git pull <this repo-url>.git`

Each folder *Frontend* and *Backend* need to be installed with yard:

- Go to the *Backend* dir and install:
1. `cd Backend` and `yarn install`
- Then go to the *Frontend* dir and install at each inner workspaces:
1. `cd ../Frontend` and `yarn install` - main *Frontend* entry
2. `cd /app` and `yarn install` - the application
3. `cd ../api-package` and `yarn install` - api-package to work with the Backend

## Run
To start the app run the following command:

- In the *Backend* dir: `yarn start` for just a run
- In the *Frontend/app* dir: `yarn start` for just a run

Also you can run the whole app in the background auto-rebuild way using *pm2* package:

`cd Backend` and `pm2 start ecosystem.config.cjs`