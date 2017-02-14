
//onscreen controllers
document.getElementById("rightBtn").addEventListener("touchstart", function(){
	playerMove(1);
});

document.getElementById("leftBtn").addEventListener("touchstart", function(){
	playerMove(-1);
});

document.getElementById("downBtn").addEventListener("touchstart", function(){
	playerDrop(); dropCounter =0;
});

document.getElementById("upBtn").addEventListener("touchstart", function(){
	playerRotate(1);	
});

//pause button
document.getElementById("startBtn").addEventListener("touchstart", function(){
	var btn = document.getElementById("pauseText");
	if(pause == false){
		pause = true;
		btn.innerHTML = "Resume";
	}else if(pause ==true){
		pause = false;
		btn.innerHTML = "Pause";
	}	
	
});
document.getElementById("startText").innerHTML = "Pause";