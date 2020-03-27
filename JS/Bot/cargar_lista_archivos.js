var archivos = [
	"activar_herramientas",
	"colores_arcoiris",
	"fon",
	"números_hacia_texto",
	"texto_hacia_número",
	"programa"
]

function cargar_lista_archivos(archivos){
	for(var i in archivos){
		var actual = archivos[i]
		var a = document.createElement("script")
		var directorio = window.raw_dir
		var extensión = ".js?" + Date.now()
		a.src = directorio + actual + extensión
		document.head.appendChild(a)
	}
}
cargar_lista_archivos(archivos)
