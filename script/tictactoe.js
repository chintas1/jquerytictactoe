var board;
var player;
var winConditions = [[0,1,2], [3,4,5], [6,7,8],
                       [0,3,6], [1,4,7], [2,5,8],
                       [0,4,8], [6,4,2]]
var gameOver;

function renderBoard (){
  for (var i = 0;i<board.length;i++){
    $('.'+i).text(board[i]);
  }
}

function renderText(){
  $('.playerText').text('Turn : ' + player)
}

function setCell(cell){
  if (gameOver) return;
  if (board[cell] !== " ") return;
  board[cell] = player;
  checkState();
  if (gameOver) return;
  changePlayer();
  renderBoard();
  renderText();
}

function changePlayer(){
  if (player == "O")
    player = "X";
  else
    player = "O";
}

function checkState(){
  $.each(winConditions, function(index,value){
   if (board[winConditions[index][0]] == board[winConditions[index][1]] 
    && board[winConditions[index][0]] == board[winConditions[index][2]] 
    && board[winConditions[index][0]] != " "){
      gameOver = true;
      $('.playerText').text('Player ' + player + ' wins');
      renderBoard();
      $('.'+winConditions[index][0]).css("background-color", "orange");
      $('.'+winConditions[index][1]).css("background-color", "orange");
      $('.'+winConditions[index][2]).css("background-color", "orange");
   }
  });
}

function init(){
  board = [" "," "," "," "," "," "," "," "," "];
  player ="X";
  gameOver = false;
  renderBoard();
  renderText();
  $('.cell').css('background-color', 'white');
}

function addListeners(){
  $(".restart").click(function(){
    init();
  });
  $(".cell").hover(function(){
      if(board[parseInt($(this).attr("id"))] === " " && !gameOver){
        $(this).css("background-color", "rgba(0,0,0,0.02)");
        $(this).text(player);
      }
    }, function(){
      if(board[parseInt($(this).attr("id"))] === " " && !gameOver){
        $(this).css("background-color", "white");
        $(this).text(" ");
      }
  });
}

$(document).ready(function(){
  addListeners();
  init();
});