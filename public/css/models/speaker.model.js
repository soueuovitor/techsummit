module.exports = {
	list(callback) {
		var sql = 'SELECT * from speakers';
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
		var sql = "INSERT INTO speakers (nomeS,telemovel,nif) VALUES (?,?,?)"; 
		global.connection.query(
			sql, [data.nome,data.telemovel,data.nif], function(error, rows, fields) {
			if (error) throw error;
			callback(rows[0]);			
		});
	},

	update(idSpeaker, data, callback) {
		var sql = "UPDATE speakers SET nomeS=?,telemovel=?,nif=? WHERE idSpeaker=?"; 
		global.connection.query(
			sql, [data.nome,data.telemovel,data.nif, idSpeaker], function(error, rows, fields) {
			if (error) throw error;
			callback(rows[0]);			
		});
	},
	
	remove(idSpeaker, callback) {
		var sql = "DELETE from speakers WHERE idSpeaker=?"; 
		global.connection.query(sql, [idSpeaker], function(error, rows, fields){
			if (error) throw error;
			callback(rows);
		});
	}

};
