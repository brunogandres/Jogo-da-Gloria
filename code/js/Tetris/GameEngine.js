class GameEngine
{
    


    constructor(matriz, ctx,ctxPontos, ctxPausa, ctxLinhas,ctxAjuda ,canvas, canvasPontos, canvasPausa, canvasLinhas, canvasAjuda)
	{
        this.matriz = matriz;
        this.piece = null;
        this.ctx = ctx;
        this.ctxPontos = ctxPontos;
        this.ctxPausa = ctxPausa;
        this.canvasPontos = canvasPontos;
        this.canvasPausa = canvasPausa;
        this.canvas = canvas;
        this.ctxLinhas = ctxLinhas;
        this.id_setInterval = null;
        this.id_Automatico = null;
        this.Pecas = [[I, "cyan"], [S, "green"], [Z, "red"], [L, "orange"], [T, "purple"], [J, "blue"], [O, "yellow"]];
        this.sec = 3;

        this.audio = new Audio("../../resources/Tetris/TetrisSound.mp3");
        

        var cw = this.ctx.canvas.width;
        var ch = this.ctx.canvas.height;
        
		
		this.ctx.textAlign = "center";
		this.ctx.font = "Bold 100px Pixel";
        
        

		
    }

    init(){
        
        this.matriz.preecheMatriz();
        this.piece = this.geraPeca();
        this.piece.preenche();
        this.startAnim();

    }


    timer()
	{
		var cw = this.ctx.canvas.width;
		var ch = this.ctx.canvas.height;

        
        this.ctx.clearRect(0,0,cw,ch);
        
        this.matriz.desenhaMatriz();
        this.piece.preenche();

        this.ctx.fillStyle = "WHITE";

		var txt = ""+this.sec;

  
		if(this.sec==0)
		{
            clearInterval(this.id_setInterval);
            this.audio.play();
            this.audio.volume = 0.1;
            this.audio.loop = true;
			this.id_Automatico = setInterval(() => { this.animLoop() }, 500);
		}
		else
		{
			this.ctx.fillText(txt,cw/2,ch/2 +10);
		}
		this.sec--;
    }
    


	startAnim()
	{
        this.id_setInterval = setInterval(this.timer.bind(this),1000);	
    }

    stopAnim(){
        clearInterval(this.id_Automatico);
        this.audio.pause();

    }


    animLoop(){
        var verificaFim2;

        if(!this.piece.verificaColisao(0, 1, this.matriz, this.piece.forma)){
            this.piece.desce(this.matriz);
            this.drawScore();

        }
        else{
            verificaFim2 = this.piece.bloqueia(this.matriz);
            this.matriz.verificaLinhaCompleta();
            this.matriz.eliminaLinhaCompleta();
            this.drawScore();
            this.piece = this.geraPeca();
                    
        }
        if(verificaFim2 == 1){
            this.verifica_fim();
            this.audio.pause();

        }



    }
    desce(){
        this.matriz.score++;
        this.animLoop();
        this.drawScore();
    }

    direita(){
        this.piece.direita(this.matriz);
        this.drawScore();

    }

    esquerda(){
        this.piece.esquerda(this.matriz);
        this.drawScore();
    }

    cima(){
        this.piece.rotacao(this.matriz);
        this.drawScore();
    }


    drawScore() {
        this.ctxPontos.clearRect(0, 0, this.canvasPontos.width, this.canvasPontos.height);
        this.ctxPontos.font = "bold 20pt Pixel";
        this.ctxPontos.fillStyle = "#ffffff";
        this.ctxPontos.fillText(this.matriz.score, 80, 86);
    
    
        this.ctxPontos.font = "bold 34px Pixel";
        this.ctxPontos.fillText(OBJETIVO, 68, 168.5);
    
        this.ctxLinhas.clearRect(0, 0, this.canvasPausa.width, this.canvasPausa.height);
        this.ctxLinhas.font = "bold 20pt Pixel";
        this.ctxLinhas.fillStyle = "#ffffff";
        this.ctxLinhas.fillText(this.matriz.totaldeLinhas, 95, 75);
    
    }

    geraPeca(){
        let variavel = Math.floor(Math.random()*7);

        return new Peca(this.Pecas[variavel][0], this.Pecas[variavel][1], this.ctx);
    }


    verifica_fim()
	{
		if (this.matriz.score >= OBJETIVO)//GANHOU
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