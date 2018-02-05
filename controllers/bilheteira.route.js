const model = require('../models/bilheteira.model');
const spe = require('../models/speaker.model');
const par = require('../models/parametros.model');
const express = require('express');
const router = express.Router();

router.get('/', function(request, response) {
	model.list(function(bilheteira) {
		par.lista(function(parametros) {
			response.set("Content-Type", "text/html");
			response.render('bilheteira', {
				data: bilheteira,
				parametros : parametros
			})
		})
	})
});

router.post('/createBilhete', global.secure(), function(request, response) {
	var errors = request.validationErrors();
	var num = request.body.rep;
	
	if (errors) {
		response.render('bilheteira', {
			isNew: true,
			bilheteira: {},
			errors: errors
		});
	}else{
		for(i= 0; i < num; i++){
			var data = {
				'username': request.body.nome,
				'datas': request.body.datas
			};
			model.createBilhete(data, function(){
			});
		}
		var data = {
				'lotacaoW': request.body.lotacaoF
			};
			model.update(request.params.idParametros, data, function(){
		});	
		response.redirect('/bilheteira');
	}
});

module.exports = router;