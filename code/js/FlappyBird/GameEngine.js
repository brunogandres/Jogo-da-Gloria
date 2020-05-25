class GameEngine
{

	constructor(spArray, ctx, ctx_pontuacao)
	{
		this.spArray = spArray;
		this.ctx = ctx;
		this.ctx_pontuacao = ctx_pontuacao;
		this.cria_canos = false;
		this.points = 0;
		this.sec = 3;
		this.id_setInterval = null;
		this.reqID = null;


		var cw = this.ctx.canvas.width;
		var ch = this.ctx.canvas.height;
		var gradient = this.ctx.createLinearGradient(0, 0, cw, 0);
		gradient.addColorStop("0","black");
		gradient.addColorStop("1.0", "white");
		
		this.ctx.textAlign = "center";
		this.ctx.font = "Bold 100px Pixel";
		this.ctx.fillStyle = gradient;
		this.ctx_pontuacao.textAlign = "center";
		this.ctx_pontuacao.font = "Bold 50px Pixel";
		this.ctx_pontuacao.fillStyle = gradient;

		
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
		this.ctx_pontuacao.clearRect(0,0,200,200);

		if (this.cria_canos==false)
		{
			if(this.spArray[1].x==-22)
			{
				this.points++;
				this.cria_canos = true;
			}
		}

		else
		{
			this.cria_canos=false;
			var y_canoTop = Math.floor(Math.random()*aux_ger_canos)-aux_ger_canos;
			var y_canoBottom = y_canoTop+espaco+aux_ger_canos;
			this.spArray[1].x = x_ini_Cano;
			this.spArray[2].x = x_ini_Cano;
			this.spArray[1].y = y_canoTop;
			this.spArray[2].y = y_canoBottom;
		}

		for(let i=0; i<2; i++)
		{
			this.spArray[1].avanca();
			this.spArray[2].avanca();
		}

		if (this.spArray[0].estado==false)
		{
			this.spArray[0].desce();
		}

		else
		{
			if(this.spArray[0].aux_subir<15)//15 é o numero de frames em que ele sobe
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
				
				this.verifica_fim();

			}
		}
		if (this.spArray[0].checkRetangulo(this.spArray[2])==true)
		{
			if(this.spArray[0].checkcollision(this.spArray[2])==true)
			{
				/*this.spArray[0].gravidade=0;
				this.spArray[1].avanco=0;
				this.spArray[2].avanco=0;*/
				this.verifica_fim();
			}
		}

		var txt = "" + this.points;
		var obj = "10";
		this.ctx_pontuacao.fillText(txt, this.ctx_pontuacao.canvas.width/2, 95);
		this.ctx_pontuacao.fillText(obj, this.ctx_pontuacao.canvas.width/2, 170);

		this.draw();
	}

	verifica_fim()
	{
		if (this.points > 10)//GANHOU
		{
			this.fim("sucedido");
		}
		else
		{
			this.fim("nao sucedido");
		}
	}

	fim(msg)
	{
		window.cancelAnimationFrame(this.reqID);
		parent.window.postMessage(msg,'*');
		console.log(msg);
		
	}


}