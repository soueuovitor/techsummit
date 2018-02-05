module.exports = {
	list(callback) {
		var sql = 'SELECT * from speakers WHERE ativo=1';
		global.connection.query(sql, function(error, rows, fields){
			if (error) throw error;
			callback(rows);
		});
	},
	
	dropdown(callback) {
		var sql = 'SELECT nomeS from speakers';
		global.connection.query(sql, function(error, rows, fields){
			if (error) throw error;
			callback(rows);
		});
	},

	read(idSpeaker, callback) {
		var sql = "SELECT * from speakers where idSpeaker=?";	
		global.connection.query(sql, [idSpeaker], function(error, rows, fields) {
			if (error) throw error;
			callback(rows[0]);			
		});
	},	

	createSpeaker(data, callback) {
		var sql = "INSERT INTO speakers (nomeS,telemovel,nif,funcao,ativo) VALUES (?,?,?,?,1)"; 
		global.connection.query(
			sql, [data.nome,data.telemovel,data.nif,data.funcao], function(error, rows, fields) {
			if (error) throw error;
			callback(rows[0]);			
		});
	},

	update(idSpeaker, data, callback) {
		var sql = "UPDATE speakers SET nomeS=?,telemovel=?,nif=?,funcao=? WHERE idSpeaker=?"; 
		global.connection.query(
			sql, [data.nome,data.telemovel,data.nif,data.funcao, idSpeaker], function(error, rows, fields) {
			if (error) throw error;
			callback(rows[0]);			
		});
	},
	
	remove(idSpeaker, callback) {
		var sql = "UPDATE speakers SET ativo=0 where idSpeaker=?"; 
		global.connection.query(sql, [idSpeaker], function(error, rows, fields){
			if (error) throw error;
			callback(rows);
		});
	}
};
