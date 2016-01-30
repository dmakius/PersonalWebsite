var	HEIGHT = 500, WIDTH = 700, canvas, ctx, stars;
var keys = [], starFeild = [], rockFeild = [], bullets = [], explosions = [], badGuys = [];
var score = 0, life = 40;
var hpBoost = false;
var fFactor = randRange(10,-10); 
//the player object
var player = {
	x:50,
	y:300,
	height:25,
	width:100,
	hit:false,
	alpha:1,
	apear:20,
	dead:false,
}

var hP = {
	x:700,
	y:200,
	speed:6,
	width: 10,
	height:10
}

var playerImage = new Image();
playerImage.src = "_gameImages/ship.jpg"; 

var rockImage = new Image();
rockImage.src = "_gameImages/rock.jpg";

var explosionImage = new Image();
explosionImage.src = "_gameImages/explosion.jpg";

var healthUpImage = new Image();
healthUpImage.src = "_gameImages/healthUp.jpg";

var badGuyImage = new Image();
badGuyImage.src = "_gameImages/bad_guy.jpg";

for(var i = 0; i < 2; i++)
{
	var bullet = new Object;
	bullets.push(bullet);
}

var shootSound = new Audio("_gameSounds/beam.mp3");
var explosionSound = new Audio("_gameSounds/explosion.mp3");
var dieSound = new Audio("_gameSounds/die.mp3");

function _init_(){
	canvas = document.getElementById("myCanvas");
	ctx = canvas.getContext("2d");
	canvas.width = WIDTH;
	canvas.height = HEIGHT;
	
	//the image that goes Over the player object
	createStarFeild();
	createRockFeild();
	mainLoop();
}

function intro(){
	for(var r = 0; r < 1000; r++){
	ctx.fillStyle = "orange";
	ctx.font = "bold 64px Arial";
	ctx.fillText("GAME OVER", 150, canvas.height/2);
}
 introBlock = false;

}

//THE MAIN Loop
function mainLoop(){
	updateFrame();
	drawFrame();
	
	window.requestAnimationFrame(mainLoop);
}

function updateFrame(){
	//moving the player object/image
	
	if(keys[38]){//going up
		player.y -= 5;
	}
	if(keys[40]){//going down
		player.y += 5;
	}
	
	if(keys[37]){//going right
		player.x -= 5;
	}
	
	if(keys[39]){//going left
		player.x += 5;
	}
	if(keys[90]){//going left
		alert(hP.x);
	}
	
	document.onkeydown = onKeyDown;
	document.onkeyup = onKeyUp;
	
	//keeping the player in bounds
	player.x = Math.max(player.x , 0);
	player.x = Math.min(player.x , WIDTH - 100);
	player.y = Math.max(player.y, 0);
	player.y = Math.min(player.y, HEIGHT - 25);
	
	createBadGuys();
	updateBadGuys();
	
	updateStarFeild();
	updateRockFeild();
	updateHP();
	updateBullets();
	
	updateExplosion();
	
	//checking colisions - bullets with Rocks
	for(var i = 1; i < bullets.length; i++){
		for(var j = 1; j < rockFeild.length; j++){
			var collision = checkCollisions(bullets[i], rockFeild[j]);
			if(collision == true)
			{
				bullets.splice(i,1);
				
				var curRock = rockFeild[j];
				score += 100;
				createExplosion(curRock);
				
				rockFeild.splice(j,1);
				newRock();			
			}
		}
	}
	//checking collisions bullets with badGuys
	for(var i = 1; i < bullets.length; i++){
		for(var j = 0; j < badGuys.length; j++){
			var collision = checkCollisions(bullets[i], badGuys[j]);
			if(collision == true)
			{
				bullets.splice(i,1);
				badGuys[j].health -= 10;
				badGuys[j].hit = true;
				
				if(badGuys[j].health <= 0){
					var curBadGuy = badGuys[j];
					createExplosion(curBadGuy);
					score += 500;
					badGuys.splice(j,1);	
				}
				
			}
		}
		}
	
	
	//checking player and HpCollision
	hpBoost = checkCollisions(player, hP);
	if(hpBoost ==  true)
	{
		hpBoost = false;
		hP.x = 900;
		life = 100;
	}
	
	//checking the ship getting hit by rocks
	if(player.dead == false){
	for(var i = 0; i < rockFeild.length; i++){
		var collision = checkCollisions(rockFeild[i], player)
		if(collision == true  && player.hit == false)
		{
			life -= 10;
			player.hit = true;
			
			//player dies
			if(life <= 0)
			{
				dieSound.play();
				life = 0;
				player.dead = true;
				createExplosion(player);
				var rbutton= document.getElementById("rbutton");
				rbutton.style.zIndex  = "300";
			}
		}
	}
	for(var i = 0; i < badGuys.length; i++){
		var collision = checkCollisions(badGuys[i], player)
		if(collision == true  && player.hit == false)
		{
			life -= 25;
			player.hit = true;
			
			//player dies
			if(life <= 0)
			{
				dieSound.play();
				life = 0;
				player.dead = true;
				createExplosion(player);
				var rbutton= document.getElementById("rbutton");
				rbutton.style.zIndex  = "300";
			}
		}
	}
	}
	if(player.hit)
	{
		updatePlayerHit();
	}
		
}

