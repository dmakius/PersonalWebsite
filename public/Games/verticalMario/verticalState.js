Game.preloadState = function(game){
	//WTF?
	this.preloadBar = null;

};


Game.preloadState.prototype = {
	preload:function(){
		console.log(this);
	
		//this.preloadBar = this.add.sprite(this.world.centerX,this.world.centerY, 'preloaderBar');
		//this.preloaderBar.anchor.setTo(0.5, 0.5);	
		//WTF
		this.time.advancedTiming = true;

		//this.load.setPreloadSprite(this.preloaderBar);

		//load sounds
  		this.game.load.audio('getCoin', 'https://s3-us-west-2.amazonaws.com/makoverwebsite/platformerGame/assets/sounds/smb_coin.wav');
  		this.game.load.audio('jump', 'https://s3-us-west-2.amazonaws.com/makoverwebsite/platformerGame/assets/sounds/smb_jump-small.wav');
  		this.game.load.audio('main', 'https://s3-us-west-2.amazonaws.com/makoverwebsite/platformerGame/assets/sounds/main-theme.mp3');
  		this.game.load.audio('dead', 'https://s3-us-west-2.amazonaws.com/makoverwebsite/platformerGame/assets/sounds/dead.mp3');
 
		//load all sprites
		this.game.load.spritesheet('player', 'assets/dude.png', 32, 48);
		this.game.load.spritesheet("enemy","https://s3-us-west-2.amazonaws.com/makoverwebsite/platformerGame/assets/goombas.png", 32,32);
  		this.game.load.image('wall', 'https://s3-us-west-2.amazonaws.com/makoverwebsite/platformerGame/assets/wall.png');
  		this.game.load.image('background', 'https://s3-us-west-2.amazonaws.com/makoverwebsite/platformerGame/assets/bg.png');
  		this.game.load.image('coin', 'https://s3-us-west-2.amazonaws.com/makoverwebsite/platformerGame/assets/coin.png');
  		this.game.load.spritesheet('mario', 'https://s3-us-west-2.amazonaws.com/makoverwebsite/platformerGame/assets/mario_small_frame.png', 32, 32);	
	},
	
	create:function(){
		console.log(this);
		this.game.stage.backgroundColor = '#182d3b';
		this.game.load.onLoadStart.add(loadStart, this);
    	this.game.load.onFileComplete.add(fileComplete, this);
    	this.game.load.onLoadComplete.add(loadComplete, this);
		//go to game state
		
		console.log("Is this thing working?");
		//this.state.start('gameState')
	},

	loadStart: function() {

		text.setText("Loading ...");
	},

	fileComplete: function(progress, cacheKey, success, totalLoaded, totalFiles) {
		text.setText("File Complete: " + progress + "% - " + totalLoaded + " out of " + totalFiles);

		var newImage = game.add.image(x, y, cacheKey);

		newImage.scale.set(0.3);

		x += newImage.width + 20;

		if (x > 700)
		{
			x = 32;
			y += 332;
		}

	}
}
