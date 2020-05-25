    class Peca{
    //peca em maiuscula
    

	constructor(tipo, cor, ctx){
        this.tipo = tipo;
        this.forma = tipo[0];
        this.cor = cor;
        this.area = 20;
        this.ctx = ctx;
        this.col = 10;
        this.lin = 20;
        this.ind = 0;
        this.completas = [];
        this.x = 4;
        this.y = -3;
    }

    preenche(){
        for(let i = 0; i < this.forma.length; i++){
            for(let j = 0; j < this.forma.length; j++){
                if(this.forma[j][i] != 0){
                    this.ctx.fillStyle = this.cor;
                    //this.ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
                    this.ctx.fillRect((this.x + i) * this.area ,(this.y + j) * this.area,this.area,this.area);

                    //this.ctx.strokeStyle = this.cor;
                    //this.ctx.strokeRect((this.x + i)*this.area ,(this.y + j) * this.area,this.area,this.area);
                }
            }
        }
    }

    substitui(){
        for(let i = 0; i < this.forma.length; i++){
            for(let j = 0; j < this.forma.length; j++){
                if( this.forma[j][i] != 0){
                    
                    //this.ctx.fillStyle = "WHITE";
                    this.ctx.fillStyle = "BLACK";
                    this.ctx.fillRect((this.x + i) * this.area ,(this.y + j) * this.area,this.area,this.area);
                    //this.ctx.strokeStyle = "BLACK";
                    //this.ctx.strokeStyle = "WHITE";
                    //this.ctx.strokeRect((this.x + i)*this.area ,(this.y + j) * this.area,this.area,this.area);
                    //this.ctx.fillRect((this.x + i)*this.area ,(this.y + j) * this.area,this.area,this.area);

                    //matriz[j][i] = "0";
                }
            }
        }
    }

    verificaColisao(x,y,matriz, forma){
        for(let i = 0; i < forma[0].length; i++){
            
            for(let j = 0; j <forma[0].length; j++){
                if(forma[i][j] == 0){
                    continue;
                }
                
                let X = this.x + j + x;
                let Y = this.y + i + y;
                //console.log(Y,X);
                if(Y>= this.lin || X>= this.col || X < 0){
                    console.log("fora da arena");
                    return true;
                }

                if (Y < 0){
                    continue;
                }
                if(matriz.matriz[Y][X] != "BLACK"){
                    console.log("colidiu com outra peça");
                    return true;
                }
            }

        }
        //console.log("-----");
        return false;
        
    }

    

    direita(matriz){
        if(!this.verificaColisao(1, 0, matriz, this.forma)){
            this.substitui();
            this.x++;
            this.preenche();
        }
    }
    esquerda(matriz){
        if(!this.verificaColisao(-1, 0, matriz, this.forma)){
            this.substitui();
            this.x--;
            this.preenche();
        }

    }

    desce(matriz){
            this.substitui();
            this.y++;
            this.preenche();
            

    }
 
    rotacao(matriz){
        let tamanho = this.tipo.length;
        let proximaForma = 0;
        let colisao = 0;
        if(tamanho > 1){
            if(this.ind + 1 >= tamanho){
                this.ind = 0
                proximaForma = this.tipo[this.ind];
                
            }
            else{
                this.ind = this.ind+1;
                proximaForma = this.tipo[this.ind];
            }
            
            if(this.verificaColisao(0,0, matriz, proximaForma)){
                if(this.x > this.col/2){    
                    colisao = -1;
                }
                else{
                    colisao = 1;
                }
            }
            if(!this.verificaColisao(colisao,0, matriz, proximaForma)){
                this.substitui();
                this.x += colisao;
                this.forma = proximaForma;
                this.preenche();
            }   
        else{
            this.substitui();
            this.forma = this.tipo[0];
            this.preenche();
            }
        }
    }


    bloqueia(matriz){
        for(let i = 0;i < this.forma.length; i++){
            for(let j = 0; j < this.forma.length;j++){
                if(this.y + i < 0){
                    return 1;
                    //console.log("Perdeste");
                    //console.log(matriz.gameOver);
                    
                }
                if(this.forma[i][j] != 0){
                    matriz.matriz[this.y+i][this.x+j] = this.cor;
                }

            }
        }


    }

}