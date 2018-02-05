const express = require('express');
const router = express.Router();
const usersModel = require('../models/user.model');

router.get('/', function(request, response) {
	//If is already authenticated don't show again the login form
	if (request.isAuthenticated()) {
		response.redirect('/');
		return;
	}
	response.set("Content-Type", "text/html");
	response.render('login', { errors: [] });
});

router.post('/', function(request, response) {
	request.checkBody('username', 'Username incorreto').isLength({min: 5, max: 10});
	request.checkBody('password', 'Password incorreta').isLength({min: 8, max: 15});
	var errors = request.validationErrors();

	if (errors) {
		response.render('login', { errors: errors });
		return;
	}

	usersModel.areValidCredentials(request.body.username, request.body.password, function(areValid) {
		if (areValid) {
			//Create the login session
			request.login(request.body.username, function(err) {
				response.redirect('/');
			});
		}else{
			response.render('login', { errors: [
				{ msg: 'Invalid credentials provided' }
			]});
		}
	});
});

router.post('/create',function(request, response) {
	var errors = request.validationErrors();	
	if (errors) {
		response.render('users-item', {
			isNew: true,
			user: {},
			errors: errors
		});
	}else{
		let sampleFile;
		let uploadPath;

		if (!request.files) {
			response.status(400).send('No files were uploaded.');
			return;
		}

		console.log('request.files >>>', request.files);

		sampleFile = request.files.sampleFile;
		var fileName = request.body.username;
		var data = {
			'username': request.body.username,
			'name': request.body.name,
			'email': request.body.email,
			'password': request.body.password	
		};
		usersModel.create(data, function(){
			sampleFile.mv(uploadPath, function(err) {
			if (err) {
			  return response.status(500).send(err);
			}
		    });
			response.redirect('/');
		});
		uploadPath ='./public/uploads/users/' + fileName + '.jpg';
	}
});

module.exports = router;
