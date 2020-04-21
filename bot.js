const Discord = require('discord.js');
const client = new Discord.Client();
client.on('ready', () => {
  console.log('I am ready!');
});
var round;

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
client.on('message', msg => {
  if(msg.author.bot) return;
  if(msg.content === "!tic"){
    round = 0;
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
    round++;
    if(msg.content === "1"){
      gameData[0][0] = 1;
      gameState[0][0] = "Ⅹ ";
    }
    else if(msg.content === "2"){
      gameData[0][1] = 1;
      gameState[0][1] = "Ⅹ";
    }
    else if(msg.content === "3"){
      gameData[0][2] = 1;
      gameState[0][2] = "Ⅹ";
    }
    else if(msg.content === "4"){
      gameData[1][0] = 1;
      gameState[1][0] = "Ⅹ ";
    }
    else if(msg.content === "5"){
      gameData[1][1] = 1;
      gameState[1][1] = "Ⅹ";
    }
    else if(msg.content === "6"){
      gameData[1][2] = 1;
      gameState[1][2] = "Ⅹ";
    }
    else if(msg.content === "7"){
      gameData[2][0] = 1;
      gameState[2][0] = "Ⅹ ";
    }
    else if(msg.content === "8"){
      gameData[2][1] = 1;
      gameState[2][1] = "Ⅹ";
    }
    else if(msg.content === "9"){
      gameData[2][2] = 1;
      gameState[2][2] = "Ⅹ";
    }
    showState(gameState, msg, round);
  }
});

client.login('TOKEN');


// X is "Ⅹ " on left columb, Ⅹ elsewhere
//O is "Ø"
//Empty is "      "
