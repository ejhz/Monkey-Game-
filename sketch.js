var PLAY = 1;
var END = 0 ;
var gameState = PLAY;
var monkey , monkey_running,monkeyCollide
 var banana ,bananaImage, obstacle, obstacleImage
 var foodGroup, obstacleGroup 
 var survivalTime = 0;
function preload(){
  monkey_running = loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
 monkeyCollide = loadAnimation("sprite_0.png");
  
 bananaImage = loadImage("banana.png");
 obstacleImage = loadImage("obstacle.png");
}
function setup() {
  createCanvas(600,200)
  monkey = createSprite(80,180,20,20);                monkey.addAnimation("running", monkey_running);
    monkey.addAnimation("collided", monkeyCollide);
  monkey.scale = 0.1;
  ground = createSprite(20,180,1900,5);
  ground.velocityX = -6;
  ground.x = ground.width/2;
  foodGroup = new Group(); 
  obstacleGroup = new Group(); 
        
   monkey.setCollider("circle",0,0,240);
  //monkey.debug = true;
}
function draw() {
  background("white");
  stroke("white");
  textSize(20);
  fill("white");
    text("Score :"+ survivalTime,500,50 );
  
  stroke("black");
  textSize(20);
  fill("black");

  text("Survival Time: "+survivalTime,100,50);
  
  monkey.collide(ground);
  
  

  if(gameState === PLAY) {
    ground.velocityX = -4;
    if(keyDown("space")&& monkey.y >=50) {
    monkey.velocityY = -6; 
    } 
    monkey.velocityY = monkey.velocityY + 0.8;
    if(ground.x < 0){ 
    ground.x = ground.width/2;
    }
    food();
  obstacles();
    if(monkey.isTouching(obstacleGroup)) {
    gameState = END;
  }
    survivalTime= survivalTime+Math.round(getFrameRate()/60)
    }
  //giving the game state as end
   if(gameState === END){
     stroke("white");
     fill("black");
     textSize(15)
     text("Press R to restart",400,20)
    //stop the ground
    monkey.velocityX = 0; 
     ground.velocityX = 0;
  //setting the velocity of the food and obstacle as 0
    obstacleGroup.setVelocityXEach(0);
    foodGroup.setVelocityXEach(0);
    monkey.changeAnimation(monkeyCollide);
   survivalTime = 0;
     if(keyDown("R")){
   gameState = PLAY;
    reset();
      
  }
 
  }
  
  
  drawSprites(); 
}

function reset(){
  gameState = PLAY;
  obstacleGroup.destroyEach();
  foodGroup.destroyEach();
  monkey.changeAnimation("running",monkey_running);
  survivalTime = 0;
}

function food () { if(frameCount % 80 === 0) {
  var banana = createSprite(600,80); banana.addImage("banana",bananaImage); 
  banana.velocityX = -3;
  banana.y = Math.round(random(60,100));
  banana.scale = 0.1;
  banana.lifetime = 150;
  foodGroup.add(banana);
}
 }
function obstacles (){
  if(frameCount % 200 === 0 ) {
    var obstacle = createSprite(600,160);
    obstacle.addImage("obstacle", obstacleImage);
    obstacle.velocityX = -4;
    obstacle.scale= 0.1;
    obstacleGroup.add(obstacle);
  }      
}