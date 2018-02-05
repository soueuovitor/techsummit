const model = require('../models/speaker.model');
const express = require('express');
const router = express.Router();


router.get('/',global.secure('admin'), function(request, response) {
	model.list(function(speaker) {
		response.set("Content-Type", "text/html");
		response.render('speaker-list', {
			data: speaker
		})
	})	
});

router.get('/createSpeaker',global.secure('admin'), function(request, response) {
	response.set("Content-Type", "text/html");
	response.render('speaker-item', {
		isNew: true,
		speaker: {},
		errors: []
	})
});

router.post('/createSpeaker',global.secure('admin'), function(request, response) {
	request.checkBody('nome', 'O nome do Speaker deve conter no minimo 3 caracteres').isLength({min: 3, max: 200});
	request.checkBody('telemovel', 'Num de Telemovel invalido').isLength({min: 9, max: 9});
	request.checkBody('nif', 'Nif invalido').isLength({min: 9, max: 9});
	var errors = request.validationErrors();	
	if (errors) {
		response.render('speaker-item', {
			isNew: true,
			speaker: {},
			errors: errors
		});
	}else{
		let sampleFile;
		let uploadPath;

		if (!request.files) {
			response.status(400).send('No files were uploaded.');
			return;
		}
		sampleFile = request.files.sampleFile;
		var fileName = request.body.nome;
		var data = {
			
			'nome': request.body.nome,
			'telemovel': request.body.telemovel,
			'nif': request.body.nif,
			'funcao': request.body.funcao,
		};
		model.createSpeaker(data, function(){
			sampleFile.mv(uploadPath, function(err) {
			if (err) {
			  return response.status(500).send(err);
			}
		    });
			response.redirect('/speaker');
		});
		uploadPath ='./public/uploads/speakers/' + fileName + '.jpg';
	}
});

router.get('/:idSpeaker',global.secure('admin'), function(request, response) {
	model.read(request.params.idSpeaker, function(speaker) {
		if (speaker != undefined) {
			response.set("Content-Type", "text/html");
			response.render('speaker-item', {
				isNew: false,
				speaker: speaker,
				errors: []
			})		
		}else{
			response.status(404).end();
		}
	})	
});

router.post('/:idSpeaker',global.secure('admin'), function(request, response) {
	var data = {
		'nome': request.body.nome,
		'telemovel': request.body.telemovel,
		'nif': request.body.nif,
		'funcao': request.body.funcao,
	};
	var errors = request.validationErrors();	
	if (errors) {
		data.speaker = request.params.speaker;
		response.render('speaker-item', {
			isNew: false,
			speaker: data,
			errors: errors
		});
	}else{
		let sampleFile;
		let uploadPath;

		if (!request.files) {
			response.status(400).send('No files were uploaded.');
			return;
		}
		sampleFile = request.files.sampleFile;
		var fileName = request.body.nome;
		var data = {
			
			'nome': request.body.nome,
			'telemovel': request.body.telemovel,
			'nif': request.body.nif,
			'funcao': request.body.funcao,
		};
		model.update(request.params.idSpeaker, data, function(){
			sampleFile.mv(uploadPath, function(err) {
				if (err) {
				  return response.status(500).send(err);
				}
				});
			response.redirect('/speaker/');
		});
		uploadPath ='./public/uploads/speakers/' + fileName + '.jpg';
	}
});


router.get('/:speaker/delete',global.secure('admin'), function(request, response){
	model.remove(request.params.speaker, function() {
		response.redirect('/speaker');
	})	
});

module.exports = router;