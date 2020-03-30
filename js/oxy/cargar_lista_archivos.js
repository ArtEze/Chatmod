
var url = oxy.url
var funciones = oxy.funciones

oxy.url.archivos = [
	"utilidades"
	,"activar_herramientas"
	,"colores_arcoiris"
	,"fon"
	,"reales_hacia_texto"
	,"texto_hacia_reales"
	,"programa"
]

funciones.cargar_lista_archivos = function(archivos){
	url.src = []
	return url.archivos.map(x=>{
		var anti_cache = oxy.funciones.general.obtener.tiempo()
		var archivo = url.tampermonkey.carpeta + x + url.extensión + anti_cache
		url.src.push(archivo)
		funciones.general.agregar_código(archivo)
	})
}

funciones.cargar_lista_archivos(url.archivos)

