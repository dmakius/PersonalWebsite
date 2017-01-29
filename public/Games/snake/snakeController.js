
//touch screen controllers 
document.getElementById("downBtn").addEventListener("touchstart", function(){
	d = "down";
});
document.getElementById("upBtn").addEventListener("touchstart", function(){
	d = "up";
});
document.getElementById("rightBtn").addEventListener("touchstart", function(){
	d = "right";
});
document.getElementById("leftBtn").addEventListener("touchstart", function(){
	d = "left";
});

document.getElementById("startText").innerHTML = 'Pause';

//pause button
document.getElementById("startBtn").addEventListener("click", function(){
	var btn = document.getElementById("startText");
	if(pause == false){
		pause = true;
		btn.innerHTML = "Resume";
	}else if(pause ==true){
		pause = false;
		btn.innerHTML = "Pause";
	}	
	
});
