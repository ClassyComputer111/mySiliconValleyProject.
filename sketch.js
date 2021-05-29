const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;

var soldier;
var soldierimgWalkAnimation;
var ground1, ground2;
var ground1img,ground2img;
var terrorist1, terrorist2;
var terrorist1img, terrorist2img;
var life1, life2, life3, life4, life5;
var lifeimg;
var rules, rulesimg;
var gameState = 1;
var Play = 1;
var End = 0;
var beforeStart = 0;
var gameOver, gameOverimg;
var restart, restartimg;
var coin, bush, sign, signArrowimg;
var coinimg, bushimg, signimg, signARROWIMG;
var jump, jumpiconimg;
var obstacles, skeltonimg;
var obstaclesGroup;
var tilesGroup;
var Start, startImg;
var score;
var girl, girlimg;
var trophy, trophyimg;
var sword, swordimg;

// function for loading the images, animations and music for sprites
function preload(){
  backimg = loadImage("images/backimg.png");
  lifeimg = loadImage("images/Lifeimg1.png");
  rulesimg = loadImage("images/Rulesimg.png");
  jumpIconImg = loadImage("images/jumpIconImg.png");
  coinimg = loadImage("images/coinImg.png");
  gameOverimg =loadImage("images/GameOverimg.png");
  restartimg = loadImage("images/restarticonimg.png");
  obstacle1img = loadImage("tiles/1.png");
  obstacle2img = loadImage("tiles/2.png");
  skeltonimg = loadImage("images/skelton.png");
  signimg = loadImage("images/sign.png");
  signArrowimg = loadImage("images/signarrow.png");
  bushimg = loadImage("images/bush.png");
  startIconimg = loadImage("images/startIconImg.png");
  girlimg = loadImage("images/girlimg.png");
  trophyimg = loadImage("images/trophyGif.png");
  swordimg = loadImage("images/swordimg.png");

  soldierWalkAnimation = loadAnimation("soldierWalkImages/Walk 1.png","soldierWalkImages/Walk 2.png",
                        "soldierWalkImages/Walk 3.png",
                        "soldierWalkImages/Walk 4.png",
                        "soldierWalkImages/Walk 5.png",
                        "soldierWalkImages/Walk 6.png", 
                        "soldierWalkImages/Walk 7.png",
                        "soldierWalkImages/Walk 8.png",
                        "soldierWalkImages/Walk 9.png",
                        "soldierWalkImages/Walk 10.png");

    soldierCollidedAnimation = loadAnimation("soldierDeadImages/Dead 1.png","soldierDeadImages/Dead 2.png",
                        "soldierDeadImages/Dead 2.png",
                        "soldierDeadImages/Dead 3.png",
                        "soldierDeadImages/Dead 4.png",
                        "soldierDeadImages/Dead 5.png", 
                        "soldierDeadImages/Dead 6.png",
                        "soldierDeadImages/Dead 7.png",
                        "soldierDeadImages/Dead 8.png",
                        "soldierDeadImages/Dead 9.png",
                        "soldierDeadImages/Dead 10.png");

    soldierJumpAnimation= loadAnimation("soldierJumpImages/Jump 1.png","soldierJumpImages/Jump 1.png",
                        "soldierJumpImages/Jump 2.png",
                        "soldierJumpImages/Jump 3.png",
                        "soldierJumpImages/Jump 4.png",
                        "soldierJumpImages/Jump 5.png", 
                        "soldierJumpImages/Jump 6.png",
                        "soldierJumpImages/Jump 7.png",
                        "soldierJumpImages/Jump 8.png",
                        "soldierJumpImages/Jump 9.png",
                        "soldierJumpImages/Jump 10.png");

   jumpsound = loadSound("sounds/jump.wav");
   loopSound = loadSound("sounds/spooky.wav");
   dieSound = loadSound("sounds/dieSound.wav");
}

  

