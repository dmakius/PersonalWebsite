Game.gameState = function(game){
    console.log(this);
};

var platform1, background, player;
var spacing = 100, score = 0;
var coins;
var coinSound, jumpSound, mainSound, deadSound;
var gameOver = false, gameOverTimer, pause = false;
var movingLeft = false, movingRight = false;
var playerJump = false;


Game.gameState.prototype = {
    create: function(){
      // console.log("gamestate create");
      // console.log(this);
      gameOverTimer = null;
      
      //console.log(this.game.time.now);
      //console.log(gameOverTimer);
    	this.timer = this.game.time.events.loop(3000, this.addPlatforms, this); 

  		this.game.physics.startSystem(Phaser.Physics.ARCADE);

      //background 
 		 background = this.game.add.sprite(0,0, 'background');

      //add sounds
      coinSound = this.game.add.audio('getCoin');
      jumpSound = this.game.add.audio('jump');
      mainSound = this.game.add.audio('main');
      deadSound = this.game.add.audio('dead');

      //play music
      // mainSound.play();
 		
    player = this.game.add.sprite(100, 220, 'mario');
    player.dead = false;
 		player.enableBody = true;
    //player.body.collideWorldBounds = true;
    this.game.physics.arcade.enable(player);

       	player.forward = true;
       	player.inair = false;
       
       	player.body.gravity.y = 200;
        player.body.velocity.x = 0;
        player.body.friction.x = 0.1;

        //player.body.collideWorldBounds = true;
        player.animations.add('right', [9, 10, 11,], 10, true);
        player.animations.add('left', [0, 1, 2,], 10, true);
        player.animations.add('jumpleft', [4], 10, true);
		    player.animations.add('jumpright', [7], 10, true);
        player.animations.add('standright', [6], 10, true);
        player.animations.add('standleft', [5], 10, true);
        player.animations.play('standright');

        this.game.camera.follow(player);

 		 platform1 = this.game.add.group();
 		 platform1.enableBody = true;
     platform1.createMultiple(250, 'wall');

    	coins = this.game.add.group();
    	coins.enableBody = true;

    	for(var i = 0; i < 10 ; i++){
    		var coin = coins.create(this.randomNumX() , this.randomNumY() ,"coin");
    		coin.scale.setTo(0.75,0.75);
    		coin.body.velocity.y = 30;
    	}
    	
 		//Get the dimensions of the tile we are using
    	this.tileWidth = this.game.cache.getImage('wall').width;
    	this.tileHeight = this.game.cache.getImage('wall').height;
    //	console.log("brick width: " + this.tileWidth);
    //	console.log("brick height: " + this.tileHeight);

		this.initPlatforms();
		this.createScore();

		this.cursors = this.game.input.keyboard.createCursorKeys();
    this.jumpButton = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);		
  },

    update:function (){
    // console.log("gamestate update");
    // console.log(this);
    //collisions
 		this.game.physics.arcade.collide(player, platform1, this.jumpFrame);
 		this.game.physics.arcade.overlap(coins, platform1, this.coinAlign);
 		this.game.physics.arcade.overlap(player, coins, this.collectCoin, null, this);

 		//controlling the player
 		if((this.cursors.up.isDown && player.body.wasTouching.down)||(playerJump && player.body.wasTouching.down)) {
 			//jumpSound.play();
      console.log("player Jumped!");
      player.body.velocity.y = -175;
    }else if(this.cursors.left.isDown || movingLeft === true){
      player.forward = false;
      player.body.velocity.x = -100;
      player.animations.play('left');
    }else if(this.cursors.right.isDown || movingRight === true){
      player.forward = true;
      player.body.velocity.x = 100;
      player.animations.play('right');
    }else if(player.forward == false ){
      player.body.velocity.x = 0;
      player.animations.play("standleft");
    }else if( player.forward == true ){
      player.body.velocity.x = 0;
      player.animations.play("standright");
    }


    //adding jumping frames
    if(player.body.touching.down == false){
        if(player.forward == true){
        	player.animations.play("jumpright");
        }else{
        	player.animations.play("jumpleft");
    		}
    }
       
    if(player.body.y >= 500){  
      player.dead = true;
      gameOver = true;
       
      if(player.dead){
        //console.log("player dead");
          mainSound.stop();
          deadSound.play();
          player.body.y = -450;
          player.body.gravity.y = 0;
          player.body.velocity.y = 0;
          gameOverTimer = this.game.time.now;
          //console.log("game over time: " + gameOverTimer);
          player.dead = false;
        }
      }
      //onsole.log("game time:" + this.game.time.now);
      // console.log("game Over Time:" + gameOverTimer);

        if(this.game.time.now >= gameOverTimer + 4000 && gameOver == true){
          gameOverTimer = null;
          gameOver = false;
         // console.log("game restarted");
          this.game.state.start("gameState");
        }
      


        //out-of-bounds coins
        coins.forEach(function(coin){
        	if(coin.y >= 450){
        		coin.y = -50; 
        		coin.x = Math.floor(Math.random()*400);
        	//	console.log("coin moved");
        	//	console.log("coin x:" + coin.x + " coin y: " + coin.y);
        	}
        });
     },

    collectCoin: function(player, coin){
      coinSound.play();
     	//console.log("coin collected");
     	coin.y = -50;
     	coin.x = this.randomNumX();
     	//console.log("coin x:" + coin.x + " coin y: " + coin.y);
     	this.incrementScore();
     },
    
    addPlatforms: function(y) {
    	if(typeof(y) == "undefined"){
        	y = -this.tileHeight;
    	}
	    //Work out how many tiles we need to fit across the whole screen
	    var tilesNeeded = Math.ceil(this.game.world.width / this.tileWidth);
	 
	    //Add a hole randomly somewhere
	    var hole = Math.floor(Math.random() * (tilesNeeded - 3)) + 1;
	 
	    //Keep creating tiles next to each other until we have an entire row
	    //Don't add tiles where the random hole is
	    for (var i = 0; i < tilesNeeded; i++){
	        if (i != hole && i != hole + 1 && i != hole + 2 && i != hole + 3){
	            this.addBrick(i * this.tileWidth, y); 
	        }           
	    }
	},
    coinAlign: function(coin, platform){
		//console.log("coin aligned");
		coin.y -= 30;
	},
    jumpFrame: function(){
    playerJump = false;
	},

	addBrick: function(x, y) {
   	 	// Create a pipe at the position x and y
   		var tile = platform1.getFirstDead();
   		tile.reset(x,y);
   		tile.body.velocity.y = 30;
   		tile.body.immovable = true;
   		tile.checkWorldBounds = true;
    	tile.outOfBoundsKill = true; 
	},

	initPlatforms: function(){
    	var bottom = this.game.world.height - this.tileHeight - 100;
    	var top = this.tileHeight;
    	//Keep creating platforms until they reach (near) the top of the screen
    	for(var y = bottom; y > top - this.tileHeight - 200; y = y - spacing){
        //	console.log(y);
        	this.addPlatforms(y);
    	}
	},

	createScore: function(){
    var scoreFont = "18px Arial";
    this.scoreLabel = this.game.add.text(20, 20, " SCORE: 0", {font: scoreFont, fill: "#fff"}); 
    this.scoreLabel.align = 'center';
 
	},

	incrementScore: function(){
    	score += 100;   
    	this.scoreLabel.text =  "SCORE: " +score;      
	},

	randomNumX: function(){
		return (Math.floor(Math.random() * 400));
	},
  randomNumY: function(){
    return (Math.floor(Math.random() * -200));
  }
 	
}
