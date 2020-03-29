
var url = oxy.url

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
	url.src = []
	return url.archivos.map(x=>{
		var archivo = url.tampermonkey.carpeta + x + url.extensión + url.anticache
		url.src.push(archivo)
		oxy.funciones.agregar_código(archivo)
	})
}

cargar_lista_archivos(url.archivos)

