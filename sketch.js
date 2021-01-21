var balloon;
var database,position;
var image1,image2,image3,animantion_1,bgimg;

function preload(){
animation_1=loadAnimation("image1.png","image2.png","image3.png")
bgimg=loadImage("Background.png")
}
function setup() {
  createCanvas(1200,800);
  
  database=firebase.database();
  
  balloon=createSprite(400, 400, 50, 50);
  balloon.addAnimation("adding animation",animation_1);
  balloon.scale=0.5

  var balloonPosition=database.ref('balloon/position');
  balloonPosition.on("value",readPosition,showError);

  
}

function draw() {
  background(bgimg);
  if(keyDown(LEFT_ARROW)){
    changePosition(-2,0);
}
else if(keyDown(RIGHT_ARROW)){
    changePosition(2,0);
}
else if(keyDown(UP_ARROW)){
    changePosition(0,-2);
}
else if(keyDown(DOWN_ARROW)){
    changePosition(0,+2);
}
  drawSprites();
}
function changePosition(x,y){
  database.ref('balloon/position').set({
    'x':position.x + x,
    'y':position.y + y
  })
}

function readPosition(data){

  position=data.val();
  balloon.x=position.x;
  balloon.y=position.y;
}
function showError(){
  console.log("There is an error")
}
