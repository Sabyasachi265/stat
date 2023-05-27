function setup(){
    canvas = createCanvas(380, 380);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(380, 380);
    video.hide();
}

function detector(){
    object_detector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("label").innerHTML = "status : detecting objects";
}

img="";
status_ ="";
objects = [];

function modelLoaded(){
    console.log("model is loaded");
    status_=true;
}

function preload(){
    img = loadImage('dog_cat.jpg');
}

function gotResult(error, results){
    if(error){
        console.log(error);
    }
    
    else{
        console.log(results);
        objects=results;
    }
    }

function draw(){
    image(video, 0, 0, 380, 380);
    if(status_!=""){
        r = random(255);
        g = random(255);
        b = random(255);
        object_detector.detect(video, gotResult);
        for(i=0; i < objects.length; i++){
            document.getElementById("label").innerHTML = "Status : Objects Detected";
            document.getElementById("Numberofobjects").innerHTML = "Number of objects detected are : "+objects.length
            fill(r, g, b);
            percent = floor(objects[i].confidence*100);
            text(objects[i].label + " " + percent + "%", objects[i].x, objects[i].y);
            noFill();
            stroke(r, g, b);
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
    }
}

