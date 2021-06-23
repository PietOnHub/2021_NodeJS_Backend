const args = require('minimist')(process.argv.slice(2))

const fs = require("fs");
const path = require("path");
const http = require("http");
const url = require("url");
const chalk = require("chalk");
const querystring = require('querystring');
const Logger = require("./logger");

const logger = new Logger();

const FAVICON = path.join(__dirname, '/../public', 'favicon.ico');
const PORT = args["port"] || process.env.PORT || 3000;
const MAIL_TO = args['mail'] || "yourMail@hoster.com";
const FILE_NAME = args['file'] || "yourFile.txt";
const PASS_PHRASE = args['pass'] || "yourPassword"; // I know, this shouldnt be clear to read.. just for the ease of a demonstrator.

let activeUser = false;

// Event Emitter for Logger
logger.on("loggedMessage", (datetime, msg, args, color) => {
        console.log(chalk[color](`${datetime}: ${msg} ${(args) ? JSON.stringify(args) : ""}`));
});

// Event Emitter for Server Requests
const server = http.createServer((req, res) => {

    const { method, url, headers } = req;
    const ip = req.connection.remoteAddress;

    logger.log("request called..", { url: url, method: method, ip: ip });

    // Event Emitters for POST data decoding
    let body = [];
    req.on("data", (chunk) => {
        body.push(chunk);
    }).on("end", () => {
        body = Buffer.concat(body).toString();
        passPhrase = querystring.decode(body).password;

        if (passPhrase == PASS_PHRASE) {
            logger.warn("Welcome Member");
            body = "";
            activeUser = true;
        }
    })

    if (req.method === "GET" && req.url === "/favicon.ico") {
        res.setHeader('Content-Type', 'image/x-icon');
        fs.createReadStream(FAVICON).pipe(res);
        return
    }

    if (req.url === "/login") {
        res.statusCode = 302;
        res.setHeader('Location', '/');
        res.end();
        return;
    }

    if (req.url === "/") {
        res.statusCode = 200;
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        res.write(`
        <!DOCTYPE html>
        <html lang="en">
        <head> 
            <title> Backend Playground </title>
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-+0n0xVW2eSR5OomGNYDnhzAbDsOXxcvSN1TPprVMTNDbiYZCxYbOOl7+AMvyTG2x" crossorigin="anonymous">

        </head>
        <body>
            <div class="container-fluid">

               <nav class="navbar navbar-expand-lg navbar-light bg-light">
                    <a class="nav-link active" href='/'> Start </a>
                    <a class="nav-link" href='/about'> About This </a>
                    <a class="nav-link" href='/api/getFile'> Download File </a>
                    <a class="nav-link" href="mailto:${MAIL_TO}"> Contact </a>
                    <form action="/login" method="post">
                        <input placeholder="password" name="password" type="password" id="password"/>
                        <button type="submit">Login</button>
                    </form> 
                </nav>
                
                <div class="jumbotron jumbotron-fluid">
                    <div class="container-fluid">
                        <h2> Welcome ${activeUser ? "Member" : "Stranger"} </h1>
                        <p> This is my Node.js Backend Playground. </p>
                    </div>
                </div>

            <div>
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.1/dist/js/bootstrap.bundle.min.js" integrity="sha384-gtEjrD/SeCtmISkJkNUaaKMoLD0//ElJ19smozuHV6z3Iehds+3Ulb9Bn9Plx0x4" crossorigin="anonymous"></script>
        </body>
        </html>
        `);
        res.end();
        return;
    }

    if (req.url === "/about") {
        res.statusCode = 200;
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        res.write(`

        <!DOCTYPE html>
        <html lang="en">
        <head> 
            <title> About This </title>
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-+0n0xVW2eSR5OomGNYDnhzAbDsOXxcvSN1TPprVMTNDbiYZCxYbOOl7+AMvyTG2x" crossorigin="anonymous">

        </head>
        <body>
            <div class="container-fluid">

               <nav class="navbar navbar-expand-lg navbar-light bg-light">
                    <a class="nav-link" href='/'> Start </a>
                    <a class="nav-link active" href='/about'> About This </a>
                    <a class="nav-link" href='/api/getFile'> Download File </a>
                    <a class="nav-link" href="mailto:${MAIL_TO}"> Contact </a>
                    <form action="/" method="post">
                        <input placeholder="password" name="password" type="password" id="password"/>
                        <button type="submit">Login</button>
                    </form> 
                </nav>
                
                <div class="jumbotron jumbotron-fluid">

                        <h2> History Log </h2>
                        <h4> 2021/06/20 - Init </h4>
                        <p> These are my first steps building a node.js project from scratch without any dependencies. Personal milestones have been: </p>
                        <ul>
                            <li> Studying basic concepts of node.js like modules, scoping, events and file operatoins </li>
                            <li> Learning diffenet approach to regular "Browser JS" </li>
                            <li> Adding an Event Emitter by usage as a logger </li>
                            <li> Creating a basic http server with a few routes to handle </li>
                            <li> Implementing FileStream Operations to serve a requested file </li>
                            <li> Prettifying with minimal portion of Bootstrap </li> 
                            <li> Implementing pasword protected download </li>
                        </ul>
  
                </div>

            <div>
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.1/dist/js/bootstrap.bundle.min.js" integrity="sha384-gtEjrD/SeCtmISkJkNUaaKMoLD0//ElJ19smozuHV6z3Iehds+3Ulb9Bn9Plx0x4" crossorigin="anonymous"></script>
        </body>
        </html>
        `);
        res.end();
        return;
    }

    if (req.url === "/api/getFile") {
        if (activeUser) {
            logger.warn(`exporting: ${FILE_NAME}`)
            const file = fs.createReadStream(`./resources/${FILE_NAME}`);
            res.writeHead(200, { 'Content-disposition': `attachment; filename=${FILE_NAME}}` });
            file.pipe(res);
        }
        else {
            logger.error("filerequest not permitted. unknown user")
            res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
            res.write(`
            <!DOCTYPE html>
            <html lang="en">
            <head> 
                <title> Download </title>  
                <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-+0n0xVW2eSR5OomGNYDnhzAbDsOXxcvSN1TPprVMTNDbiYZCxYbOOl7+AMvyTG2x" crossorigin="anonymous">
            </head>
            <body>
                <h3>You have no permission. Please log in first!</h3>
                <a href="/"> return to menu <a/>
            </body>
            </html>
            `);
            res.end();

        }
        return;
    }
    if (req.url === "/api/killSwitch" && activeUser) {
        logger.warn("shutting down process")
        process.kill(process.pid, "SIGTERM");
    }
    else {
        res.statusCode = 302;
        res.setHeader('Location', '/');
        res.end();
        return;
    }


}).listen(PORT);

server.on("connection", (arg) => {
    logger.log("connected to server");
});

process.on("SIGTERM", () => {
    server.close(() => {
      console.warn('process terminated')
    })
})


logger.log(`Listening to port ${PORT}...`);