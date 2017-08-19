var MMRunner = MMRunner || {};
MMRunner.BootState = {
  init: function(){
  },

  preload: function(){
  	this.game.load.bitmapFont('marioFont', '/Games/mmRunner/assets/fonts/mario20_0.png', '/Games/mmRunner/assets/fonts/mario20.fnt');
  	this.game.load.image('background', '/Games/mmRunner/assets/background.jpg');
 	this.game.load.image('preloader', '/Games/mmRunner/assets/preloader.png');
  },

  create: function(){
  	this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    this.game.scale.pageAlignHorizontally = true;
    this.game.scale.pageAlignVertically = true;
    this.game.state.start('PreloadState');
  }
}
 