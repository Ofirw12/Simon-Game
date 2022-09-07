//variables

var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var gameOver = "Game Over, Press Any Key to Restart";
//game logic

$(".btn").click(clickedButton);
$("body").keydown(startGame);

function startGame() {
  if (level === 0) {
    nextSequence();
  }
  else if($("h1").text() === gameOver){
    level = 0;
    gamePattern = [];
    nextSequence();
  }
}

function nextSequence() {
  level++;
  $("h1").text("Level " + (level));
  var randomNumber = Math.floor(Math.random() * 4);
  console.log(randomNumber);
  var randomChosenColor = buttonColors[randomNumber];
  console.log(randomChosenColor);
  pcClick(randomChosenColor);
  gamePattern.push(randomChosenColor);
  userClickedPattern = [];
}

function pcClick(color) {
  $("#" + color).fadeOut(200).fadeIn(200);
  playSound(color);
}

function playSound(name) {
  var sound = new Audio("sounds/" + name + ".mp3");
  sound.play();
}

function checkAnswer(level) {
  for (var i = 0; i < level; i++) {
    if (userClickedPattern[i] !== gamePattern[i]) {
      console.log("wrong");
      playSound("wrong");
      $("body").toggleClass("game-over");
      setTimeout(function() {
        $("body").toggleClass("game-over");
      }, 200);
      $("h1").text(gameOver);
      break;
    } else {
      console.log("success");
    }
  }
  if ($("h1").text() !== gameOver) {
    setTimeout(nextSequence, 1000);
  }

}

//user functions
function clickedButton(e) {
  if (level === 0 || $("h1").text() === gameOver) {
    console.log("nope");
  } else {
    animatePress(e.target.id);
    userClickedPattern.push(e.target.id);
    if (userClickedPattern.length === level) {
      checkAnswer(level);
    }
  }


}

function animatePress(currentColor) {
  $("#" + currentColor).toggleClass("pressed");
  playSound(currentColor);
  setTimeout(function() {
    $("#" + currentColor).toggleClass("pressed");
  }, 100);
}
