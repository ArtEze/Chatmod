oxy.funciones.cargar_archivos = function(){
	with(window.oxy.funciones){ // Usando with para mejor facilidad.
		v("urls_códigos", [
			"utilidades"
			,"activar_herramientas"
			,"colores_arcoiris"
			,"fon"
			,"reales_hacia_texto"
			,"texto_hacia_reales"
			,"programa"
		])
		w("urls_códigos").map(x=>agregar_código(w("carpeta")+x))
	}
}
oxy.funciones.cargar_archivos()

