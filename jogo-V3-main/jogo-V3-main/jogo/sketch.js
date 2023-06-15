var fundo;
var bk;
var invisibleground;
var princess, princessImg, princessJumpImg, princessCry;
var enemy1,enemy2,enemy3,enemy4,enemy5;
var coin;

function preload(){
  fundo= loadImage("fundomario1.png");
  princessImg= loadAnimation("prin1.png","prin2.png");
  princessJumpImg = loadAnimation("prinjump1.png","prinjump2.png","prinjump2.png","prinjump2.png","prinjump2.png","prinjump2.png","prinjump2.png","prinjump2.png","prinjump2.png");
  princessCry = loadAnimation("cry.png");
  coin = loadImage("moeda.png");
  enemy1 = loadImage("inimigoss1.png");
  enemy2 = loadImage("inimigoss3.png"); 
  enemy3 = loadImage("inimigoss4.png");
  enemy4 = loadImage("inimigoss5.png");
  enemy5 = loadImage("inimigoss6.png");
}
function setup(){
  createCanvas(windowWidth,windowHeight);

  bk = createSprite(width/2 ,height/2,width,height)
  bk.addImage("fundo",fundo)
  bk.scale = 3.0;
  bk.x = bk.width/2 + 600;
  bk.velocityX = -4;

  princess = createSprite(70, height-35, 40,40);
  princess.addAnimation("princesa", princessImg);
  princess.addAnimation("jump", princessJumpImg);
  princess.addAnimation("cry", princessCry);
  princess.scale = 0.3

  invisibleground = createSprite(0,height-35, 800, 10);
  invisibleground.visible = false;

  rewardGroup = new Group();
  obsGroup = new Group();
  obs1Group = new Group();
}
function draw(){

  background(0);
  if(bk.x < 520){
    bk.x = bk.width/2 +600;
  }

  princess.changeAnimation("princesa");
    
if(keyDown("SPACE")){
  princess.velocityY = -15;
  princess.changeAnimation("jump");
}

princess.velocityY = princess.velocityY+1;

princess.collide(invisibleground);

obstacles(80,100,500, enemy1, 0.3, -5, 300, obsGroup)
reward();
obstacles(150,height-65,height-65, enemy3, 0.3, -7, 300, obs1Group)

if(rewardGroup.isTouching(princess)){
  rewardGroup.destroyEach();
  console.log("+1");
}

if(obsGroup.isTouching(princess)){
  princess.changeAnimation("cry");
}

  drawSprites();
  
}

/* fc = quantidade de frames para os obstaculos serem gerados
 valor1 e valor2 = posições dos obstaculos
inimigos = imagens dos obstaculos
velocidade = velocidade dos obstaculos
tempovida = tempo de vida dos sprites

*/
function obstacles(fc, valor1, valor2, inimigos, tamanho, velocidade, tempovida, obstaclesGroup){
  if(frameCount % fc === 0){
    var obstaculo = createSprite(width, height, 50,50);
    obstaculo.y = Math.round(random(valor1,valor2));
    obstaculo.addImage(inimigos);
    obstaculo.scale = tamanho;
    obstaculo.velocityX = velocidade;

    obstaculo.lifetime = tempovida;

    obstaclesGroup.add(obstaculo);
  }
}

function reward(){
  if(frameCount % 300 === 0){
    var dindin = createSprite(width, Math.round(random(500, 350)),40,40);
    dindin.addImage(coin);
    dindin.scale = 0.1;
    dindin.velocityX = -3;
    dindin.lifetime = 400;
    rewardGroup.add(dindin);
  }
}