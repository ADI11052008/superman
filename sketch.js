var PLAY = 1;
var END = 0;
var gameState = PLAY;
var Count=4
var superman, superman_running, superman_collided;
var ground, invisibleGround, groundImage;

var cloudsGroup
var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4;
var backgroundImg
var score=0;
var jumpSound, collidedSound;

var gameOver, restart;



function preload(){
  
  supermanImage=loadImage("assets/superman.png")
  gameOverImg = loadImage("assets/gameOver.png");
  restartImg = loadImage("assets/restart.png");
  
  laserImage=loadImage("assets/laser.png")
  obstacleImage=loadImage("assets/obstacles.png")
  backgroundImage=loadImage("assets/background.jpg")
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  
  
  // superman.debug=true
  
  invisibleGround = createSprite(width/2,height-10,width,125);  
 invisibleGround.visible=false;
  

 superman=createSprite(100,500)
 superman.addImage(supermanImage)
 superman.scale=0.4;

  
  gameOver = createSprite(width/2,height/2- 50);
  gameOver.addImage(gameOverImg);
  
  restart = createSprite(width/2,height/2);
  restart.addImage(restartImg);
  
  gameOver.scale = 0.5;
  restart.scale = 0.1;

  gameOver.visible = false;
  restart.visible = false;
  
 
  // invisibleGround.visible =false
  obstaclesGroup= new Group()
  bigObstaclesGroup=new Group()
  laserGroup= new Group()
  score = 0;
}

function draw() {
  //superman.debug = true;
  background(backgroundImage);
  textSize(20);
  fill("black")
 
  
  
  if (gameState===PLAY){
   
  
    
    if( keyWentDown("SPACE")  ) {
      
      spawnlaser();
     
       touches = [];
    }

    if(keyDown(UP_ARROW))
    {
      superman.y=superman.y-5
    }

    if(keyDown(DOWN_ARROW))
    {
      superman.y=superman.y+5
    }
    
    /*/if(laserGroup.isTouching(obstaclesGroup))
    {
      score++;
      laserGroup.destroyEach()
    }*/

    if(laserGroup.isTouching(bigObstaclesGroup)){

      laserGroup.destroyEach()
     Count--
     if(Count===0){
       bigObstaclesGroup.destroyEach()
       score=score+10
     }
    }
  
    for(var i=0; i<obstaclesGroup.length;i++){
      if(obstaclesGroup.get(i).isTouching(laserGroup)){
        obstaclesGroup.get(i).destroy()
        laserGroup.destroyEach()
        score=score+5
      }
    }
  
    superman.collide(invisibleGround);
   
    spawnObstacles();
    spawnbigObstacles();
    if(obstaclesGroup.isTouching(superman)){
        
        gameState = END;
    }

if(bigObstaclesGroup.isTouching(superman)){
  gameState= END
}
    
  }
  else if (gameState === END) {
    gameOver.visible = true;
    restart.visible = true;
    
    //set velcity of each game object to 0
  
    superman.velocityY = 0;
    obstaclesGroup.setVelocityXEach(0);
    bigObstaclesGroup.setVelocityXEach(0)
    laserGroup.setVelocityXEach(0);
    
    //change the superman animation
   // superman.changeAnimation("collided",superman_collided);
    
    //set lifetime of the game objects so that they are never destroyed
    obstaclesGroup.setLifetimeEach(-1);
    bigObstaclesGroup.setLifetimeEach(-1)
    laserGroup.setLifetimeEach(-1);
    
    if(mousePressedOver(restart)) {      
      reset();
      touches = []
    }
  }
  
  
  drawSprites();

  text("Score: "+ score,30,50);
}

function spawnlaser() {
  //write code here to spawn the cloud
    var laser = createSprite(superman.x,superman.y,40,10);
   laser.addImage(laserImage)
    laser.velocityX = 5.5;
    laser.scale=0.35
     //assign lifetime to the variable
     laser.lifetime=250
    laserGroup.add(laser);
      
    
   

  
}

function spawnObstacles() {
  
  if(frameCount % 90 === 0) {
    var obstacle = createSprite(displayWidth,height-95,20,30);
    obstacle.setCollider('circle',0,0,45)
    obstacle.addImage(obstacleImage)
    // obstacle.debug = true
   var rand=Math.round(random(50,displayHeight-300))
   obstacle.y=rand
    obstacle.velocityX = -(6 + 3*score/200);
    obstacle.scale = 0.4;
    
    //assign scale and lifetime to the obstacle           
    
    obstacle.lifetime = 300;
    obstacle.depth = superman.depth;
    superman.depth +=1;
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }

  for(var i=0; i<obstaclesGroup.length;i++){
    if(obstaclesGroup.get(i).isTouching(laserGroup)){
      obstaclesGroup.get(i).destroy()
      score=score+5
    }
  }
  
}


function spawnbigObstacles() {
  
  if(frameCount % 450 === 0) {
    var obstacle = createSprite(displayWidth,height-95,20,30);
    obstacle.debug=true
    obstacle.setCollider('circle',0,0,105)
    obstacle.addImage(obstacleImage)
    // obstacle.debug = true
   var rand=Math.round(random(50,displayHeight-300))
   obstacle.y=rand
    obstacle.velocityX = -(6 + 3*score/200);
    obstacle.scale = 4;
    
    //assign scale and lifetime to the obstacle           
    
    obstacle.lifetime = 300;
    obstacle.depth = superman.depth;
    superman.depth +=1;
    restart.depth +=5
    //add each obstacle to the group
    bigObstaclesGroup.add(obstacle);
  }

  for(var i=0; i<bigObstaclesGroup.length;i++){
    if(bigObstaclesGroup.get(i).isTouching(laserGroup)){
      bigObstaclesGroup.get(i).destroy()
      score=score+5
    }
  }
  
}
function reset(){
  gameState = PLAY;
  gameOver.visible = false;
  restart.visible = false;
  
  obstaclesGroup.destroyEach();
  bigObstaclesGroup.destroyEach()
  laserGroup.destroyEach();
  
 
  
  score = 0;
  
}
