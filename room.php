<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>HOMES | Tenants</title>
  <!-- Tell the browser to be responsive to screen width -->
  <?php include 'inc/header.php';?>
  <style type="text/css">
     .hovereffect {
      width: 100%;
      height: 100%;
      float: left;
      overflow: hidden;
      position: relative;
      text-align: center;
      cursor: default;
    }

    .hovereffect .overlay {
      width: 100%;
      height: 100%;
      position: absolute;
      overflow: hidden;
      top: 0;
      left: 0;
      opacity: 0;
      filter: alpha(opacity=0);
      background-color: rgba(0,0,0,0.5);
      -webkit-transition: all 0.4s cubic-bezier(0.88,-0.99, 0, 1.81);
      transition: all 0.4s cubic-bezier(0.88,-0.99, 0, 1.81);
    }

    .hovereffect img {
      display: block;
      position: relative;
      -webkit-transition: all 0.4s cubic-bezier(0.88,-0.99, 0, 1.81);
      transition: all 0.4s cubic-bezier(0.88,-0.99, 0, 1.81);
    }

    .hovereffect h2 {
      text-transform: uppercase;
      color: #fff;
      text-align: center;
      position: relative;
      font-size: 17px;
      background: rgba(0,0,0,0.6);
      -webkit-transform: translatey(-100px);
      -ms-transform: translatey(-100px);
      transform: translatey(-100px);
      -webkit-transition: all 0.4s cubic-bezier(0.88,-0.99, 0, 1.81);
      transition: all 0.4s cubic-bezier(0.88,-0.99, 0, 1.81);
      padding: 10px;
    }

    .hovereffect a.info {
      text-decoration: none;
      display: inline-block;
      text-transform: uppercase;
      color: #fff;
      border: 1px solid #fff;
      background-color: transparent;
      opacity: 0;
      filter: alpha(opacity=0);
      -webkit-transition: all 0.4s ease;
      transition: all 0.4s ease;
      margin: 50px 0 0;
      padding: 7px 14px;
    }

    .hovereffect a.info:hover {
      box-shadow: 0 0 5px #fff;
    }

    .hovereffect:hover img {
      -ms-transform: scale(1.2);
      -webkit-transform: scale(1.2);
      transform: scale(1.2);
    }

    .hovereffect:hover .overlay {
      opacity: 1;
      filter: alpha(opacity=100);
    }

    .hovereffect:hover h2,.hovereffect:hover a.info {
      opacity: 1;
      filter: alpha(opacity=100);
      -ms-transform: translatey(0);
      -webkit-transform: translatey(0);
      transform: translatey(0);
    }

    .hovereffect:hover a.info {
      -webkit-transition-delay: .2s;
      transition-delay: .2s;
    }
  </style>
</head>
<body class="hold-transition skin-blue sidebar-mini">
<div class="wrapper">

  <header class="main-header">

    <!-- Logo -->
    <a href="index2.html" class="logo">
      <!-- mini logo for sidebar mini 50x50 pixels -->
           <span class="logo-mini"><b>H</b>LOMES</span>
      <!-- logo for regular state and mobile devices -->
      <span class="logo-lg"><b> <img src='images/logo.png' style="margin-top: -4px;">
