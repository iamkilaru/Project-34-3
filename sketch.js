//Create variables here
//var hunger;
var feedTime, lastFed;
var nameDoog;
var lifeStatus, databas;
var status = "Your dog";
var dog, feedDog, restock=10, redog;
var dogHunger;
var dogImg10;
var dogImg20;
var hungerInDB;
var input;
var temp;


function preload()
{
  dogImg10 = loadImage("dogImg1.png");
  dogImg20 = loadImage("dogImg.png");
}

function setup() {
  createCanvas(800, 700);

  nameDoog = createInput("Name The Dog");
  nameDoog.position(690,550);

  feedDog = createButton("Feed The Dog");
  feedDog.position(375,50);
  redog = createButton("Restock Food");
  redog.position(475,50);

  databas = firebase.database();
  lifeStatus = databas.ref("dog/life");
  lifeStatus.on("value",readStatus);

  status= "Your dog is fine"
  //console.log("dog hunger = " + dogHunger);
  

  dog = createSprite(400,350,1,1);
  dog.scale = 0.4
  dog.addImage(dogImg10);
}


function draw() {  
  background("cyan");
  textSize(20);
  text("Hunger: "+dogHunger,600,100);
  text("Stock: "+restock,100,100);
  text(status,350,200);
  text("Last Fed Time is " + feedTime,100,600);

  /*if(keyDown("Space")){
    dogHunger--
  }
  */

 if(dogHunger !== undefined){
  if(dogHunger>100){
    dogHunger=100
  }else 
  if((dogHunger<=50)&&(dogHunger>25)){
    status = "Your dog is okay"
  }
  if(dogHunger<=25){
    dog.addImage(dogImg20);
    status= " Your dog is hungry"
  } else 
  if(dogHunger<=0){
    dogHunger=0;
    status= "Your dog is dead."
    dog.destroy();
  }
  if(frameCount % 5184000 === 0){
    dogHunger = dogHunger-2;
    saveInDB(dogHunger,restock,feedTime);
  }
  feedDog.mousePressed(
    function(){
      if(restock>0){
      dogHunger=dogHunger+2;
      restock--;
      saveInDB(dogHunger,restock,feedTime);
      fedTime = houre
      fedTime = database.ref("feedtime");
      fedTime.on("value",function(){
      lastFed = data.val();
      });
      }
    }
  );

    if(restock>10){
      restock=10
    }else if(restock<0){
      restock=0
    }

  redog.mousePressed(
  function(){
      restock++
      saveInDB(dogHunger,restock,feedTime,feedtime);
  }
  );
  drawSprites();
 }
  //add styles here

}

function saveInDB(x,y,z){
  databas.ref("dog/life").set({
    food: y,
    hunger: x,
    feedtime: z
  });
}

function readStatus(data){
  temp=data.val();
  dogHunger = temp.hunger;
  restock = temp.food;
  feedTime = temp.feedtime;
  //console.log("reading from DB. dogHunger = " + temp.hunger);
}

async function hour(){
  var response = await fetch("http://worldtimeapi.org/api/timezone/America/New_York");
  var responseJSON = await response.json();

  var dt = responseJSON.datetime;
  var houre = dt.slice(11, 13);

  feedTime = houre;

}