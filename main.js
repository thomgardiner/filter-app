let image  = "";
let height = 0;
let width = 0;
let userImage = "";
let currentTheme = null;

let canvasImage = new Image();
canvasImage.src = image;
let moustacheImage = new Image();
moustacheImage.src = "images/moustache.png";
let beardImage = new Image();
beardImage.src = "images/beard.png";
let hatImage = new Image();
hatImage.src = "images/hat.png";
let beanieImage = new Image();
beanieImage.src = "images/beanie.png";
let animeHair = new Image();
animeHair.src = "images/anime-hair-md.png";
let glassesImage = new Image();
glassesImage.src = "images/glasses.png";
let rEye = new Image();
rEye.src = "images/monocole.png";
let rEyeA = new Image();
rEyeA.src = "images/anime_eye_left.png";
let lEyeA = new Image();
lEyeA.src = "images/anime_eye_right.png";
let eyebrowL = new Image();
eyebrowL.src = "images/eyebrowL.png"
let eyebrowR = new Image();
eyebrowR.src = "images/eyebrowR.png"


let layer1 = null;
let layer2 = null;
let myLayeredCanvas = null;
let nosePos = null;
let noseTipTop = null;
let noseBridge = null;
let eyeBrowL = null;
let eyeBrowR = null;
let bottomLip = null;
let face = null;
let posx = 0;
let posy = 0;

//API Call

const call = function(){
    $("#image-area").remove();
    image = userImage;
    canvasImage.src = userImage;
    var headers = {
        "Content-type"    : "application/json",
        "app_id"          : "ce71ec90",
        "app_key"         : "205f9b7807db5aa99dfb98a98fb886aa"
    };

    var url = "https://api.kairos.com/v2/media?source=" + image + "&landmarks=1";
    // make request
    $.ajax(url, {
        headers  : headers,
        type: "POST",
        data: JSON.stringify(image),
        dataType: "text",
    }).done(function(response){
        response = JSON.parse(response);

        //populate coordinate variables
        height = response.media_info.height;
        width = response.media_info.width;
        face = response.frames[0].people[0].face;
        nosePos = response.frames[0].people[0].landmarks[14]; //noseTipBottom
        eyeBrowL = response.frames[0].people[0].landmarks[2]; //lInnerRight
        eyeBrowR = response.frames[0].people[0].landmarks[5]; //rInnerLeft
        bottomLip = response.frames[0].people[0].landmarks[38];//lowerLipBottomCenter
        noseTipTop = response.frames[0].people[0].landmarks[11];//noseTipTop
        noseBetweenEyes = response.frames[0].people[0].landmarks[8];//noseBetweenEyes;
        rightEyeCornerLeft = response.frames[0].people[0].landmarks[23];//rightEyeCornerLeft;
        leftEyeCornerRight = response.frames[0].people[0].landmarks[20]; //leftEyeCornerRight;
        
        let canvas = $("<canvas>");
        canvas.attr("id", "image-area");
        canvas.attr("height", height);
        canvas.attr("width", width);
        $("#photo-container").append(canvas);
        myLayeredCanvas = new layeredCanvas("image-area");
        render();
    });
 }



const render = function(){

    myLayeredCanvas.addLayer( 
        { id: 'base',
          show: true,
          render: function(canvas, ctx){
              ctx.drawImage(canvasImage, 0, 0, width, height);
          }
    })
    myLayeredCanvas.render();
}

const drawLayer = function(){
    let canvas = $("<canvas>");
    canvas.attr("id", "drawing-area");
    canvas.attr("height", height);
    canvas.attr("width", width);
    $(".container").append(canvas);
}

const removeCanvas = function(){
    $("#image-area").remove();
}
 
const draw = function(){
    let canvas = document.getElementById('image-area');
    let ctx = canvas.getContext('2d');
    ctx.drawImage(canvasImage, 0, 0, width, height);
}

//image color filters

const grayScale = function(){
    let canvas = document.getElementById('image-area');
    let ctx = canvas.getContext('2d');
    ctx.filter = 'grayscale(100%)';
    myLayeredCanvas.render();
}

const sepia = function(){
    let canvas = document.getElementById('image-area');
    let ctx = canvas.getContext('2d');
    ctx.filter = 'sepia(100%)';
    myLayeredCanvas.render();
}

