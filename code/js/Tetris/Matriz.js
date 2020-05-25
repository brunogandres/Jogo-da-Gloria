class Matriz{

    constructor(ctx, cor, objetivo){
        this.matriz = [];
        this.ctx = ctx;
        this.col = 10;
        this.lin = 20;
        this.cor = cor;
        this.area = 20;
        this.totaldeLinhas = 0;
        this.linhasCompletas = [];
        this.numeroDeLinhasCompletas = 0;    
        this.guardada = 0;
        this.score = 0;
        this.gameOver = false;
        this.objetivo = objetivo;

    }

    preecheMatriz(){
        for(let i = 0; i < linha; i++){
            this.matriz[i] = [];
            for(let j = 0; j < coluna; j++){
                this.matriz[i][j] = "BLACK";
            }   
        }
        return this.matriz;
    }
    
    desenhaQuadrado(x,y,cor){
        this.ctx.lineWidth = 1;
        this.ctx.fillStyle = cor;
        //ctx.fillStyle = "rgba(255, 255, 255, 0)";
        this.ctx.fillRect(y*area,x*area,area,area);
        
        //ctx.strokeStyle = "WHITE";
        //ctx.strokeRect(y*area,x*area,area,area);
    }
    
    desenhaMatriz(){
        for(let i = 0; i < linha; i++){
            for(let j = 0; j < coluna; j++){
                this.desenhaQuadrado(i,j, this.matriz[i][j]);
            }
        }
    
    }
    
    verificaLinhaCompleta(){

        for(let linha = 0; linha < this.lin; linha++){
            let contador = 0;
            for(let coluna = 0; coluna < this.col; coluna++){
                if(this.matriz[linha][coluna] != "BLACK"){
                    contador++;
                }
            }
            if(contador == this.col){//linha completa

                this.numeroDeLinhasCompletas++;
                this.totaldeLinhas++;
                this.linhasCompletas.push(linha);
                console.log("LINHA COMPLETA");
            }
        }

    }


    eliminaLinhaCompleta(){
        for(let k = 0; k < this.linhasCompletas.length; k++){
            this.score+=100;
            for(let linha = this.linhasCompletas[k]; linha > 1; linha--){
                for(let coluna = 0; coluna < this.col; coluna++){
                    this.matriz[linha][coluna] = this.matriz[linha-1][coluna];
                    

                }
            }
        }
        this.linhasCompletas = [];

        
        for(let col = 0; col < this.col; col++){
            this.matriz[0][col] = "BLACK";
        }
        this.desenhaMatriz();
    }

    
}