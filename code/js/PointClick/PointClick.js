"use strict";

(function()
{
	//automatically called as soon as the javascript is loaded
	window.addEventListener("load", main);
}());


const dir_img_alvo = "../../resources/PointClick/target.png";
const width_alvo = 100;
const height_alvo = 100;
const x_min = 50;
const y_min = 125;
const canvas_width = 750;
const canvas_height = 550;



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
	var totLoad = 1;
	var spArray = new Array(totLoad);
	var img;


	ctx.fillStyle = "#999999";
	ctx.font = "30px helvetica";	
	ctx.textBaseline = "bottom"; 
	ctx.textAlign = "center";

	var pos_x = get_pos(canvas_width-50-width_alvo,x_min);
	var pos_y = get_pos(canvas_height-50-height_alvo,y_min);


	//carregar imagens e criar sprites
	var alvo = new Image(); 
	alvo.addEventListener("load", function(ev){
		imgLoadedHandler(ev,pos_x,pos_y);
	});
	alvo.id="alvo";
	alvo.src = dir_img_alvo;  //dá ordem de carregamento da imagem



	function imgLoadedHandler(ev,x,y)
	{
		var img = ev.target;
		var nw = img.naturalWidth;
		var nh = img.naturalHeight;
		if(img.id == "alvo"){
			var sp = new Alvo(x,y, width_alvo, height_alvo, img);
			spArray[0] = sp;
			console.log("carreguei alvo");
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


function get_pos(max,min)
{
	return Math.floor(Math.random() * (max - min + 1)) + min;
}