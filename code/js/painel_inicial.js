"use strict";

(function()
{
	//automatically called as soon as the javascript is loaded
	window.addEventListener("load", main);
}());


var myWindow;

function main(){
	//window.addEventListener("message", messageHandler);
	var btn = document.getElementById("button-jogar");
	var btn_ajuda = document.getElementById("button-ajuda");
	var btn_creditos = document.getElementById("button-creditos");
	var btn_voltar = document.getElementById("button-voltar");
	var descricao = document.getElementById("instructions");
	var canvas = document.getElementById("canvasInstructions");
	var numero = document.getElementById("numero");
	var players = document.getElementById("players");
	var credits = document.getElementById("credits");

	btn.addEventListener("click", btnPlayHandler);  //escutar clicks no botão
	
	btn_ajuda.onclick = function(){
		btn.style.visibility = "hidden";
		btn_ajuda.style.visibility = "hidden";
		btn_creditos.style.visibility = "hidden";
		numero.style.visibility = "hidden";
		players.style.visibility = "hidden";
		descricao.style.visibility = "visible";
		canvas.style.visibility = "visible";
		btn_voltar.style.visibility = "visible";
	}

	btn_voltar.onclick = function(){
		btn.style.visibility = "visible";
		btn_ajuda.style.visibility = "visible";
		btn_creditos.style.visibility = "visible";
		numero.style.visibility = "visible";
		players.style.visibility = "visible";
		credits.style.visibility = "hidden";
		descricao.style.visibility = "hidden";
		canvas.style.visibility = "hidden";
		btn_voltar.style.visibility = "hidden";
	}

	btn_creditos.onclick = function(){
		btn.style.visibility = "hidden";
		btn_ajuda.style.visibility = "hidden";
		btn_creditos.style.visibility = "hidden";
		numero.style.visibility = "hidden";
		players.style.visibility = "hidden";
		descricao.style.visibility = "hidden";
		canvas.style.visibility = "visible";
		btn_voltar.style.visibility = "visible";
		credits.style.visibility = "visible";
		credits.classList.remove("run-animation");
		void credits.offsetWidth;
		credits.classList.add("run-animation");
	}
}




function btnPlayHandler(ev)
{
	//
	// todos os outros botoes deixam de funcionar
	//


	window.addEventListener("message", messageHandler);
	console.log("entrou");



 	var p = document.getElementById("players");
	var totalPlayers= p.options[p.selectedIndex].value;
	console.log("total de players e"+ totalPlayers);

	var sWidth = window.screen.availWidth;
	var wWidth = 550;
	var wHeight = 420;
	var wLeft = (sWidth - wWidth)/2;	//center window on the screen

	function messageHandler(ev)
	{
		console.log("from popup: " + ev.data);
		if(ev.data== "aberto")
		{
			myWindow.postMessage(totalPlayers, "*");
			var thisWindow = window.open("code/html/main.html", "_self");
		}
		else{
			console.log("ocorreu algum erro, a informacao deveria estar a chegar ao main.js");
		}
	}


	myWindow = window.open("code/html/newPlayer.html", "mainWindow", "width = " + wWidth + ", height = " + wHeight + ", left = " + wLeft);

}



var volumeslider = document.getElementById('volumeslider');
var musicaBackground = document.querySelector('audio'); //CUIDADO, NÃO SEI SE PODE UTILIZAR ☻☻☻☻☻22☻☻☻☻☻☻▬☻
var somMute = document.getElementById('mute');
var somMax = document.getElementById('maximo');


volumeslider.style.display = "none";
somMute.style.display = "none";

//console.log(volumeslider);
//console.log(somMute);
//console.log(somMax);

volumeslider.addEventListener('change', function(e){
	musicaBackground.volume = e.currentTarget.value / 100;
});




somMax.addEventListener('click', somM);
somMute.addEventListener('click', somMu);

function somM(){
	if(volumeslider.style.display == "none" && somMute.style.display == "none") {
		somMute.style.display = "block";
		volumeslider.style.display = "block";
	}
	else{
		volumeslider.style.display = "none"
		somMute.style.display = "none";
	}
}

function somMu(){
	var teste;
	if(musicaBackground.muted){
		musicaBackground.muted = false;
		volumeslider.value = 100;
	}
	else{
		musicaBackground.muted = true;
		
		
	}
	


}

