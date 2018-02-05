module.exports = {
	list(callback) {
		var sql = 'SELECT * from parametros';
		global.connection.query(sql, function(error, rows, fields){
			if (error) throw error;
			callback(rows);
		});
	},

	read(idParametros, callback) {
		var sql = "SELECT * from parametros where idParametros=?";	
		global.connection.query(sql, [idParametros], function(error, rows, fields) {
			if (error) throw error;
			callback(rows[0]);			
		});
	},	

	createParametros(data, callback) {
		var sql = "INSERT INTO parametros (nomeW, data_inicioW, duracaoW, lotacaoW, cacheS, precoBilhete, localw) VALUES (?,?,?,?,?,?,?)"; 
		global.connection.query(
			sql, [data.nome, data.data, data.duracao, data.lotacao, data.cache, data.preco, data.local], function(error, rows, fields) {
			if (error) throw error;
			callback(rows[0]);			
		});
	},

	update(idParametros, data, callback) {
		var sql = "UPDATE parametros SET nomeW=?, data_inicioW=?, duracaoW=?, lotacaoW=?, cacheS=?, precoBilhete=?, localW=? WHERE idParametros=?"; 
		global.connection.query(
			sql, [data.nome, data.data, data.duracao, data.lotacao, data.cache, data.preco, data.local, idParametros], function(error, rows, fields) {
			if (error) throw error;
			callback(rows[0]);			
		});
	},
	
	remove(idParametros, callback) {
		var sql = "DELETE from parametros WHERE idParametros=?"; 
		global.connection.query(sql, [idParametros], function(error, rows, fields){
			if (error) throw error;
			callback(rows);
		});
	}

};