HOMES</b></span>
    </a>

    <?php include 'inc/nav.php';?>
  </header>
  <!-- Left side column. contains the logo and sidebar -->
  <aside class="main-sidebar">
    <!-- sidebar: style can be found in sidebar.less -->
    <section class="sidebar">
      <!-- Sidebar user panel -->
      <div class="user-panel">
        <div class="pull-left image">
          <img src="dist/img/user2-160x160.jpg" class="img-circle" alt="User Image">
        </div>
        <div class="pull-left info">
          <p><?php echo $user_data['fname'].' '.$user_data['lname']; ?></p>
          <a href="#"><i class="fa fa-circle text-success"></i> Online</a>
        </div>
      </div>
      <!-- search form -->
      <form action="#" method="get" class="sidebar-form">
        <div class="input-group">
          <input type="text" name="q" class="form-control" placeholder="Search...">
          <span class="input-group-btn">
                <button type="submit" name="search" id="search-btn" class="btn btn-flat">
                  <i class="fa fa-search"></i>
                </button>
              </span>
        </div>
      </form>
      <!-- /.search form -->
      <!-- sidebar menu: : style can be found in sidebar.less -->
      <ul class="sidebar-menu" data-widget="tree">
        <li class="header">MAIN NAVIGATION</li>
        <li><a href="dashboard.php"><i class="fa fa-dashboard"></i> <span>Dashboard</span></a></li>
        <li class="treeview">
          <a href="#">
            <i class="fa fa-users"></i> <span>Users</span>
            <span class="pull-right-container">
              <i class="fa fa-angle-left pull-right"></i>
            </span>
          </a>
          <ul class="treeview-menu">
            <li class=""><a href="admin.php"><i class="fa fa-user"></i> Administrators</a></li>
            <li class=""><a href="homeowner.php"><i class="fa fa-user"></i> Home Owners</a></li>
            <li class="active"><a href="tenants.php"><i class="fa fa-user"></i> Tenants</a></li>
          </ul>
        </li>

        <li><a href="request.php"><i class="fa fa-envelope"></i> <span>Requests</span></a></li>
        <li><a href="chat.php"><i class="fa fa-wechat"></i> <span>Chat</span></a></li>
        <li class="active"><a href="house.php"><i class="fa fa-home"></i> <span>Boarding House</span></a></li>
        <li><a href="accounts.php"><i class="fa fa-book"></i> <span>Accounts</span></a></li>
      </ul>
    </section>
    <!-- /.sidebar -->
  </aside>

  <!-- Content Wrapper. Contains page content -->
  <div class="content-wrapper">
    <!-- Content Header (Page header) -->
    <section class="content-header">
      <h1>
        Boarding House Details
      </h1>
      <ol class="breadcrumb">
        <li><a href="#"><i class="fa fa-dashboard"></i> Dashboard</a></li>
        <li>Boarding House</li>
        <li class="active">Boarding House Details</li>
      </ol>
    </section>

    <!-- Main content -->


              <?php 
                if(isset($_POST['btn-add'])){

                    function GetImageExtension($imagetype){
                      if(empty($imagetype)) return false;
                          switch($imagetype){
                             case 'image/bmp': return '.bmp';
                             case 'image/gif': return '.gif';
                             case 'image/jpeg': return '.jpg';

                             case 'image/png': return '.png';
                             default: return false;
                      }
                    }

                $house_id = $_REQUEST['id'];
                $image_name=addslashes($_FILES['img']['name']);
                $file_name=$_FILES["img"]["name"];
                $temp_name=$_FILES["img"]["tmp_name"];
                $imgtype=$_FILES["img"]["type"];
                $ext= GetImageExtension($imgtype);
                $image_name = randLetter().$image_name;
                $target_path = "rooms/".$image_name;

                $image_name1=addslashes($_FILES['img_360']['name']);
                $file_name1=$_FILES["img_360"]["name"];
                $temp_name1=$_FILES["img_360"]["tmp_name"];
                $imgtype1=$_FILES["img_360"]["type"];
                $ext1= GetImageExtension($imgtype1);
                $image_name1 = randLetter().$image_name1;
                $target_path1 = "rooms/".$image_name1;


                    if($ext === false OR $ext1 === false){
                                   
                        $cookie_value = "Invalid file(s)!"; setcookie('e', $cookie_value, time() + (5), "/");
                    }else{
                         if(move_uploaded_file($temp_name, $target_path)) {
                            if(move_uploaded_file($temp_name1, $target_path1)) {


                                       $data=array(
                                          'r_title' => $_POST['r_title'],
                                          'r_description' => $_POST['r_description'],
                                          //'r_price' => $_POST['r_price'],
                                          // 'r_status' => $_POST['r_status'],
                                          'r_img' => $image_name,
                                          'r_360' => $image_name1,
                                          'house_id' => $house_id,
                                      );
                                          $result = add_room($data);


                                          if($result == 'e'){
                                              $cookie_value = "There was an error!"; setcookie('e', $cookie_value, time() + (5), "/");
                                            header('location: room.php');
                                          }else{
                                            echo '<script> window.location.href="bedspace.php?id='.$result.'";</script>';
                                          }
                          }
                    }
                  }
                }

