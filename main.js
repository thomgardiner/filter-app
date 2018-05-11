let image  = "http://i0.kym-cdn.com/photos/images/original/000/855/203/b60.png";
let height = 0;
let width = 0;

let canvasImage = new Image();
canvasImage.src = image;

let moustacheImage = new Image();
moustacheImage.src = "moustache.png";

let beardImage = new Image();
beardImage.src = "beard.png";

let hatImage = new Image();
hatImage.src = "hat.png";

let layer1 = null;
let layer2 = null;
let myLayeredCanvas = null;

let nosePos = null;
let eyeBrowL = null;
let eyeBrowR = null;
let bottomLip = null;
let face = null;
let posx = 0;
let posy = 0;

const call = function(){

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
        console.log(response);
        console.log(response.frames[0].people[0]);
        console.log("the image size is " + height + " " + width);

        // $(".container").append();
        let canvas = $("<canvas>");
        canvas.attr("id", "image-area");
        canvas.attr("height", height);
        canvas.attr("width", width);
        $(".container").append(canvas);
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
 
const draw = function(){
    let canvas = document.getElementById('image-area');
    let ctx = canvas.getContext('2d');
    ctx.drawImage(canvasImage, 0, 0, width, height);
}

const drawR = function(){
    let canvas = document.getElementById('drawing-area');
    let ctx2 = canvas.getContext('2d');
    ctx2.strokeRect(posx,posy,100,100);
}

const drawMoustache = function(){
    myLayeredCanvas.removeLayer("mustache");
    myLayeredCanvas.addLayer( 
        { id: 'mustache',
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
              ctx.fillRect(eyeBrowL.leftEyeBrowInnerRight.x-face.width*.15, eyeBrowL.leftEyeBrowInnerRight.y-10, face.width * .20 , face.height * .09);
              ctx.fillRect(eyeBrowR.rightEyeBrowInnerLeft.x, eyeBrowR.rightEyeBrowInnerLeft.y-10, face.width * .2, face.height * .09);
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

const drawAll = function(){
    drawMoustache();
    drawEyeBrows();
    drawBeard();
    drawHat();

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

