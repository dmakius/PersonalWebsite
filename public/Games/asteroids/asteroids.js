var	HEIGHT = 500, WIDTH = 700, canvas, ctx, stars;
var keys = [], starFeild = [], rockFeild = [], bullets = [], explosions = [], badGuys = [];
var score = 0, life = 100;
var hpBoost = false;
var fFactor = randRange(10,-10); 

var intro = true, pause = false, gameOver = false, gameOverCounter = 200;


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
playerImage.src = "/images/ship.jpg";
var rockImage = new Image();
rockImage.src = "/images/rock.jpg";
var explosionImage = new Image();
explosionImage.src = "/images/explosion.jpg";
var healthUpImage = new Image();
healthUpImage.src = "/images/healthUp.jpg";
var badGuyImage = new Image();
badGuyImage.src = "/images/bad_guy.jpg";

var dieSound = new Audio("https://s3-us-west-2.amazonaws.com/makoverwebsite/GameMusic/die.mp3");
var explosionSound = new Audio("https://s3-us-west-2.amazonaws.com/makoverwebsite/GameMusic/explosion.mp3");
var shootSound = new Audio("https://s3-us-west-2.amazonaws.com/makoverwebsite/GameMusic/beam.mp3");
var introSound = new Audio("https://s3-us-west-2.amazonaws.com/makoverwebsite/GameMusic/intro.mp3");
var mainSound = new Audio("https://s3-us-west-2.amazonaws.com/makoverwebsite/GameMusic/main.mp3");
var enemyHitSound = new Audio("https://s3-us-west-2.amazonaws.com/makoverwebsite/GameMusic/enemyHit.mp3");
var healthSound = new Audio("https://s3-us-west-2.amazonaws.com/makoverwebsite/GameMusic/health.mp3");
var hurtSound = new Audio("https://s3-us-west-2.amazonaws.com/makoverwebsite/GameMusic/playerHurt.mp3");


for(var i = 0; i < 2; i++)
{
	var bullet = new Object;
	bullets.push(bullet);
}


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

//THE MAIN Loop
function mainLoop(){
	if (intro == true) {
		introScreen();
		updateStarFeild();
		drawStars();
	}else{
		if(gameOver == false){
			if(pause == true){
				drawFrame();
				pauseScreen();
			}else{
				updateFrame();
				drawFrame();
			}
			
		}else{
			updateFrame();
			drawFrame();
			gameOverScreen();				
		}		
	}
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
		pause = true;
		mainSound.pause();
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
				enemyHitSound.cloneNode(true).play();
				
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
		healthSound.play();
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
			hurtSound.play();
			life -= 10;
			player.hit = true;
			
			//player dies
			if(life <= 0)
			{
				dieSound.play();
				life = 0;
				player.dead = true;
				createExplosion(player);
				gameOver = true;
				mainSound.pause();
				mainSound.currentTime = 0;
			}
		}
	}
	for(var i = 0; i < badGuys.length; i++){
		var collision = checkCollisions(badGuys[i], player)
		if(collision == true  && player.hit == false)
		{
			hurtSound.play();
			life -= 25;
			player.hit = true;
			
			//player dies
			if(life <= 0)
			{
				dieSound.play();
				life = 0;
				player.dead = true;
				createExplosion(player);
				gameOver = true;
				mainSound.pause();
				mainSound.currentTime = 0;
			}
		}
	}
	}
	if(player.hit){
		updatePlayerHit();
	}
		
}
function drawFrame(){
		
		ctx.clearRect(0,0, canvas.width, canvas.height);
		ctx.fillStyle = "black";
		ctx.fillRect(0,0, canvas.width, canvas.height);
		
		drawStars();
		drawRocks();
		drawBadGuys();
		drawBullets();
		drawExplosions();
		drawHp();

		if(player.apear % 4 == 0 && player.dead == false){
				ctx.drawImage(playerImage, player.x, player.y);
		}
		
		//drawing the scoreboard
		ctx.fillStyle = "red";
		ctx.font = "bold 24px Arial";
		ctx.fillText("Score: " + score,15, 25);
		ctx.fillText("Health: " + life,550, 25);	
}
function introScreen(){
	introSound.play();
	ctx.fillStyle = "Black";
	ctx.fillRect(0,0, canvas.width, canvas.height);
	ctx.fillStyle = "Orange";
	ctx.font = "bold 64px Arial";
	ctx.fillText("ASTEROIDS " ,175, 250);
	ctx.font = "bold 18px Arial";
	ctx.fillText("Press Space bar to Start " , 250, 300);	
	ctx.fillText("(Press z bar to PAUSE)" , 250, 320);
	
	if(keys[32]){
		intro = false;
		introSound.pause();
		introSound.currentTime = 0;
		mainSound.addEventListener('ended', function() {
		    this.currentTime = 0;
		    this.play();
		}, false);
		mainSound.play();
	}
}
function pauseScreen(){
	ctx.fillStyle = "Orange";
	ctx.font = "bold 48px Arial";
	ctx.fillText("PAUSE " ,250, 300);
	if(keys[90]){
		pause = false;
		mainSound.play();
	}
}
function gameOverScreen(){
	ctx.fillStyle = "Orange";
	ctx.font = "bold 48px Arial";
	ctx.fillText("GAME OVER " ,215, 250);
	gameOverCounter -=1;
	if (gameOverCounter <= 0) {
		reset();
	}
	
}
function reset(){
	badGuys = [];
	starFeild = [];
	rockFeild = [];
	createStarFeild();
	createRockFeild();
	player.dead = false;
	player.x = 100;
	player.y = 300;
	gameOver = false;
	intro = true;
	gameOverCounter = 200;
}

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
		shootSound.cloneNode(true).play();
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

function createExplosion(curRock){
	var explosion = new Object();
	explosionSound.cloneNode(true).play();
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

function restart(){
	player.dead = false;
	life = 100;
	score = 0;
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
		case 90:
			pause();
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
		case 90:
			pause();
			break;
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

//Helper Functions
function randRange(min, max){
	return Math.floor(Math.random() * (max - min)) + min;
}



//add "listeners" - key movements
document.body.addEventListener("keydown", function (e) {
    keys[e.keyCode] = true;
});

document.body.addEventListener("keyup", function (e) {
    keys[e.keyCode] = false;
});

_init_();
