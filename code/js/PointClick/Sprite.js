"use strict";

class SpriteImage
{
	constructor(x, y, w, h, img)
	{
		//posição e movimento
		this.xIni = x;
		this.yIni = y;
		this.x = x;
		this.y = y;
		this.width = Math.round(w);
		this.height = Math.round(h);

		//imagem
		this.img = img;		

		this.canvasEscondida = this.getCanvasEscondida(img);	
		
	}


	draw(ctx)
	{
		ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
	}


	clear(ctx)
	{
		ctx.clearRect(this.x, this.y, this.width, this.height);
	}	


	reset(ev, ctx)
	{
		this.clear(ctx);
		this.x = this.xIni;
		this.y = this.yIni;
		this.clickable = this.clickableIni;
	}


	mouseOverBoundingBox(ev) //ev.target é a canvas
	{
		var mx = ev.offsetX;  //mx, my = mouseX, mouseY na canvas
		var my = ev.offsetY;

		var img_X =	Math.round(mx-this.x);  //img_X e Y são o as coordenadas do click na imagem
		var img_Y = Math.round(my-this.y);
		//console.log("x            "+img_X);
		//console.log("y            "+img_Y);

		
		//console.log(opacidade);
		if (mx >= this.x && mx <= this.x + this.width && my >= this.y && my <= this.y + this.height){
			var opacidade = this.canvasEscondida.data[4*(img_X+img_Y*this.height)+3];//        data[] e um array do tipo [[r,g,b,opacidade][r,g,b,opacidade]...]     logo 4*(img_X+img_Y) é para irmos para o indice correto +3 pois é este o indice que tem a opacidade
			if(opacidade !=0)
				return true;
			else
				return false;
		}
		else
			return false;
	}


	getCanvasEscondida(img)
	{
		var canvasEscondida = document.createElement("canvas");
		canvasEscondida.width = this.width;
		canvasEscondida.height = this.height;
		var ctx = canvasEscondida.getContext("2d");
		ctx.drawImage(img, 0, 0, this.width, this.height);
		return ctx.getImageData(0,0,canvasEscondida.width, canvasEscondida.height);
	}

	checkRetangulo(turbo){

		if(!(((this.y + this.height) < (turbo.y)) || (this.y > (turbo.y + turbo.height)) || ((this.x + this.width) < turbo.x) || (this.x > (turbo.x + turbo.width)))){
			return true;
		}

	}


	checkcollision(turbo){

		for(let i = Math.max(this.x, turbo.x); i<Math.min(this.x+this.width, turbo.x+turbo.width); i++){
			for(let j = Math.max(this.y,turbo.y); j<Math.min(this.y+this.height, turbo.y+turbo.height);j++){

				var carro_X = Math.round(i-this.x);
				var carro_Y = Math.round(j-this.y);
				var ind_carro = 4*(carro_X+carro_Y*this.width);

				var turbo_X = Math.round(i-turbo.x);
				var turbo_Y = Math.round(j-turbo.y);
				var ind_turbo = 4*(turbo_X+turbo_Y*turbo.width);

				if((this.canvasEscondida.data[ind_carro+3]>0) && (turbo.canvasEscondida.data[ind_turbo+3]>0)){
					return true;
				}
			}
		}

		return false;
	}
}
