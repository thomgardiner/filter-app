let image  = "";
let image2 = "https://media.npr.org/assets/img/2014/10/30/ts_photo_pr0500_0878_hirescrop-copy-97a9f606ce59a8f05c0ab40eda3ce85726c00ab2-s900-c85.jpg";
let image3 = "https://www.thewrap.com/wp-content/uploads/2017/09/GeorgeClooney1.jpg";
let image4 = "https://scontent-ort2-2.xx.fbcdn.net/v/t1.0-1/24774761_1724922097558404_117716619849696876_n.jpg";
let image5= "http://news.mit.edu/sites/mit.edu.newsoffice/files/styles/news_article_image_top_slideshow/public/images/2018/MIT-Schmidt-Fellow_0.jpg";
let height = 0;
let width = 0;


let userImage = "";

let hatBank = [{name: "tophat",
               src: "hat.png"}]
let eyebrowBank = [{name: "brows",
                    src: "eyebrows.png"} ];
let moustacheBank = [{name: "pencil-stache",
                      src: "moustache.png"}];
let beardBank = [{name: "goatee",
                  src: "beard.png"}];

let canvasImage = new Image();
canvasImage.src = image;

let moustacheImage = new Image();
moustacheImage.src = "moustache.png";

let beardImage = new Image();
beardImage.src = "beard.png";

let hatImage = new Image();
hatImage.src = "hat.png";

let glassesImage = new Image();
glassesImage.src = "glasses.png";

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
        dataType: "text"
    }).done(function(response){
        response = JSON.parse(response);
        height = response.media_info.height;
        width = response.media_info.width;
        face = response.frames[0].people[0].face;
        nosePos = response.frames[0].people[0].landmarks[14]; //noseTipBottom
        eyeBrowL = response.frames[0].people[0].landmarks[2]; //lInnerRight
        eyeBrowR = response.frames[0].people[0].landmarks[5]; //rInnerLeft
        bottomLip = response.frames[0].people[0].landmarks[38];//lowerLipBottomCenter
        noseTipTop = response.frames[0].people[0].landmarks[11];//noseTipTop
        noseBetweenEyes = response.frames[0].people[0].landmarks[8];//noseBetweenEyes;

        console.log(response);
        console.log(response.frames[0].people[0]);
        console.log("the image size is " + height + " " + width);

        // $(".container").append();
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

const drawR = function(){
    let canvas = document.getElementById('drawing-area');
    let ctx2 = canvas.getContext('2d');
    ctx2.strokeRect(posx,posy,100,100);
}

const drawMoustache = function(){
    myLayeredCanvas.removeLayer("moustache");
    myLayeredCanvas.addLayer( 
        { id: 'moustache',
          render: function(canvas, ctx){
              ctx.fillStyle = "#E5E059";
            //   ctx.fillRect(nosePos.noseTipBottom.x-50, nosePos.noseTipBottom.y, 100, 15);
              ctx.drawImage(moustacheImage, nosePos.noseTipBottom.x-50, nosePos.noseTipBottom.y, 100, 15);
          }
    })
    myLayeredCanvas.render();
}

const drawEyeBrows = function(){
    myLayeredCanvas.removeLayer("eyebrows");
    myLayeredCanvas.addLayer( 
        { id: 'eyebrows',
          render: function(canvas, ctx){
              ctx.fillStyle = "#E5E059";
              ctx.fillRect(eyeBrowL.leftEyeBrowInnerRight.x-face.width*.15, eyeBrowL.leftEyeBrowInnerRight.y-10, face.width * .20 , face.height * .05);
              ctx.fillRect(eyeBrowR.rightEyeBrowInnerLeft.x, eyeBrowR.rightEyeBrowInnerLeft.y-10, face.width * .2, face.height * .05);
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
              ctx.arc(noseTipTop.noseTipTop.x-5,noseTipTop.noseTipTop.y,face.width * .05 ,0,2*Math.PI);
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

const clearAll = function(){
    myLayeredCanvas.removeLayer("moustache");
    myLayeredCanvas.removeLayer("eyebrows");
    myLayeredCanvas.removeLayer("beard");
    myLayeredCanvas.removeLayer("hat");
    myLayeredCanvas.removeLayer("glasses");
    myLayeredCanvas.removeLayer("nose");
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

const drawHat = function(){
    myLayeredCanvas.removeLayer("hat");
    myLayeredCanvas.addLayer( 
        { id: 'hat',
          render: function(canvas, ctx){
              ctx.fillStyle = "#E5E059";
              ctx.drawImage(hatImage, face.x, face.y - face.height * .50 , face.width * .75 , face.height * .75);
          }
    })
    myLayeredCanvas.render();
}



$(document).ready( function() {
    $( 'input' ).change( function() {
        $( 'input' ).each( function() {
            var layerName = $(this).attr( 'id' );
            var thisLayer = myCanvas.getLayer( layerName );
            if ( $(this).prop( 'checked' ) ) {
                thisLayer.show = true;
            } else {
                thisLayer.show = false;
            }
        });
    });
});


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
    drawAll();
})

$(document).on("click", "#theme2", function(){
    All();
})