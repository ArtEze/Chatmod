var archivos = [
	"utilidades"
	,"activar_herramientas"
	,"colores_arcoiris"
	,"fon"
	,"reales_hacia_texto"
	,"texto_hacia_reales"
	,"programa"
]

function cargar_lista_archivos(archivos){
	return archivos.map(x=>{
		var a = document.createElement("script")
		var directorio = window.raw_dir
		var extensión = "." + "js"
		var anticache = "?" + Date.now()
		a.src = directorio + x + extensión + anticache
		document.head.appendChild(a)
	})
}
cargar_lista_archivos(archivos)
