function cargar_archivos(){
	with(window.oxy.funciones){ // Usando with para mejor facilidad.
		var i=iniciar
		i.b("cargar_archivos")
		i.v("urls_códigos", [
			"utilidades"
			,"activar_herramientas"
			,"colores_arcoiris"
			,"fon"
			,"reales_hacia_texto"
			,"texto_hacia_reales"
			,"programa"
		])
		i.b("iniciar")
		var carpeta = i.x("carpeta")
		i.b("cargar_archivos")
		i.x("urls_códigos").map(x=>agregar_código(carpeta+x))
	}
	i.definir_esto("cargar_archivos","cargar_lista_archivos")
}
cargar_archivos()

