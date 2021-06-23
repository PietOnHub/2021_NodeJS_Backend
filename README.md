# 2021_NodeJS_Backend - Version 0.3
A Playground for learning server side techniques in Node.js

## Usage
- node .\app\app.js --mail="yourMail" --port="3000" --pass="passphrase" --file="yourFile"

## Wishlist for next sprints

- hosting node.js on aws
- switching from http to https
- using express.js (for better routing)
- code modularization (especially delivering of html)
- using a state of the art authetication with front end encryption

## History

### 0.3 - Interactive CLI & extended central Logger as Singleton

![grafik](https://user-images.githubusercontent.com/53125566/123175736-8fe63d80-d482-11eb-978d-a9812fff2542.png)

- added 'Nodemon' for hotdeploy due to automatized restart on changes
- logger as Singelton for global usage and central state (see counter)
- keyboard listener for interactive CLI commands -> shutdown on 'x'
- upgraded console output > colors & schema: counter, dateTime, msg, arguments
- minor cleanup and usage of destructuring assignment 

### 0.2 - Some more details: logLevel, arguments, exit call

- logging different loglevels using "chalk" for colorization
- adding package.json
- using argument parser "minimist" to set optionally some constants
- terminate node process by specific call of logged-in user
- invalid routes redirecting to start page

### 0.1 - Init

These are my first steps building a node.js project from scratch without any dependencies. Personal milestones have been:

- studying basic concepts of node.js like modules, scoping, events and file operations
- learning different approach to regular "Browser JS"
- adding an Event Emitter by usage as a logger
- creating a basic http server with a few routes to handle
- implementing FileStream Operations to serve a requested file
- implementing download with usage of a filestream
- prettifying with minimal portion of Bootstrap
- simple user authetication by POST request (realy basic and unsecure atm, no sha3 etc. & no front end encryption)
