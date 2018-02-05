module.exports = {
	list(callback) {
		var sql = 'SELECT * from sessoes';
		global.connection.query(sql, function(error, rows, fields){
			if (error) throw error;
			callback(rows);
		});
	},

	read(idsessoes, callback) {
		var sql = "SELECT * from sessoes where nome=?";	
		global.connection.query(sql, [idsessoes], function(error, rows, fields) {
			if (error) throw error;
			callback(rows[0]);			
		});
	},	

	createsessoes(data, callback) {
		var sql = "INSERT INTO sessoes (nome, dataSessao, duracao) VALUES (?,?,?)"; 
		global.connection.query(
			sql, [data.nome, data.dataSessao, data.duracao], function(error, rows, fields) {
			if (error) throw error;
			callback(rows[0]);			
		});
	},

	update(idsessoes, data, callback) {
		var sql = "UPDATE sessoes SET nome=?,dataSessao=?,duracao=? WHERE idsessoes=?"; 
		global.connection.query(
			sql, [data.nome,data.dataSessao,data.duracao], function(error, rows, fields) {
			if (error) throw error;
			callback(rows[0]);			
		});
	},
	
	remove(idsessoes, callback) {
		var sql = "DELETE from sessoes WHERE idsessoes=?"; 
		global.connection.query(sql, [idsessoes], function(error, rows, fields){
			if (error) throw error;
			callback(rows);
		});
	}

};
