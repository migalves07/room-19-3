var trex,trex_collided,trex_running;
var cidade,dinheiro,carro1,carro3;
var cidadeImg,carroImg,carro2Img
var pontuação = 0;
var estadojogo = "jogando"
var restart;
var restarts;
var carro;
var grupocarro;

function preload(){
 trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
 trex_collided = loadImage("trex_collided.png");
 cidadeImg = loadImage("cidade.png");
 carro2Img = loadImage("carro3.png");
 carroImg = loadImage("carro1.png");
 carro2Img = loadImage("carro3.png");
 restart = loadImage("restart.png");
}
function obstaculos(){
  if (frameCount%320 == 0){
    carro = createSprite(490,260,20,20);
    carro.velocityX = -2;
    var aleatorio = round(random(1,2));
    switch(aleatorio){
      case 1:carro.addImage(carroImg);
      carro.scale = 0.15
      break;
      case 2:carro.addImage(carro2Img);
      carro.scale = 0.50
      break;
      default:break;
    }
   grupocarro.add(carro);
   
  }
 
}
function setup() {
 
  createCanvas(500,300);

  cidade = createSprite(500,120);
  cidade.addImage(cidadeImg);
  cidade.velocityX = -4;
  invisibleGround = createSprite(200,260,400,10);
  invisibleGround.visible = false;
  cidade.x = cidade.width /2;
  trex = createSprite(40,260,50,20);
  trex.addAnimation("running", trex_running);
  trex.scale = 0.3;
  trex.addAnimation("collided",trex_collided);
  restarts = createSprite(50,50,10,30);
  restarts.scale = 0.4;
  restarts.addImage("carregar",restart);
  grupocarro = createGroup();
  trex.debug = true
  trex.setCollider("circle",0,0,25)
}

function draw(){
  background(255)
  
  
  console.log(trex.y)
  if(estadojogo == "jogando"){
    restarts.visible = false
     if(keyDown("space")&&trex.y>100) {
     trex.velocityY = -24;
     
     }
          
        trex.velocityY = trex.velocityY + 0.9 
           
        
        if(cidade.x < 200){
        cidade.x = cidade.width /2;
      }
      
    obstaculos();
     
     if(grupocarro.isTouching(trex)){
      estadojogo = "FimDeJogo"
    }
  }
  if(estadojogo == "FimDeJogo"){
  restarts.visible = true
  cidade.velocityX = 0
  trex.changeAnimation("collided",trex_collided);
  grupocarro.setVelocityXEach(0)
 }
  if(mousePressedOver(restarts)){
    trex.changeAnimation("running", trex_running);
    grupocarro.destroyEach()
    estadojogo = "jogando"
    console.log(estadojogo)
    cidade.x = cidade.width /2;
    cidade.velocityX = -4;
  }
  


trex.collide(invisibleGround);
drawSprites();

}



