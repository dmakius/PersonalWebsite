var MMRunner = MMRunner || {}

MMRunner.HealthUpLarge = function(game, x , y, forward){
  Phaser.Sprite.call(this, game, x, y, 'healthUpLarge');
  this.anchor.setTo(0.5);
  this.scale.setTo(2);
  this.game.physics.arcade.enable(this);
  this.outOfBoundsKill = true;
  this.enableBody = true;
  this.body.gravity.y = 250;

  this.animations.add('blink', [0,1],4, true);
  this.animations.play('blink');
}

MMRunner.HealthUpLarge.prototype = Object.create(Phaser.Sprite.prototype);
MMRunner.HealthUpLarge.prototype.constructor = MMRunner.HealthUpLarge;
