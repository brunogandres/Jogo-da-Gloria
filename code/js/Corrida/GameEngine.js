

class GameEngine
{

	constructor(spArray, ctx)
	{
		this.spArray = spArray;
		this.ctx = ctx;		
		this.audio = new Audio(dir_audio);
		this.sec = 3;
		this.id_setInterval = null; 
	}

	timer()
	{
		var cw = this.ctx.canvas.width;
		var ch = this.ctx.canvas.height;
		var aux_audio = new Audio('../../resources/Corrida/beep.mp3');

		this.ctx.clearRect(0,0,cw,ch);
		this.draw();


		var txt = ""+this.sec;

		this.ctx.textAlign = "center";
		this.ctx.font = "Bold 100px Pixel";


		var gradient = this.ctx.createLinearGradient(0, 0, cw, 0);
		gradient.addColorStop("0","grey");
		gradient.addColorStop("1.0", "red");
		// Fill with gradient
		this.ctx.fillStyle = gradient;
		

		if(this.sec==0)
		{
			clearInterval(this.id_setInterval);
			this.animLoop();
			this.audio.play();
		}
		else
		{
			this.ctx.fillText(txt,cw/2,ch/2);
			aux_audio.play();
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
		
		var reqID = window.requestAnimationFrame(()=>this.animLoop());
		this.render(reqID);
		
	}


	render(reqID)
	{
		var cw = this.ctx.canvas.width;
		var ch = this.ctx.canvas.height;


		var aux_vel1 = Math.floor((Math.random()*(2-0+1))+0);
		var aux_vel2 = Math.floor((Math.random()*(2-0+1))+0);

		this.verifica_fim(reqID);

		this.ctx.clearRect(0,0,cw,ch);

		if (this.spArray[2].checkRetangulo(this.spArray[1])==true)
		{
			if(this.spArray[2].checkcollision(this.spArray[1])==true)
			{
				this.spArray[2].velocidade = 1;
				aux_vel1 = 0;
			}

			else
				this.spArray[2].velocidade = 3;
		}

		if (this.spArray[3].checkRetangulo(this.spArray[1])==true)
		{
			if(this.spArray[3].checkcollision(this.spArray[1])==true)
			{
				this.spArray[3].velocidade = 1;
				aux_vel2 = 0;
			}
			
			else
				this.spArray[3].velocidade = 3;
		}

		if (this.spArray[2].checkRetangulo(this.spArray[3])==true)
		{
			if(this.spArray[2].checkcollision(this.spArray[3])==true)
			{
				this.spArray[2].velocidade = 1;
				this.spArray[3].velocidade = 1;
			}

			else
			{
				this.spArray[1].velocidade = 3;
				this.spArray[2].velocidade = 3;
			}
		}

		
		if(this.spArray[2].estados[left] == true && this.spArray[2].x >= 3)
			this.spArray[2].x-=this.spArray[2].velocidade;
		if(this.spArray[2].estados[up] == true  && this.spArray[2].y >= 3)
			this.spArray[2].y-=this.spArray[2].velocidade + aux_vel1;
		if(this.spArray[2].estados[down] == true && this.spArray[2].y <= ch-height_carro-3)
			this.spArray[2].y+=this.spArray[2].velocidade + aux_vel1;
		if(this.spArray[2].estados[right] == true && this.spArray[2].x <= cw-width_carro-3)
			this.spArray[2].x+=this.spArray[2].velocidade + aux_vel1;


		
		if(this.spArray[3].estados[left] == true && this.spArray[3].x >= 3)
			this.spArray[3].x-=this.spArray[3].velocidade;
		if(this.spArray[3].estados[up] == true  && this.spArray[3].y >= 3)
			this.spArray[3].y-=this.spArray[3].velocidade + aux_vel2;
		if(this.spArray[3].estados[down] == true && this.spArray[3].y <= ch-height_carro-3)
			this.spArray[3].y+=this.spArray[3].velocidade + aux_vel2;
		if(this.spArray[3].estados[right] == true && this.spArray[3].x <= cw-width_carro-3)
			this.spArray[3].x+=this.spArray[3].velocidade + aux_vel2;



		this.draw();
	}



	verifica_fim(reqID)
	{
		if (this.spArray[2].checkRetangulo(this.spArray[0])==true)
		{
			if(this.spArray[2].checkcollision(this.spArray[0])==true)//ganhou o adversario
			{
				this.fim(reqID,"nao sucedido");
			}
		}

		if (this.spArray[3].checkRetangulo(this.spArray[0])==true)
		{
			if(this.spArray[3].checkcollision(this.spArray[0])==true)
			{
				this.fim(reqID,"sucedido");
			}
		}
	}

	fim(reqID,msg)
	{
		window.cancelAnimationFrame(reqID);
		parent.window.postMessage(msg,'*');
		console.log(msg);

	}

}