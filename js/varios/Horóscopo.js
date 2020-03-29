var función_2 = x=>{
	var html = document.createElement("html")
	html.innerHTML = x
	var nodos = Array.from(
		html.querySelector(".entry-content.clearfix").children
	).map(x=>x.textContent)
	var array = []
	var j = 0, k = 0
	for(var i in nodos)
	{
		var actual = nodos[i]
		if(array[j]==undefined){array[j]=""}
		if(actual.split(" ").length==1)
		{
			++j
			k=0
		}else
		{
			if(j!=0&k!=0){array[j]+="\n"}
			array[j]+=actual
			++k
		}
	}
	array = array.slice(2)
	console.log(array)
}
var función = x=>{
	var html = document.createElement("html")
	html.innerHTML = x
	var dirección = html.querySelector(".post-column.clearfix a").href
	descargar(dirección,función_2)
}
var dirección = "https://horoscoposocial.com/#horoscopos"
descargar(dirección,función)
