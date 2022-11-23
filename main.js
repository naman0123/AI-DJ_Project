shapeOfYou = "";
stay = "";
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
rightWristScore = 0;
songStatus = "";

function preload()
{
    shapeOfYou = loadSound("ShapeOfYou.mp3");
    stay = loadSound("Stay.mp3");
}

function setup()
{
    canvas = createCanvas(700, 500);
    canvas.center();
    
    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.onPose('pose', getPoses);
}

function draw()
{
    image(video, 0, 0, 700, 500);

    if(stay.isPlaying()) {
        songStatus = "stay";
    } else if(shapeOfYou.isPlaying()) {
        songStatus = "shapeOfYou";
    } else if (!(stay.isPlaying() || shapeOfYou.isPlaying())) {
        songStatus = "none";
    }

    if(rightWristScore > 0.2) {
        circle(rightWristX, rightWristY, 20);
        if(songStatus == "shapeOfYou") {
            shapeOfYou.stop();
        }

        if(!(songStatus == "stay")) {
            stay.play();
            document.getElementById("songName").innerHTML = "Playing stay...";
        }
    } else if(leftWristScore > 0.2) {
        circle(leftWristX, leftWristY, 20);
        if(songStatus == "stay") {
            stay.stop();
        }

        if(!(songStatus == "shapeOfYou")) {
            shapeOfYou.play();
            document.getElementById("songName").innerHTML = "Playing shape of you...";
        }
    }
}

function modelLoaded()
{
    console.log("PoseNet is loaded successfully.");
}

function getPoses(results)
{
    if(results.length > 0) {
        console.log(results);
        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("Left wrist X: " + leftWristX + ", Left wrist Y: " + leftWristY + ".");

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("Right wrist X: " + rightWristX + ", Right wrist Y: " + rightWristY + ".");

        rightWristScore = results[0].pose.keypoints[10].score;
        console.log("Right wrist score: " + rightWristScore);

        leftWristScore = results[0].pose.keypoints[9].score;
        console.log("Left wrist score: " + leftWristScore);
    }
}
