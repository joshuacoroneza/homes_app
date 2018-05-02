<?php
	session_start();
	require 'functions/functions.php';
	if (isset($_SESSION['user_id'])){
	   $user_data=user_data($_SESSION['user_id'],'user_id','fname','mname','lname','username','password');
	}
?>