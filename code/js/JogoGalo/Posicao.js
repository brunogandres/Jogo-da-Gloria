"use strict";

class Posicao
{

	constructor(){
		this.estado = 0; //0 para livre      1 para ocupado
		this.equipa = -1; //-1 para SEM EQUIPA        0 para CIRCULO          1 para CRUZ
	}

	atualiza(equipa){
		this.estado = 1;
		this.equipa = equipa;
	}

}