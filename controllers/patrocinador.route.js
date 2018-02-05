const model = require('../models/patrocinador.model');
const express = require('express');
const router = express.Router();



router.get('/',global.secure('admin'), function(request, response) {
	model.list(function(patrocinador) {
		response.set("Content-Type", "text/html");
		response.render('patrocinadores-list', {
			data: patrocinador
		})
	})
});

router.get('/createPatrocinador',global.secure('admin'), function(request, response) {
	response.set("Content-Type", "text/html");
	response.render('patrocinadores-item', {
		isNew: true,
		patrocinador: {},
		errors: []
	})
});

router.post('/createPatrocinador',global.secure('admin'), function(request, response) {
	request.checkBody('nome', 'O nome do patrocinador é invalido').isLength({min: 3});
	request.checkBody('valor', 'O valor introduzido é invalido').isLength({min: 1});
	var errors = request.validationErrors();
	console.log(errors)
	if (errors) {
		response.render('patrocinadores-item', {
			isNew: true,
			patrocinador: {},
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
		  var fileName = request.body.nome;
		  var data = {
			'nome': request.body.nome,
			'valor': request.body.valor
		  };
		  
		  model.createPatrocinador(data, function(){
			sampleFile.mv(uploadPath, function(err) {
			if (err) {
			  return response.status(500).send(err);
			}
		    });
			response.redirect('/patrocinador');
		  });

		  uploadPath ='./public/uploads/patrocinadores/' + fileName + '.jpg';
		  
	}
});

router.get('/:idPatrocinadores',global.secure('admin'), function(request, response) {
	model.read(request.params.idPatrocinadores, function(patrocinador) {
		if (patrocinador != undefined) {
			response.set("Content-Type", "text/html");
			response.render('patrocinadores-item', {
				isNew: false,
				patrocinador: patrocinador,
				errors: []
			})
		}else{
			response.status(404).end();
		}
	})
});

router.post('/:idPatrocinadores',global.secure('admin'), function(request, response) {
	request.checkBody('nome', 'O nome do patrocinador é invalido').isLength({min: 3});
	request.checkBody('valor', 'O valor introduzido é invalido').isLength({min: 1});
	var data = {
		'nome': request.body.nome,
		'valor': request.body.valor
	};
	var errors = request.validationErrors();
	if (errors) {
		data.id = request.params.id;
		response.render('patrocinador-item', {
			isNew: false,
			patrocinador: data,
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
		var fileName = request.body.nome;
		var data = {
			'nome': request.body.nome,
			'valor': request.body.valor
		};

		model.update(request.params.idPatrocinadores, data, function(){
			sampleFile.mv(uploadPath, function(err) {
				if (err) {
				  return response.status(500).send(err);
				}
				});
			response.redirect('/patrocinador/');
		});
		uploadPath ='./public/uploads/patrocinadores/' + fileName + '.jpg';
	}
});


router.get('/:idPatrocinadores/delete',global.secure('admin'), function(request, response){
	model.remove(request.params.idPatrocinadores, function() {
		response.redirect('/patrocinador');
	})
});

module.exports = router;