///
                if(isset($_POST['btn-add-rule'])){
                  $house_id = $_REQUEST['id'];
                              $data=array(
                                'h_rule' => $_POST['h_rule'],
                                'house_id' => $house_id,
                              );
                                  $result = add_rule($data);

                                  if($result == 'e'){
                                      $cookie_value = "There was an error!"; setcookie('e', $cookie_value, time() + (5), "/");
                                    header('location: room.php?id='.$house_id);
                                  }else{
                                    echo '<script> alert("New Rule Added!");

                                    window.location.href="room.php?id='.$house_id.'";</script>';
                                  }
                }


                if(isset($_POST['btn-edit'])){
                   $data=array(
                      'r_title' => $_POST['r_title'],
                      'r_description' => $_POST['r_description'],
                      'house_id' => $_POST['house_id'],
                      'room_id' => $_POST['room_id'],
                    );
                    $result = update_room($data);
                    if($result == 'e'){
                        $cookie_value = "There was an error!"; setcookie('e', $cookie_value, time() + (5), "/");
                      header('location: room.php?id='.$_POST['house_id']);
                    }else{
                      $cookie_value = "Room Updated!"; setcookie('s', $cookie_value, time() + (5), "/");
                      header('location: room.php?id='.$_POST['house_id']);
                    }
                }

                if(isset($_POST['btn-editimg'])){

                    function GetImageExtension($imagetype){
                      if(empty($imagetype)) return false;
                          switch($imagetype){
                             case 'image/bmp': return '.bmp';
                             case 'image/gif': return '.gif';
                             case 'image/jpeg': return '.jpg';

                             case 'image/png': return '.png';
                             default: return false;
                      }
                    }
                $image_name=addslashes($_FILES['img']['name']);
                $file_name=$_FILES["img"]["name"];
                $temp_name=$_FILES["img"]["tmp_name"];
                $imgtype=$_FILES["img"]["type"];
                $ext= GetImageExtension($imgtype);
                $image_name = randLetter().$image_name;
                $target_path = "rooms/".$image_name;


                    if($ext === false){
                                   
                        $cookie_value = "Invalid file(s)!"; setcookie('e', $cookie_value, time() + (5), "/");
                    }else{
                     if(move_uploaded_file($temp_name, $target_path)) {
                        $data=array(
                            'r_img' => $image_name,
                            'room_id' => $_POST['room_id'],
                        );
                        $result = update_room($data);


                        if($result == 'e'){
                          $cookie_value = "There was an error!"; setcookie('e', $cookie_value, time() + (5), "/");
                          header('location: room.php?id='.$_POST['house_id']);
                        }else{
                          unlink("rooms/".$_POST['current_img']);
                          $cookie_value = "Image Updated!"; setcookie('s', $cookie_value, time() + (5), "/");
                          header('location: room.php?id='.$_POST['house_id']);
                          
                        }
                    }
                  }
                }

                if(isset($_POST['btn-edit360'])){

                    function GetImageExtension($imagetype){
                      if(empty($imagetype)) return false;
                          switch($imagetype){
                             case 'image/bmp': return '.bmp';
                             case 'image/gif': return '.gif';
                             case 'image/jpeg': return '.jpg';

                             case 'image/png': return '.png';
                             default: return false;
                      }
                    }
                $image_name1=addslashes($_FILES['img_360']['name']);
                $file_name1=$_FILES["img_360"]["name"];
                $temp_name1=$_FILES["img_360"]["tmp_name"];
                $imgtype1=$_FILES["img_360"]["type"];
                $ext1= GetImageExtension($imgtype1);
                $image_name1 = randLetter().$image_name1;
                $target_path1 = "rooms/".$image_name1;


                    if($ext1 === false){
                                   
                        $cookie_value = "Invalid file(s)!"; setcookie('e', $cookie_value, time() + (5), "/");
                    }else{
                        if(move_uploaded_file($temp_name1, $target_path1)) {


                                   $data=array(
                                      'r_360' => $image_name1,
                                      'room_id' => $_POST['room_id'],
                                  );
                                      $result = update_room($data);


                                      if($result == 'e'){
                                        $cookie_value = "There was an error!"; setcookie('e', $cookie_value, time() + (5), "/");
                                        header('location: room.php?id='.$_POST['house_id']);
                                      }else{
                                        unlink("rooms/".$_POST['current_img']);
                                        $cookie_value = "Image 360 Updated!"; setcookie('s', $cookie_value, time() + (5), "/");
                                        header('location: room.php?id='.$_POST['house_id']);
                                        
                                      }
                      }
                  }
                }




                  if(isset($_POST['btn-delete'])){
                    $house_id = $_POST['house_id'];
                        delete_room($_POST['id']);
                        $cookie_value = "Room Deleted!"; setcookie('s', $cookie_value, time() + (5), "/");
                        header('location: room.php?id='.$house_id);
                                   
                  }
              ?>


    <div class="modal fade" id="modal-add">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span></button>
                <h4 class="modal-title">Add Room</h4>
              </div>

              <form class="form-horizontal" method="POST" enctype="multipart/form-data">
                <div class="modal-body">
                 <!-- form start -->
                
                    <div class="box-body">
                      <div class="form-group">
                        <label for="inputEmail3" class="col-sm-3 control-label">Title<span class="text-red">*</span></label>

                        <div class="col-sm-9">
                          <input type="text" class="form-control" placeholder="Title" name="r_title" required>
                        </div>
                      </div>
                      <div class="form-group">
                        <label for="inputEmail3" class="col-sm-3 control-label">Description<span class="text-red">*</span></label>

                        <div class="col-sm-9">
                          <textarea class="form-control" placeholder="Desription" name="r_description" required></textarea>
                        </div>
                      </div>

                      <div class="form-group">
                        <label for="inputPassword3" class="col-sm-3 control-label">Image<span class="text-red">*</span></label>
                          <div class="col-md-9">
                            <img class="col-md-12" src="images/placeholder.png" style="border: 1px solid #d2d6de; max-width: 100%; max-height: 300px;" id="target">
                          <div class="row"></div><br>
                          <input type="file" class="form-control" name="img" id="src" required>
                          </div>
                      </div>

                      <div class="form-group">
                        <label for="inputPassword3" class="col-sm-3 control-label">Image 360<span class="text-red">*</span></label>
                          <div class="col-md-9">
                            <img class="col-md-12" src="images/placeholder.png" style="border: 1px solid #d2d6de; max-width: 100%; max-height: 100px;" id="target1">
                          <div class="row"></div><br>
                          <input type="file" class="form-control" name="img_360" id="src1" required>
                          </div>
                      </div>


                    </div>
                  
                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-default pull-left" data-dismiss="modal">Close</button>
                  <button type="submit" class="btn btn-primary" name='btn-add'>Save</button>
                </div>
              </form>
            </div>
            <!-- /.modal-content -->
          </div>
          <!-- /.modal-dialog -->
        </div>
        <!-- /.modal -->


        <div class="modal fade" id="modal-add-rules">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span></button>
                <h4 class="modal-title">Add Rule</h4>
              </div>

              <form class="form-horizontal" method="POST">
                <div class="modal-body">
                 <!-- form start -->
                
                    <div class="box-body">
                      <div class="form-group">
                        <label for="inputEmail3" class="col-sm-3 control-label">Content<span class="text-red">*</span></label>

                        <div class="col-sm-9">
                           <textarea class="form-control" placeholder="Content" name="h_rule" required></textarea>
                        </div>
                      </div>

                    </div>
                  
                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-default pull-left" data-dismiss="modal">Close</button>
                  <button type="submit" class="btn btn-primary" name='btn-add-rule'>Save</button>
                </div>
              </form>
            </div>
            <!-- /.modal-content -->
          </div>
          <!-- /.modal-dialog -->
        </div>
        <!-- /.modal -->


    <section class="content">
      <div class="box">
            <div class="box-header">
              <h3 class="box-title">Boarding House Details</h3>
            </div>
            <!-- /.box-header -->
            <?php
              $house_id = $_REQUEST['id'];
              $sql = "SELECT * FROM house h LEFT JOIN user u ON u.user_id = h.h_homeowner_id where house_id = '$house_id'";
                    $query_result = mysqli_query($connection,$sql);
                    while($row = mysqli_fetch_array($query_result)){
                      $h_title = $row['h_title'];
                      $h_description = $row['h_description'];
                      $h_img = $row['h_img'];
                      $h_homeowner = $row['fname'].' '.$row['mname'].' '.$row['lname'];
                    }

                       
                    

            ?>
            <div class="box-body">
              <div class="btn-group pull-right btn-sm">
                  <button type="button" class="btn btn-info btn-flat">Action</button>
                  <button type="button" class="btn btn-info btn-flat dropdown-toggle" data-toggle="dropdown">
                    <span class="caret"></span>
                    <span class="sr-only">Toggle Dropdown</span>
                  </button>
                  <ul class="dropdown-menu" role="menu">
                    <li><a href="#" data-toggle="modal" data-target="#modal-add">Add Room</a></li>
                    <li><a href="#" data-toggle="modal" data-target="#modal-add-rules">Add House Rules</a></li>
                  </ul>
                </div>
              
              <?php  if(isset($_REQUEST)){ ?>
                 <!-- Portfolio Item Row -->
     
        <div class="row">
            <div class="col-md-8" style="margin-top: 55px;">
              <center>

                <div id="carousel-example-generic" class="carousel slide" data-ride="carousel">
                    <!-- Indicators -->
                    <ol class="carousel-indicators">
                        <li data-target="#carousel-example-generic" data-slide-to="0" class="active"></li>
                        <li data-target="#carousel-example-generic" data-slide-to="1"></li>
                        <li data-target="#carousel-example-generic" data-slide-to="2"></li>
                    </ol>

                    <!-- Wrapper for slides -->
                    <div class="carousel-inner">
                        <div class="item active">
                            <a target="_blank" <?php echo "href='houses/$h_img'"; ?>><img class="img-responsive" src="houses/<?php echo $h_img; ?>" alt="Room 1" style="max-width: 1024px; max-height: 768px;"></a>
                        </div>
                        <div class="item">
                            <a target="_blank" <?php echo "href='houses/$h_img'"; ?>><img class="img-responsive" src="houses/<?php echo $h_img; ?>" alt="Room 1" style="max-width: 1024px; max-height: 768px;"></a>
                        </div>
                        <div class="item">
                            <a target="_blank" <?php echo "href='houses/$h_img'"; ?>><img class="img-responsive" src="houses/<?php echo $h_img; ?>" alt="Room 1" style="max-width: 1024px; max-height: 768px;"></a>
                        </div>
                        
                </div>
            </div>
            <div class="carousel-inner" role="listbox">

                    <!-- single slide -->
                    <div class="item active"  style="background-image: url(houses/<?php echo $h_img; ?>);">
                        <div class="carousel-caption">
                            <h2 data-wow-duration="700ms" data-wow-delay="500ms" class="wow bounceInDown animated">Welcome to<span><br>The Luxury Grand Hotel</span>!</h2>
                            <h3 data-wow-duration="1000ms" class="wow slideInLeft animated"><span class="color">/Your</span> All-In Experience .</h3>
                            <p  data-wow-duration="1000ms" class="wow slideInRight animated">Chosen by a million of travels</p>

                            <ul class="social-links text-center">
                                <li><a href=""><i class="fa fa-twitter fa-lg"></i></a></li>
                                <li><a href=""><i class="fa fa-facebook fa-lg"></i></a></li>
                                <li><a href=""><i class="fa fa-google-plus fa-lg"></i></a></li>
                                <li><a href=""><i class="fa fa-dribbble fa-lg"></i></a></li>
                            </ul>
                        </div>
                    </div>
                    </div>
            <h3><?php echo $h_title; ?></h3>
                <p>Property of <?php echo $h_homeowner; ?></p>
                <p><?php echo $h_description ?></p>
              </center>
        </div>


        <div class="col-md-4">
          <div class="box-header with-border">

              <h3 class="box-title"><?php $rules_count = count_rules($house_id); if($rules_count == 0) echo 'No Rule Added'; else echo 'House Rules';?></h3>
            </div>
            <!-- /.box-header -->
            <div class="box-body">
              <ol>
                <?php
                  $house_id = $_REQUEST['id'];
                  $sql2 = "SELECT * FROM rule where house_id = '$house_id'";
                        $query_result2 = mysqli_query($connection,$sql2);
                        while($row2 = mysqli_fetch_array($query_result2)){
                          $h_rule = $row2['h_rule'];
                          echo "<li>".$h_rule."</li>";
                        }
                ?>
               
              </ol>
            </div>
        </div>

            <div class="col-md-12"> <hr>
                   
                    <h2><center><?php $rooms_count = count_all_rooms($house_id); if($rooms_count == 0) echo 'No Room Added'; else echo 'List of Rooms';?></center></h2>
                    <div class="row"><br></div>
                   
                          <?php
                            $sql1 = "SELECT * FROM room where house_id = '$house_id'";
                              $query_result1 = mysqli_query($connection,$sql1);
                              while($row1 = mysqli_fetch_array($query_result1)){
                                $room_id = $row1['room_id'];
                                $r_title = $row1['r_title'];
                                //$r_price = $row1['r_price'];
                                $r_stat = $row1['r_status'];
                                $r_img = $row1['r_img'];
                                $r_360 = $row1['r_360'];
                                $r_description = $row1['r_description'];
                                if($r_stat == 'Available'){
                                  $box_stat = 'box-primary';
                                }else{
                                  $box_stat = 'box-danger';
                                }


                                $available_bedspace = get_available_bedspace($room_id);
                                if($available_bedspace == 0 || $available_bedspace == 1) $available_bedspace_label = 'bedspace'; else $available_bedspace_label = 'bedspaces';

                                $unavailable_bedspace = get_unavailable_bedspace($room_id);
                                if($unavailable_bedspace == 0 || $unavailable_bedspace == 1) $unavailable_bedspace_label = 'bedspace'; else $unavailable_bedspace_label = 'bedspaces';
                                 
                          ?>

                    <div class="col-lg-3">
                        <div class="hovereffect">
                            <img class="img-responsive" src="rooms/<?php echo $r_img; ?>" alt="IMG" style="height: 200px;">
                            <div class="overlay">
                               <h2><a href="bedspace.php?id=<?php echo $room_id; ?>"><?php echo $r_title; ?></a></h2>
                               <a class="info" target="_blank" <?php echo "href='dem.php?src=rooms/$r_360'"; ?>>View 360</a>
                            </div>
                        </div>
                        <div class="btn-group pull-left btn-sm">
                            <button type="button" class="btn btn-success btn-flat btn-sm">Action</button>
                            <button type="button" class="btn btn-success btn-flat dropdown-toggle btn-sm" data-toggle="dropdown">
                              <span class="caret"></span>
                              <span class="sr-only">Toggle Dropdown</span>
                            </button>
                            <ul class="dropdown-menu" role="menu" style="border: 1px green solid">
                              <li><a href="#" data-toggle="modal" data-target="#modal-edit<?php echo $room_id; ?>">Edit Details</a></li>
                              <li><a href="#" data-toggle="modal" data-target="#modal-editimg<?php echo $room_id; ?>">Update Image</a></li>
                              <li><a href="#" data-toggle="modal" data-target="#modal-edit360<?php echo $room_id; ?>">Update Image 360</a></li>
                              <li><a href="#" data-toggle="modal" data-target="#modal-delete<?php echo $room_id; ?>">Delete</a></li>
                            </ul>
                          </div>
                          <center>


                            <h4>&nbsp;<br></h4><br>

                            <b><?php echo $r_title.'</b>'; ?><br>
                            <?php echo $available_bedspace.' '.$available_bedspace_label.' available<br>'.
                                      $unavailable_bedspace.' '.$unavailable_bedspace_label.' unavailable<br>'.$r_description; ?><br>
                          </center>

                          
                       
                    </div>


                    <div class="modal fade" id="modal-edit<?php echo $room_id; ?>">
                      <div class="modal-dialog">
                        <div class="modal-content">
                          <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                              <span aria-hidden="true">&times;</span></button>
                            <h4 class="modal-title">Edit Room</h4>
                          </div>

                          <form class="form-horizontal" method="POST" enctype="multipart/form-data">
                            <div class="modal-body">
                             <!-- form start -->
                            
                                <div class="box-body">
                                  <div class="form-group">
                                    <label for="inputEmail3" class="col-sm-3 control-label">Title<span class="text-red">*</span></label>

                                    <div class="col-sm-9">
                                      <input type="text" class="form-control" placeholder="Title" name="r_title" required value="<?php echo $r_title; ?>">
                                      <input type="hidden" name="house_id" value="<?php echo $house_id; ?>">
                                      <input type="hidden" name="room_id" value="<?php echo $room_id; ?>">
                                    </div>
                                  </div>

                                  <div class="form-group">
                                    <label for="inputEmail3" class="col-sm-3 control-label">Description<span class="text-red">*</span></label>

                                    <div class="col-sm-9">
                                      <textarea class="form-control" placeholder="Desription" name="r_description" required><?php echo $r_description; ?></textarea>
                                    </div>
                                  </div>

                                </div>
                              
                            </div>
                            <div class="modal-footer">
                              <button type="button" class="btn btn-default pull-left" data-dismiss="modal">Close</button>
                              <button type="submit" class="btn btn-primary" name='btn-edit'>Save</button>
                            </div>
                          </form>
                        </div>
                        <!-- /.modal-content -->
                      </div>
                      <!-- /.modal-dialog -->
                    </div>
                    <!-- /.modal -->

                    <div class="modal fade" id="modal-editimg<?php echo $room_id; ?>">
                      <div class="modal-dialog">
                        <div class="modal-content">
                          <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                              <span aria-hidden="true">&times;</span></button>
                            <h4 class="modal-title">Update <?php echo $r_title; ?> Profile</h4>
                          </div>

                          <form class="form-horizontal" method="POST" enctype="multipart/form-data">
                            <div class="modal-body">
                             <!-- form start -->
                            
                                <div class="box-body">

                                  <div class="form-group">
                                    <label for="inputPassword3" class="col-sm-3 control-label">Image<span class="text-red">*</span></label>
                                      <div class="col-md-9">
                                        <img class="col-md-12" src="rooms/<?php echo $r_img; ?>" style="border: 1px solid #d2d6de; max-width: 100%; max-height: 300px;" id="target2">
                                      <div class="row"></div><br>
                                      <input type="file" class="form-control" name="img" id="src2" required>
                                      <input type="hidden" class="form-control" name="house_id" value="<?php echo $house_id; ?>">
                                      <input type="hidden" class="form-control" name="room_id" value="<?php echo $room_id; ?>">
                                      <input type="hidden" class="form-control" name="current_img" value="<?php echo $r_img; ?>">
                                      </div>
                                  </div>
                                </div>
                              
                            </div>
                            <div class="modal-footer">
                              <button type="button" class="btn btn-default pull-left" data-dismiss="modal">Close</button>
                              <button type="submit" class="btn btn-primary" name='btn-editimg'>Save</button>
                            </div>
                          </form>
                        </div>
                        <!-- /.modal-content -->
                      </div>
                      <!-- /.modal-dialog -->
                    </div>
                    <!-- /.modal -->

                    <div class="modal fade" id="modal-edit360<?php echo $room_id; ?>">
                      <div class="modal-dialog">
                        <div class="modal-content">
                          <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                              <span aria-hidden="true">&times;</span></button>
                            <h4 class="modal-title">Update <?php echo $r_title; ?> 360 Profile</h4>
                          </div>

                          <form class="form-horizontal" method="POST" enctype="multipart/form-data">
                            <div class="modal-body">
                             <!-- form start -->
                            
                                <div class="box-body">
                                  <div class="form-group">
                                    <label for="inputPassword3" class="col-sm-3 control-label">Image 360<span class="text-red">*</span></label>
                                      <div class="col-md-9">
                                        <img class="col-md-12" src="rooms/<?php echo $r_360; ?>" style="border: 1px solid #d2d6de; max-width: 100%; max-height: 100px;" id="target3">
                                      <div class="row"></div><br>
                                      <input type="file" class="form-control" name="img_360" id="src3">
                                      <input type="hidden" class="form-control" name="house_id" value="<?php echo $house_id; ?>">
                                      <input type="hidden" class="form-control" name="room_id" value="<?php echo $room_id; ?>">
                                      <input type="hidden" class="form-control" name="current_img" value="<?php echo $r_360; ?>">
                                      </div>
                                  </div>


                                </div>
                              
                            </div>
                            <div class="modal-footer">
                              <button type="button" class="btn btn-default pull-left" data-dismiss="modal">Close</button>
                              <button type="submit" class="btn btn-primary" name='btn-edit360'>Save</button>
                            </div>
                          </form>
                        </div>
                        <!-- /.modal-content -->
                      </div>
                      <!-- /.modal-dialog -->
                    </div>
                    <!-- /.modal -->



                    


                    <div class="modal fade modal-danger" id="modal-delete<?php echo $room_id; ?>">
                      <div class="modal-dialog">
                        <div class="modal-content">
                          <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                              <span aria-hidden="true">&times;</span></button>
                            <h4 class="modal-title">Delete Room</h4>
                          </div>

                          <form class="form-horizontal" method="POST">
                            <div class="modal-body">
                             <!-- form start -->
                            
                                <div class="box-body">
                                  <input type="hidden" name="id" value="<?php echo $room_id; ?>">
                                  <input type="hidden" name="house_id" value="<?php echo $_GET['id']; ?>">
                                  <h3>Delete <?php echo $r_title; ?>?</h3>
                                </div>
                              
                            </div>
                            <div class="modal-footer">
                              <button type="button" class="btn btn-outline pull-left" data-dismiss="modal">Close</button>
                              <button type="submit" class="btn btn-outline" name='btn-delete'>Delete</button>
                            </div>
                          </form>
                        </div>
                        <!-- /.modal-content -->
                      </div>
                      <!-- /.modal-dialog -->
                    </div>
                    <!-- /.modal -->



                  

                    <?php } ?>
                   
                    

        </div>
        </div>
    
               <?php }else{ ?>



            <code style="margin-left: 30px;">No record found!</code><br><br>
            <?php } ?>
            </div>
            <!-- /.box-body -->
            
          </div>
          <!-- /.box -->



      
    </section>
    <!-- /.content -->
  </div>
  <!-- /.content-wrapper -->

  <?php include 'inc/main-footer.php'; ?>
  <!-- Control Sidebar -->
  
  <!-- /.control-sidebar -->
  <!-- Add the sidebar's background. This div must be placed
       immediately after the control sidebar -->
  <div class="control-sidebar-bg"></div>

