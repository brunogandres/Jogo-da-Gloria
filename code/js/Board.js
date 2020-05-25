class Board
{
	constructor()
	{
        this.value=0;
        this.totalplayers=0;
        this.players= [];
        this.vencedor = null;
        this.end= 23;
        this.start= 0;
        this.minijogos = ["Corrida","FlappyBird","Tetris","ChromeDinossaur","JogoGalo","PointClick","Memoria"];

        
        this.startposition= [0, 0, 100];
        // x, y, tamanho de cada posicao no tabuleiro
			
    }


    addPlayer(info)
    {
        var p= new Player(info[0], info[1])
        this.players.push(p);
        this.totalplayers += 1;
    }

    getMiniGame(value){
        var str;
        var ind = Math.floor(Math.random() * (this.minijogos.length-1 - 0 + 1)) + 0;
        console.log(ind);
        str = this.minijogos[ind];
        /*switch(value){
            
            case 1: case 4: case 5: case 6: case 7:
            
            case 8: case 9: case 10:case 12: case 13:
            
            case 11: case 2: case 3: case 14:  case 16: 
            
            case 18: case 19: case 20: case 15:
            
            
            case 21: case 22: case 23:case 17:
                str="Corrida";
                break;


        }*/
        console.log("MINIJOGO " + str);
        return ""+str+  ".html";
    }


    
}

