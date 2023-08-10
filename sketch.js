let player;
let pipe;
let score;
const gravity = 0.15;
const jumpHeight = 3.5;

let playing;
let canScore;
let points = []

function setup() {
  createCanvas(200, 400);
  player = {
    x: width / 6,
    y: height / 2,
    w: 25,
    vel: 0
  };
  pipe = {
    x: width,
    y: random(-height / 2, 0),
    w: 40,
    h: height / 2,
    gapH: height / 4,
    vel: -1.5,
  };
  score = 0;
  playing = true;
  canScore = true;
  
  textAlign(CENTER);
  
  for (let i = 0; i < 50; i++) {
    points.push([random(0, width * 2), random(0, height)]);
  }
}

function draw() {
  drawBackground();
  
  updatePlayer();
  updatePipe();
  
  drawPlayer();
  drawPipe();
  
  fill(255);
  if (playing) {
    textSize(24);
    text(score, 10, 20);
  } else {
    text("You scored " + score.toString() + "\nPress Space\n to play again", width / 2, height / 2);
  }
}

function updatePlayer() {
  player.vel += gravity;
  player.y += player.vel;
  
  // check for loss
  if (checkLoss() ||
      player.y < 0 ||
      player.y > height) {
    playing = false;
  }
  
  if (checkPoint()) {
    if (canScore) {
      score += 1;
      canScore = false;
    }
  } else {
    canScore = true;
  }
}

function drawPlayer() {
  fill(255, 255, 0);
  noStroke();
  square(player.x, player.y, player.w);
}

function updatePipe() {
  if (playing) {
    pipe.x += pipe.vel;
  }
  if (pipe.x < -pipe.w) {
    pipe.x = width + 30;
    pipe.y = random(-height / 2, 0);
    pipe.vel -= 0.05; 
  }
}

function drawPipe() {
  fill(0, 255, 0);
  noStroke(); 
  rect(pipe.x, pipe.y, pipe.w, pipe.h);
  rect(pipe.x, pipe.y + pipe.h + pipe.gapH, pipe.w, height);
}

function checkLoss() {
  if (player.x + player.w >= pipe.x && 
      player.x <= pipe.x + pipe.w && 
     ((player.y + player.w >= pipe.y &&
      player.y <= pipe.y + pipe.h) ||
     (player.y + player.w >= pipe.y + pipe.h + pipe.gapH &&
      player.y <= pipe.y + pipe.h + height + pipe.gapH))) {
    return true;
  }
  return false;
}

function checkPoint() {
  if (player.x + player.w >= pipe.x && 
      player.x <= pipe.x + pipe.w &&
      player.y + player.w >= pipe.y + pipe.h &&
      player.y <= pipe.y + pipe.h + pipe.gapH) {
    return true;
  }
  return false;
}

function drawBackground() {
  background(30, 150);
  
  for (let i = 0; i < 50; i++) {
    if (playing) {
      points[i][0] -= 0.1;
    }
    if (points[i][0] < 0) {
      points[i][0] = width * 2;
    }
    stroke(100);
    strokeWeight(5);
    point(points[i][0], points[i][1]);
    stroke(255);
    strokeWeight(2);
    point(points[i][0], points[i][1]);
  }
}

function keyPressed() {
  if (key === " ") {
    if (playing) {
      player.vel = -jumpHeight;
    } else {
      setup();
    }
  }
}
