"use strict";

class SpriteImage
{
	constructor(posicao, p, w, h, img)
	{
        // para o desenho
        // cada bloco é o do tabuleiro
        // p é o numero do jogador para eles nao se sobreporem
        // this init é a posicao 0 no tabuleiro
        this.block= 90;
        this.passo= 15;
        this.init= [175,5];
        this.posicao = posicao;
        var xy= this.posicaotoxy(posicao, p);
		//posição e movimento
		this.xy = xy;
		this.width = Math.round(w);
        this.height = Math.round(h);
        

		//imagem
		this.img = img;		

		
	}

	draw(ctx)
	{
        //console.log ("desenho do sprite na posicao"+ this.posicao + " coordenadas"+ this.xy[0]+ ","+ this.xy[1]);
		ctx.drawImage(this.img, this.xy[0], this.xy[1], this.width, this.height);
	}

    clear(ctx)
	{
		ctx.clearRect(this.xy[0], this.xy[1], this.width, this.height);
	}	



	posicaotoxy(posicao,p){
        var x= this.init[0];
        var y= this.init[1];
        var positions=[];
        for ( var i=0 ; i < posicao; i++ )
        {
            switch(i){
                case 1: case 2: case 3: case 4: case 5: case 19: case 20: case 21: 
                    y+=this.block;  
                    break;
                case 6: case 7: case 8: case 9: case 10: case 22:
                    console.log("CHEGUEI AO 6");
                    x+= this.block;
                    break;
                case 11: case 12: case 13: case 14: case 15:
                    console.log("CHEGUEI AO 11");
                    y-= this.block;
                    break;
                case 16: case 17: case 18:
                    x-= this.block;
                    break;
                case 23:
                    //"META"
                    x+= this.block /2;
                    break;
                case 0:
                    y+=this.block /2 +10;
                          
            }
        }

        if (posicao==0) x-= (p)*50;
        
        else
        {
            if (posicao <24){
            // para nao se subreporem
            if(p == 1 || p == 3) x+= 50;
            if(p == 2 || p == 3 ) y+= 50;
            }

        }
        

    return [x,y];
    }

    //resedenho, actualizações, ...
    forward(ctx, xy)
    {

        this.clear(ctx);

        if (this.xy[0] < xy[0]) this.xy[0] += 1;
        else
        {
            if (this.xy[1] < xy[1]) this.xy[1] += 1;
            else{
                window.cancelAnimationFrame(this.render);
            }
        
        }

        this.draw(ctx);

        
    }

    backwards(ctx, xy)
    {
        this.clear(ctx);

        if (this.xy[1] > xy[1]) 
            this.xy[1] -= 1;
        else
        {
            if (this.xy[0] > xy[0]) this.xy[0] -= 1;
            else{
                window.cancelAnimationFrame(this.render);
            }
        
        }

        this.draw(ctx);

        
    }


}
