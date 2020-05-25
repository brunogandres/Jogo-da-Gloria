"use strict";


const max= 20;
const diceFolder = "../../resources/dice/dice";

var parametros;

var btn;
var current = -1;

(function()
{
	//automatically called as soon as the javascript is loaded
	window.addEventListener("load", main);
}());



function main(){
	
	var board= new Board();
	btn = document.getElementById("playBtn");
	var btnPlay = function(ev)
	{
		console.log("click");
		btnPlayHandler(ev,board);

	}
	var popup = function(ev)
	{
		popupmessageHandler(ev, board, popup);
	}

	btn.addEventListener("click", btnPlay);
	window.addEventListener("message", popup);

	var num_imagem = 1;
	var dir_imagem

	var btn_credits = document.getElementById("creditsBtn");
	var btn_ajuda = document.getElementById("helpBtn");
	var btn_voltar = document.getElementById("button-voltar");
	var btn_next = document.getElementById("button-next");
	var btn_previous = document.getElementById("button-previous");
	var canvasAjuda = document.getElementById("canvasAjuda");

	btn_ajuda.onclick = function(){
		dir_imagem = "url(../../resources/menuJogo/ajuda"+num_imagem+".png)";
		btn_ajuda.style.visibility = "hidden";
		btn.style.visibility = "hidden";
		btn_credits.style.visibility = "hidden";

		canvasAjuda.style.visibility = "visible";
		canvasAjuda.style.background = dir_imagem;
		btn_voltar.style.visibility = "visible";
		btn_next.style.visibility = "visible";
	}

	btn_next.onclick = function(){
		num_imagem++;
		if (num_imagem > 1)
			btn_previous.style.visibility = "visible";
		if (num_imagem == 4)
			btn_next.style.visibility = "hidden";
		dir_imagem = "url(../../resources/menuJogo/ajuda"+num_imagem+".png)";
		canvasAjuda.style.background = dir_imagem;
	}

	btn_previous.onclick = function(){
		num_imagem--;
		if (num_imagem == 1)
			btn_previous.style.visibility = "hidden";
		if (num_imagem < 4)
			btn_next.style.visibility = "visible";
		dir_imagem = "url(../../resources/menuJogo/ajuda"+num_imagem+".png)";
		canvasAjuda.style.background = dir_imagem;
	}

	btn_voltar.onclick = function(){
		btn_ajuda.style.visibility = "visible";
		btn.style.visibility = "visible";
		btn_credits.style.visibility = "visible";

		canvasAjuda.style.visibility = "hidden";
		btn_voltar.style.visibility = "hidden";
		btn_next.style.visibility = "hidden";
		btn_previous.style.visibility = "hidden";
	}








	// handler das mensagens provenientes do popup

}

function popupmessageHandler(ev,board,popup)
{
		var aux= String(ev.data);
		if(aux== "acabou"){
			init(board);
			window.removeEventListener("message", popup);
			window.removeEventListener("message", popupmessageHandler);
			//console.log("eliminou o pop up e ENTROU NO INIT")
		}
		else
		{
			var info= aux.split(",");
			board.addPlayer(info);

		}	
			
}




function init(board){
	//var current = -1;
	startGame(board);

	var iframeh = function(ev)
	{
		iframeHandler(ev,board)
	}
	window.addEventListener("message", iframeh);

}

// **************************************************************
//
//
//                 centro do jogo aqui
//
//
// **************************************************************


function iframeHandler(ev, board, value){
	switch(ev.data){

		case "iframe: aberto":
			//console.log("novo iframe -> boardgame");
			// enviar todas as personagens pra desenhar
		
			for (var i=0; i< board.totalplayers; i++) sendIframe( i + "," + board.players[i].character + "," + String(board.players[i].position));
		
			sendIframe("acabou");
			break;
		case "iframe: animacao inicial":
			if (current==-1) 
				current=0;
			//console.log("no handler"+ current);
			newGame(board);
			break;
		case "iframe: animacao nao sucedido":
			//console.log(current);
			startGame(board);
			break;
		
		case "nao sucedido":
			//console.log("entrei");
			//console.log("Game handler from iframe: " + ev.data);
			changeIframe('../html/boardgame.html', board);
		
			board.players[current].position -= board.value;
			sendIframe(current+ "," + -board.value);


			// apenas pra debug
			board.value=0;

			startGame(board);
			// animacao do tabuleiro
			break;
		case "sucedido":
			//console.log("Game handler from iframe: " + ev.data);
			changeIframe('../html/boardgame.html', board);
			//console.log("minijogo sucedido");
			// verificar se já acabou o jogo

			if (board.players[current].position>= board.end){

				
				var newWindow = window.open("fim.html", "_self");
				//console.log("O JOGADOR "+ board.players[current].name + " GHEGOU AO FIM!!!!")
					//*************************************************************************** */
					//*************************************************************************** */
					//*************************************************************************** */	
					// terminar com os rollup dos creditos que leve de volta ao html inicial maybe
					//*************************************************************************** */
					//*************************************************************************** */
					//*************************************************************************** */
					//*************************************************************************** */
					//*************************************************************************** */
									
			}
			else 
				startGame(board);
					
			break;
					
		default:
			//console.log("ocorreu algum erro, a informacao deveria estar a chegar ao main.js");
			
		
	}
	

	//console.log("iframeeee current"+ current );
	//console.log( "board"+ board);
	//if(current>=0)
	// console.log( "\n: "+ board.players[current].name);

}



