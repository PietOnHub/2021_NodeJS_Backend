# 2021_NodeJS_Backend
A Playground for learning server side techniques in Node.js

## Usage
- node .\app\app.js --mail="yourMail" --port="3000" --pass="passphrase" --file="someFIleToServe"

## Wishlist for next sprints

- hosting node.js on aws
- switching from http to https
- using express.js (for better routing)
- code modularization (especially delivering of html)
- using a state of the art authetication with front end encryption

## History

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
