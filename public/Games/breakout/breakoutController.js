
//on screen buttons
document.getElementById("rightBtn").addEventListener("touchstart", function(){
	movingRight = true;
});
document.getElementById("rightBtn").addEventListener("touchend", function(){
	movingRight = false;
});

document.getElementById("leftBtn").addEventListener("touchstart", function(){
	movingLeft = true;
});
document.getElementById("leftBtn").addEventListener("touchend", function(){
	movingLeft = false;
});

document.getElementById("startText").innerHTML = "Pause";

//pause buttons
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