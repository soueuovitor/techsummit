const model = require('../models/colaborador.model');
const express = require('express');
const router = express.Router();


router.get('/',global.secure('admin'), function(request, response) {
	model.list(function(colaborador) {
		response.set("Content-Type", "text/html");
		response.render('colaborador-list', {
			data: colaborador
		})
	})
});

router.get('/createColab',global.secure('admin'), function(request, response) {
	response.set("Content-Type", "text/html");
	response.render('colaborador-item', {
		isNew: true,
		colaborador: {},
		errors: []
	})
});

router.post('/createColab',global.secure('admin'), function(request, response) {

	request.checkBody('nome', 'O nome do colaborador deve conter no minimo 3 caracteres').isLength({min: 3});
	request.checkBody('morada', 'Insira a morada do colaborador').isLength({min: 5});
	request.checkBody('telemovel', 'Numero de Telemovel invalido').isLength({min: 9, max: 9});
	request.checkBody('funcao', 'Insira a função do colaborador').isLength({min: 3});
	request.checkBody('nif', 'Insira um nif valido').isLength({min: 9, max: 9});
	var errors = request.validationErrors();
	if (errors) {
		response.render('colaborador-item', {
			isNew: true,
			colaborador: {},
			errors: errors
		});
	}else{
		console.log(request.body.tipo);

		var data = {
			'nome': request.body.nome,
			'email': request.body.email,
			'morada': request.body.morada,
			'telemovel': request.body.telemovel,
			'funcao': request.body.funcao,
			'tipo': request.body.tipo,
			'nif': request.body.nif
		};
		model.createColab(data, function(){
			response.redirect('/colaborador');
		});
	}
});

router.get('/:idColaboradores',global.secure('admin'), function(request, response) {
	model.read(request.params.idColaboradores, function(colaborador) {
		if (colaborador != undefined) {
			response.set("Content-Type", "text/html");
			response.render('colaborador-item', {
				isNew: false,
				colaborador: colaborador,
				errors: []
			})
		}else{
			response.status(404).end();
		}
	})
});

router.post('/:idColaboradores', global.secure('admin'), function(request, response) {
	request.checkBody('nome', 'O nome do colaborador deve conter no minimo 3 caracteres').isLength({min: 3});
	request.checkBody('morada', 'Insira a morada do colaborador').isLength({min: 5});
	request.checkBody('telemovel', 'Num de Telemovel invalido').isLength({min: 9, max: 9});
	request.checkBody('funcao', 'Insira a função do colaborador').isLength({min: 3});
	request.checkBody('nif', 'Insira um nif valido').isLength({min: 9, max: 9});

	console.log(request.body.tipo);
	var data = {
		'nome': request.body.nome,
		'email': request.body.email,
		'morada': request.body.morada,
		'telemovel': request.body.telemovel,
		'funcao': request.body.funcao,
		'tipo': request.body.tipo,
		'nif': request.body.nif
	};
	var errors = request.validationErrors();
	if (errors) {
		data.idColaboradores = request.params.idColaboradores;
		response.render('coloborador-item', {
			isNew: false,
			colaborador: data,
			errors: errors
		});
	}else{
		console.log(request.body.tipo);
		model.update(request.params.idColaboradores, data, function(){
			response.redirect('/colaborador/');
		});
	}
});


router.get('/:idColaboradores/delete', global.secure('admin'), function(request, response){
	model.remove(request.params.idColaboradores, function() {
		response.redirect('/colaborador');
	})
});

module.exports = router;
