"use strict"



class Carro extends SpriteImage{



	constructor(x, y, width, height, identificador, img){

		super(x,y,width,height,img);
		this.identificador = identificador;
		this.velocidade = 3;
		this.estados = [false,false,false,false];
		document.addEventListener("keydown",this.key_pressed.bind(this));
		document.addEventListener("keyup",this.key_dropped.bind(this));
	}



	key_pressed(ev)
	{
		if(this.identificador == 1)//carro do jogador adversário
		{
			if(ev.keyCode==id_arrow_left)
				this.estados[left] = true;
			if(ev.keyCode==id_arrow_up)
				this.estados[up] = true;
			if(ev.keyCode==id_arrow_down)
				this.estados[down] = true;
			if(ev.keyCode==id_arrow_right)
				this.estados[right] = true;
		}

		else //carro do jogador atual
		{
			if(ev.keyCode==id_a)
				this.estados[left] = true;
			if(ev.keyCode==id_w)
				this.estados[up] = true;
			if(ev.keyCode==id_s)
				this.estados[down] = true;
			if(ev.keyCode==id_d)
				this.estados[right] = true;
		}
	}

	key_dropped(ev)
	{
		if(this.identificador == 1)//carro do jogador adversário
		{
			if(ev.keyCode==id_arrow_left)
				this.estados[left] = false;
			if(ev.keyCode==id_arrow_up)
				this.estados[up] = false;
			if(ev.keyCode==id_arrow_down)
				this.estados[down] = false;
			if(ev.keyCode==id_arrow_right)
				this.estados[right] = false;
		}

		else //carro do jogador atual
		{
			if(ev.keyCode==id_a)
				this.estados[left] = false;
			if(ev.keyCode==id_w)
				this.estados[up] = false;
			if(ev.keyCode==id_s)
				this.estados[down] = false;
			if(ev.keyCode==id_d)
				this.estados[right] = false;
		}
	}	
}