function drawFrame(){
		ctx.clearRect(0,0, canvas.width, canvas.height);
	
		drawStars();
		drawRocks();
		drawBullets();
		drawExplosions();
		drawHp();
		drawBadGuys();
		
		
		//drawing the player	
		if(player.apear % 4 == 0 && player.dead == false){
			ctx.drawImage(playerImage, player.x, player.y);
		}
		
		//drawing the scoreboard
		ctx.fillStyle = "red";
		ctx.font = "bold 24px Arial";
		ctx.fillText("Score: " + score,15, 25);
		ctx.fillText("Health: " + life,550, 25);
		
		if(player.dead == true)
		{
			gameOver();
		}
}

function gameOver(){
	ctx.fillStyle = "orange";
	ctx.font = "bold 64px Arial";
	ctx.fillText("GAME OVER", 150, canvas.height/2);
	player.x = -500;
	life = 0;
}

function checkCollisions(object1, object2){
	var vectorX = (object1.x + object1.width/2) - (object2.x + object2.width/2);
	var vectorY = (object1.y + object1.height/2) - (object2.y + object2.height/2);

	var hHeight = (object1.height/2) + (object2.height/2);
	var hWidth = (object1.width/2) + (object2.width/2);
	
	collision = false;
	
	//check for a collision
	if((Math.abs(vectorX) <= hWidth) && (Math.abs(vectorY) <= hHeight))
	{
		return collision = true;
	}
}
function updatePlayerHit(){
	player.alpha -= 0.033;
	player.apear -= 1;

	if(player.alpha <= 0)
	{
		player.alpha = 1;
		player.apear = 20;
		player.hit = false;
	}
}

//creating, moving, and updating the rock feild
function createRockFeild(){
	for (var i = 0; i < 20; i++)
	{
		var rock = new Object();
		rock.x = randRange(900, 1550);
		rock.y = randRange(0, 450);
		rock.width = 25;
		rock.height = 50;
		rockFeild.push(rock);
	}
}
function newRock(){
	var rock = new Object();
	rock.x = randRange(900, 1550);
	rock.y = randRange(0, 450);
	rock.width = 25;
	rock.height = 60;
	rockFeild.push(rock);
}
function updateRockFeild(){
	for(var i = 1; i < rockFeild.length; i++)
	{
		var curRock = rockFeild[i];
		curRock.x -= 3;
		
		if(curRock.x < -50){
			curRock.x = randRange(700,750);
			curRock.y = randRange(0,450);
		}
	}
}
function drawRocks(){
	for(var i = 1; i< rockFeild.length; i++)
	{
		ctx.drawImage(rockImage , rockFeild[i].x, rockFeild[i].y);
	}
}

//creating and moving the star feild
function createStarFeild(){
	for(var i = 0; i < 500; i ++)
	{
		var star = new Object();
		star.x = randRange(0,700);
		star.y = randRange(0,500);
		starFeild.push(star);
	}
}
function updateStarFeild(){
	for (var i = 0; i < starFeild.length; ++i)
	{
		//moves the star down the canvas
		var curStar = starFeild[i];
		curStar.x -= 1;
		
		//creates a new star at a random location
		if(curStar.x < 0)
		{
			curStar.x = randRange(700, 750);
			curStar.y = randRange(0, 500);
		}
		
	}
}
function drawStars(){
	
	for(var i = 1; i < starFeild.length; i++)
	{
		ctx.fillStyle = "white";
		ctx.fillRect(starFeild[i].x,starFeild[i].y, 2,2);
	}
}

