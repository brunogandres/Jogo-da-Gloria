class GameEngine
{

	constructor(spArray, ctx)
	{
		this.spArray = spArray;
		this.ctx = ctx;
		this.cria_alvo = 0;
		this.alvos_restantes = 15;
		this.miss_shots = -1;
		this.id_setInterval = null;
		this.sec = 3;
		document.addEventListener("click",this.shoot.bind(this));

		var cw = this.ctx.canvas.width;
		var ch = this.ctx.canvas.height;
		var gradient = this.ctx.createLinearGradient(0, 0, cw, 0);
		gradient.addColorStop("0","white");
		gradient.addColorStop("1.0", "blue");
		
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
		//this.draw();


		var txt = ""+this.sec;

		

		if(this.sec==0)
		{
			clearInterval(this.id_setInterval);
			this.miss_shots = -1;
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

		if(this.cria_alvo > 100)
		{
			this.spArray[0].x = this.get_pos(canvas_width-50-this.spArray[0].width,x_min);
	        this.spArray[0].y = this.get_pos(canvas_height-50-this.spArray[0].height,y_min);
	        this.cria_alvo = 0;
		}

		this.desenha_alvos_restantes();
		this.desenha_miss_shots();


		this.cria_alvo++;


		this.verifica_fim();
		this.draw();

	}

	get_pos(max,min)
	{
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}

	shoot(ev)
	{
		if (this.spArray[0].mouseOverBoundingBox(ev))
	    {
	        console.log("ACERTOU");
	        this.spArray[0].x = this.get_pos(canvas_width-50-this.spArray[0].width,x_min);
	        this.spArray[0].y = this.get_pos(canvas_height-50-this.spArray[0].height,y_min);
	   		this.alvos_restantes--;
	        this.cria_alvo = 0;
	    }

	    else
	    {
	    	this.miss_shots++;
	    	console.log("NÃO ACERTOU");
	    }

	}

	desenha_alvos_restantes()
	{
		for(let i=1; i<this.alvos_restantes+1; i++)
		{
			let x = i*40+i*5;
			let y = 30;
			let raio = 20;
			this.ctx.fillStyle = "green"; 
			this.ctx.beginPath();
			this.ctx.arc(x, y, raio, 0, 2*Math.PI);
			this.ctx.stroke();
			this.ctx.fill();	
		}
	}

	desenha_miss_shots()
	{
		for(let i=1; i<this.miss_shots+1; i++)
		{
			let x = i*40+i*5-20;
			let y = 60;
			let tam = 40;
			this.ctx.strokeStyle = "red";
			this.ctx.beginPath();
			this.ctx.moveTo(x, y);
			this.ctx.lineTo(x+tam, y+tam);

			this.ctx.moveTo(x, y+tam);
			this.ctx.lineTo(x+tam, y);
			this.ctx.stroke();
		}
	}

	fim(msg)
	{
		window.cancelAnimationFrame(this.reqID);
		parent.window.postMessage(msg,'*');		
	}

	verifica_fim(reqID)
	{
		if(this.miss_shots >= 3)
		{
			console.log("nao sucedido");
			this.fim("nao sucedido");
		}
		else
		{
			if(this.alvos_restantes == 0)
			{
				console.log("sucedido");
				this.fim("sucedido");
			}
		}
	}

}