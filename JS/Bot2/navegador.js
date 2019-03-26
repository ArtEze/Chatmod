function cargar_lista_archivos()
{
	var archivos = ["programa"]
	for(var i in archivos)
	{
		var actual = archivos[i]
		var a = document.createElement("script")
		var directorio = window.raw_dir
		var extensión = ".js?" + window.número_aleatorio(1000)
		a.src = directorio + actual + extensión
		document.head.appendChild(a)
	}
}
cargar_lista_archivos()
