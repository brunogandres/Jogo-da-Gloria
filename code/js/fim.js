"use strict";



(function()
{
	//automatically called as soon as the javascript is loaded
	window.addEventListener("load", main);
}());



function main(){
	var btn_jogo = document.getElementById("button-jogo");
	var btn_sair = document.getElementById("button-sair");


	btn_sair.onclick = function(){
		window.close();
	}

	btn_jogo.onclick = function(){
		var newWindow = window.open("../../GameOfGlory.html", "_self");
	}
	
}







	




