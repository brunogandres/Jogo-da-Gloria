"use strict";



(function()
{
	//automatically called as soon as the javascript is loaded
    window.addEventListener("load", main);
}());



function main(){

	window.parent.postMessage("iframe: aberto", "*");

	var players=[];


	var canvas = document.getElementById("canvas");
	var ctx = canvas.getContext("2d");

	
	canvas.width= window.innerWidth;
	canvas.height= window.innerHeight;

	var spArray = new Array(players.length);

	var response = function(ev)
	{
		responseHandler(ev, ctx, players, spArray)
	}
	window.addEventListener("message", response);


	canvas.addEventListener("initend", function(ev){
		var spArray = ev.spArray;
		for(var i=0; i< spArray.length; i++){ 
			console.log("voltou ao inicio");
			spArray[i].draw(ctx);
		}
		console.log("desenhos iniciais done");
		
	});



}
	
function init(ctx,players, spArray)
{

	var count=0;

	switch(players.length){
		case 4:
			var aux3= new Image();
			aux3.addEventListener("load", imgLoadedHandler);
			aux3.id= 3;
			aux3.src = "../../resources/characters/" + players[3][0] +".png";  //dá ordem de carregamento da imagem
		case 3:
			var aux2= new Image();
			aux2.addEventListener("load", imgLoadedHandler);
			aux2.id= 2;
			aux2.src = "../../resources/characters/" + players[2][0] +".png";  //dá ordem de carregamento da imagem
		case 2:
			var aux1= new Image();
			aux1.addEventListener("load", imgLoadedHandler);
			aux1.id= 1;
			aux1.src = "../../resources/characters/" + players[1][0] +".png";  //dá ordem de carregamento da imagem
		case 1:
			var aux0= new Image();
			aux0.addEventListener("load", imgLoadedHandler);
			aux0.id= 0;
			aux0.src = "../../resources/characters/" + players[0][0] +".png";  //dá ordem de carregamento da imagem
			break;
		default: console.log(" algum erro na criacao das imagens");
	}


	function imgLoadedHandler(ev)
	{
		//
		// por agora
		// posicao = 0,0 mas recebe valor de 0 a 24 que é o tabuleiro
		//
		var img = ev.target;
		var p = parseInt(img.id);
		var posicao= players[p][1];
		var sp = new SpriteImage(posicao, p , 40, 40, img );
		spArray[p] = sp;
		count+=1;
				

		if (count == spArray.length)
		{
			var ev2 = new Event("initend");
			ev2.spArray = spArray;
			ctx.canvas.dispatchEvent(ev2);
			
		}

	}
	
	
}



function responseHandler(ev,ctx, players, spArray)
{
	console.log("frame got message: " + ev.data);

	if( ev.data=="acabou"){
		init(ctx,players,spArray); //carregar todos os componentes
	}
	else{
		var aux= String(ev.data);
		var info= aux.split(",");
		var aux2= parseInt(info[2]);

		if (info.length==3){
						
			players.push( [ info[1] , aux2  ]  );
		}
		else{ // info.length== 2

			//
			// animacao
			//
			var message;
			var aux3= parseInt(info[0]);
			var aux4= parseInt(info[1]);
			animationBoard(aux3, aux4, ctx, players, spArray );
			// envia pro main no iframehandler!!!!
			if (aux4 >0) message= "iframe: animacao inicial";
			else message= "iframe: animacao nao sucedido";
			//window.parent.postMessage(message, "*");


		}
		
			
	}

}



function animationBoard(current, value, ctx, players, spArray){
	console.log("animacao do jogador "+ current + "com o valor " + value);
	console.log(players);
	console.log("CURRENT--> " +current );
	console.log("posicao jogador --> "+players[current].position);
	var positivo= -1;
	var atual = 0;
	if (value>0) 
		positivo=1;
	console.log("POSICAO "+players[current][1]);
	

	var i=0;
	function aux(){	
		console.log("POSICAO "+ players[current][1]);
		if (players[current][1]>=11 && players[current][1]<19)
			positivo=-1;
		else
			positivo = 1;
		if(i==value){
			clearInterval(id);
			window.parent.postMessage("iframe: animacao inicial","*");
		}
		else
		{
			players[current][1]+= 1;
			var xy = spArray[current].posicaotoxy(players[current][1], current);

			if (positivo==1){
				//console.log("CHAMEI FORWARD");
				animFW(ctx, spArray,current, xy);
			}
			else {
				//console.log("CHAMEI BACKWARD");
				animBW(ctx,spArray,current, xy);
			}
		}
		i++;
	}

	var id = setInterval(aux,2000);

	/*for (var i=0; i< value; i++){
		if (players[current][1]>=11)
			positivo=-1;
		players[current][1]+= 1;
		var xy = spArray[current].posicaotoxy(players[current][1], current);
		console.log("positivo"+positivo);
		if (positivo==1)animFW(ctx, spArray,current, xy);
		else animBW(ctx,spArray,current, xy);

	}
	window.parent.postMessage("iframe: animacao inicial","*");*/

}



function animFW(ctx,spArray,current, xy)
{	
	var p = spArray[current];
	for (var i=0; i< spArray.length; i++) 
		if (i!= current) 
			spArray[i].draw(ctx);	

	p.forward(ctx, xy);
			
	if(xy[0] <= p.xy[0] &&  xy[1]<=p.xy[1]) {
		window.cancelAnimationFrame(p.forward);

	}
	else
	{
		var al = function(time)
		{
			animFW(ctx, spArray,current, xy);
		}
		window.requestAnimationFrame(al);
	}	

}


function animBW(ctx,spArray,current, xy)
{	
	var p = spArray[current];
	for (var i=0; i< spArray.length; i++) 
		if (i!= current) 
			spArray[i].draw(ctx);	

	p.backwards(ctx, xy);
			
	if(xy[0] >= p.xy[0] &&  xy[1]>=p.xy[1]) {
		window.cancelAnimationFrame(p.backwards);
	}
	else
	{
		var al = function(time)
		{
			animBW(ctx,spArray,current, xy);
		}
		window.requestAnimationFrame(al);
	}	

}
















