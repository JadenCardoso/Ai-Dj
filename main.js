song = "";
const element = document.getElementById("Dropdown");
    const checkText = element.options[element.selectedIndex].text;
    console.log(checkText);
function preload(){
    song = loadSound("Harry Potter.mp3");
}

score_rightWrist = "";
score_leftWrist = "";
leftWristX = "";
leftWristY = "";
rightWristX = "";
rightWristY = "";

function copy(){
 song = loadSound(document.getElementById("Dropdown").value + ".mp3")
}

function setup(){
    canvas = createCanvas(600, 500);
    canvas.position(370, 290);

    video = createCapture(VIDEO);
    video.hide();

    posenet = ml5.poseNet(video, modelLoaded);
    posenet.on('pose', gotPoses);
}

function modelLoaded(){
    console.log("posenet is initialised");
}

function gotPoses(results){
    if (results.length > 0){
        console.log(results);
        score_rightWrist = results[0].pose.keypoints[10].score;
        score_leftWrist = results[0].pose.keypoints[9].score;
        console.log(score_leftWrist + ", " + score_rightWrist);
        leftWristX = results[0].pose.leftWrist.x;
        leftWristY= results[0].pose.leftWrist.y;
        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log(leftWristX + ", " + leftWristY);
        console.log(rightWristX + ", " + rightWristY);
    }
}

function draw(){
    image(video, 0, 0, 600, 500);

    fill("#FF0000");
    stroke("#FF0000");

    if (score_rightWrist > 0.2){
        circle(rightWristX, rightWristY, 20);

        if (rightWristY > 0 && rightWristY <= 100){
            document.getElementById("speed").innerHTML = "Speed = 0.5x";
            song.rate(0.5);
        }
        else if (rightWristY > 100 && rightWristY <= 200){
            document.getElementById("speed").innerHTML = "Speed = 1x";
            song.rate(1);
        }
        else if (rightWristY > 200 && rightWristY <= 300){
            document.getElementById("speed").innerHTML = "Speed = 1.5x";
            song.rate(1.5);
        }
        else if (rightWristY > 300 && rightWristY <= 400){
            document.getElementById("speed").innerHTML = "Speed = 2x";
            song.rate(2);
        }
        else if (rightWristY > 400){
            document.getElementById("speed").innerHTML = "Speed = 2.5x";
            song.rate(2.5);
        }
    }

    if (score_leftWrist > 0.2){
        circle(leftWristX, leftWristY, 20);
        numberLeftWristY = Number(leftWristX);
        NoDecimalsLeftY = floor(numberLeftWristY);
        LeftWristVolume = NoDecimalsLeftY / 500;
        document.getElementById("volume").innerHTML = "Volume = " + LeftWristVolume;
        song.setVolume(LeftWristVolume);
    }
}

function play(){
    song.play();
    song.setVolume(1);
    song.rate(1);
}
