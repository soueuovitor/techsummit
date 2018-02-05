module.exports = {
	list(callback) {
		var sql = 'SELECT idParametros, lotacaoW,cacheS,precoBilhete,nomeW,localW, DATE_FORMAT(data_inicioW, "%d/%m/%Y") AS data_inicioW,  DATE_FORMAT(data_fimW, "%d/%m/%Y") AS data_fimW from parametros';
		global.connection.query(sql, function(error, rows, fields){
			if (error) throw error;
			callback(rows);
		});
	},

	lista(callback) {
		var sql = 'SELECT * from parametros';
		global.connection.query(sql, function(error, rows, fields){
			if (error) throw error;
			callback(rows);
		});
	},
	
	dropdown(callback) {
		var sql = 'SELECT data_inicioW, data_fimW from parametros';
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
		var sql = "INSERT INTO parametros (nomeW, data_inicioW, data_FimW, lotacaoW, cacheS, precoBilhete, localw) VALUES (?,?,?,?,?,?)"; 
		global.connection.query(
			sql, [data.nome, data.data, data.dataF, data.lotacao, data.cache, data.preco, data.local], function(error, rows, fields) {
			if (error) throw error;
			callback(rows[0]);			
		});
	},

	update(idParametros, data, callback) {
		var sql = "UPDATE parametros SET nomeW=?, data_inicioW=?, data_FimW=?, lotacaoW=?, cacheS=?, precoBilhete=?, localW=? WHERE idParametros=?"; 
		global.connection.query(
			sql, [data.nome, data.data, data.dataF, data.lotacao, data.cache, data.preco, data.local, idParametros], function(error, rows, fields) {
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
