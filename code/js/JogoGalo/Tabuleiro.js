"use strict";

class Tabuleiro
{

	constructor(posicoes, ctx){
		this.posicoes = posicoes;
		this.ctx = ctx;
		this.equipa_Atual = 0; // 0 para CIRCULO     1 para CRUZ
		this.vencedor = -1;//-1 sem vencedor    0 CIRCULO      1 CRUZ
		this.num_Jogadas = 0;
		this.desenha_tabuleiro();
	}

	desenha_tabuleiro()
	{
		this.ctx.strokeStyle = "#FFFFFF";
		this.ctx.lineWidth = 5;
		for(let i=1; i<3; i++){
			this.ctx.beginPath();
			this.ctx.moveTo(i*tam_celula, 10);
			this.ctx.lineTo(i*tam_celula, 530);
			this.ctx.stroke();
		}

		for(let i=1; i<3; i++){
			this.ctx.beginPath();
			this.ctx.moveTo(10, i*tam_celula);
			this.ctx.lineTo(530, i*tam_celula);
			this.ctx.stroke();
		}
	}

	atualiza_Posicoes(pos_I, pos_J)
	{


		if(this.posicoes[pos_I][pos_J].estado == 0){ //SE POSICAO LIVRE

			this.num_Jogadas++;
			this.posicoes[pos_I][pos_J].atualiza(this.equipa_Atual); //OCUPA A POSICAO
			
			if(this.equipa_Atual == 0){

				this.desenha_Circulo(pos_I, pos_J);
				this.equipa_Atual = 1;

			}
			else{

				this.desenha_Cruz(pos_I, pos_J);
				this.equipa_Atual = 0;

			}
			if(this.num_Jogadas==9){
				console.log("entrei");
				this.verifica_fim();
			}
			this.verifica_Vencedor();
		}

		console.log(this.num_Jogadas);
		

	}

	desenha_Circulo(pos_I, pos_J)
	{

		var x = pos_J*tam_celula+100;
		var y = pos_I*tam_celula+100;

		this.ctx.lineWidth = 10;
		this.ctx.strokeStyle = "#FF0000";
		this.ctx.beginPath();
		this.ctx.arc(x, y, tam_circulo, 0, 2*Math.PI);
		this.ctx.stroke();

	}

	desenha_Cruz(pos_I, pos_J)
	{

		var x = pos_J*tam_celula+37.5;
		var y = pos_I*tam_celula+37.5;

		this.ctx.lineWidth = 10;
		this.ctx.strokeStyle = "#0000FF";

		this.ctx.beginPath();
		this.ctx.moveTo(x, y);
		this.ctx.lineTo(x+tam_cruz, y+tam_cruz);

		this.ctx.moveTo(x, y+tam_cruz);
		this.ctx.lineTo(x+tam_cruz, y);
		this.ctx.stroke();

	}

	verifica_Vencedor()
	{
		for(let i=0; i<3; i++){
			if(this.posicoes[i][0].equipa==this.posicoes[i][1].equipa && this.posicoes[i][1].equipa==this.posicoes[i][2].equipa && this.posicoes[i][0].equipa!=-1){
				this.vencedor = this.posicoes[i][0].equipa;
				this.verifica_fim();
				console.log("UMA EQUIPA GANHOU");
				return;
			}
		}

		for(let i=0; i<3; i++){
			if(this.posicoes[0][i].equipa==this.posicoes[1][i].equipa && this.posicoes[1][i].equipa==this.posicoes[2][i].equipa && this.posicoes[0][i].equipa!=-1){
				this.vencedor = this.posicoes[0][i].equipa;
				this.verifica_fim();
				console.log("UMA EQUIPA GANHOU");
				return;
			}
		}

		if(this.posicoes[0][0].equipa==this.posicoes[1][1].equipa && this.posicoes[1][1].equipa==this.posicoes[2][2].equipa && this.posicoes[1][1].equipa!=-1){
			this.vencedor = this.posicoes[1][1].equipa;
			this.verifica_fim();
			console.log("UMA EQUIPA GANHOU");
			return;
		}

		if(this.posicoes[2][0].equipa==this.posicoes[1][1].equipa && this.posicoes[1][1].equipa==this.posicoes[0][2].equipa && this.posicoes[1][1].equipa!=-1){
			this.vencedor = this.posicoes[1][1].equipa;
			this.verifica_fim();
			console.log("UMA EQUIPA GANHOU");
			return;
		}

	}

	verifica_fim(){
		if(this.vencedor == 0)
		{
			this.fim("sucedido");
		}
		else{
			this.fim("nao sucedido");
		}
	}

	fim(msg)
	{
		console.log(msg);
		parent.window.postMessage(msg,'*');		
	}


}