var person, road, car;
var personImg, roadImg, carImg;
var score = 0;
var personGroup;

var gameOver, restart;
var gameOverImg, restartImg;
var PLAY=1;
var END=0;
var gameState = PLAY;



function preload(){

    personImg = loadImage("person.png");
    roadImg = loadImage("car-images-main/track.png");
    carImg = loadImage("car.png");

    gameOverImg = loadImage("gameOver.png");
    restartImg = loadImage("restart.png");


}



function setup() {
    createCanvas(windowWidth, windowHeight);

    road = createSprite(windowWidth/2, windowHeight/2, windowWidth*2, windowHeight*2);
    
    road.addImage("road", roadImg);
    road.scale = 2;
    road.velocityY = 2+ (3*score/100);
    
    
    car = createSprite(200, 550, 20, 35);
    car.addImage(carImg);
    car.scale = 0.3;
    
    gameOver = createSprite(300,100);
    gameOver.addImage(gameOverImg);
  
    restart = createSprite(300,140);
    restart.addImage(restartImg);

    personGroup = new Group();

}



function draw() {
    background("white");
    console.log(road.velocityY);
    
    

    fill("white");
    text("Score: "+score, 525, 50);
    road.velocityY = 2+ (3*score/100);

    if(gameState === PLAY){
      
        gameOver.visible = false;
        restart.visible = false;
        
        score = score + Math.round(getFrameRate()/60);

        car.x = World.mouseX;
    
    
        if(road.y > windowHeight-200){
            road.y = windowHeight/2;
        }

        if(personGroup.isTouching(car)){
            gameState = END;
        }
        spawnPeople();
       
    } 
       else if(gameState === END){
        
        gameOver.visible = true;
        restart.visible = true;
       
        road.velocityY = 0;
         
        personGroup.setVelocityEach(0);
        
        if(mousePressedOver(restart)){
            reset();
          }
       }


       
    
       drawSprites();
    
}
    




function reset(){
    gameState = PLAY;
    road.velocityY = 2;
    gameOver.visible = false;
    restart.visible = false;
    personGroup.destroyEach();
    score=0;
}


function spawnPeople(){
    
    if (frameCount % 60 === 0) {
      person = createSprite(400, -10, 10 , 40);
      person.x = Math.round(random(70,530));
      person.addImage(personImg);
      person.scale = 0.1;
      person.velocityY = 4;

      person.lifetime = 200;

      personGroup.add(person);

    }




}   
    
