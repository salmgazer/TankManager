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
  var link = "controller/tanks.php?cmd=3&";
  var strUrl = link+"secretKey="+secretKey;

  var objResult = sendRequest(strUrl);
  if(objResult.result == 1){
    window.location.href = "#homepage";
    return;
  }
  alert("Wrong password");
  return;
}

function homeTanks(){
  var strUrl = "controller/tanks.php?cmd=2";

  var objResult = sendRequest(strUrl);
  if(objResult.result == 1){
    var tanks = objResult.tanks;
    var tankHTML = "";
    for (var i = 0; i < tanks.length; i++) {
      tankHTML += '<li data-role="collapsible" class="singleTank" data-iconpos="right" data-inset="true"><h2>'+tanks[i]['tank_id']+':<strong class="tank-status">'+tanks[i]['tank_status']+'</strong></h2>Tank ID: <strong id="tank-id">'+tanks[i]['tank_status']+'</strong><br>Date submitted: <strong id="date-added">'+tanks[i]['date_added']+'</strong><br>Tank status: <strong id="tank-status">'+tanks[i]['tank_status']+'</strong></li>';
    }
    document.getElementById('homeTankList').innerHTML = tankHTML;
    return;
  }
  alert(objResult.message);
  return;
}
