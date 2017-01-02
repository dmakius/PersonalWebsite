//init the Game Object
var Game = {};

Game.bootState = function(game){

};

Game.bootState.prototype = {
	init:function(){
		// this.input.maxPointers = 1;
		// this.stage.disableVisibilityChange = true;
	},

	preloader:function(){

		//loadProgress bar here

		//this.load.image('preloaderBar', 'assets/preloaderbar.png');
	},

	create:function(){	
		//scale the canvas to fit page
		this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		this.scale.pageAlignHorizontally = true;
   		this.scale.pageAlignVertically = true;
		//go to Preload State
		this.state.start('preloadState');
		
	}
}