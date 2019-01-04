var VerticalMario = VerticalMario || {}

VerticalMario.Koopa = function(game, x, y) {
  Phaser.Sprite.call(this, game, x, y, 'koopa');
  this.anchor.setTo(0.5);
  this.scale.setTo(1.25);
  this.game.physics.arcade.enable(this);
  this.outOfBoundsKill = true;
  this.body.gravity.y = 100;
  this.body.velocity.x = 35;
  this.hit = false;
  this.flying = true;
  this.shell = false;
  this.body.setSize(30,30,0,15);

  //add animations
  this.animations.add('walkingRight', [0,1], 5, true);
  this.animations.add('walkingLeft', [4,5], 5, true);
  this.animations.add('flyingRight', [2,3], 5, true);
  this.animations.add('flyingLeft', [6,7], 5, true);
  this.animations.add('shell', [8],1, true);
  this.animations.play('flyingRight');
}

VerticalMario.Koopa.prototype = Object.create(Phaser.Sprite.prototype);
VerticalMario.Koopa.prototype.constructor = VerticalMario.Koopa;

VerticalMario.Koopa.prototype.update = function(){
  //debug
  //this.game.debug.bodyInfo(this, 32, 32);
  //this.game.debug.body(this);

//sprite looping sideways
  if(this.body.x > 710){
    this.body.x = -5;
  }
  if(this.body.x < -10){
    this.body.x = 705;
  }
  //allow for koopa to fly
  if(this.body.touching.down && this.flying){
    this.body.velocity.y = -100;
  }

  if(this.flying){
      if(this.body.velocity.x >= 0){
        this.animations.play('FlyingRight');
      }else {
        this.animations.play('FlyLeft');
      }
  }else if(!this.flying){
    if(this.body.velocity.x >= 0){
      this.animations.play('walkingRight');
      }else {
        this.animations.play('walkingLeft');
      }
  }

  if(this.shell){
    this.animations.play('shell');
  }

  //if koopa gets hit
  if(this.hit){
    this.animations.play('shell');
  }
  //killing koopa from off screen
  if(this.body.y >= 550){
    this.kill();
  }
}
