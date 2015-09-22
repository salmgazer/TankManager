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
    $('#loginForm').submit(function(e) {
      e.preventDefault();
      logIn($("#secretKey").val());
    });
});

$(function() {
    $('#newTankForm').submit(function(e) {
      e.preventDefault();
      addNewTank($('#new_tank_id').val());
    });
});

$(function() {
    $('#viewAll').click(function(e) {
      alert("here");
      viewAll();
    });
});

$(function() {
    $('#newEntryForm').submit(function(e) {
      e.preventDefault();
      var tank_id = document.getElementById('addedTanks').options[document.getElementById('addedTanks').selectedIndex].text;
      var tank_status = $('#tank_status').val();
      addNewEntry(tank_id, tank_status);
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

function viewAll(){
  var strUrl = "controller/tanks.php?cmd=7";

  var objResult = sendRequest(strUrl);
  if(objResult.result == 1){
    var tanks = objResult.tanks;
    var tankHTML = "";
    for (var i = 0; i < tanks.length; i++) {
      tankHTML += '<li data-role="collapsible" class="singleTank" data-iconpos="right" data-inset="true"><h2>'+tanks[i]['tank_id']+':<strong class="tank-status">'+tanks[i]['tank_status']+'</strong></h2>Tank ID: <strong id="tank-id">'+tanks[i]['tank_status']+'</strong><br>Date submitted: <strong id="date-added">'+tanks[i]['date_added']+'</strong><br>Tank status: <strong id="tank-status">'+tanks[i]['tank_status']+'</strong></li>';
    }
    document.getElementById('homeTankList').innerHTML = tankHTML;
    document.getElementById('viewAllBtnArea').innerHTML = "";
    return;
  }
  alert(objResult.message);
  return;
}

function signout(){
  /*var strUrl = "controller/tanks.php?cmd=6";

  var objResult = sendRequest(strUrl);
  */
  document.getElementById('secretKey').value = "";
  window.location.href = "#loginpage";
  return;
}

function getTanks(){
  var strUrl = "controller/tanks.php?cmd=4";

  var objResult = sendRequest(strUrl);
  if(objResult.result == 1){
    var tanks = objResult.tanks;
    var tankHTML = "";
    for (var i = 0; i < tanks.length; i++) {
      var val = i + 1;
      tankHTML += '<option value="'+val+'">'+tanks[i]['tank_id']+'</option>';
    }
    document.getElementById('addedTanks').innerHTML = tankHTML;
    return;
  }
  document.getElementById("formArea").innerHTML = "<h1>NO TANKS YET! CLICK ADD TANK ABOVE TO ADD NEW TANKS</h1>";
  return;
}

function addNewEntry(tank_id, tank_status){
var strUrl = "controller/tanks.php?cmd=1&tank_id="+tank_id+"&tank_status="+tank_status;

var objResult = sendRequest(strUrl);
if(objResult.result == 1){
  homeTanks();
  window.location.href = "#homepage";
  return;
}
alert(objResult.message);
return;
//store to file
}

function addNewTank(tank_id){
  var strUrl = "controller/tanks.php?cmd=5&tank_id="+tank_id;

  var objResult = sendRequest(strUrl);

  if(objResult.result == 0){
    alert(objResult.message);
    return;
  }
  alert(objResult.message);
  window.location.href = "#homepage";
  return;
}
