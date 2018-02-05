const model = require('../models/parametros.model');
const express = require('express');
const router = express.Router();


router.get('/', global.secure('admin'), function(request, response) {
	model.list(function(parametros) {
		response.set("Content-Type", "text/html");
		response.render('parametros-list', {
			data: parametros
		})
	})
});

router.get('/createParametros', global.secure('admin'), function(request, response) {
	response.set("Content-Type", "text/html");
	response.render('parametros-item', {
		isNew: true,
		parametros: {},
		errors: []
	})
});

router.post('/createParametros', global.secure('admin'), function(request, response) {

	request.checkBody('nome', 'O nome do WorkShop deve conter no minimo 3 caracteres').isLength({min: 3});
	request.checkBody('lotacao', 'Insira a lotação').isLength({min: 3});
	request.checkBody('local', 'Insira o local do evento').isLength({min: 9, max: 9});
	request.checkBody('preco', 'Insira o preço dos bilhetes').isLength({min: 9, max: 9});
	request.checkBody('cache', 'Insira o cache').isLength({min: 9, max: 9});

	var errors = request.validationErrors();
	if (errors) {
		response.render('parametros-item', {
			isNew: true,
			parametros: {},
			errors: errors
		});
	}else{
		var data = {
			'nome': request.body.nome,
			'data': request.body.data,
			'dataF': request.body.dataF,
			'lotacao': request.body.lotacao,
			'local': request.body.local,
			'preco': request.body.preco,
			'cache': request.body.cache
		};
		model.createParametros(data, function(){
			response.redirect('/parametros');
		});
	}
});

router.get('/:idParametros', global.secure('admin'), function(request, response) {
	model.read(request.params.idParametros, function(parametros) {
		if (parametros != undefined) {
			response.set("Content-Type", "text/html");
			response.render('parametros-item', {
				isNew: false,
				parametros: parametros,
				errors: []
			})
		}else{
			response.status(404).end();
		}
	})
});

router.post('/:idParametros', global.secure('admin'), function(request, response) {
	request.checkBody('nome', 'O nome do WorkShop deve conter no minimo 3 caracteres').isLength({min: 3});
	request.checkBody('lotacao', 'Insira a lotação').isLength({min: 2});
	request.checkBody('local', 'Insira o local do evento').isLength({min: 3});
	request.checkBody('preco', 'Insira o preço dos bilhetes').isLength({min: 1, max: 9});
	request.checkBody('cache', 'Insira o cache').isLength({min: 1, max: 9});

	var data = {
		'nome': request.body.nome,
		'data': request.body.data,
		'dataF': request.body.dataF,
		'lotacao': request.body.lotacao,
		'local': request.body.local,
		'preco': request.body.preco,
		'cache': request.body.cache
	};
	var errors = request.validationErrors();
	if (errors) {
		data.idParametros = request.params.idParametros;
		response.render('parametros-item', {
			isNew: false,
			parametros: data,
			errors: errors
		});
	}else{
		model.update(request.params.idParametros, data, function(){
			response.redirect('/parametros/');
		});
	}
});


router.get('/:idParametros/delete', function(request, response){
	model.remove(request.params.idParametros, function() {
		response.redirect('/parametros');
	})
});

module.exports = router;
