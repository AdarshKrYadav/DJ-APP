var song="";
var leftwistX=0;
var leftwristY=0;
var rightwristX=0;
var rightwristY=0;
var score_left_wrist=0;
var score_right_wrist=0;
function preload(){
    song=loadSound("music.mp3");
}
function setup(){
    canvas=createCanvas(600,500);
    canvas.center();
    video=createCapture(VIDEO);
    video.hide();
    posenet=ml5.poseNet(video,modelloaded);
    posenet.on("pose",gotposes);
}
function draw(){
    image(video,0,0,600,500);
    fill("#05FCF1");
    stroke("#05FCF1");
    if(score_right_wrist>0.2){
    circle(rightwristX,rightwristY,20);
    if(rightwristY>0 && rightwristY<=100){
      document.getElementById("speed_meter").innerHTML="Speed = 0.5x";
      song.rate(0.5);  
    }
    else if (rightwristY>100 && rightwristY<=200){
        document.getElementById("speed_meter").innerHTML="Speed = 1x";
        song.rate(1);
    }
    else if(rightwristY>200 && rightwristY<=300){
        document.getElementById("speed_meter").innerHTML="Speed = 1.5x";
        song.rate(1.5);
    }
    else if(rightwristY>300 && rightwristY<=400){
        document.getElementById("speed_meter").innerHTML="Speed = 2x";
        song.rate(2);
    }
    else if (rightwristY>400 && rightwristY<=500){
        document.getElementById("speed_meter").innerHTML="Speed = 2.5x";
        song.rate(2.5);
    }
} 

    if(score_left_wrist>0.2){

    
    circle(leftwistX,leftwristY,20);
    number_left=Number(leftwristY);
    remove_deci=floor(number_left);
    volume=remove_deci/500;
    document.getElementById("volmue_meter").innerHTML="Volume = "+volume;
    song.setVolume(volume);
    }
}
function playmusic(){
    song.play();
    song.setVolume(1);
    song.rate(1);

}
function modelloaded(){
    console.log("Model has been loaded");

}
function gotposes(results){
    
    if(results.length>0){
        console.log(results);
        score_left_wrist=results[0].pose.keypoints[9].score;
        console.log("score_left_wrist ="+score_left_wrist);
        leftwistX=results[0].pose.leftWrist.x;
        leftwristY=results[0].pose.leftWrist.y;
        console.log("leftx="+leftwistX+"lefty="+leftwristY);
        rightwristX=results[0].pose.rightWrist.x;
        rightwristY=results[0].pose.rightWrist.y;
        console.log("rightX="+rightwristX+"rightY="+rightwristY);

        score_right_wrist=results[0].pose.keypoints[10].score;
        console.log("score_right_wrist ="+score_right_wrist);

    }
}