const contrast = function(){
    let canvas = document.getElementById('image-area');
    let ctx = canvas.getContext('2d');
    ctx.filter = 'contrast(100%)';
    myLayeredCanvas.render();

}

const saturate = function(){
    let canvas = document.getElementById('image-area');
    let ctx = canvas.getContext('2d');
    ctx.filter = 'saturate(100%)';
    myLayeredCanvas.render();
}

//test draw function
const drawR = function(){
    let canvas = document.getElementById('drawing-area');
    let ctx2 = canvas.getContext('2d');
    ctx2.strokeRect(posx,posy,100,100);
}


//draw objects functions

const drawMoustache = function(){
    myLayeredCanvas.removeLayer("moustache");
    myLayeredCanvas.addLayer( 
        { id: 'moustache',
          render: function(canvas, ctx){
              ctx.fillStyle = "#E5E059";
            //   ctx.fillRect(nosePos.noseTipBottom.x-50, nosePos.noseTipBottom.y, 100, 15);
              ctx.drawImage(moustacheImage, nosePos.noseTipBottom.x - face.width * .22, nosePos.noseTipBottom.y - face.height * .04, face.width * .5, face.height * .15);
          }
    })
    myLayeredCanvas.render();
}

const drawEyeBrows = function(){
    myLayeredCanvas.removeLayer("eyebrows");
    myLayeredCanvas.addLayer( 
        { id: 'eyebrows',
          render: function(canvas, ctx){
              ctx.drawImage(eyebrowL, eyeBrowL.leftEyeBrowInnerRight.x-face.width*.15, eyeBrowL.leftEyeBrowInnerRight.y-10, face.width * .20 , face.height * .05);
              ctx.drawImage(eyebrowR, eyeBrowR.rightEyeBrowInnerLeft.x, eyeBrowR.rightEyeBrowInnerLeft.y-10, face.width * .2, face.height * .05);
          }
    })
    myLayeredCanvas.render();
}

const drawNoseItem = function(){
    myLayeredCanvas.removeLayer("nose");
    myLayeredCanvas.addLayer( 
        { id: 'nose',
          render: function(canvas, ctx){
              ctx.fillStyle = "#E5E059";
              //ctx.fillRect(noseTipTop.noseTipTop.x-10, noseTipTop.noseTipTop.y, face.width * .03 , face.height * .03);
              ctx.beginPath();
              ctx.arc(noseTipTop.noseTipTop.x-5,noseTipTop.noseTipTop.y,face.width * .05 ,0,3*Math.PI);
              ctx.stroke();
              ctx.fill();
          }
    })
    myLayeredCanvas.render();
}

const drawGlasses = function(){
    myLayeredCanvas.removeLayer("glasses");
    myLayeredCanvas.addLayer( 
        { id: 'glasses',
          render: function(canvas, ctx){
              ctx.fillStyle = "#E5E059";
              ctx.drawImage(glassesImage, noseBetweenEyes.noseBetweenEyes.x - face.width * .27, noseBetweenEyes.noseBetweenEyes.y - face.height * .08 , face.width * .55 , face.height * .20);
          }
    })
    myLayeredCanvas.render();
}



const drawBeard = function(){
    myLayeredCanvas.removeLayer("beard");
    myLayeredCanvas.addLayer( 
        { id: 'beard',
          render: function(canvas, ctx){
              ctx.fillStyle = "#E5E059";
            //   ctx.fillRect(bottomLip.lowerLipBottomCenter.x-15, bottomLip.lowerLipBottomCenter.y+20, 40, 30);
            ctx.drawImage(beardImage, bottomLip.lowerLipBottomCenter.x-50, bottomLip.lowerLipBottomCenter.y-10, 100, 100);
          }
    })
    myLayeredCanvas.render();
}


const drawHat = function(){
    myLayeredCanvas.removeLayer("hat");
    myLayeredCanvas.addLayer( 
        { id: 'hat',
          render: function(canvas, ctx){
              ctx.fillStyle = "#E5E059";
              ctx.drawImage(hatImage, face.x - face.width * .05 , face.y - face.height * .40 , face.width * 1.3 , face.height * .75);
          }
    })
    myLayeredCanvas.render();
}

const drawBeanie = function(){
    myLayeredCanvas.removeLayer("hat");
    myLayeredCanvas.addLayer( 
        { id: 'hat',
          render: function(canvas, ctx){
              ctx.fillStyle = "#E5E059";
              ctx.drawImage(beanieImage, face.x - face.width * .05 , face.y - face.height * .40 , face.width * 1.3 , face.height * .75);
          }
    })
    myLayeredCanvas.render();
}

