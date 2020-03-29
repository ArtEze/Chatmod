oxy.url.archivos = [
	"utilidades"
	,"activar_herramientas"
	,"colores_arcoiris"
	,"fon"
	,"reales_hacia_texto"
	,"texto_hacia_reales"
	,"programa"
]

oxy.cargar_lista_archivos = function(archivos){
	oxy.url.src = []
	return oxy.url.archivos.map(x=>{
		var archivo = oxy.url.tampermonkey.carpeta + x + oxy.extensión + oxy.url.anticache
		oxy.url.src.push(archivo)
		oxy.agregar_código(archivo)
	})
}
cargar_lista_archivos(oxy.url.archivos)

