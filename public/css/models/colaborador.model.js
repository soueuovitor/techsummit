module.exports = {
	list(callback) {
		var sql = 'SELECT * from Colaboradores';
		global.connection.query(sql, function(error, rows, fields){
			if (error) throw error;
			callback(rows);
		});
	},

	read(idColaboradores, callback) {
		var sql = "SELECT * from Colaboradores where idColaboradores=?";	
		global.connection.query(sql, [idColaboradores], function(error, rows, fields) {
			if (error) throw error;
			callback(rows[0]);			
		});
	},	

	createColab(data, callback) {
		var sql = "INSERT INTO colaboradores (nomeC, email, morada, telemovel, funcao, tipo, nif) VALUES (?,?,?,?,?,?,?)"; 
		global.connection.query(
			sql, [data.nome, data.email, data.morada, data.telemovel, data.funcao, data.tipo, data.nif], function(error, rows, fields) {
			if (error) throw error;
			callback(rows[0]);			
		});
	},

	update(idColaboradores, data, callback) {
		var sql = "UPDATE colaboradores SET nomeC=?, email=?, morada=?, telemovel=?, funcao=?, tipo=?, nif=? WHERE idColaboradores=?"; 
		global.connection.query(
			sql, [data.nome, data.email, data.morada, data.telemovel, data.funcao, data.tipo, data.nif, idColaboradores], function(error, rows, fields) {
			if (error) throw error;
			callback(rows[0]);			
		});
	},
	
	remove(idColaboradores, callback) {
		var sql = "DELETE from colaboradores WHERE idColaboradores=?"; 
		global.connection.query(sql, [idColaboradores], function(error, rows, fields){
			if (error) throw error;
			callback(rows);
		});
	}

};
