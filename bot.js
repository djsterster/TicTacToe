const Discord = require('discord.js');
const client = new Discord.Client();
client.on('ready', () => {
  console.log('I am ready, Okay!');
});
var round;
var winstate;
var randomHit;
var randomRow;
var randomCol;
var gameData = [
  [0, 0, 0],
  [0, 0, 0],
  [0, 0, 0],
];

var gameState = [
  ["      ", "      ", "      "],
  ["      ", "      ", "      "],
  ["      ", "      ", "      "],
]
function showState (arr, msg, rnd){
  msg.channel.send("Round " + rnd + "\n" +
                   arr[0][0] + "│" + arr[0][1] + "│" + arr[0][2] + "\n" +
                   "─┼─┼─\n" +
                   arr[1][0] + "│" + arr[1][1] + "│" + arr[1][2] + "\n" +
                   "─┼─┼─\n" +
                   arr[2][0] + "│" + arr[2][1] + "│" + arr[2][2] + "\n");
}

function showWin (arr){
  if((arr[0][0] == arr[0][1]) && (arr[0][1] == arr[0][2])){
    return arr[0][0];
  }
  else if((arr[1][0] == arr[1][1]) && (arr[1][1] == arr[1][2])){
    return arr[1][0];
  }
  else if((arr[2][0] == arr[2][1]) && (arr[2][1] == arr[2][2])){
    return arr[2][0];
  }
  else if((arr[1][0] == arr[2][0]) && (arr[2][0] == arr[0][0])){
    return arr[1][0];
  }
  else if((arr[0][1] == arr[1][1]) && (arr[1][1] == arr[2][1])){
    return arr[0][1];
  }
  else if((arr[0][2] == arr[1][2]) && (arr[1][2] == arr[2][2])){
    return arr[0][2];
  }
  else if((arr[0][0] == arr[1][1]) && (arr[1][1] == arr[2][2])){
    return arr[0][0];
  }
  else if((arr[0][2] == arr[1][1]) && (arr[1][1] == arr[2][0])){
    return arr[0][2];
  }
  else{
    return 0;
  }
}

client.on('message', msg => {
  //Making sure the bot doesn't self feed
  if(msg.author.bot) return;
  //Initializes the game, resets all game stats
  if(msg.content === "!tic"){
    round = 0;
    winstate = 0;
    randomHit = false;
    randomCol = 0;
    randomRow = 0;
    gameData = [
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
    ];
    gameState = [
     ["      ", "      ", "      "],
     ["      ", "      ", "      "],
     ["      ", "      ", "      "],
   ];
    msg.channel.send("Type the space you'd like to play in\n 1  │ 2 │3\n─┼─┼─\n4 │ 5  │6\n─┼─┼─\n 7 │ 8 │9");
  }
  else{
    //Acutal round of play
    round++;
    //Takes Input, makes changes to data and display
    if(msg.content === "1" && gameData[0][0] == 0){
      gameData[0][0] = 1;
      gameState[0][0] = "Ⅹ ";
    }
    else if(msg.content === "2" && gameData[0][1] == 0){
      gameData[0][1] = 1;
      gameState[0][1] = "Ⅹ";
    }
    else if(msg.content === "3" && gameData[0][2] == 0){
      gameData[0][2] = 1;
      gameState[0][2] = "Ⅹ";
    }
    else if(msg.content === "4" && gameData[1][0] == 0){
      gameData[1][0] = 1;
      gameState[1][0] = "Ⅹ ";
    }
    else if(msg.content === "5" && gameData[1][1] == 0){
      gameData[1][1] = 1;
      gameState[1][1] = "Ⅹ";
    }
    else if(msg.content === "6" && gameData[1][2] == 0){
      gameData[1][2] = 1;
      gameState[1][2] = "Ⅹ";
    }
    else if(msg.content === "7" && gameData[2][0] == 0){
      gameData[2][0] = 1;
      gameState[2][0] = "Ⅹ ";
    }
    else if(msg.content === "8" && gameData[2][1] == 0){
      gameData[2][1] = 1;
      gameState[2][1] = "Ⅹ";
    }
    else if(msg.content === "9" && gameData[2][2] == 0){
      gameData[2][2] = 1;
      gameState[2][2] = "Ⅹ";
    }
    else{
      msg.channel.send("That's not an empty space!");
      showState(gameState, msg, round);
      round--;
      return;
    }
    //Displays the game state
    showState(gameState, msg, round);
    //Checks if Player won
      winstate = showWin(gameData);
      console.log("winstate = " + winstate);
      if(winstate == 1){
        msg.channel.send("Dang, you won!");
        msg.channel.send("Type !tic if you want to play again");
        return
      }
    //Checks for last round win or cat's game
    if(round == 9){
      winstate = showWin(gameData);
      if(winstate == 1){
        msg.channel.send("Dang, you won!");
        msg.channel.send("Type !tic if you want to play again");
      }
      else{
        msg.channel.send("Dang, we both lost");
        msg.channel.send("Type !tic if you want to play again");
        return;
      }
    }
    //Bot's Turn
    round++;
    while(randomHit == false){
      //Randomly selects spot, check's if it's open, if it is, it plays, if not, it tries again
      randomRow = Math.floor(Math.random() * 3);
      randomCol = Math.floor(Math.random() * 3);
      if(gameData[randomRow][randomCol] == 0){
        gameData[randomRow][randomCol] = 2;
        gameState[randomRow][randomCol] = "Ø";
        randomHit = true;
      }
    }
    randomHit = false;
    //Displays game state
    showState(gameState, msg, round);
    //checks if Bot won
    winstate = showWin(gameData);
    if(winstate == 2){
      msg.channel.send("Haha, I won!");
      msg.channel.send("Type !tic if you want to play again");
      return
    }
  }
});

client.login(TOKEN);


// X is "Ⅹ " on left columb, Ⅹ elsewhere
//O is "Ø"
//Empty is "      "
