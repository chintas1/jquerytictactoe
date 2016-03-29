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
  if (player === "O") setCell(aiMove());
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
      $('.board').fadeOut(1500);
      if(player === "X"){
        $('.playerText').text('You won!');
        $('.playerText').show();
        $('#giffy').show(1500);
      }else{
        $('.playerText').text('You lose!');
        $('.playerText').show();
        $('#aigiffy').show(1500);
      }

      $(".playerText").animate({
        fontSize: '4.5em'},
        "slow"
      );
      return;
   }
  });
  if(!gameOver && full(board)){
    gameOver = true;
    $('.playerText').text('Tie');
    $('.playerText').show();
    $(".playerText").animate({
        fontSize: '4.5em'},
        "slow"
    );
    renderBoard();
  }
}

function aiMove(){
    if (board[0] == " " && ((board[2] == "X" && board[1] == "X") || (board[8] == "X" && board[4] == "X") || (board[6] == "X" && board[3] == "X"))) 
        $("#0").click();
    else if (board[1] == " " && ((board[0] == "X" && board[2] == "X") || (board[7] == "X" && board[4] == "X")))
        $("#1").click();
    else if (board[2] == " " && ((board[0] == "X" && board[1] == "X") || (board[6] == "X" && board[4] == "X") || (board[8] == "X" && board[5] == "X")))
        $("#2").click();
    else if (board[8] == " " && ((board[6] == "X" && board[7] == "X") || (board[0] == "X" && board[4] == "X") || (board[2] == "X" && board[5] == "X")))
        $("#8").click();
    else if (board[6] == " " && ((board[8] == "X" && board[7] == "X") || (board[2] == "X" && board[4] == "X") || (board[0] == "X" && board[3] == "X")))
        $("#6").click();
    else if (board[7] == " " && ((board[8] == "X" && board[6] == "X") || (board[1] == "X" && board[4] == "X")))
        $("#7").click();
    else if (board[3] == " " && ((board[5] == "X" && board[4] == "X") || (board[0] == "X" && board[6] == "X")))
        $("#3").click();
    else if (board[5] == " " && ((board[2] == "X" && board[8] == "X") || (board[4] == "X" && board[3] == "X")))
        $("#5").click();
    else if (board[4] == " " && ((board[2] == "X" && board[6] == "X") || (board[8] == "X" && board[0] == "X") || (board[5] == "X" && board[3] == "X") || (board[7] == "X" && board[1] == "X")))
        $("#4").click();
    else if (board[4] == " ")
        $("#4").click();
    else if (board[0] == " ")
        $("#0").click();
    else if (board[8] == " ")
        $("#8").click();
    else  if (board[7] == " ")
        $("#7").click();
    else if (board[3] == " ")
        $("#3").click();

}

function init(){
  $("#giffy").hide();
  $("#aigiffy").hide();
  $(".board").show();
  board = [" "," "," "," "," "," "," "," "," "];
  player ="X";
  gameOver = false;
  renderBoard();
  renderText();
  $('.cell').css('background-color', 'white');
  $(".playerText").hide();
  $(".playerText").css("font-size", "1em")
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