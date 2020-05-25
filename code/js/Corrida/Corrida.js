"use strict";

(function()
{
	//automatically called as soon as the javascript is loaded
	window.addEventListener("load", main);
}());

const dir_img_meta = "../../resources/Corrida/meta.png";
const dir_img_pista = "../../resources/Corrida/pista.png";
const dir_img_carro1 = "../../resources/Corrida/carro1.png";
const dir_img_carro2 = "../../resources/Corrida/carro2.png";
const dir_audio = "../../resources/Corrida/song.mp3";

const height_carro = 30;
const width_carro = 50;
const x_ini_carro = 0;
const y_ini_carro1 = 235;
const y_ini_carro2 = 285;


const x_pista = 0;
const y_pista = 0;
const height_pista = 550;
const width_pista = 750;

const x_meta = 750-40;
const y_meta = 227;
const height_meta = 100;
const width_meta = 40;

const left = 0;
const up = 1;
const down = 2;
const right = 3;

const id_arrow_left = 37;
const id_arrow_up = 38;
const id_arrow_down = 40;
const id_arrow_right = 39;

const id_a = 65;
const id_w = 87;
const id_s = 83;
const id_d = 68;


function main()
{
	var canvas = document.getElementById("myCanvas");
	var ctx = canvas.getContext("2d");
	var spArray;

	var canvas_instructions = document.getElementById("instructionsCanvas");
	var ctx_instructions =  canvas_instructions.getContext("2d");

	canvas.addEventListener("initend", initEndHandler);
	init(ctx);  //carregar todos os componentes

	//funções locais para gestão de eventos
	function initEndHandler(ev)
	{
		var btn_jogar = document.getElementById("button-jogar");
		var btn_instructions = document.getElementById("button-instructions");
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
		//iniciar a animação		
	}
}



//init: carregamento de componentes
function init(ctx)
{
	var nLoad = 0;
	var totLoad = 3;
	var spArray = new Array(totLoad);
	var img;


	ctx.fillStyle = "#999999";
	ctx.font = "30px helvetica";	
	ctx.textBaseline = "bottom"; 
	ctx.textAlign = "center";



	//carregar imagens e criar sprites

	var meta = new Image(); 
	meta.addEventListener("load", imgLoadedHandler);
	meta.id="meta";
	meta.src = dir_img_meta;  //dá ordem de carregamento da imagem

	var pista = new Image(); 
	pista.addEventListener("load", imgLoadedHandler);
	pista.id="pista";
	pista.src = dir_img_pista;  //dá ordem de carregamento da imagem


	var carro1 = new Image(); 
	carro1.addEventListener("load", imgLoadedHandler);
	carro1.id="carro1";
	carro1.src = dir_img_carro1;  //dá ordem de carregamento da imagem



	var carro2 = new Image(); 
	carro2.addEventListener("load", imgLoadedHandler);
	carro2.id="carro2";
	carro2.src = dir_img_carro2;  //dá ordem de carregamento da imagem


	function imgLoadedHandler(ev)
	{
		var img = ev.target;
		var nw = img.naturalWidth;
		var nh = img.naturalHeight;

		if(img.id == "pista"){
			var sp = new SpriteImage(x_pista, y_pista, width_pista, height_pista, img);
			spArray[1] = sp;
		}

		else if(img.id == "carro1"){
			var sp = new Carro(x_ini_carro, y_ini_carro1, width_carro, height_carro, 1, img);
			spArray[2] = sp;

		}

		else if(img.id == "carro2"){
			var sp = new Carro(x_ini_carro, y_ini_carro2, width_carro, height_carro, 2, img);
			spArray[3] = sp;
		}

		else if(img.id == "meta"){
			var sp = new SpriteImage(x_meta,y_meta,width_meta,height_meta,img);
			spArray[0] = sp;
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