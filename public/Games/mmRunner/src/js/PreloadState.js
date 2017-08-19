var MMRunner = MMRunner || {};
MMRunner.PreloadState = {
  preload: function(){
    this.background = this.game.add.sprite(0,0, 'background');
    this.preloadText = this.game.add.bitmapText(this.game.world.centerX, 200, "marioFont", "LOADING..." ,24);
    this.preloadText.anchor.setTo(0.5);
    this.preloadBar = this.game.add.sprite(this.game.width/2, this.game.height/2, 'preloader');
    this.preloadBar.anchor.setTo(0.5, 0.5);
    this.load.setPreloadSprite(this.preloadBar);

    // this.game.load.atlas('megaman', 'assets/megaman.png', 'assets/megaman.json');
    this.game.load.atlas('megaman', '/Games/mmRunner/assets/spritesheet.png', '/Games/mmRunner/assets/sprites.json');
    this.game.load.image('logo', '/Games/mmRunner/assets/megamanlogo.png');
    this.game.load.image('platform', '/Games/mmRunner/assets/floor1.png');
    this.game.load.image('bullet', '/Games/mmRunner/assets/bullet.jpg');
    this.game.load.image('platform2', '/Games/mmRunner/assets/platform2.png');
    this.game.load.image('platform3', '/Games/mmRunner/assets/platform3.png');
    this.game.load.image('platform4', '/Games/mmRunner/assets/platform4.png');
    this.game.load.image('explosionParticle', '/Games/mmRunner/assets/explosionParticle.png');
    this.game.load.spritesheet('badGuy1', '/Games/mmRunner/assets/badGuy1.png',34,16);
    this.game.load.spritesheet('explosion1' , '/Games/mmRunner/assets/explosion2.png', 28,31);

    //audio files
    this.game.load.audio('shoot', 'https://s3-us-west-2.amazonaws.com/makoverwebsite/MmRunner/shoot.wav');
    this.game.load.audio('landing', 'https://s3-us-west-2.amazonaws.com/makoverwebsite/MmRunner/landing.wav');
    this.game.load.audio('dead', 'https://s3-us-west-2.amazonaws.com/makoverwebsite/MmRunner/dead.wav');
    this.game.load.audio('badGuyHit', 'https://s3-us-west-2.amazonaws.com/makoverwebsite/MmRunner/badGuyHit.wav');
    this.game.load.audio('playerHit', 'https://s3-us-west-2.amazonaws.com/makoverwebsite/MmRunner/hit.wav');
    this.game.load.audio('wily', 'https://s3-us-west-2.amazonaws.com/makoverwebsite/MmRunner/wily.mp3');
  }, 

  create: function(){
    this.game.state.start('MenuState');
  }
}
