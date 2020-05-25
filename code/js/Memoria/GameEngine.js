class GameEngine
{
    
    constructor()
	{
        
        this.cartas = document.querySelectorAll('.carta');
        this.contador = document.getElementById('moves');
	    this.already = false;
	    this.wait  = false;
        this.primeiraCarta=null;
        this.count=0;
	    this.certos = 0;

		
    }

    init(){
        //suffle das cartas
	    for(var i=0; i< this.cartas.length;i++) this.cartas[i].style.order = Math.floor(Math.random() * 12);
    }


    inside(){
        this.count++;
        this.contador.innerHTML = this.count;
        var str= this.contador.innerHTML;
        if (this.count>12) this.contador.html= str.fontcolor("red");;    
    }


    reset(){

        this.already = false;
	    this.wait  = false;
        this.primeiraCarta=null;
    }

    fim(msg)
	{
		parent.window.postMessage(msg,'*');
		console.log(msg);
		
	}
    




}