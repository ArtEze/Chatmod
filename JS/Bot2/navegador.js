function cargar_lista_archivos()
{
	var archivos = ["programa"]
	for(var i in archivos)
	{
		var actual = archivos[i]
		var a = document.createElement("script")
		var directorio = window.raw_dir_bot2
		var extensión = ".js" + window.no_chache()
		a.src = directorio + actual + extensión
		document.head.appendChild(a)
	}
}
cargar_lista_archivos()
