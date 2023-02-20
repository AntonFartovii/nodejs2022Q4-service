### Home Library Service
#### Prerequisites
- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.
- Docker installer - [Docker installer](https://www.docker.com/products/docker-desktop/).
#### Commands
```
git clone git@github.com:AntonFartovii/nodejs2022Q4-service.git

git checkout postgres

docker-compose up --build
```
After starting the app on port (4000 as default) you can open.
#### Testing
After application running open new terminal and enter:  
To run all tests without authorization  
```
npm run test
```
To run only one of all test suites
```
npm run test -- <path to suite>
```
To run all test with authorization
```
npm run test:auth
```