// function for making sprites and bodies
function setup() {
  engine = Engine.create();
  world = engine.world;

  createCanvas(900,800);
  
  bg = createSprite(900,400,600,600);
  bg.addImage(backimg);
  bg.scale = 5;
  bg.velocityX = -4;
  bg.x = width/2;
  bg.visible = false;

  soldier = createSprite(100,710,50,50);
  soldier.addAnimation("soldier_Walking",soldierWalkAnimation);
  soldier.addAnimation("soldier_Collided",soldierCollidedAnimation);
  soldier.addAnimation("soldier_Jumping",soldierJumpAnimation);

  soldier.scale = 0.2;
  soldier.visible = false;

  sword = createSprite(700,50,10,10);
  sword.addImage(swordimg);
  sword.scale = 0.2;

  rules = createSprite(100,100,20,20);
  rules.addImage(rulesimg);
  rules.scale = 0.5;

  ground1 = createSprite(100,710,80,20);
  ground1.visible = false;

  /*invisibleGround = createSprite(380,475,65,20);
  invisibleGround.visible = true;
  invisibleGround.velocityX = -2;*/

  jumpIcon = createSprite(810,720,50,50);
  jumpIcon.addImage(jumpIconImg);
  jumpIcon.scale = 0.1;
  jumpIcon.visible = false;

  gameOver = createSprite(400,300,30,30);
  gameOver.addImage(gameOverimg);
  gameOver.scale = 2;

  restart = createSprite(400,350,30,30);
  restart.addImage(restartimg);
  restart.scale = 0.1;

  startIcon = createSprite(600,500,30,30);
  startIcon.addImage(startIconimg);
  startIcon.scale = 0.2;
  startIcon.visible = true;

  girl = createSprite(800,650,50,50);
  girl.addImage(girlimg);
  girl.scale = 0.2;
  girl.visible = false;

  coins = createSprite(700,100,10,10);
  coins.addImage(coinimg);
  coins.scale = 0.2;

  weapon = 10;
  coins = 0;

  tilesGroup = createGroup();
  obstaclesGroup = createGroup();
  coinsGroup = createGroup();
  invisibleGGroup = createGroup();
  swordsGroup = createGroup();
  
  soldier.setCollider("rectangle",0,0,soldier.width,soldier.height);
  soldier.debug = true;
  
}

function draw() {
  
    background("white");
    
    

      if(bg.x < 300) {
        bg.x = 500
      }

      text(mouseX+','+ mouseY,mouseX,mouseY);
      Engine.update(engine);

   // making a condtition play which would have a lot of instructions when the game is in play state
      if(gameState === Play){
        jumpIcon.visible = true;
        soldier.visible = true; 
        rules.visible = true;
        startIcon.visible = false;
        ground1.visible = false;
        bg.visible = true;
        gameOver.visible = false;
        restart.visible = false;
      
        if(coinsGroup.isTouching(soldier)){
          coins = coins+1;
          coinsGroup.destroyEach();
        }
        if(swordsGroup.isTouching(soldier)){
          weapon = weapon-1;
          swordsGroup.destroyEach();
        }

        // to make the soldier jump when space key and jumpIcon is pressed
        if(mousePressedOver(jumpIcon)||(keyDown("space"))){
          
          jumpsound.play();
          soldier.collide(invisibleGGroup);
          //soldier.collide(invisibleGGroup)
          soldier.velocityY = -10;
          soldier.changeAnimation("soldier_Jumping",soldierJumpAnimation);
        }
       
       spawnswords();
        spawnTiles();
        spawnObstacles();
      
      }

        

       if(obstaclesGroup.isTouching(soldier)){
        //dieSound.play();
       
        gameState = End;
       }

      else if (gameState === End) {
        
        gameOver.visible = true;
        restart.visible = true;
        jumpIcon.visible = false;
        rules.visible = false;
        
        bg.velocityX = 0;
        // the groups of obstacles,tiles and coins will not get destroy when state is End
        obstaclesGroup.setLifetimeEach(-1);
        tilesGroup.setLifetimeEach(-1);
        coinsGroup.setLifetimeEach(-1);
        swordsGroup.setLifetimeEach(-1);
        invisibleGGroup.setLifetimeEach(-1);
       
        obstaclesGroup.setVelocityXEach(0);
        tilesGroup.setVelocityXEach(0); 
        coinsGroup.setVelocityXEach(0); 
        swordsGroup.setVelocityXEach(0); 
        invisibleGGroup.setVelocityXEach(0); 

        //change the soldier animation
        soldier.changeAnimation("soldier_Collided", soldierCollidedAnimation);
        
        // calling restart function
       if(mousePressedOver(restart)) {
        reset();
        }
      }  
      // it will work only when state is not end and frameCount is 1200
      
      /*
      if(soldier.isTouching(girl)){
        girl.visible = false;
        create sprite for trophy
        display trophy
      }

      */
      // it will work only when soldier touches the girl
      if(soldier.isTouching(girl)) {
        girl.visible = false;
        girl.destroy();
        rules.destroy();
        // create trophy sprite only when frameCount is 1120
        trophy = createSprite(450,350,500,500);
        trophy.addImage(trophyimg);
        trophy.scale = 2;
        soldier.velocityX = 0;

        obstaclesGroup.destroyEach();
        coinsGroup.destroyEach();
        tilesGroup.destroyEach();
        
      }
      // to move the soldier left
        if(keyDown("left_arrow")){
          soldier.x = soldier.x-3;
        }
      // to move the soldier right
      if(keyDown("right_arrow")){
        soldier.x = soldier.x+3;
      }
      // giving the soldier gravity so that when space key is pressed the soldier will not go out of the canvas
      soldier.velocityY = soldier.velocityY+0.5;
    // so the ground1 will also move along with soldier
     ground1.x = soldier.x;
    
    // so that when space key is pressed and soldier will come down he will collide with the ground
     soldier.collide(ground1);

     

     drawSprites();



     // what will happen when mouse is over rules icon
     if(mouseIsOver(rules)){
       
      textSize(28);
      textFont("Cambria")
      text("RULES OF THE GAME",250,150);
  

      //stroke("white")
      fill("indigo");
      textFont("cambria")
      textSize(24);
      text("✨You are the little Knight in this game and have to save the little girl who is ",
      100,200);
  
      fill("indigo");
      textFont("cambria")
      textSize(24);
      text("attacked by some aliens and be aware of the skeltons you will get in your way",100,220);
  
      fill("indigo");
      textFont("cambria")
      textSize(24);
      text("because the skeltons will make you out.",85,240);
  
      fill("green");
      textFont("cambria")
      textSize(24);
      text("✨You can move left, right with the arrow KEYs",80,280);

      fill("orange");
      textFont("cambria")
      textSize(24);
      text("✨You can only jump by pressing space key as well as jumpIcon.",80,310);

      fill("red");
      textFont("cambria")
      textSize(24);
      text("✨You have total 2 tasks after completing both the tasks yo can only see the girl",80,340);

      fill("grey");
      textFont("cambria")
      textSize(24);
      text("🧧1.Collect 20 coins at least .",80,370);

      fill("purple");
      textFont("cambria")
      textSize(24);
      text("🧧2.Make all the swords to come at zero  .",80,390);

  
      fill("Green")
      textSize(25);
      textFont("ALGERIAN")
      text("BEST OF LUCK👍👍👍",250,450);
      
      obstaclesGroup.destroyEach();
      coinsGroup.destroyEach();
      tilesGroup.destroyEach();
      swordsGroup.destroyEach();
      invisibleGGroup.destroyEach();
    }

    if(gameState != End && coins<=50 && weapon===0){ //score>=200
      girl.visible = true;
      bg.velocityX = 0;
      rules.destroy();
      soldier.velocityX = 6;
      stroke("pink")
      fill("red");
      textSize(40);
      textFont("Agency");
      text("Girl Saved", 350,450);
      

      text("👏👏👏", 360,490);

      tilesGroup.destroyEach();
      coinsGroup.destroyEach();
      obstaclesGroup.destroyEach();
      invisibleGGroup.destroyEach();
      swordsGroup.destroyEach();
      

    }


    // texting jump below jump icon
    fill("red");
    textSize(15);
    text("JUMP", 790,760);
    fill("black")
    textSize(18);
    stroke("white")
    fill("red")
    textSize(25);
    textFont("ALGERIAN");
    text("collected: "+ coins, 720,110)
    text("left: "+ weapon, 710,60)

}

