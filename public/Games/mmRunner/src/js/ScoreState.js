var MMRunner = MMRunner || {};
MMRunner.ScoreState = {
  create: function(){
    //TODO: get data from API
    this.highScores = [
    {name:"HaShem", score:1},
    {name:"Dr. Light", score: 12131},
    {name:"Dr. Wily", score:4321},
    {name:"Proto Man", score:6666},
    {name:"Garbage Man", score: 2353},
    {name:"Guts Man" , score:180}
    ];

    //create score for game just played
    var newScore = new Object();
    newScore.name = "YOU";
    newScore.score = MMRunner.GameState.score;
    this.highScores.push(newScore);

    //TODO: UPDATE API
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
    
    this.game.title = this.game.add.bitmapText(this.game.world.centerX, 50, "marioFont", "HighScores" , 24);
    this.game.title.anchor.setTo(0.5);

    this.hsSpace = 100;
    for(var x = 0; x < 5;x++){
      this.game.add.bitmapText(50, 50*x + 100, "marioFont", this.AHighScores[x].name , 16);
      this.game.add.bitmapText(550, 50*x + 100, "marioFont", this.AHighScores[x].score , 16);
    }

    this.continueSign = this.game.add.bitmapText(this.game.world.centerX, 400, "marioFont", "Press SPACEBAR to Replay", 18);
    this.continueSign.anchor.setTo(0.5);
    this.start = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
  },

  update:function(){
    if(this.start.isDown){
      this.game.state.start('MenuState');
    }
  }
}