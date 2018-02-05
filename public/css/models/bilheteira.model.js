module.exports = {
	list(callback) {
		var sql = 'SELECT * from parametros';
		global.connection.query(sql, function(error, rows, fields){
			if (error) throw error;
			callback(rows);
		});
	},
	
	createBilhete(data, callback) {
		var sql = "INSERT INTO bilhetes (username) VALUES (?)";
		var sqlV = "SELECT COUNT(*) FROM bilhetes";		
		
		global.connection.query(
			sql, [data.username], function(error, rows, fields) {
			if (error) throw error;
			callback(rows[0]);			
		});
	},
	
	update(idParametros, data, callback) {
		var sql = "UPDATE parametros SET lotacaoW=? WHERE idParametros=?"; 
		global.connection.query(
			sql, [data.lotacaoW, idParametros], function(error, rows, fields) {
			if (error) throw error;
			callback(rows[0]);			
		});
	},

};