//bullets
function doFire(){
	if(player.dead == false)
	{
	if(bullets.length < 6){
		var bullet = new Object;
		bullet.x = player.x + 100;
		bullet.y = player.y + 20;
		bullet.height = 5;
		bullet.width = 5;
		bullets.splice(1, 0, bullet);
		shootSound.play();
	}
	}
}
function updateBullets(){
	for(var i = 0; i < bullets.length; i ++)
	{
		var curBullet = bullets[i];
		curBullet.x += 4;
		if(curBullet.x >= canvas.width)
		{
			bullets.splice(i,1);
		}
	}
	
}
function drawBullets(){
	for(var i = 0; i < bullets.length; i ++){
		var curBullet = bullets[i];
		ctx.fillStyle = "orange";
		ctx.beginPath();
		ctx.arc(curBullet.x,curBullet.y, 5, 10, 2,Math.PI, false);
		ctx.fill();
		ctx.lineWidth = 1;
		ctx.stroke();
	}
}

//explosions
function createExplosion(curRock){
	var explosion = new Object();
	explosionSound.play();
	explosion.x = curRock.x;
	explosion.y = curRock.y;
	explosion.alpha = 1; 
	explosions.push(explosion);
	
}
function updateExplosion(){
	for(var i = 0; i < explosions.length; i++)
	{
		explosions[i].alpha -= 0.07;
		
		if(explosions[i].alpha <= 0)
		{
			explosions.splice(explosions[i] , 1);
		}
	}
}
function drawExplosions(){
	for(var i = 0; i < explosions.length; i++)
	{
		ctx.drawImage(explosionImage ,explosions[i].x , explosions[i].y);
	}
}

//Health ups
function updateHP(){
	if(life < 50){
		hP.x -= 5;
		hP.y -= Math.sin(fFactor);
	}
	
	if(hP.x <= -200){
		hP.x = 700;
		hP.y = randRange(30,500);
		fFactor = randRange(-10,10);
	}
}
function drawHp(){
	ctx.drawImage(healthUpImage, hP.x, hP.y, 25, 30);
}

//badGuys
function createBadGuys(){
	odds = randRange(1, 100)
	if(odds > 98)
	{
		var badGuy = new Object;
		badGuy.x = 800;
		badGuy.y = randRange(20, 400);
		badGuy.o = randRange(-10,10);
		badGuy.width = 200;
		badGuy.height = 50;
		badGuy.health = 100;
		badGuy.hit = false;
		badGuy.omega = 100;
		badGuys.push(badGuy);
	}
}
function updateBadGuys(){
	for(var i = 0; i < badGuys.length; i ++)
	{
		if(badGuys[i].hit == false)
		{
			badGuys[i].x -= 9;
			badGuys[i].y -= Math.sin(badGuys[i].o);
			if(badGuys[i].x < -100)
			{
				badGuys.splice(badGuys[i],1);
			}
		}else{
			badGuys[i].omega -= 5;
			if(badGuys[i].omega <= 0)
			{
				badGuys[i].omega = 100;
				badGuys[i].hit =  false;
			}
		}
		
	}
}
function drawBadGuys(){
	for(var i= 0; i < badGuys.length; i++) 
	{
		ctx.drawImage(badGuyImage, badGuys[i].x, badGuys[i].y);
	}
	
	
}

function restart(){
	var rbutton= document.getElementById("rbutton");
	rbutton.style.zIndex  = "-100";
	player.dead = false;
	life = 100;
	rockFeild = [];
	badGuys = [];
	createRockFeild();
}

function onKeyDown(e){
	switch(e.keyCode) 
	{
		case 32:
			doFire();
			break;
	}
}
function onKeyUp(e){
	if(!e){ var e = window.event; }
	switch(e.keyCode) 
	{
		case 32:
			doFire();
			break;
	}
			
}

//Helper Functions
function randRange(min, max)
{
	return Math.floor(Math.random() * (max - min)) + min;
}

//add "listeners" - key movements
document.body.addEventListener("keydown", function (e) {
    keys[e.keyCode] = true;
});

document.body.addEventListener("keyup", function (e) {
    keys[e.keyCode] = false;
});