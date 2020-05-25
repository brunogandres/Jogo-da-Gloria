"use strict"

const down=false;
const up=true;

class Passaro extends SpriteImage{



	constructor(x, y, width, height, img, som){

		super(x,y,width,height,img);

		this.gravidade = 1;
		this.aux_subir = 100;
		this.estado=down;
		//carrega audio
		this.som = new Audio();
		this.som.addEventListener("load", carrega_aud)
		this.som.src = som;
		function carrega_aud(ev){

		}

		//this.canvasEscondida = this.getCanvasEscondida(this.img);

		this.levitar = 30;
		document.addEventListener("keydown",this.key_pressed.bind(this));
	}




	key_pressed(ev)
	{
		if(ev.keyCode == 38){
		
			this.aux_subir = 0;
			this.estado = up;
			this.som.play();

		}

		if(ev.keyCode == 40){
		
			this.desce();
			this.desce();
			this.desce();

		}
	}


	sobe(){
		this.y -= 2*this.gravidade;
		
	}

	desce(){

		this.y += this.gravidade;

	}
}