function desencriptar(token_encriptado,contraseña){
	var desencriptador = crypto.createDecipher("aes-128-cbc", contraseña)
	var salida = desencriptador.update(token_encriptado, "base64", "utf8")
	salida += desencriptador.final("utf8")
	return salida
}
function fuerza_bruta(){
	var i = 0
	var b = false
	var intervalo = setInterval(function(){
		var contra = (78364164096+Math.floor(Math.random()*2742745743360)).toString(36)
		try{
			var descifrado = desencriptar(
				"rIBvtfOhf54JeOKMo2W4T/Tn4vpW36x4UU4J/gbqrE9kK+U2rW5rv0602Rht4na6RbYXJNkNPOaKsabMKq0HAw=="
				,contra
			)
			var c1 = Math.floor(Math.random()*4).toString()
			var c2 = Math.floor(Math.random()*8).toString()
			process.stdout.write(`\x1b[01;${c1}${c2}m${contra}`)
			if(!/�/g.test(descifrado)){
				b = true
			}
		}catch(e){
		}
		if(b){
			clearInterval(intervalo)
			console.log(contra,descifrado)
		}
	},15)
}
fuerza_bruta()