const drawAnimeHair = function(){
    myLayeredCanvas.removeLayer("hat");
    myLayeredCanvas.addLayer( 
        { id: 'hat',
          render: function(canvas, ctx){
              ctx.fillStyle = "#E5E059";
              ctx.drawImage(animeHair, face.x - face.width * .05 , face.y - face.height * .15 , face.width * 1.23 , face.height * .75);
          }
    })
    myLayeredCanvas.render();
}

const drawMonocole = function(){
    myLayeredCanvas.removeLayer("rightEye");
    myLayeredCanvas.addLayer( 
        { id: 'rightEye',
          render: function(canvas, ctx){
              ctx.drawImage(rEye, rightEyeCornerLeft.rightEyeCornerLeft.x - face.width * .20, rightEyeCornerLeft.rightEyeCornerLeft.y-face.height * .18, face.width * .7 , face.height * .5);
          }
    })
    myLayeredCanvas.render();
}

const drawAnimeEyes = function(){
    myLayeredCanvas.removeLayer("rightEye");
    myLayeredCanvas.addLayer( 
        { id: 'rightEye',
          render: function(canvas, ctx){
              ctx.drawImage(lEyeA, rightEyeCornerLeft.rightEyeCornerLeft.x - face.width * .04, rightEyeCornerLeft.rightEyeCornerLeft.y-face.height * .15, face.width * .2 , face.height * .22);
              ctx.drawImage(rEyeA, leftEyeCornerRight.leftEyeCornerRight.x - face.width * .19, leftEyeCornerRight.leftEyeCornerRight.y-face.height * .15, face.width * .23 , face.height * .22);
          }
    })
    myLayeredCanvas.render();
}

//clear function and test all function

const clearAll = function(){
    myLayeredCanvas.removeLayer("moustache");
    myLayeredCanvas.removeLayer("eyebrows");
    myLayeredCanvas.removeLayer("beard");
    myLayeredCanvas.removeLayer("hat");
    myLayeredCanvas.removeLayer("glasses");
    myLayeredCanvas.removeLayer("nose");
    myLayeredCanvas.removeLayer("rightEye");
    myLayeredCanvas.render();
}
const drawAll = function(){
    drawMoustache();
    drawEyeBrows();
    drawBeard();
    drawHat();
    drawGlasses();
    drawNoseItem();
    myLayeredCanvas.render();
}



//themes
const drawMonopoly = function(){
clearAll();
currentTheme = "monopoly";
drawMoustache();
drawBeard();
drawHat();
drawEyeBrows();
drawMonocole();
myLayeredCanvas.render();
}

const drawHipster = function(){
clearAll();
currentTheme = "hipster";
drawMoustache();
drawEyeBrows();
drawGlasses();
drawBeanie();
myLayeredCanvas.render();
}

const drawAnime = function(){
clearAll();
currentTheme = "anime";
drawAnimeHair();
drawAnimeEyes();
myLayeredCanvas.render();
}


//button logic

$(document).on('click', "#sepia", function(){
    console.log("hey");
    sepia();
});

$(document).on("click", "#blackWhite", function(){
    console.log("hey");
    grayScale();
});

$(document).on("click", "#normal", function(){
    console.log("hey'");
    saturate();
})

$(document).on("click", "#submit", function(){
    console.log("hey");
    userImage = $("#inputURL").val();
    call();
    $("#inputURL").val("");
})

$(document).on("click", "#theme1", function(){
    clearAll();
    drawMonopoly();

})

$(document).on("click", "#theme2", function(){
    clearAll();
    drawHipster();

})

$(document).on("click", "#theme3", function(){
    clearAll();
    drawAnime();

})

$(document).on("click", "#next", function(){
    if(currentTheme == null){

    }
    else if(currentTheme == "monopoly"){
        drawHipster();
    }
    else if(currentTheme == "hipster"){
        drawAnime();
    }
    else if(currentTheme == "anime"){
        drawMonopoly();
    }
})

$(document).on("click", "#previous", function(){
    if(currentTheme == null){
        
    }
    else if(currentTheme == "monopoly"){
        drawAnime();
    }
    else if(currentTheme == "hipster"){
        drawMonopoly();
    }
    else if(currentTheme == "anime"){
        drawHipster();
    }
})