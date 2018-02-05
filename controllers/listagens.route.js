const pat = require('../models/patrocinador.model');
const spe = require('../models/speaker.model');
const col = require('../models/colaborador.model');
const ses = require('../models/sessoes.model');
const use = require('../models/user.model');

const express = require('express');
const router = express.Router();

router.get('/',global.secure('admin'), function(request, response){
	pat.list(function(patrocinadores){
		spe.list(function(speaker) {
			col.list(function(colaborador) {
				ses.list(function(sessao) {
					use.list(function(user) {
						response.set("Content-Type", "text/html");
						response.render('listagens-backend', {
							patrocinadores : patrocinadores,
							speaker : speaker,
							colaborador : colaborador,
							sessao : sessao,
							user : user
						})
					})
				})
			})
		})
	})
});

module.exports = router;
