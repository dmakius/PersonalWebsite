var VerticalMario = VerticalMario || {};

VerticalMario.BootState = {
  init: function(){
    console.log("Boostate init");
  },

  preload: function(){
    this.game.load.image('background','/Games/verticalMario/assets/bg.png');
    this.game.load.image('preloader', '/Games/verticalMario/assets/preloader.png');
    this.game.load.bitmapFont('gameFont', '/Games/verticalMario/assets/fonts/font.png', '/Games/verticalMario/assets/fonts/font.fnt');
    this.game.load.bitmapFont('marioFont', '/Games/verticalMario/assets/fonts/mario20_0.png', '/Games/verticalMario/assets/fonts/mario20.fnt');
  },

  create: function(){
    this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    this.game.scale.pageAlignHorizontally = true;
    this.game.scale.pageAlignVertically = true;
    this.game.state.start('PreloadState');
  }
}
