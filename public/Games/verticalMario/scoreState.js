var VerticalMario = VerticalMario || {};
VerticalMario.ScoreState = {
  create: function(){
    this.highScores = VerticalMario.GameState.highScores;
   
    console.log("Scores from API");
    console.log(this.highScores);

    //create score for game just played
    var newScore = new Object();
    newScore.username = "YOU";
    newScore.score = VerticalMario.GameState.score;
    this.highScores.push(newScore);
    console.log("Player added");
    console.log(this.highScores);
 
    //TODO: allow USER to select name

    this.AHighScores = [];

     while(this.highScores.length > 0){
      var maxScore = 0, index;
      for(var x = 0; x < this.highScores.length; x++){
        if(this.highScores[x].score > maxScore){
          maxScore = this.highScores[x].score;
          index = x;
        }
      }
     
      this.AHighScores.push(this.highScores[index]);
      this.highScores.splice(index ,1);
     }
     
    var sC = this.game;

    this.background = this.game.add.sprite(0,0, 'background');
     
    this.game.title = this.game.add.bitmapText(this.game.world.centerX, 50, "gameFont", "High Scores" , 36);
    this.game.title.anchor.setTo(0.5);

    this.hsSpace = 100;
    for(var x = 0; x < 5;x++){
      this.game.add.bitmapText(50, 50*x + 100, "gameFont", this.AHighScores[x].username , 28);
      this.game.add.bitmapText(550, 50*x + 100, "gameFont", this.AHighScores[x].score , 28);
    }

    this.continueSign = this.game.add.bitmapText(this.game.world.centerX, 400, "gameFont", "Press SPACEBAR to Replay", 28);
    this.continueSign.anchor.setTo(0.5);
    this.start = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
  },

  update:function(){
    if(this.start.isDown || pause == true){
      this.game.state.start('MenuState');
    }
  }
}