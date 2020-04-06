oxy.funciones.utilidades = {
	modificar_función: function(entrada,intermediario,escribir_textarea){
		var función = typeof(entrada)=="string"?window[entrada]:entrada
		var función_2 = typeof(intermediario)=="string"?window[intermediario]:intermediario
		var nombre_entrada = función.name
		var nombre_intermediario = función_2.name
		var modificado = función+""
		modificado = modificado.replace(
			/^function ([^\x28]+)\s*\x28((?:,?\s*[^,\x29]+)+)\x29\s*\x7b\s*((?:.|\n)+)\x7d$/gi
			,"function $1($2){"+nombre_intermediario+"($2);$3}"
		)
		if(escribir_textarea){
			try{window.insertar_textarea(modificado)}catch(e){
				console.error("Mod_1: ",e)
			}
		}
		try{eval(nombre_entrada+"="+modificado)}catch(e){
			console.error("Mod_2: ",e)
		}
		return window[nombre_entrada]
	}
	, clonar_ventana: function(){
		var claves = Object.keys(window).filter(x=>{
			var es = true
			var filtro = ["parent","top"].map(y=>{
				if(x==y){es=false}
			})
			return es
		})
		var ventana = []
		for(var i in claves){
			ventana[i] = window[i]
		}
		return ventana
	}
}

