const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');

const PORT = 3001;

//express setting
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(function(req, res, next){
	res.setHeader("content-Type", "application/json");
	next();
});

const api = require('./api/api.js')
app.use('/api', api);

app.listen(PORT, () => {
	console.log(`port ${PORT} open!\n`);
});
