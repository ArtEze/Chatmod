window.iniciar_oxy = function iniciar_oxy(){
	window.oxy = { x: true
		, variables: {}
		, funciones: {
			v: function(nombre,valor){
				if(window.oxy.variables[nombre]==undefined){
					window.oxy.variables[nombre] = []
				}
				window.oxy.variables[nombre].push([valor,Date.now()])
				return window.oxy.variables[nombre]
			}
			, w: function(nombre){
				return window.oxy.variables[nombre].slice(-1)[0][0]
			}
			, definir_esto: function(){
				with(window.oxy.funciones){
					v("iniciar_oxy_tampermonkey",window.iniciar_oxy)
					delete window.iniciar_oxy
					delete window.obtener_carpeta
				}
			}
			, obtener_carpeta: window.obtener_carpeta
			, agregar_código: function(url){
				with(window.oxy.funciones){
					var etiqueta = document.createElement("script")
					v("tampermonkey_actual", url + "?" + Date.now())
					etiqueta.src = w("tampermonkey_actual")
					document.head.appendChild(etiqueta)
					return etiqueta
				}
			}
		}
	}
	with(window.oxy.funciones){ // Usando with para mejor facilidad.
		v("tampermonkey",document.querySelector("script[src*=github]").src)
		v("carpeta",obtener_carpeta(w("tampermonkey")))
		agregar_código(w("carpeta")+"cargar_lista_archivos.js")
		definir_esto()
	}
}
window.iniciar_oxy()

