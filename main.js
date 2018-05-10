let image  = "http://i0.kym-cdn.com/photos/images/original/000/855/203/b60.png";
let height = 0;
let width = 0;

let canvasImage = new Image();
canvasImage.src = image;

let layer1 = null;
let layer2 = null;
let myLayeredCanvas = null;

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
    }).addLayer( 
        { id: 'drawing',
          show: true,
          render: function(canvas, ctx){
              ctx.fillStyle = "#E5E059";
              ctx.fillRect(0, 0, 100, 100);
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

const newPos = function(){
    posx=+100;
    posy=+100;
}

const drawR = function(){
    let canvas = document.getElementById('drawing-area');
    let ctx2 = canvas.getContext('2d');
    ctx2.strokeRect(posx,posy,100,100);
}

const reDrawRec = function(){
    myLayeredCanvas.removeLayer("drawing");
    myLayeredCanvas.addLayer( 
        { id: 'drawing',
          render: function(canvas, ctx){
              ctx.fillRect(480, 292, 100, 25);
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

