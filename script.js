document.addEventListener("DOMContentLoaded", () => {
  const ball = document.getElementById("ball");
  const paddle = document.getElementById("paddle");
  const box = document.getElementById("box");

  //score updation varibale
  const score = document.getElementById("score");

  //popup
  var main = document.getElementById("main");
  var popup = document.getElementById("popup");
  var scorePoints = document.getElementById("score-points");
  var replay = document.getElementById("replay");
  var quit = document.getElementById("quit");
  var interval;

  //declare the varibles for ball movement
  var dX = 2;
  var dY = 2;
  var ballX = 300;
  var ballY = 0;

  //change level
  var levelBtn = document.getElementById("level");
  function changeLevel() {
    if (levelBtn.innerHTML === "Easy") {
      levelBtn.innerHTML = "Medium";
      dX = dY = 3;
    } else if (levelBtn.innerHTML === "Medium") {
      levelBtn.innerHTML = "Hard";
      dX = dY = 4;
    } else if (levelBtn.innerHTML === "Hard") {
      levelBtn.innerHTML = "Easy";
      dX = dY = 2;
    }
  }

  levelBtn.addEventListener("click", changeLevel);

  function startGame() {
    interval = setInterval(() => {
      ball.style.left = `${ballX}px`;
      ball.style.top = `${ballY}px`;
      ballX += dX;
      ballY += dY;
      collision();
      if (ballX > box.offsetWidth - ball.offsetWidth || ballX < 8) dX *= -1;

      if (ballY > box.offsetHeight - ball.offsetHeight - 4 || ballY < 0)
        dY *= -1;
    }, 10);
  }

  //startGame();

  var pdX = 10;
  var paddleX = 0;

  function collision() {
    let point = 1;
    if (
      ballY > box.offsetHeight - paddle.offsetHeight - ball.offsetHeight - 10 &&
      ballX > paddle.offsetLeft &&
      ballX < paddle.offsetLeft + paddle.offsetWidth

      /*
      This condition is very important to understand. 
      Basically the ball is surpassing the paddle to bounce back after colliding with the
      bottom boundary of box in the above set interval inside condition.

      But, what we actually need is whenver the ball reaches the height of the paddle,
      it has to bounce back by assuming it is its boundary. 

      Note : ballX -- horizontal distance of the ball from the box left boundary.
             ballY -- vertical distance if the ball from the box top boundary.

      For that we written the first condition as 
      *ballY distance whenever is greater than paddle height and ball height combined 
       removed from the box height. ball height is also removed because the bottom of the ball
       has to reach the paddle.

      The second condition and third condition main azenda is to ensure only the 
      paddle height boundary works on the boundaries of paddle's left and right side. 
      * ballX whenever is greater than the paddle.offsetLeft  the ball bounces.
      (horizantal distance is > from the box's left boundary to the paddle's left boundary).   

      *whenver ballX is lesser than the the distance of both paddle's offset width and offsetleft 
      (horizontal distance < from the paddle's left side boundary to the paddles's right boundary.)

      telugu: em ledu abbay first lo paddle height paina untey bounce avvali annanu. 
      ala antey ela? mottham ekkada paddle height untey akkada bounce aipothundi. Andukosam
       2 conditions rasa. 

       Okati box left boundary nundi paddle left boundary kante ballX ekkuva untene bounce avthundi.
       Simple ga cheppali ante left side antha bounce avvakunda eliminate chesam. 

       Rendodhi right side antha eliminate cheyali ante, ball 
       box left boundary nundi antey paddle.leftOffset + paddle.width kalipinam anuko. 
       deeni limit varaku bounce avvali avthala inka avvakoodadhu.

    */
    ) {
      score.innerHTML = Number(score.innerHTML) + point;
      dY *= -1;
    } else if (ballY > box.offsetHeight - ball.offsetHeight - 5) {
      clearInterval(interval);
      main.style.opacity = "0.6";
      popup.style.display = "block";
      scorePoints.innerHTML = Number(score.innerHTML);
    }
  }

  document.addEventListener("keydown", (e) => {
    if (e.keyCode === 37 && paddleX > 0) paddleX -= pdX; //leftkey
    if (e.keyCode === 39 && paddleX < box.offsetWidth - paddle.offsetWidth - 10)
      //rightkey
      paddleX += pdX;
    paddle.style.left = `${paddleX}px`;
  });

  document.addEventListener("mousemove", (e) => {
    var leftMouse = e.clientX - box.offsetLeft - paddle.offsetWidth / 2;
    paddleX = leftMouse;
    if (paddleX > 0 && paddleX < box.offsetWidth - paddle.offsetWidth - 10)
      paddle.style.left = `${paddleX}px`;
  });
  function replayButton() {
    main.style.opacity = "1";
    location.reload();
  }
  //function quitButton() {
  //window.close();}
  replay.addEventListener("click", replayButton);
  //quit.addEventListener("click", quitButton);

  //start page script
  var playGameBtn = document.getElementById("play-game-btn");
  var changeThemeBtn = document.getElementById("theme-btn");
  var startSection = document.getElementById("start-section");
  var swipeHint = document.getElementById("swipe-hint");

  function changeTheme() {
    //let mainTheme = window.getComputedStyle(main).background;
    if (changeThemeBtn.innerHTML == "Light Mode") {
      main.style.background = "#232323";
      box.style.border = "3px solid #fff";
      paddle.style.background =
        "radial-gradient(circle at 18.7% 37.8%,rgb(250, 250, 250) 0%,rgb(225, 234, 238) 90%)";
      changeThemeBtn.innerHTML = "Dark Mode";
      changeThemeBtn.style.background = "#232323";
      changeThemeBtn.style.color = "#fff";
      swipeHint.style.color = "#fff";
    } else {
      main.style.background = "#fff";
      //box.style.border = "3px solid #121212";
      box.style.border = "3px solid #fff";
      paddle.style.background = "#232323";
      changeThemeBtn.innerHTML = "Light Mode";
      changeThemeBtn.style.background = "#fff";
      changeThemeBtn.style.color = "#232323";
      swipeHint.style.color = "#232323";
      swipeHint.style.textShadow = "none";
      swipeHint.style.fontWeight = "800";
    }
  }

  function playGame() {
    main.style.opacity = "1";
    startSection.style.display = "none";
    startGame();
  }
  playGameBtn.addEventListener("click", playGame);
  changeThemeBtn.addEventListener("click", changeTheme);

  //touch screen events
  document.addEventListener("touchmove", (e) => {
    [...e.changedTouches].forEach((touch) => {
      let touchWidth = touch.pageX;
      //for easy scrolling
      //touchWidth-= 60;
      let paddleNewPosition = touchWidth - paddle.offsetWidth;
      console.log(paddleNewPosition);

      if (paddleNewPosition < 0) {
        paddleNewPosition = 2;
      } else if (paddleNewPosition > box.offsetWidth - paddle.offsetWidth - 9) {
        paddleNewPosition = box.offsetWidth - paddle.offsetWidth - 9;
      }

      paddle.style.left = `${paddleNewPosition}px`;

      //from chatgpt
      // let newPaddlePosition = touchWidth - paddle.offsetWidth / 2;

      // if (newPaddlePosition < 0) {
      //   newPaddlePosition = 0;
      // } else if (newPaddlePosition > box.offsetWidth - paddle.offsetWidth) {
      //   newPaddlePosition = box.offsetWidth - paddle.offsetWidth;
      // }

      // // Update the paddle position
      // paddle.style.left = `${newPaddlePosition}px`;
    });
  });
});
