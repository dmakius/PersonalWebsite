

document.getElementById("startBtn").addEventListener("click", function(){
	var btn = document.getElementById("startText");
	if(gameStart == false){
		startFunction();
		btn.innerHTML = "Pause";
	}else if(pause == false){
		pause = true;
		btn.innerHTML = "Resume";
	}else if(pause ==true){
		pause = false;
		btn.innerHTML = "Pause";
	}	
	
});

document.getElementById("downBtn").addEventListener("touchstart", function(){
	movingDown = true;
});
document.getElementById("downBtn").addEventListener("touchend", function(){
	movingDown = false;
});

document.getElementById("upBtn").addEventListener("touchstart", function(){
	movingUp = true;
});
document.getElementById("upBtn").addEventListener("touchend", function(){
	movingUp = false;
});