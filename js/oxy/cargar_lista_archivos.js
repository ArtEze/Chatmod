
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
		var archivo = url.tampermonkey.carpeta + x + url.extensión + url.anticache
		url.src.push(archivo)
		funciones.agregar_código(archivo)
	})
}

funciones.cargar_lista_archivos(url.archivos)

