const port = 3000;
const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const app = express();
const validator = require('express-validator');
const fileUpload = require('express-fileupload');

//new
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');
const usersModel = require('./models/user.model');
const colabModel = require('./models/colaborador.model');






//This function will allow us to retrict the access to the routes
global.secure = function(type) {
	return function (request, response, next) {
		if (request.isAuthenticated()) {
			if (type) {
				if (type === request.user.type) {
					return next();
				}else{
					response.redirect('/');
				}
			}else{
				return next();
			}
		}
		response.redirect('/');
	}
};

//end of new

app.use(validator());
app.use(fileUpload({
    limits: { fileSize: 50 * 128 * 128 },
}));
app.use(bodyParser.json(), bodyParser.urlencoded({ extended: true }));

//new
app.use(cookieParser());
app.use(session({
	secret: 'someRandomSecretKey',
	resave: false,
	saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function(username, callback) {
	callback(null, username);
});

passport.deserializeUser(function(username, callback) {
	usersModel.read(username, function(data) {
		callback(null, data);
	})
});
//end of new

app.set('view engine', 'ejs');
app.set('views','views');

global.connection = mysql.createConnection({
	host     : 'webitcloud.net',
	user     : 'webitclo_A155',
	password : 'PW1718A155541',
	database : 'webitclo_A155',
}).on('enqueue', function (sequence) {
	if ('Query' === sequence.constructor.name) {
		console.log(sequence.sql);
	}
});

app.listen(port, function(){
	console.log('Server started at: ' + port);
});

//Midleware that sets the isAuthenticated variable in all views
app.use(function(request, response, next){
	response.locals.user = request.user;
	response.locals.isAuthenticated = request.isAuthenticated();
	next();
});

app.use('/', require('./controllers/index-frontend.route'));
app.use('/gestao', require('./controllers/index-backend.route'));
app.use('/login', require('./controllers/login.route'));
app.use('/logout', require('./controllers/logout.route'));
app.use('/sessoes', require('./controllers/sessoes.route'));
app.use('/bilheteira', require('./controllers/bilheteira.route'));
app.use('/parametros', require('./controllers/parametros.route'));

app.use('/listagem', require('./controllers/listagens.route'));
app.use('/patrocinador', require('./controllers/patrocinador.route'));
app.use('/colaborador', require('./controllers/colaborador.route'));
app.use('/speaker', require('./controllers/speaker.route'));
app.use('/profile', require('./controllers/profile.route'));
app.use('/public', express.static('public'));
