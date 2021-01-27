var gameState = "play";

var tower, towerImg;
var door, doorImg, doorsGroup, climber, climberImg, climbersGroup;
var ghost, ghostImg;
var invisBlock, invisBlockGroup;

var spookySound;

function preload(){
  towerImg = loadImage("tower.png");
  
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  
  ghostImg = loadImage("ghost-standing.png");
  
  spookySound = loadSound("spooky.wav");
}

function setup(){
  createCanvas(600, 600);
  
  spookySound.play();

  tower = createSprite(300, 300);
  tower.addImage(towerImg);
  tower.velocityY = 2;
  
  doorsGroup = createGroup();
  climbersGroup = createGroup();
  invisBlockGroup = createGroup();
  
  ghost = createSprite(200, 200, 50, 50);
  ghost.addImage(ghostImg);
  ghost.scale = 0.3;
}

function draw(){
  background("black");

  if(gameState === "play"){
    if(tower.y > 400){
      tower.y = 300;
    }
  
    if(keyDown("LEFT_ARROW")){
        ghost.x = ghost.x - 3;
      }

    if(keyDown("RIGHT_ARROW")){
      ghost.x = ghost.x + 3;
    }

    if(keyDown("space")){
      ghost.velocityY = -5;
    }

    ghost.velocityY += 0.8;

    if(climbersGroup.isTouching(ghost)){
      ghost.velocityY = 0;
    }

    if(invisBlockGroup.isTouching(ghost) || ghost.y > 600){
      ghost.destroy();
      gameState = "end";
    }

    spawnDoors();
  
    drawSprites();
  }
  
  if(gameState === "end"){
    stroke("yellow");
    fill("yellow");
    textSize(30);
    text("Game Over", 200, 300);
  }
}

function spawnDoors(){
  if(frameCount % 300 === 0){
    door = createSprite(Math.round(random(120, 400)), -50);
    door.addImage(doorImg)

    climber = createSprite(210, 15);
    climber.addImage(climberImg);  
    climber.x = door.x
    
    invisBlock = createSprite(210, 20);
    invisBlock.velocityY = 2;
    invisBlock.x = door.x;
    invisBlock.width = climber.width;
    invisBlock.height = 4;
    invisBlock.debug = true;
    
    door.velocityY = 2
    climber.velocityY = 2;
    
    door.lifetime = 600;
    climber.lifetime = 600;
      
    doorsGroup.add(door);
    climbersGroup.add(climber);
    invisBlockGroup.add(invisBlock);
    
    ghost.depth = door.depth;
    ghost.depth += 1;
  }
}
