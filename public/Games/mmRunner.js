var canvas, ctx, WIDTH = 700, HEIGHT = 500;
var keys = []; 
canvas = document.getElementById("myCanvas");
ctx = canvas.getContext("2d");
canvas.width = WIDTH, canvas.height = HEIGHT;
var frame = 0;
var msPerFrame = 100, lastUpdateTime = 0, acDelta = 0;

var gravity = 0.3;

var playerImage = new Image();
playerImage.src = '/images/mmRunner/mm.gif';

var playerJImage = new Image();
playerJImage.src = '/images/mmRunner/mmJump.gif'

var platformImage = new Image();
platformImage.src = '/images/mmRunner/tile1.png';

var player = {
	x:100,
	y:350,
	height:50,
	width:95,
	velY:2,
	speed:3,
	jumping:false,
	grounded:true,
} 

var movingGround = [];

function populateGrount(){
	for(var i = 0; i < 5; i ++){
		var groundTile= {
			width:200,
			height:100,
			x:0,
			y:400,
			
		}
		movingGround.push(groundTile);
	}
}

function _init_(){
	populateGrount();
	for(place in movingGround){
	//	alert(place.width);
	}
	
	mainLoop();
}

function mainLoop(){
	
	var delta = Date.now() - lastUpdateTime;
	if(acDelta >= msPerFrame)
	{
		//set acDelta to 0
		acDelta = 0;
	
		
		drawFrame();
		//alert(frame);
	}
	else
	{
		acDelta += delta;
	}
	updateFrame();
	lastUpdateTime = Date.now();
	window.requestAnimationFrame(mainLoop);
}

function updateFrame(){
	for (tile in movingGround){
		
	}
	
	if(keys[37]){//going right
		player.x -= 3;
	}
	
	if(keys[39]){//going left
		player.x += 3;
	}
	
	if(keys[90]){//jump
		if (player.jumping == false && player.grounded == true){
			player.velY = -player.speed * 3;
			player.jumping = true;
			player.grounded = false;
		}	
	}
	player.velY += gravity;
	
	if(player.y > 350){
		player.grounded = true;
		player.jumping = false;
		player.y = 350;
	}

	if(player.grounded == true){
		player.velY = 0;
	}
	
	player.y += player.velY;
}

function drawFrame(){
	ctx.clearRect(0,0, WIDTH, HEIGHT);
	ctx.fillstyle = 'black';
	ctx.fillRect(0,0, WIDTH, HEIGHT);

	//ctx.fillStyle = "red";
	//ctx.drawImage(platformImage, 0, 0, 200, 100, 100, 400, 400, 200);

	///alert(frame)
	if(player.grounded == false){
		ctx.drawImage(playerJImage, 0, 0, 25, 50, player.x -5, player.y, 100, 100);
	}else{
		ctx.drawImage(playerImage, (frame* 22.7 ), 8, 25 , 50, player.x -15, player.y, 100, 100);
		frame++;
		if(frame >=4){frame = 0};
	}
	
	ctx.fillStyle = "black";
}

_init_();

document.body.addEventListener("keydown", function(e){
	keys[e.keyCode] = true});

document.body.addEventListener("keyup", function(e){
	keys[e.keyCode] = false});

