const call = function(){

    var headers = {
        "Content-type"    : "application/json",
        "app_id"          : "ce71ec90",
        "app_key"         : "205f9b7807db5aa99dfb98a98fb886aa"
    };
    var image  = "https://media.kairos.com/liz.jpg";
    var url = "https://api.kairos.com/v2/media?source=" + image + "&landmarks=1";
    // make request
    $.ajax(url, {
        headers  : headers,
        type: "POST",
        // data: JSON.stringify(image),
        // dataType: "text"
    }).done(function(response){
        response = JSON.parse(response);
        console.log(response);
        console.log(response.frames[0].people[0].face);
    });
 }
 