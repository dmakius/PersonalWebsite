var MMRunner = MMRunner || {}

MMRunner.Platform2 = function(game, x , y){
  Phaser.Sprite.call(this, game, x, y, 'platform3');
  this.game.physics.arcade.enable(this);
  this.anchor.setTo(0.5);
  this.scale.setTo(2,1);
  this.body.immovable = true;
}

MMRunner.Platform2.prototype = Object.create(Phaser.Sprite.prototype);
MMRunner.Platform2.prototype.constructor = MMRunner.Platform2;

MMRunner.Platform2.prototype.update = function(){
  this.body.velocity.x = -50;
  
  if(this.body.x <= -200){
    this.destroy();
  }

}
