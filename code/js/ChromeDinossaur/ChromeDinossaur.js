"use strict";

(function()
{
	//automatically called as soon as the javascript is loaded
	window.addEventListener("load", main);
}());


const audio_fundo = "../../resources/ChromeDinossaur/audio.mp3";

const dir_img_Dinossaur1 = "../../resources/ChromeDinossaur/Dinossauro1.png";
const dir_img_Dinossaur2 = "../../resources/ChromeDinossaur/Dinossauro2.png";

const x_Dinossaur = 75;
const width_Dinossaur = 90;
const height_Dinossaur = 75;
const y_ini_Dinossaur = 550-150-height_Dinossaur;


const dir_CactoTop = "../../resources/ChromeDinossaur/Cacto.png";
const x_ini_Cacto = 750;

const width_Cacto = 50;
const height_Cacto = 100;
const y_Cacto = 550-150-height_Cacto;

const aux_ger_Cactos = 240;
const espaco = 115;

function main()
{
	var canvas = document.getElementById("myCanvas");
	var ctx = canvas.getContext("2d");
	var spArray;

	var canvas_instructions = document.getElementById("instructionsCanvas");
	var ctx_instructions =  canvas_instructions.getContext("2d");

	var inst = document.getElementById("instructions");

	canvas.addEventListener("initend", initEndHandler);
	init(ctx);  //carregar todos os componentes

	//funções locais para gestão de eventos
	function initEndHandler(ev)
	{
		var btn_jogar = document.getElementById("button-jogar");
		var btn_instructions = document.getElementById("button-instructions");
		var btn_continuar = document.getElementById("button-continuar");
		var btn_desistir = document.getElementById("button-desistir");
		var btn_voltar = document.getElementById("button-voltar");

		spArray = ev.spArray;
		var GE = new GameEngine(spArray,ctx);
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
	var totLoad = 2;
	var spArray = new Array(totLoad);
	var img;


	ctx.fillStyle = "#999999";
	ctx.font = "30px helvetica";	
	ctx.textBaseline = "bottom"; 
	ctx.textAlign = "center";



	//carregar imagens e criar sprites
	var dinossaur1 = new Image(); 
	dinossaur1.addEventListener("load", imgLoadedHandler);
	dinossaur1.id="Dinossaur1";
	dinossaur1.src = dir_img_Dinossaur1;  //dá ordem de carregamento da imagem

	var dinossaur2 = new Image(); 
	dinossaur2.addEventListener("load", imgLoadedHandler);
	dinossaur2.id="Dinossaur2";
	dinossaur2.src = dir_img_Dinossaur2;  //dá ordem de carregamento da imagem



	var cacto = new Image(); 
	cacto.addEventListener("load", imgLoadedHandler);
	cacto.id="Cacto";
	cacto.src = dir_CactoTop;  //dá ordem de carregamento da imagem


	function imgLoadedHandler(ev,y_ini_Cacto)
	{
		var img = ev.target;
		var nw = img.naturalWidth;
		var nh = img.naturalHeight;
		if(img.id == "Dinossaur1"){
			var sp = new Dinossauro(x_Dinossaur,y_ini_Dinossaur, width_Dinossaur, height_Dinossaur, img);
			spArray[0] = sp;
		}

		else if(img.id == "Dinossaur2"){
			spArray[0].img2 = img;

		}

		else if(img.id == "Cacto"){
			var sp = new Cacto(x_ini_Cacto, y_Cacto, width_Cacto, height_Cacto, img);
			spArray[1] = sp;
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