function cargar_lista_archivos()
{
	var archivos = ["colores_arcoiris", "fon", "números_hacia_texto", "texto_hacia_número", "programa"]
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
