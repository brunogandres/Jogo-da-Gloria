"use strict";

class Cacto extends SpriteImage{

	constructor(x, y, width, height, img){

		super(x,y,width,height,img);
		this.avanco = 8;

	}


	avanca(){

		this.x -= this.avanco;

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

}