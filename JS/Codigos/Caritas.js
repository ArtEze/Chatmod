window.sala_visible = 1
window.privados = []
window.entrar_y_salir = function (a, b, c) {
	if(b.includes("changed"))
	{
		var privado = JSON.parse(b.replace(
			/^tab changed to (.+)\[(\d+)\], (false|true|undefined), (false|true|undefined)$/gi,"[\"$1\",\"$2\"]"
		))
		if(!window.privados.map(x=>x[0]).includes(privado[0]))
		{
			window.privados.push(privado)
		}
		window.sala_visible = privado[1]
	}
}
window.cc.prototype.log = (a,b,c)=>window.entrar_y_salir(a,b,c)
function emot(ancho,alto)
{
	var emoticones = [ "good", "bad", "handshake", "meeting", "pizza", "cake", "coffee", "beer", "drink", "island", "football", "geek", "james", "vampire", "money", "btc", "flower", "bear", "in-love", "iloveyou", "panties-pink", "boxers", "love-over", "no-loving", "bomb", "handcuffs", "kitty", "cow", "pig", "clown", "r2d2", "sun", "rain", "rainbow", "star", "budmuzhikom", "philosoraptor", "pedobear", "sparta", "facepalm", "shatun", "volk", "vlastelin", "experts", "jirinovskiy", "jirinovskiy2", "nnnada", "grumpy", "nyan"]

	var csrf=location.host=="admin.chatovod.com"
			?document.querySelector(".navbar-right>li>ul>li:nth-child(2)>a").href.slice(-6)
			:document.body.querySelector("script").textContent.match(/\x22[A-Za-z0-9]{6}\x22/g)[0].slice(1,-1)

	var mensaje = ""
	for(var j=0;j<alto;j++)
	{
		for(var i=0;i<ancho;i++)
		{
			mensaje += "\x3A"+emoticones[Math.floor(Math.random()*emoticones.length)]+"\x3A"
		}
		mensaje += "%0A"
	}

	var dirección = location.origin + "/chat/send?csrf="+csrf+"&roomId="+window.sala_visible+"&msg=" + mensaje

	var descarga = new XMLHttpRequest()
	descarga.onreadystatechange = function(){
		if (descarga.readyState == 4 && descarga.status == 200)
		{
			if(typeof función=="function"){función(descarga.responseText)}
		}
	}
	descarga.open("GET",dirección)
	descarga.send()
}
emot(10,1)
