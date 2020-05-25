"use strict";

const imgFolder = "../../resources/characters/";
var max= 0;
var players=[];
var characters=[1,2,3,4,5,6];

(function()
{	
	window.addEventListener("load", main);
}());



function main()
{

	window.addEventListener("message", responseHandler);
	
	// esta mensagem faz com que na mainwindow passe de painel inicial para menu
	window.opener.parent.postMessage("aberto", "*");

	

	var btn = document.getElementById("button-next");
	btn.addEventListener("click", btnNextHandler);  //escutar clicks no botão

	//IMAGEM
	var imagem = document.getElementById("img");

	var backBtn =  document.getElementById("backBtn");
	var nextBtn =  document.getElementById("nextBtn");
	
	backBtn.addEventListener("click", function(ev){ nextImg(-1,characters);} );
	nextBtn.addEventListener("click", function(ev){ nextImg(1,characters);} );



}

function responseHandler(ev)
{
	console.log("newplayer: got message: " + ev.data);
	max=ev.data;
	
}


function btnNextHandler(ev)
{
	var texto = document.getElementById("myText").value.toString();

	console.log("tamanho "+ texto.length + " nome: "+ texto);



	if ( (texto.length > 0) && check(texto, players)== true  ){
	
		console.log("entrou no proximo ");
		var imagem=getCurrentImg();
		players.push([texto, imagem]);

		var index = characters.indexOf(imagem);
		if (index > -1) characters.splice(index, 1);
		window.opener.parent.postMessage( texto+ ","+ imagem , "*");
		clearWindow();
		
	}
	else console.log("nome não possivel");
	
}

function check( texto, list){
	console.log("entrou no check");
	if (list.length > 0)
	{
		console.log("a lista ja tem algo");
		for (var i=0; i< list.length ; i++) if (texto == list[i][0]) return false;

	}

	return true;
}

function clearWindow(){
	var title = document.getElementById("titulo");
	var texto = document.getElementById("myText");
	var img = document.getElementById("img");
	texto.value="";
	var number= players.length;

	switch(max-number)
	{

		case 1: 
			var btn= document.getElementById("button-next");
			btn.innerHTML= "Vamos jogar!";

		case 2:
		case 3:
			texto.innerText="";
			title.innerHTML= "Player "+ (number+1);
			img.src= imgFolder + characters[0]+ ".png" ;
			break;

		default:
			var btn= document.getElementById("button-next");
			btn.innerHTML= "Vamos jogar!";
			window.opener.parent.postMessage("acabou", "*");
			window.close();
	}

}

function nextImg(i){

	var current= characters.indexOf(getCurrentImg());
	console.log(current);
	var next;
	if (current + i > characters.length-1) next= 0;
	else{
		if (current + i < 0) next= characters.length-1;

		else{
			next= current+i;
		}

	}

	img.src= imgFolder + characters[next]+ ".png" ;
	
}

function getCurrentImg()
{
	var img = document.getElementById("img");
	var aux= img.src.toString();
	var aux2= aux.split("/");
	var aux3=  parseInt(aux2[aux2.length-1][0]);

	return aux3;
}





function escapeClick(ev, parametros){
	if (ev.keyCode == 27) { //27 é o key code do Escape
		clearInterval(parametros[2]); //para parar o setInterval
		parametros[0] = false;
        atualizaButoes(parametros);
    }
    return parametros;
}