function startGame(board)
{
	changeIframe("boardgame");
	console.log("CURRENTE ANTES"+current);
	editCurrent(board);
	console.log("CURRENT DEPOIS"+current);
	//console.log("STARTGAME current"+ current );
	//console.log( "board"+ board);
	//console.log( "name "+ board.players[current].name);

	//console.log("main: novo jogador comecou o jogo");

	//var btn = document.getElementById("playBtn");
	btn.disabled = false;
	var dice = document.getElementById("dice");
	dice.src="";	
	dice.src= diceFolder + ".gif";

	/*var btnPlay = function(ev)
	{
		console.log("click");
		btnPlayHandler(ev,current,board);

	}

	
	btn.addEventListener("click", btnPlay);*/

	//.addEventListener("click", btnPlayHandler);

}


function btnPlayHandler(ev, board)
{
	console.log("CURRENT NO HANDLER"+current);
	ev.target.disabled=true;

	var value = Math.floor( Math.random() * 6) + 1 ; // random entre 1 e 6
	//console.log("btnplay para o jogador " + current + " com dado= "+ value);
	dice.src="";
	dice.src= diceFolder + String(value) + ".png";

	board.players[current].position+= value;
	// auxiliar a seguir;
	board.value= value;

	sendIframe(current+ "," + value);
	// animacao do tabuleiro

	//console.log("btnplay current"+ current + "\nboard"+ board+ "\n: "+ board.players[current].name);
	
}

function newGame(board){
	//
	// selecionar o minijogo
	//
	var aux= board.getMiniGame(board.players[current].position);
	changeIframe(board.getMiniGame(board.players[current].position), board);

}



function sendIframe(message)
{
	var iframe = document.getElementsByTagName("iframe")[0];
	iframe.contentWindow.postMessage( message, "*");
	//console.log("mensagem enviada pro iframe"+ message);

}


function changeIframe(type){
	var iframe = document.getElementsByTagName("iframe")[0];
	iframe.src="";
	if (type=='boardgame'){
		iframe.src='../html/boardgame.html' ;
	}
	else iframe.src= type;
	

}



//funcao auxiliar para mudar de jogador
function editCurrent( board){
	
	var texto = document.getElementById("current");
	if((current>=0) || current < board.totalplayers) 
		current +=1;
	else current = 0; // inclui aqui o -1 inicial
	if(board.totalplayers==1)
		current = 0;
	if(current == board.totalplayers)
		current = 0;
	console.log("CURRENT NO EDIT--> "+current);
	if ( board.players[current].skipcount> 0 ){
		// se o jogador esta em espera, a vez é passa e retira-se 1 "volta"
		// nota: se esta a espera nao vai nunca aparecer no next!!!
		board.players[current].skipcount -=1;
		editCurrent(board)
		return ;
	}

	else
	{
		texto.innerHTML= "";
		texto.innerText= board.players[current].name;
		
		// editar o next
		var next = document.getElementById("next");
		var str=[];
		var n = current;
		if (board.totalplayers==1)
			str.push("apenas um jogador");
		else{
			var last;
			if (current==0) 
				last = board.totalplayers -1;
			else
				last = current-1;


			while (n!= last){
				if((n>=0) && n < board.totalplayers -1 ) 
					n += 1;
				else 
					n = 0;

				if ( board.players[n].skipcount == 0 ){
					// nota: se esta a espera nao vai nunca aparecer no next!!!
					str.push(board.players[n].name);
						
				}
				// else nothing
	
					
			}
			if (str.length==0) str.push("estão todos à espera da proxima volta");
			str = str.join('\n\n');
	
		}
		
		next.innerHTML= "";
		next.innerText= str;
	}

}







	




