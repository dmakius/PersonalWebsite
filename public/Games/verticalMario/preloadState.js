var VerticalMario = VerticalMario || {};

VerticalMario.PreloadState = {
  preload: function(){
    this.background = this.game.add.sprite(0,0, 'background');
    this.preloadText = this.game.add.bitmapText(this.game.world.centerX -  150, 130, "gameFont", "LOADING..." , 48);
    this.preloadText.anchor.setTo(0.5);
    this.preloadBar = this.game.add.sprite(this.game.width/2, this.game.height/2, 'preloader');
    this.preloadBar.anchor.setTo(0.5, 0.5);
    this.load.setPreloadSprite(this.preloadBar);

    this.game.load.spritesheet('mario', '/Games/verticalMario/assets/mario_small.png', 32, 32);
    this.game.load.spritesheet('goomba','/Games/verticalMario/assets/goomba.png', 32, 32);
    this.game.load.spritesheet('spiny', '/Games/verticalMario/assets/spiny.gif', 32,32);
    this.game.load.spritesheet('coins', '/Games/verticalMario/assets/coins.png', 10,14);
    this.game.load.spritesheet('koopa', '/Games/verticalMario/assets/koopa.gif', 32,45);
    this.game.load.image('coin', '/Games/verticalMario/assets/coin.png');

    this.game.load.image('brick', '/Games/verticalMario/assets/block.png', 32, 32);
    this.game.load.image('main_title', '/Games/verticalMario/assets/main_title.gif');
    this.game.load.image('200pts','/Games/verticalMario/assets/200.gif');

    //SOUNDS
    this.game.load.audio('mainTheme', 'https://s3-us-west-2.amazonaws.com/makoverwebsite/platformerGame/assets/sounds/main-theme.mp3');
    this.game.load.audio('getCoin', 'https://s3-us-west-2.amazonaws.com/makoverwebsite/platformerGame/assets/sounds/smb_coin.wav');
  	this.game.load.audio('jump', 'https://s3-us-west-2.amazonaws.com/makoverwebsite/platformerGame/assets/sounds/smb_jump-small.wav');
  	this.game.load.audio('dead', 'https://s3-us-west-2.amazonaws.com/makoverwebsite/platformerGame/assets/sounds/music_die.mp3');
    this.game.load.audio('hitHead' , 'https://s3-us-west-2.amazonaws.com/makoverwebsite/platformerGame/assets/sounds/hit_head.mp3');
    this.game.load.audio('squishEnemy', 'https://s3-us-west-2.amazonaws.com/makoverwebsite/platformerGame/assets/sounds/squish_enemy.mp3');
  },

  create: function(){
    this.game.state.start('MenuState');
  }
}
