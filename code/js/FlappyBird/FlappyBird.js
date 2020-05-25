"use strict";

(function()
{
	//automatically called as soon as the javascript is loaded
	window.addEventListener("load", main);
}());


const dir_img_Bird = "../../resources/FlappyBird/passaro.png";
const dir_aud_Bird = "../../resources/FlappyBird/somPassaro.mp3";
const y_ini_Bird = 150;
const x_Bird = 30;
const width_Bird = 50;
const height_Bird = 35;


const dir_canoTop = "../../resources/FlappyBird/canoTop.png";
const dir_canoBottom = "../../resources/FlappyBird/canoBottom.png";
const x_ini_Cano = 300;
const width_Cano = 52;
const height_Cano_Top = 242;
const height_Cano_Bottom = 378;

const aux_ger_canos = 240;
const espaco = 115;


function main()
{
	var canvas = document.getElementById("myCanvas");
	var ctx = canvas.getContext("2d");
	var spArray;

	var canvas_instructions = document.getElementById("instructionsCanvas");
	var ctx_instructions =  canvas_instructions.getContext("2d");

	var canvas_pontuacao = document.getElementById("pontuacaoCanvas");
	var ctx_pontuacao = canvas_pontuacao.getContext("2d");

	var inst = document.getElementById("instructions");

	canvas.addEventListener("initend", initEndHandler);
	init(ctx, ctx_instructions);  //carregar todos os componentes

	//funções locais para gestão de eventos
	function initEndHandler(ev)
	{
		console.log("entrei");
		var btn_jogar = document.getElementById("button-jogar");
		var btn_instructions = document.getElementById("button-instructions");
		var btn_continuar = document.getElementById("button-continuar");
		var btn_desistir = document.getElementById("button-desistir");
		var btn_voltar = document.getElementById("button-voltar");


		

		spArray = ev.spArray;
		var GE = new GameEngine(spArray,ctx,ctx_pontuacao);
		btn_jogar.onclick = function(){
			btn_jogar.style.visibility = 'hidden';
			btn_instructions.style.visibility = 'hidden';
			GE.startAnim();
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

		btn_continuar.onclick = function(){
			btn_continuar.style.visibility = 'hidden';
			btn_desistir.style.visibility = 'hidden';
			GE.sec = 3;
			GE.startAnim();
		};

		btn_desistir.onclick = function(){
			GE.fim("PERDEU");
		}

		document.addEventListener("keydown",function(ev){
			key_pressed(ev,btn_continuar,btn_desistir,GE);
		});	
	}
}



//init: carregamento de componentes
function init(ctx)
{
	var nLoad = 0;
	var totLoad = 3;
	var spArray = new Array(totLoad);
	var img;




	var y_ini_canoTop = Math.floor(Math.random()*240)-240;
	var y_ini_canoBottom = y_ini_canoTop+espaco+240;

	//carregar imagens e criar sprites
	var bird = new Image(); 
	bird.addEventListener("load", imgLoadedHandler);
	bird.id="bird";
	bird.src = dir_img_Bird;  //dá ordem de carregamento da imagem

	var canoTop = new Image(); 
	canoTop.addEventListener("load", function(ev){
		imgLoadedHandler(ev,y_ini_canoTop);
	});
	canoTop.id="canoTop";
	canoTop.src = dir_canoTop;  //dá ordem de carregamento da imagem

	var canoBottom = new Image(); 
	canoBottom.addEventListener("load", function(ev){
		imgLoadedHandler(ev,y_ini_canoBottom);
	});
	canoBottom.id="canoBottom";
	canoBottom.src = dir_canoBottom;  //dá ordem de carregamento da imagem

	function imgLoadedHandler(ev,y_ini_cano)
	{
		var img = ev.target;
		var nw = img.naturalWidth;
		var nh = img.naturalHeight;
		if(img.id == "bird"){
			var sp = new Passaro(x_Bird,y_ini_Bird, width_Bird, height_Bird, img, dir_aud_Bird);
			spArray[0] = sp;
		}
		else if(img.id == "canoTop"){
			var sp = new Cano(x_ini_Cano, y_ini_cano, width_Cano, height_Cano_Top, img);
			spArray[1] = sp;
		}
		else{
			var sp = new Cano(x_ini_Cano, y_ini_cano, width_Cano, height_Cano_Bottom, img);
			spArray[2] = sp;
		}

		nLoad++;		

		if (nLoad == totLoad)
		{
			var ev2 = new Event("initend");
			ev2.spArray = spArray;
			ctx.canvas.dispatchEvent(ev2);
		}
	}	
}

function key_pressed(ev,btn_continuar,btn_desistir,ge)
{
	if(ev.keyCode == 80){ //80 -> P		
		window.cancelAnimationFrame(ge.reqID);
		btn_continuar.style.visibility = 'visible';
		btn_desistir.style.visibility = 'visible';
	}
}