shapeOfYou = "";
stay = "";
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;

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
    }
}
