var y = 10; // altura inicial y0=10%, debe leerse al iniciar si queremos que tenga alturas diferentes dependiendo del dispositivo
var v = 0;
var g = 5.622;
var a = g;
var dt = 0.016683;
var timer = null;
var fueltimer = null;
var fuel = 50;
var fuelminimo = 0;
var alturamax = 75;

window.onload = function(){
    document.getElementById("showm").onclick = function () {
		document.getElementsByClassName("c")[0].style.display = "block";
		stop();
	}
	document.getElementById("hidem").onclick = function () {
		document.getElementsByClassName("c")[0].style.display = "none";
		start();
	}
	//Empezar a mover nave
	start();
	
	//Funciones del motor//
	document.onkeydown = motorOn;
	document.onkeyup = motorOff;
	
	document.onclick = function(){
		if(a==g){
			motorOn();
		}else{
			motorOff();
		}
	}
}

function motorOn(){
	if(fueltimer==null && fuel>0){
	fueltimer=setInterval (function(){ restarFuel();}, 100)
	a = -g;
	document.getElementById("naveimg").src = "img/naveencendida.png"
	}
}

function motorOff(){
	clearInterval(fueltimer);
	fueltimer=null;
	a = g;
	document.getElementById("naveimg").src = "img/naveapagada.png";
}

function restarFuel(){
	if(fuel>fuelminimo){
		fuel -=1;
	}else{
		motorOff();
		}
}

function start(){
	timer=setInterval(function(){ moverNave(); }, dt*1000);
}

function stop(){
	clearInterval(timer);
}

function moverNave(){
	v +=a*dt;
	document.getElementById("velocidad").innerHTML=v.toFixed(2);
	y +=v*dt;
	document.getElementById("altura").innerHTML=alturamax-y.toFixed(2);
	document.getElementById("fuel").innerHTML=fuel;
	
	//mover hasta que top sea un 70% de la pantalla
	if (y<alturamax){ 
		document.getElementById("nave").style.top = y+"%";
		
	} else { 
		fuel = 0;
		stop();
			if(v>5 || y <= 0){
				document.getElementById("naveimg").src = "img/explosion.gif"
				alert("GAME OVER")
				window.location.href='index.html';
			}else{
				alert("YOU WIN THIS TIME!")
				window.location.href='index.html';
			}
	}



} 









