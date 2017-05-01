var VerticalMario = VerticalMario || {};

VerticalMario.BootState = {
  init: function(){
    console.log("Boostate init");
  },

  preload: function(){
    this.game.load.image('background','/Games/VerticalMario/assets/bg.png');
    this.game.load.image('preloader', '/Games/VerticalMario/assets/preloader.png');
    this.game.load.bitmapFont('gameFont', '/Games/VerticalMario/assets/fonts/font.png', '/Games/VerticalMario/assets/fonts/font.fnt');
    this.game.load.bitmapFont('marioFont', '/Games/VerticalMario/assets/fonts/mario20_0.png', '/Games/VerticalMario/assets/fonts/mario20.fnt');
  },

  create: function(){
    this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    this.game.scale.pageAlignHorizontally = true;
    this.game.scale.pageAlignVertically = true;

    this.game.state.start('PreloadState');
  }
}
