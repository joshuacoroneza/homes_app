<?php 
function dbconnect(){
	$dbhost= "localhost";
	$dbuser = "root";
	$dbpass = "";
	$dbname = "homes";
	$connection = mysqli_connect($dbhost,$dbuser,$dbpass,$dbname);
	if(mysqli_connect_errno()){
		die("Error"); 
	}else{
		return $connection;
		//echo 'connected';
	}
}

function verify($uname,$enteredpword){
	$connection = dbConnect(); //Get connection
	$query = "SELECT * FROM user WHERE username = '$uname' AND type='Admin'"; //Check if entered username is existing.
	$result = mysqli_query($connection,$query);
	if(mysqli_num_rows($result) > 0){
		$row=mysqli_fetch_assoc($result);
			$lname = $row['lname'];
			$fname = $row['fname'];
			$user_id = $row['user_id'];
			$uname = $row['username'];
			$pword = $row['password'];
			$type = $row['type'];
		if($enteredpword === $pword){
			global $user_data;
			// $query = "UPDATE user SET stat='on' WHERE user_id='$user_id'";
			// $query_result = mysqli_query($connection,$query);
			session_start();

			$_SESSION['user_id'] = $user_id;
			$_SESSION['type'] = $type;

			header("Location: dashboard.php");
		}else{
			return 'x_password';
		}
	}else{
		return 'x_username';
	}
	// CREATE QUEry
	
}

//USERDATA
function user_data($user_id){
	$connection = dbConnect();
	$data=array();
	$user_id=(int)$user_id;
	$func_num_args=func_num_args();
	$func_get_args=func_get_args();
  	if($func_num_args > 1){
	    unset($func_get_args[0]);
	    $fields="" . implode(", ", $func_get_args) . "";
	    $query="SELECT * FROM user where user_id=$user_id";
	    $result = mysqli_query($connection,$query);
		$data = mysqli_fetch_assoc($result);
	    return $data;
  	}
}

//Username exist
function uname_exists($uname){
	$connection = dbConnect();
  	$uname=sanitize($uname);
  	$query = mysqli_query($connection,("Select * from user where username='$uname'"));
      	return ((mysqli_num_rows($query)==1) ? true : false);
      	//echo "Select count(user_id) from user where id_number='$id_number'";
}

//ADD USER
function add_admin($data){
	$connection = dbConnect();
	$myinputs = filter_var_array($data,FILTER_SANITIZE_STRING); 
	$fields="".implode(", ",array_keys($myinputs))."";
	$data='\'' . implode('\', \'', $myinputs) .'\'';
	$query_result = mysqli_query($connection,"INSERT INTO user ($fields) values ($data)");
	// test query result
 		if(!$query_result){
 			return "e";
 		}else{
 			return "s";
 		}
}

//SANITIZE
function sanitize($data){
	$connection = dbConnect();
  		return htmlentities(strip_tags(mysqli_real_escape_string($connection,$data)));
}

//Username exist
function edit_uname_exists($uname,$user_id){
	$connection = dbConnect();
  	$uname=sanitize($uname);
  	$query = mysqli_query($connection,("Select * from user where username='$uname' AND user_id<>'$user_id'"));
      	return ((mysqli_num_rows($query)==1) ? true : false);
      	//echo "Select count(user_id) from user where id_number='$id_number'";
}

function update_admin($details){
	$connection = dbConnect();
	$user_id = $details['user_id'];
	$update=array();
	$myinputs = filter_var_array($details,FILTER_SANITIZE_STRING); 
	foreach($details as $field=>$data){
	 $update[]="" . $field . " ='" . $data . "'";
	}
	$query_result = mysqli_query($connection,"UPDATE user SET " . implode(', ', $update) . " WHERE user_id = $user_id");
	// test query result
 		if(!$query_result){
 			return 'e';
 		}else{
 			return "s";
 		}
}

//DELETE USER
function delete_admin($id){
	$connection = dbConnect();
	$query_result = mysqli_query($connection,"DELETE FROM user WHERE user_id=$id");
	// test query result
}


?>