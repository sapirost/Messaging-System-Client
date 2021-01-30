const _ = require('lodash');
const express = require('express');
const sslRedirect = require('heroku-ssl-redirect');
const http = require('http');
const path = require('path');
const compression = require('compression');
const morgan = require('morgan');

const httpPort = process.env.PORT || 8000;
const nodeEnv = process.env.NODE_ENV;
const production = nodeEnv === 'production';
const forceSSL = _.get(process, 'env.forceSSL', 'false').toLowerCase() === 'true';

console.log(`production mode = ${production}`);
console.log(`httpPort = ${httpPort}`);
console.log(`forceSSL = ${forceSSL}`);

let appPath = path.join(__dirname, 'dist');

const app = express();

app.use(sslRedirect([forceSSL ? process.env.NODE_ENV : '[NO-ENVIRONMENT-DEFINED]']));

app.use(compression());

app.use(morgan(':method :url :status :res[content-length] - :remote-addr - :req[x-forwarded-for] - :referrer - :user-agent - :response-time ms'));

app.use(express.static(appPath, { redirect: false }));

app.get('*', function(req, res, next) {
	res.sendFile(`${appPath}/index.html`);
});

const server = http.createServer(app);
server.listen(httpPort, err => {
	if (err) {
		console.error("Express server 'listen' failed.", err);
		process.exit();
	}

	console.log('Static file server running at\n  => http://localhost:' + httpPort + '/\nCTRL + C to shutdown');
});
