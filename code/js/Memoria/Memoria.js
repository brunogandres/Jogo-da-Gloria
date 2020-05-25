"use strict";


(function()
{
	//automatically called as soon as the javascript is loaded
	window.addEventListener("load", main);
}());


function main(){

	var GE= new GameEngine();

	GE.init();

	var canvasAjuda = document.getElementById("canvasAjuda");
	var ctxAjuda = document.getElementById("2d");
		  

	var desistirBtn = document.getElementById("desistir");
	var AjudaBtn = document.getElementById("buttonAjuda");
	var VoltarBtn = document.getElementById("buttonVoltar");


	desistirBtn.addEventListener("click", function(ev) { GE.fim("nao sucedido");});

	AjudaBtn.onclick = function(){
		canvasAjuda.style.visibility = "visible";
		VoltarBtn.style.visibility = "visible";
	
	}

	VoltarBtn.onclick = function(){
		VoltarBtn.style.visibility = "hidden";
		canvasAjuda.style.visibility = "hidden";
	
	
	}

	

	var virarCartasaux = function(ev){
		virarCartas(ev,GE);

	}


	for(let i=0; i< GE.cartas.length;i++) {

		GE.cartas[i].addEventListener('click', virarCartasaux);
	}

}


function virarCartas(ev, GE) {
	var selecao= ev.target.closest('.carta');

	// se estiver a espera ou se é a primeira carta selecionada
	
	if(GE.wait == true || selecao == GE.primeiraCarta ){
		return;
	}
	
	selecao.classList.add('virar');


	if( GE.already ) {
		GE.inside();
		
		// se ja esta uma carta selecionada
		if (GE.primeiraCarta.dataset.framework == selecao.dataset.framework){
			{
				console.log("equals");

				setTimeout(function(){
					GE.primeiraCarta.removeEventListener('click', virarCartas);
					selecao.removeEventListener('click', virarCartas);
                    GE.reset();
				}, 1500);
				
				
				GE.certos++;
				console.log("certo");
				if(GE.certos == 6)
				{
					if( GE.count > 12) 
						GE.fim("nao sucedido");
					else 
						GE.fim("nao sucedido");
				
				}
			}
			
		}
		else
        {
			console.log("differente");
            GE.wait  = true;
            setTimeout(function(){
				// se mexer mt rapido pode dar aqui erro
				if(GE.primeiraCarta!=null)
                    GE.primeiraCarta.classList.remove('virar');
                selecao.classList.remove('virar');
                GE.reset();
                }, 1500);
        }
		GE.primeiraCarta.removeEventListener('click', virarCartas);
		selecao.removeEventListener('click', virarCartas);
	}
	else{

		GE.already=true;
		GE.primeiraCarta= selecao;
	}


	return;
	
}


