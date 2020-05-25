"use strict";


const linha = 20;
const coluna = 10;
const area = 20;
const setaBaixo = 40;
const setaCima = 38;
const setaDireita = 39;
const setaEsquerda = 37;
const escape = 27;
const espaco = 32;
const OBJETIVO = 1500;



var piece;
var audio

(function()
{
	//automatically called as soon as the javascript is loaded
	window.addEventListener("load", main);
}());



function main(){

    var canvas = document.getElementById("myCanvas");
    var ctx = canvas.getContext("2d");

    var canvasPontos = document.getElementById("canvasPontos");
    var ctxPontos = canvasPontos.getContext("2d");

    var canvasPausa = document.getElementById("canvasPausa");
    var ctxPausa = canvasPausa.getContext("2d");

    var canvasLinhas = document.getElementById("canvasLinhas");
    var ctxLinhas = canvasLinhas.getContext("2d");

    var canvasAjuda = document.getElementById("canvasAjuda");
    var ctxAjuda = canvasAjuda.getContext("2d");

    var volumeslider = document.getElementById('volumeslider');


    var btn = document.getElementById("button-jogar");
    var btnVoltar = document.getElementById("button-voltar");
    var btnAjuda = document.getElementById("button-Ajuda");
    var btnSair = document.getElementById("button-Sair");
    var btnOk = document.getElementById("button-Ok");



    var matriz = new Matriz(ctx,"BLACK", OBJETIVO);
    matriz.preecheMatriz();
    var GE = new GameEngine(matriz, ctx,ctxPontos, ctxPausa, ctxLinhas,ctxAjuda ,canvas, canvasPontos, canvasPausa, canvasLinhas, canvasAjuda);


    btn.onclick = function(){
        console.log("entrou no jogar");
        btn.style.visibility = "hidden";
        canvasPausa.style.visibility = "hidden";
        GE.init();
    }
        
    btnVoltar.onclick = function(){
        btnVoltar.style.visibility = 'hidden';
        btnAjuda.style.visibility = 'hidden';
        btnSair.style.visibility = 'hidden';
        canvasPausa.style.visibility = "hidden";
            
        GE.sec = 3;

        GE.startAnim();
    }

    btnAjuda.onclick = function(){
        btnVoltar.style.visibility = 'hidden';
        btnAjuda.style.visibility = 'hidden';
        btnSair.style.visibility = 'hidden';
        canvasPausa.style.visibility = "hidden";
        canvasPontos.style.visibility = "hidden";
        canvasLinhas.style.visibility = "hidden";
        canvasAjuda.style.visibility = "visible";
        btnOk.style.visibility = 'visible';


    }
    btnOk.onclick = function(){
        canvasAjuda.style.visibility = "hidden";
        btnOk.style.visibility = 'hidden';
        btnVoltar.style.visibility = 'visible';
        btnAjuda.style.visibility = 'visible';
        btnSair.style.visibility = 'visible';
        canvasPausa.style.visibility = "visible";
        canvasPontos.style.visibility = "visible";
        canvasLinhas.style.visibility = "visible";


    }


    btnSair.onclick = function(){
        GE.fim("PERDEU");
    }

    document.addEventListener("keydown", function(ev){
        evento(ev, GE, btn, btnVoltar, btnAjuda, btnSair,btnOk, canvasPausa, ctxPausa);
    });


}

function evento(event, GE, btn, btnVoltar, btnAjuda, btnSair, btnOk, canvasPausa, ctxPausa){
    var verificaFim;
    if(event.keyCode == setaBaixo){
        GE.animLoop();
        
    }
    
    if(event.keyCode == setaDireita){
        GE.direita();

    }

    if(event.keyCode == setaEsquerda){
        GE.esquerda();
    }
    if(event.keyCode == setaCima){
        GE.cima();
        
    }

    if(event.keyCode == escape){

        canvasPausa.style.visibility = "visible";
        ctxPausa.font = "50px Pixel";
        ctxPausa.fillStyle = "WHITE";
        ctxPausa.fillText("Pausa", 23, 55);
        btnVoltar.style.visibility = 'visible';
        btnAjuda.style.visibility = "visible";
        btnSair.style.visibility = "visible";
        GE.stopAnim();

        
    }
}
