"use strict";

(function()
{
	//automatically called as soon as the javascript is loaded
	window.addEventListener("load", main);
}());

const tam_celula = 180;
const tam_cruz = 100;
const tam_circulo = 50;

function main()
{

	var x;
	var y;
	var pos_I;//POSICAO NO ARRAY
	var pos_J;//POSICAO NO ARRAY
	var tabuleiro;
	var comeca = false;

	var canvas = document.getElementById("myCanvas");
	var ctx = canvas.getContext("2d");
	var canvas_instructions = document.getElementById("instructionsCanvas");
	var ctx_instructions =  canvas_instructions.getContext("2d");

	var btn_jogar = document.getElementById("button-jogar");
	var btn_instructions = document.getElementById("button-instructions");
	var btn_voltar = document.getElementById("button-voltar");

	btn_jogar.onclick = function(){
		btn_jogar.style.visibility = 'hidden';
		btn_instructions.style.visibility = 'hidden';
		comeca = true;
		tabuleiro = new Tabuleiro(mapa, ctx);
	};

	btn_instructions.onclick = function(){
		canvas_instructions.style.visibility = 'visible';
		instructions.style.visibility = 'visible';
		btn_jogar.style.visibility = 'hidden';
		btn_instructions.style.visibility = 'hidden';
		btn_voltar.style.visibility = 'visible';
	};

	btn_voltar.onclick = function(){
		canvas_instructions.style.visibility = 'hidden';
		instructions.style.visibility = 'hidden';
		btn_voltar.style.visibility = 'hidden';
		btn_jogar.style.visibility = 'visible';
		btn_instructions.style.visibility = 'visible';
		
	}


	//CRIA O MAPA PARA TODAS AS POSICOES POSSIVEIS
	var mapa = new Array();
	for(let i=0; i<3; i++){
		let linha_aux = new Array();
		for(let j=0; j<3; j++){
			linha_aux.push(new Posicao());
		}
		mapa[i] = (linha_aux);
	}

	


	//DÁ as coordenadas do CLICK
	var myCanvas = document.querySelector('#myCanvas');
	myCanvas.addEventListener('click', function(event) {
	    var rect = myCanvas.getBoundingClientRect();
	    x = event.clientX - rect.left;
	    y = event.clientY - rect.top;

	    pos_J = parseInt(x/tam_celula);
	    pos_I = parseInt(y/tam_celula);
	    
	    if (comeca == true)
	    	tabuleiro.atualiza_Posicoes(pos_I, pos_J);

		//console.log("x: " + pos_I + " y: " + pos_J); 
	    //console.log("x: " + x + " y: " + y); 
	}, false);

}


