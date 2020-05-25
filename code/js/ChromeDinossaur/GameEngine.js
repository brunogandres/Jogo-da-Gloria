

class GameEngine
{

	constructor(spArray, ctx)
	{
		this.spArray = spArray;
		this.ctx = ctx;
		this.cria_cacto = false;
		this.toca_imagem = 1;
		this.points = 0;
		this.audio = new Audio(audio_fundo);
		this.sec = 3;
		this.id_setInterval = null;
		this.reqID = null;

		var cw = this.ctx.canvas.width;
		var ch = this.ctx.canvas.height;
		var gradient = this.ctx.createLinearGradient(0, 0, cw, 0);
		gradient.addColorStop("0","grey");
		gradient.addColorStop("1.0", "white");
		
		this.ctx.textAlign = "center";
		this.ctx.font = "Bold 100px Pixel";
		this.ctx.fillStyle = gradient;
		
	}

	timer()
	{
		var cw = this.ctx.canvas.width;
		var ch = this.ctx.canvas.height;
		var aux_audio = new Audio('../../resources/Corrida/beep.mp3');

		this.ctx.clearRect(0,0,cw,ch);
		this.draw();


		var txt = ""+this.sec;

		

		if(this.sec==0)
		{
			clearInterval(this.id_setInterval);
			this.animLoop();
			this.audio.play();	
		}
		else
		{
			this.ctx.fillText(txt,cw/2,ch/2);
		}
		this.sec--;
	}

	startAnim()
	{
		this.id_setInterval = setInterval(this.timer.bind(this),1000);	
		
	}


	draw()
	{
		for(let i=0; i<this.spArray.length; i++)
		{
			this.spArray[i].draw(this.ctx);
		}
	}



	animLoop()
	{
		
		this.reqID = window.requestAnimationFrame(()=>this.animLoop());
		this.render();
		
	}


	render()
	{
		var cw = this.ctx.canvas.width;
		var ch = this.ctx.canvas.height;

		this.ctx.clearRect(0,0,cw,ch);


		if (this.cria_cacto==false)
		{
			if(this.spArray[1].x<-60)
			{
				this.points++;
				this.cria_cacto = true;
			}
		}

		else
		{
			this.cria_cacto=false;
			this.spArray[1].x = x_ini_Cacto;
			this.spArray[1].avanco = Math.floor((Math.random()*(8-6+1))+6);

		}


		this.spArray[1].avanca();



		if (this.spArray[0].estado==down && this.spArray[0].y < y_ini_Dinossaur)
		{
			this.spArray[0].desce();
		}

		else
		{
			if(this.spArray[0].aux_subir<20)//15 é o numero de frames em que ele sobe
			{
				this.spArray[0].sobe();
				this.spArray[0].aux_subir++;
			}
			else{
				this.spArray[0].estado=down;
			}

		}


		if (this.spArray[0].checkRetangulo(this.spArray[1])==true)
		{
			if(this.spArray[0].checkcollision(this.spArray[1])==true)
			{

				/*this.spArray[0].gravidade=0;
				this.spArray[1].avanco=0;
				this.spArray[2].avanco=0;*/
				
				this.fim();

			}
		}

		if(this.toca_imagem % 5 == 0)
			this.spArray[0].troca_imagem();

		this.toca_imagem++;



		var txt = "" + this.points;
		this.ctx.fillText(txt, this.ctx.canvas.width/2, this.ctx.canvas.height);

		this.draw();
	}

	fim()
	{
		this.audio.pause();
		var audio_aux = new Audio("../../resources/ChromeDinossaur/dor.mp3");
		audio_aux.play();
		window.cancelAnimationFrame(this.reqID);
		if (this.points > 10)//GANHOU
		{
			parent.window.postMessage("sucedido",'*');
			console.log("GANHOU");
		}
		else
		{
			parent.window.postMessage("nao sucedido",'*');
			console.log("PERDEU");
		}
	}

}