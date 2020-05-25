"use strict"

const down=false;
const up=true;
const altura_max = 200;

class Dinossauro extends SpriteImage{



	constructor(x, y, width, height, img){

		super(x,y,width,height,img);
		this.img2 = null;
		this.gravidade = 4;
		this.aux_subir = 100;
		this.estado=down;
		//carrega audio


		//this.canvasEscondida = this.getCanvasEscondida(this.img);

		this.levitar = 30;
		document.addEventListener("keydown",this.key_pressed.bind(this));
	}



	key_pressed(ev)
	{
		if(ev.keyCode == 38){
		
			this.aux_subir = 0;
			this.estado = up;

		}

	}


	sobe(){
		this.y -= 2*this.gravidade;
		
	}

	desce(){

		this.y += 2*this.gravidade;

	}

	troca_imagem()
	{
		
		var aux = this.img;
		this.img = this.img2;
		this.img2 = aux;
		this.canvasEscondida = this.getCanvasEscondida(this.img);

	}
}