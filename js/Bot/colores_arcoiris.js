function entero16HaciaHexadecimal(entero)
{
	var devuelve=-1
	if(entero>=0&entero<10){devuelve=entero+""}
	if(entero==10){devuelve="A"}
	if(entero==11){devuelve="B"}
	if(entero==12){devuelve="C"}
	if(entero==13){devuelve="D"}
	if(entero==14){devuelve="E"}
	if(entero==15){devuelve="F"}
	return devuelve
}
function entero256HaciaHexadecimal(b256)
{
	var uno=Math.floor(b256/16)
	var dos=Math.floor(b256%16)
	uno=entero16HaciaHexadecimal(uno)
	dos=entero16HaciaHexadecimal(dos)
	return uno+""+dos
}
function aleatorio(entero)
{
	return Math.floor(Math.random()*entero)
}
function decimalHaciaMatiz(decimal)
{
	var matriz=[
     	[255,0	,0	,1], //Rojo
		[255,255,0	,0], //Amarillo
		[0	,255,0	,2], //Verde
		[0	,255,255,1], //Cyan
		[0	,0	,255,0], //Azul
		[255,0	,255,2] //Magenta
	]
	var total=decimal*255*6
	var sección=Math.floor(total/255)
	var resto=Math.floor(total%255)
	var signo=sección%2?-1:1
	var canal=matriz[sección][3]
	var resultado=matriz[sección]
	var salida=""
	resultado[canal]+=signo*resto
	resultado=resultado.slice(0,3)
	for(var i=0;i<3;i++)
	{
		salida+=entero256HaciaHexadecimal(resultado[i])
	}
	return salida
}
function agregarTexto(texto,booleano,tamaño)
{
	try{tamaño}catch(e){tamaño=13}
	if(booleano)
	{
		return texto
	}
	else
	{
		return "[size="+tamaño+"]"+texto+"[/size]"
	}
}
window.gradual = function(booleano,tamañoInicial,frase,tamañoFuente,estático,arcoiris)
{
	var hex,decimal
	var tamaño=tamañoInicial
	var contador=tamañoInicial
	var salida=""
	if(frase==undefined){frase="ABCDEFGHIJKLMNÑOPQRSTUVWXYZ"}
	for(var i=0;i<frase.length;i++)
	{
		if(booleano){salida+="[size="+tamañoFuente+"][[/size][size="+tamañoFuente+"]"}else{salida+="["}
		decimal=i/frase.length
		salida+="color=#"
		if(arcoiris)
		{
			salida+=decimalHaciaMatiz(decimal)
		}
		else
		{
			var color=[]
			for(var j=0;j<6;j++)
			{
				color[j]=entero16HaciaHexadecimal(aleatorio(16))
			}
			var de_tres=aleatorio(3)
			color[de_tres*2+0]="F"
			color[de_tres*2+1]="1"
			salida+=color.join("")
		}
		salida+="]"
		if(booleano){salida+="[/size][size="+tamañoFuente+"][[/size][size="+tamañoFuente+"]"}else{salida+="["}
		salida+="size="+tamaño+"]"+frase[i]
		if(booleano){salida+="[/size][size="+tamañoFuente+"][[/size][size="+tamañoFuente+"]"}else{salida+="["}
		salida+="/size]"
		if(booleano){salida+="[/size][size="+tamañoFuente+"][[/size][size="+tamañoFuente+"]"}else{salida+="["}
		salida+="/color]"
		if(booleano){salida+="[/size]"}
		contador++
		if(!estático)
		{
			if(contador>30){tamaño--}else{tamaño++}
			if(tamaño<10){contador=11;tamaño=11}
		}
	}
	return salida
}
