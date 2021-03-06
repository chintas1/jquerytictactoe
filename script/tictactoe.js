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
  if(player === "X"){
    $('.'+cell).css("background-color", "lightblue");
  }else{
    $('.'+cell).css("background-color", "lightgreen");
  }
  checkState();
  renderBoard();
  if (gameOver) return;
  changePlayer();
  renderText();
}

function changePlayer(){
  if (player == "O")
    player = "X";
  else
    player = "O";
}



function full(cur_board){
  for(var i = 0; i < cur_board.length; i++){
    if(cur_board[i] === " "){
      return false;
    }
  }
  return true;
}

function checkState(){
  $.each(winConditions, function(index,value){
   if (board[winConditions[index][0]] == board[winConditions[index][1]] 
    && board[winConditions[index][0]] == board[winConditions[index][2]] 
    && board[winConditions[index][0]] != " "){
      gameOver = true;
      $('.playerText').text('Player ' + player + ' wins');
      $('.board').hide();
      $('#giffy').show(500);

      $(".playerText").animate({
        fontSize: '3.5em'},
        "slow"
      );
      return;
   }
  });
  if(!gameOver && full(board)){
    gameOver = true;
    $('.playerText').text('Tie');
    renderBoard();
  }
}



function init(){
  $("#giffy").hide();
  $(".board").show();
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
  $('.cell').click(function() {
     setCell(parseInt($(this).attr("id")));
  })
}

$(document).ready(function(){
  addListeners();
  init();
});