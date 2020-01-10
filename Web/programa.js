function generar_nicks_css(hacia)
{
	var salida = ""
	for(var i in hacia)
	{
		var actual = hacia[i]
		if(i!=0){salida+=","}
		salida+=".nick[data-nick=\""+actual+"\"]"
	}
	salida+="{background-color:#0fd;}"
}
