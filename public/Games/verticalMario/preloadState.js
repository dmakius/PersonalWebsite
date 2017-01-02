Game.preloadState = function(game){
	//WTF?
	this.preloadBar = null;

};


Game.preloadState.prototype = {
	preload:function(){
	
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
 
		//load spritesheets
		this.game.load.spritesheet("enemy","https://s3-us-west-2.amazonaws.com/makoverwebsite/platformerGame/assets/goombas.png", 32,32);
  		
  		//load images
  		this.game.load.image('wall', 'https://s3-us-west-2.amazonaws.com/makoverwebsite/platformerGame/assets/wall.png');
  		this.game.load.image('background', 'https://s3-us-west-2.amazonaws.com/makoverwebsite/platformerGame/assets/bg.png');
  		this.game.load.image('coin', 'https://s3-us-west-2.amazonaws.com/makoverwebsite/platformerGame/assets/coin.png');
  		this.game.load.spritesheet('mario', 'https://s3-us-west-2.amazonaws.com/makoverwebsite/platformerGame/assets/mario_small_frame.png', 32, 32);

  		
	},
	
	create:function(){
		console.log();
		//go to game state
		this.state.start('gameState')
	}
}