module.exports = {
	list(callback) {
		var sql = 'SELECT * from sessoes WHERE ativo=1 ORDER BY dataSessao, horaI';
		global.connection.query(sql, function(error, rows, fields){
			if (error) throw error;
			callback(rows);
		});
	},

	read(idsessoes, callback) {
		var sql = "SELECT * from sessoes where idsessoes=?";	
		global.connection.query(sql, [idsessoes], function(error, rows, fields) {
			if (error) throw error;
			callback(rows[0]);			
		});
	},	

	valida(data,callback) {
		var sql = "SELECT * FROM sessoes where dataSessao=? and  ? >= horaI and ? <= horaF or ?  >= horaI and ? <=  horaF or ? < horaI and ? > horaF";	
		global.connection.query(sql, [data.dataSessao, data.horaI, data.horaI, data.horaF, data.horaF, data.horaI, data.horaF], function(error, rows, fields) {
			if (error) throw error;
			
			if(rows.length == 0) {
				callback(true);		//pode fazer registo de sessao
			} else {
				callback(false);	// hora ocupada
			}		
		});
	},

	createsessoes(data, callback) {
		var sql = "INSERT INTO sessoes (nome, tituloS, descS, dataSessao, horaI, horaF, ativo) VALUES (?,?,?,?,?,?,1)"; 
		global.connection.query(
			sql, [data.nome, data.tituloS, data.descS, data.dataSessao, data.horaI, data.horaF], function(error, rows, fields) {
			if (error) throw error;
			callback(rows[0]);			
		});
	},

	update(idsessoes, data, callback) {
		var sql = "UPDATE sessoes SET nome=?,dataSessao=?,horaI=?,horaF=? WHERE idsessoes=?"; 
		global.connection.query(
			sql, [data.nome,data.dataSessao,data.horaI, data.horaF, idsessoes], function(error, rows, fields) {
			if (error) throw error;
			callback(rows[0]);			
		});
	},
	
	remove(idsessoes, callback) {
		var sql = "UPDATE sessoes SET ativo=0 where idSessoes=?"; 
		global.connection.query(sql, [idsessoes], function(error, rows, fields){
			if (error) throw error;
			callback(rows);
		});
	}

};
