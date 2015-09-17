function sendRequest(u){
    // Send request to server
    //u a url as a string
    //async is type of request
    var obj=$.ajax({url:u,async:false});
    //Convert the JSON string to object
    var result=$.parseJSON(obj.responseText);
    return result;	//return object

}

$(function() {
    $('#loginbtn').click(function(e) {
      logIn($("#secretKey").val());
    });
});

function logIn(secretKey){
  var link = "http://10.10.33.191/mw/tanks.php?cmd=3&";
  var strUrl = link+"secretKey="+secretKey;
  alert(strUrl);
  var objResult = sendRequest(strUrl);
  if(objResult.result == 1){
    alert(objResult.message);
    return;
  }
  alert(objResult.message);
  return;
}
