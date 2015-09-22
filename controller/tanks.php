<?php session_start();

include 'adb.php';
$datamaster = new adb();

if(!isset($_REQUEST['cmd'])){
	echo '{"result": 0, "message": "Unknown command!"}';
	return;
}

if($_REQUEST['cmd'] == 1){
	if(isset($_REQUEST['tank_id']) && isset($_REQUEST['tank_status'])){
	$tank_id = $_REQUEST['tank_id'];
	$tank_status = $_REQUEST['tank_status'];

	$str_sql = "";

	if (isset($_REQUEST['date_added'])) {
		$date_added = $_REQUEST['date_added'];
		$str_sql = "INSERT INTO mw_tanks_report(tank_id, tank_status, date_added) VALUES ( '$tank_id', '$tank_status', '$date_added')";
	}else{
		$str_sql = "INSERT INTO mw_tanks_report(tank_id, tank_status) VALUES ('$tank_id', '$tank_status')";
	}
		if ($datamaster->query($str_sql)) {
			echo '{"result": 1, "message": "Success!"}';
			return;
		}
		echo '{"result": 0, "message": "Failed to make entry. Try again!"}';
		return;
}
echo '{"result": 0, "message": "Failed. Not all data were sent"}';
return;
}
//Get dataset

else if ($_REQUEST['cmd'] == 2) {
	$str_sql = "SELECT * FROM mw_tanks_report order by date_added desc limit 0,15";
	$datamaster->query($str_sql);
	$row = $datamaster->fetch();
	if($row == null){
		echo '{"result": 0, "message": "No tanks entered!"}';
		return;
	}
	echo '{"result": 1, "tanks": [';
	while ($row) {
		echo json_encode($row);
		$row = $datamaster->fetch();
		if($row){
			echo ",";
		}
	}
	echo ']}';
	return;
}

else if ($_REQUEST['cmd'] == 7) {
	$str_sql = "SELECT * FROM mw_tanks_report order by date_added desc";
	$datamaster->query($str_sql);
	$row = $datamaster->fetch();
	if($row == null){
		echo '{"result": 0, "message": "No tanks entered!"}';
		return;
	}
	echo '{"result": 1, "tanks": [';
	while ($row) {
		echo json_encode($row);
		$row = $datamaster->fetch();
		if($row){
			echo ",";
		}
	}
	echo ']}';
	return;
}

else if($_REQUEST['cmd'] == 3){
	$secretKey = "caspertanks123";
	$sentKey = $_REQUEST['secretKey'];
	if($secretKey == $sentKey){
		$_SESSION['signed'] = "yes";
		echo '{"result": 1, "message": "true"}';
		return;
	}
	echo '{"result": 0, "message": "false"}';
	return;
}

else if($_REQUEST['cmd'] == 4){
	$str_sql = "select tank_id from mw_tanks_report";
	$datamaster->query($str_sql);
	$row = $datamaster->fetch();
	if($row == null){
		echo '{"result": 0, "message": "No tanks added yet!"}';
		return;
	}
	echo '{"result": 1, "tanks": [';
	while($row){
		echo json_encode($row);
		$row = $datamaster->fetch();
		if($row){
			echo ',';
		}
	}
	echo ']}';
	return;
}
else if($_REQUEST['cmd'] == 6){
	session_destroy();
	return;
}

else if($_REQUEST['cmd'] == 5){

	$tank_id = $_REQUEST['tank_id'];

	$str_sql = "SELECT * FROM mw_tanks_report where tank_id='$tank_id'";
	$datamaster->query($str_sql);
	$row = $datamaster->fetch();
if($row != null){
		echo '{"result": 0, "message": "Tank ID already exists"}';
		return;
	}

	$str_sql = "INSERT INTO mw_tanks_report(tank_id, tank_status) VALUES ('$tank_id', 'New tank')";
	if($datamaster->query($str_sql)){
		echo '{"result": 1, "message": "Successfully added tank"}';
		return;
	}
	echo '{"result": 0, "message": "Could not add tank. Try again!"}';
	return;
}
?>