</div>
<!-- ./wrapper -->
  <?php include 'inc/footer.php'; ?>
</body>
<script type="text/javascript">
  $('#eye').on('click',function(){
      $('#slash').removeAttr('style');
      $('#eye').attr('style','display: none');
      $('#password').attr('type','text');
  });

  $('#slash').on('click',function(){
      $('#eye').removeAttr('style');
      $('#slash').attr('style','display: none');
      $('#password').attr('type','password');
  });

  $('.eye').on('click',function(){
      $('.slash').removeAttr('style');
      $('.eye').attr('style','display: none');
      $('.password').attr('type','text');
  });

  $('.slash').on('click',function(){
      $('.eye').removeAttr('style');
      $('.slash').attr('style','display: none');
      $('.password').attr('type','password');
  });

   function showImage(src,target) {
    var fr=new FileReader();
    // when image is loaded, set the src of the image where you want to display it
    fr.onload = function(e) { target.src = this.result; };
    src.addEventListener("change",function() {
      // fill fr with image data
      fr.readAsDataURL(src.files[0]);
    });
  }
  var src = document.getElementById("src");
  var target = document.getElementById("target");
  showImage(src,target);

  function showImage1(src,target) {
    var fr=new FileReader();
    // when image is loaded, set the src of the image where you want to display it
    fr.onload = function(e) { target.src = this.result; };
    src.addEventListener("change",function() {
      // fill fr with image data
      fr.readAsDataURL(src.files[0]);
    });
  }
  var src1 = document.getElementById("src1");
  var target1 = document.getElementById("target1");
  showImage1(src1,target1);

  function showImage2(src,target) {
    var fr=new FileReader();
    // when image is loaded, set the src of the image where you want to display it
    fr.onload = function(e) { target.src = this.result; };
    src.addEventListener("change",function() {
      // fill fr with image data
      fr.readAsDataURL(src.files[0]);
    });
  }
  var src2 = document.getElementById("src2");
  var target2 = document.getElementById("target2");
  showImage2(src2,target2);

  function showImage3(src,target) {
    var fr=new FileReader();
    // when image is loaded, set the src of the image where you want to display it
    fr.onload = function(e) { target.src = this.result; };
    src.addEventListener("change",function() {
      // fill fr with image data
      fr.readAsDataURL(src.files[0]);
    });
  }
  var src3 = document.getElementById("src3");
  var target3 = document.getElementById("target3");
  showImage3(src3,target3);


</script>

<?php
    if(isset($_COOKIE['s'])){ ?>
        <script type="text/javascript">
          alert("<?php echo $_COOKIE['s']; ?>");
        </script>
<?php }?>
<?php
    if(isset($_COOKIE['e'])){ ?>
        <script type="text/javascript">
          alert("<?php echo $_COOKIE['e']; ?>");
        </script>
<?php }?>
</html>
