img = "";
status = "";
object = [];

function preload()
{
 img = loadImage('BTS-World.jpg');
}

function setup()
{
    canvas = createCanvas(380, 380);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(380,380);
    video.hide();
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects";

}

function modelLoaded()
{
    console.log("Model loaded!")
    status = true;
    
}


function gotResult(error, results) 
{
    if (error) {
        console.log(error);
    }
    console.log(results);
    objects = results;
}
 
function draw()
{
    image(video, 0, 0, 380, 380);
 if(status != "")
 {
     r = random(255);
     g = random(255);
     b = random(255);
     objectDetector.detect(video, gotResult);
    for (i = 0; i < objects.length; i++){
         document.getElementById("status").innerHTML = "Status : Object Detected";
         document.getElementById("number-of-object").innerHTML = " : Number of Object Detected is : "+object.length;

         fill(r,g,b);
         percent = floor(objects[i].confidence * 100);
         text(objects[i].label + "" + percent + "%", objects[i].x + 15, objects[i].y + 15);
         notFill();
         stroke(r,g,b);
         rect(object[i].x, object[i].y, object[i].width, object[i].height);
    } 
  }

    
   

}
