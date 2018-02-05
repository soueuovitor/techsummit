const model = require('../models/sessoes.model');
const spe = require('../models/speaker.model');
const par = require('../models/parametros.model');
const express = require('express');
const router = express.Router();


router.get('/', global.secure('admin'), function(request, response) {
	model.list(function(sessoes) {
		response.set("Content-Type", "text/html");
		response.render('sessoes-list', {
			data: sessoes
		})
	})	
});

router.get('/createsessoes',global.secure('admin'), function(request, response) {
	spe.dropdown(function(speaker) {
		par.lista(function(parametros) {
			response.set("Content-Type", "text/html");
			response.render('sessoes-item', {
				speaker : speaker,
				parametros : parametros,
				isNew: true,
				sessoes: {},
				errors: []
			})
		})
	})
});

router.post('/createsessoes',global.secure('admin'), function(request, response) {
	var errors = request.validationErrors();
	
	if (errors) {
		response.render('sessoes-item', {
			isNew: true,
			sessoes: {},
			errors: errors
		});
	}else{

		var data = {
			
			'nome': request.body.nome,
			'tituloS': request.body.tituloS,
			'descS': request.body.descS,
			'dataSessao': request.body.data,
			'horaI': request.body.horaI,
			'horaF': request.body.horaF,
		};

		model.valida(data,function(valida){
			if(valida){

				model.createsessoes(data, function(){
					response.redirect('/sessoes');
				});

			} else {	
				spe.dropdown(function(speaker) {
					par.list(function(parametros) {
						response.set("Content-Type", "text/html");
						response.render('sessoes-item', {
							speaker : speaker,
							parametros : parametros,
							isNew: false,
							sessoes: {},
							errors: [{ msg: 'No horario pretendido ja exixte um sessão a deccorer, escolha outro horario' }]
						})
					})
				})
			}
		});
	}
});

router.get('/:idsessoes',global.secure('admin'), function(request, response) {
	spe.dropdown(function(speaker) {
		par.dropdown(function(parametros) {
			model.read(request.params.idsessoes, function(sessoes) {
				
				if (sessoes != undefined) {
					response.set("Content-Type", "text/html");
					response.render('sessoes-item', {
						speaker : speaker,
						parametros : parametros,
						isNew: false,
						sessoes: sessoes,
						errors: []
					})		
				}else{
					response.status(404).end();
				}
			})
		})
	})
});

router.post('/:idsessoes',global.secure('admin'), function(request, response) {
	
	var data = {
			'nome': request.body.nome,
			'tituloS': request.body.tituloS,
			'descS': request.body.descS,
			'dataSessao': request.body.data,
			'horaI': request.body.horaI,
			'horaF': request.body.horaF
	};
	var errors = request.validationErrors();	
	if (errors) {
		data.sessoes = request.params.sessoes;
		response.render('sessoes-item', {
			isNew: false,
			sessoes: data,
			errors: errors
		});
	}else{

		model.valida(data,function(valida){
			if(valida){
				model.update(request.params.idsessoes, data, function(){
					response.redirect('/sessoes');
				});
			} else {	
				spe.dropdown(function(speaker) {
					par.list(function(parametros) {
						response.set("Content-Type", "text/html");
						response.render('sessoes-item', {
							speaker : speaker,
							parametros : parametros,
							isNew: false,
							sessoes: {},
							errors: [{ msg: 'No horario pretendido ja exixte um sessão a deccorer, escolha outro horario' }]
						})
					})
				})
			}
		});
	}
});


router.get('/:sessoes/delete', function(request, response){
	model.remove(request.params.sessoes, function() {
		response.redirect('/sessoes');
	})	
});

module.exports = router;