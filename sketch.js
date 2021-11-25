
var antelopef1, wolf1, bg;
var antelope, wolf;
var obstacle, obstacleGroup
var survivalTime;
var gameState = 1;

function preload() 
{

  bg1 = loadImage("./images/bg.png");
  antelopef1 = loadAnimation("./images/Antelope-1.png","./images/Antelope-2.png","./images/Antelope-3.png","./images/Antelope-4.png")
  antelopef2 = loadAnimation("./images/Antelope-1.png");
  wolf2 = loadAnimation("./images/Wolf-1.png");
  wolf1 = loadAnimation("./images/Wolf-1.png","./images/Wolf-2.png","./images/Wolf-3.png","./images/Wolf-4.png","./images/Wolf-5.png","./images/Wolf-6.png","./images/Wolf-7.png","./images/Wolf-8.png","./images/Wolf-9.png","./images/Wolf-10.png")
  obstacleImage = loadImage("./images/obstacle.png")
}

function setup() 
{

  createCanvas(600,700);

  bg = createSprite(300,350,600,700);
  bg.addImage(bg1);
  bg.scale = 2.;
  bg.velocityY = 1;

  antelope= createSprite(300,100,0,0);
  antelope.addAnimation("antelopef1", antelopef1);
  antelope.setCollider("rectangle", 0,0,100,100);
  //antelope.debug = true;

  wolf = createSprite(305,500, 50, 50);
  wolf.addAnimation("wolfy", wolf1);
  wolf.scale = 2;
  wolf.setCollider("rectangle", 0,0,100,100);
  //wolf.debug = true;

  obstacleGroup=new Group()


}

function obstaclessGroup(){
  if(frameCount % 400 === 0){
    obstacle = createSprite(200,-50,10,40); 
    obstacle.x = Math.round(random(150,450));
    obstacle.velocityY = 1;
    obstacle.addImage(obstacleImage);
    obstacle.scale = 0.30
    obstacleGroup.add(obstacle);

  }
}

function draw() 
{

  background(0); 
  console.log(gameState);
  if(gameState == 1)
  {
    obstaclessGroup();
    bg.velocityY = 1;
  
    if(bg.y > 450)
    {
      bg.y = 350;
    }
  
  if (keyDown("up"))
  {
    wolf.y -= 4;
  }
  if (keyDown("down"))
  {
    wolf.y -= -4;
  }
  if (keyDown("left"))
  {
    wolf.x -= 4;
  }
  if (keyDown("right"))
  {
    wolf.x -= -4;
  }

  if(wolf.isTouching(antelope))
  {
    gameState = 2;
    //console.log("hey")
  }

  if(survivalTime == 10)
  {
    gameState = 3;
  }

  if(wolf.isTouching(obstacleGroup))
  {
    survivalTime += 0.05;
  }
  }

  
  



  drawSprites();

  stroke("black");
  textSize(18);
  fill("black");
  survivalTime=Math.ceil(frameCount/frameRate()) 
  text("Catch the Anelope before it runs away!: "+ survivalTime, 100,50);

  if(gameState == 3)
  {   
    background(0);
    wolf.destroy();
    antelope.destroy();
    stroke("black");
    textSize(35);
    fill("white");
    survivalTime=Math.ceil(frameCount/frameRate()) 
    text(" Time up.. Missed it! ", 100,200);

  }

  if(gameState == 2)
  {
    background(0);
    wolf.destroy();
    antelope.destroy();
    stroke("black");
    textSize(35);
    fill("white");
    survivalTime=Math.ceil(frameCount/frameRate()) 
    text(" You did it..! ", 200,200);  
  }

}
