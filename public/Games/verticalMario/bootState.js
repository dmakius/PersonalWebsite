//init the Game Object
var Game = {};

Game.bootState = function(game){
	console.log(this);
};

Game.bootState.prototype = {
	init:function(){
	},

	preloader:function(){
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
