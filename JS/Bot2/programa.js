// Código hecho por Emiliano Ezequiel Parenti

console.log("Cargado programa.js")

function carga(){ 
	var areas_mensajes = document.querySelectorAll(".chatMessagesTab")
	Array.from(areas_mensajes).map(x=>{
		var deslizador = x.querySelector(".chatMessagesScrollBar")
		var deslizador_nuevo = x.querySelector(".chatMessagesContainer")
		deslizador_nuevo.style["overflow-y"]="scroll"
		if(deslizador!=null)
		{
			deslizador.remove()
		}
	})
}
carga()
