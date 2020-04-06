cargar_cargador = function(){
	oxy = {
		variables: {
			tampermonkey: {}
			, iniciar: {
				archivo_actual: []
			}
		}
		, funciones: {
			tampermonkey: {}
			, iniciar: {
				ult: x=>x.slice(-1)[0]
				, a: ()=>oxy.funciones.iniciar.ult(oxy.variables.iniciar.archivo_actual)[0]
				, c: x=>[x,Date.now(),Error().stack.replace("Error\n","")]
				, b: function(archivo){
					with(oxy){
						if(funciones[archivo]==undefined){
							funciones[archivo]={}						
						}
						var elemento = funciones.iniciar.c(archivo)
						variables.iniciar.archivo_actual.push(elemento)
					}
				}
				, s: function(función,archivo,nombre,valor,puede_depurar){
					with(oxy.variables){
						if(iniciar.registro==undefined){
							iniciar.registro = []
						}
						var registro = [`${función}: `,...arguments.slice(1,-1)]
						iniciar.registro.push(registro)
						puede_depurar && console.log(...registro)
					}
				}
				, v: function(nombre,valor,puede_depurar){
					with(oxy){
						var archivo = funciones.iniciar.a()
						funciones.iniciar.s("Asignar",archivo,...arguments)
						if(variables[archivo]==undefined){
							variables[archivo] = {}
						}
						if(variables[archivo][nombre]==undefined){
							variables[archivo][nombre] = []
						}
						var elemento = oxy.funciones.iniciar.c(valor)
						variables[archivo][nombre].push(elemento)
						return nombre
					}
				}
				, x: function(nombre){
					var archivo = oxy.funciones.iniciar.a()
					with(oxy.funciones.iniciar){
						return ult(oxy.variables[archivo][nombre])[0]
					}
				}
				, definir_esto: function(nombre_función){
					with(oxy){
						var archivo = funciones.iniciar.a()
						if(funciones[archivo]==undefined){
							funciones[archivo] = {}
						}
						if(funciones[archivo][nombre_función]==undefined){
							funciones[archivo][nombre_función] = window[nombre_función]
							delete window[nombre_función]
						}
					}
				}
				, agregar_código: function(url){
					var archivo = oxy.funciones.iniciar.a()
					with(oxy.funciones.iniciar){
						var etiqueta = document.createElement("script")
						v("tampermonkey_actual", url + ".js?" + Date.now())
						etiqueta.src = x("tampermonkey_actual")
						document.head.appendChild(etiqueta)
						return etiqueta
					}
				}
			}
		}
	}
	with(oxy.funciones){ // Usando with para mejor facilidad.
		var i=iniciar,t=tampermonkey
		i.b("tampermonkey")
		i.v("url_tampermonkey",document.querySelector("script[src*=github]").src)
		var tm = i.x("url_tampermonkey")
		i.definir_esto("obtener_carpeta")
		i.v("carpeta",t.obtener_carpeta(tm))
		var carpeta = i.x("carpeta")
		i.b("iniciar")
		console.log(t,oxy.funciones,tampermonkey)
		console.log(carpeta)
		i.agregar_código(carpeta+"cargar_archivos")
		i.b("tampermonkey")
		i.definir_esto("oxy_tampermonkey")
		i.b("iniciar")
		i.definir_esto("cargar_cargador")
	}
}
cargar_cargador()