// making function reset means everthing will reset when restart icon is pressed
function reset(){
  gameState = Play;
  restart.visible = false;
  gameOver.viisible = false;
  obstaclesGroup.destroyEach();
  bg.velocityX = -5;
  tilesGroup.destroyEach();
  coinsGroup.destroyEach();
  swordsGroup.destroyEach();
  invisibleGGroup.destroyEach();
  soldier.changeAnimation("soldier_Walking",soldierWalkAnimation);
  score = 0;
 
 }
    
 
 function spawnTiles() {
    if(frameCount % 200 === 0){
    var tiles = createSprite(800,500,80,50);
    var coin = createSprite(800,420,10,5);
    var invisibleGround = createSprite(800,474,65,10);
     //invisibleGround.x = tilesGroup.x;
    tiles.addImage(obstacle2img);
    coin.addImage(coinimg);
    tiles.velocityX = -3;
    coin.velocityX = -3;
    invisibleGround.velocityX = -3;
    invisibleGround.visible = false;
//generate random tiles, coins and invisible ground
    var rand = Math.round(random(10,60));
//assign scale and lifetime to the tiles, coins and invisibleGround          
    tiles.scale = 0.5;
    tiles.lifetime = 350;
    coin.scale = 0.5;
    coin.lifetime = 350;
    invisibleGround.lifetime = 350;
 // adding tiles, invisibleGround and coins to the group
    tilesGroup.add(tiles);
    coinsGroup.add(coin);
    invisibleGGroup.add(invisibleGround);
  }
 }

 function spawnObstacles() {
    if(frameCount % 250 === 0){
    var obstacles = createSprite(800,680,10,40);
   
    obstacles.addImage(skeltonimg);
    obstacles.velocityX = -3;
    
 //generate random obstacles
    var rand = Math.round(random(10,90));
//assign scale and lifetime to the obstacle           
    obstacles.scale = 0.5;
    obstacles.lifetime = 350;
// adding obstacles to the group
    obstaclesGroup.add(obstacles);
    
  }
 }

 function spawnswords() {
  if(frameCount % 350 === 0){
  var swords = createSprite(800,600,10,40);
  swords.addImage(swordimg);
  swords.scale = 0.2
  swords.velocityX = -3;
//generate random obstacles
  var rand = Math.round(random(10,90));
  swordsGroup.add(swords);
  swords.lifetime = 500;
}
}

