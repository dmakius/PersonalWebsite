//onscreen controllers
document.getElementById("rightBtn").addEventListener("touchstart", function(){
    movingRight = true;
});
document.getElementById("rightBtn").addEventListener("touchend", function(){
    movinRight = false;
});

document.getElementById("leftBtn").addEventListener("touchstart", function(){
	movingLeft = true;
});
document.getElementById("leftBtn").addEventListener("touchend", function(){
	movingLeft = false;
});

document.getElementById("shootBtn").addEventListener("touchstart", function(){
	playerJump = true;
});

//pause button
document.getElementById("startBtn").addEventListener("touchstart", function(){
	console.log("START Pressed");
	//console.log(player);
	var btn = document.getElementById("startText");
	 if(pause == false){
	 	pause = true;
	 	btn.innerHTML = "Resume";
	 }else if(pause ==true){
	 	pause = false;
	 	btn.innerHTML = "Pause";
	 }	
	
});
document.getElementById("startText").innerHTML = "Pause";