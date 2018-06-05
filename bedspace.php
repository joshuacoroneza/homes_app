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
        Room Details
      </h1>
      <ol class="breadcrumb">
        <li><a href="#"><i class="fa fa-dashboard"></i> Dashboard</a></li>
        <li>Room</li>
        <li class="active">Room Details</li>
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
                $target_path = "bedspaces/".$image_name;


                    if($ext === false){
                                   
                        $cookie_value = "Invalid file(s)!"; setcookie('e', $cookie_value, time() + (5), "/");
                    }else{
                         if(move_uploaded_file($temp_name, $target_path)) {


                                       $data=array(
                                          'b_title' => $_POST['b_title'],
                                          'room_id' => $_POST['room_id'],
                                          'b_description' => $_POST['b_description'],
                                          'b_price' => $_POST['b_price'],
                                          'b_status' => $_POST['b_status'],
                                          'b_img' => $image_name,
                                          'house_id' => $_POST['house_id'],
                                      );
                                          $result = add_bedspace($data);


                                          if($result == 'e'){
                                              $cookie_value = "There was an error!"; setcookie('e', $cookie_value, time() + (5), "/");
                                            header('location: bedspace.php?id='.$_POST['room_id']);
                                          }else{
                                            $cookie_value = "New Bedspace added!"; setcookie('s', $cookie_value, time() + (5), "/");
                                            header('location: bedspace.php?id='.$_POST['room_id']);
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
                      'h_title' => $_POST['h_title'],
                      'h_description' => $_POST['h_description'],
                      'h_address' => $_POST['h_address'],
                      'h_homeowner_id' => $_POST['h_homeowner_id'],
                      'h_type' => $_POST['h_type'],
                      'house_id' => $_POST['house_id'],
                  );
                      if(update_house($data)=='s'){
                          $cookie_value = "Boarding House Info updated!"; setcookie('s', $cookie_value, time() + (5), "/");
                          header('location: house.php');
                      }
                }

                if(isset($_POST['btn-delete'])){
                      delete_house($_POST['id']);
                      $cookie_value = "Successfully deleted!"; setcookie('s', $cookie_value, time() + (5), "/");
                      header('location: house.php');
                }
              ?>


    

    <section class="content">
      <div class="box">
            
            <!-- /.box-header -->
            <?php
              $room_id = $_REQUEST['id'];
              $sql = "SELECT * FROM room where room_id = '$room_id'";
                    $query_result = mysqli_query($connection,$sql);
                    while($row = mysqli_fetch_array($query_result)){
                      $r_title = $row['r_title'];
                      $r_description = $row['r_description'];
                      $r_img = $row['r_img'];
                      $house_id = $row['house_id'];

                    }

                       
                    

            ?>
            <div class="box-header">
              <h3 class="box-title"> <?php echo $r_title; ?> Details</h3>
            </div>
            <div class="box-body">
              <div class="btn-group pull-right btn-sm">
                  <button type="button" class="btn btn-info btn-flat">Action</button>
                  <button type="button" class="btn btn-info btn-flat dropdown-toggle" data-toggle="dropdown">
                    <span class="caret"></span>
                    <span class="sr-only">Toggle Dropdown</span>
                  </button>
                  <ul class="dropdown-menu" role="menu">
                    <li><a href="#" data-toggle="modal" data-target="#modal-add">Add Bedspace</a></li>
                  </ul>
                </div>
              
              <?php  if(isset($_REQUEST)){ ?>
                 <!-- Portfolio Item Row -->
     
        <div class="row">
            <div class="col-md-12" style="margin-top: 55px;">
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
                            <a target="_blank" <?php echo "href='rooms/$r_img'"; ?>><img class="img-responsive" src="rooms/<?php echo $r_img; ?>" alt="Room 1" style="max-width: 1024px; max-height: 768px;"></a>
                        </div>
                        <div class="item">
                            <a target="_blank" <?php echo "href='rooms/$r_img'"; ?>><img class="img-responsive" src="rooms/<?php echo $r_img; ?>" alt="Room 1" style="max-width: 1024px; max-height: 768px;"></a>
                        </div>
                        <div class="item">
                            <a target="_blank" <?php echo "href='rooms/$r_img'"; ?>><img class="img-responsive" src="rooms/<?php echo $r_img; ?>" alt="Room 1" style="max-width: 1024px; max-height: 768px;"></a>
                        </div>
                        
                </div>
            </div>
            <div class="carousel-inner" role="listbox">

                    <!-- single slide -->
                    <div class="item active"  style="background-image: url(rooms/<?php echo $r_img; ?>);">
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
            <h3><?php echo $r_title; ?></h3>
                <p><?php echo $r_description ?></p>
                <p><?php //echo get_available_rooms($house_id)?> Room(s) Available</p>
              </center>
        </div>


       

            <div class="col-md-12"> <hr>
                   
                    <h2><center>List of Bedspace</center></h2>
                    <div class="row"><br></div>
                   
                          <?php
                            $sql1 = "SELECT * FROM bedspace where room_id = '$room_id'";
                              $query_result1 = mysqli_query($connection,$sql1);
                              while($row1 = mysqli_fetch_array($query_result1)){
                                $bedspace_id = $row1['bedspace_id'];
                                $b_title = $row1['b_title'];
                                $b_price = $row1['b_price'];
                                $b_stat = $row1['b_status'];
                                $b_img = $row1['b_img'];
                                $b_description = $row1['b_description'];
                                if($b_stat == 'Available'){
                                  $box_stat = 'box-primary';
                                }else{
                                  $box_stat = 'box-danger';
                                }
                                 
                          ?>

                    <div class="col-lg-3">
                        <div class="hovereffect">
                            <img class="img-responsive" src="bedspaces/<?php echo $b_img; ?>" alt="IMG" style="max-width: 300px; max-height: 400px;">
                            <div class="overlay">
                               <h2><?php echo $b_title.' ('.$b_stat.')'; ?></h2>
                            </div>
                        </div>
                          <center>

                            <h4>&nbsp;<br></h4><vr>
                            <b><?php echo $b_title.'</b> <i>'.$b_stat.'</i>'; ?><br>
                            &#8369;<?php echo number_format($b_price).'.00'; ?> / Night<br>
                            <?php echo $b_description; ?><br>
                          </center>
                       
                    </div>

                  

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




    <div class="modal fade" id="modal-add">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span></button>
                <h4 class="modal-title">Add Bedspace</h4>
              </div>

              <form class="form-horizontal" method="POST" enctype="multipart/form-data">
                <div class="modal-body">
                 <!-- form start -->
                
                    <div class="box-body">
                      <div class="form-group">
                        <label for="inputEmail3" class="col-sm-3 control-label">Title<span class="text-red">*</span></label>

                        <div class="col-sm-9">
                          <input type="text" class="form-control" placeholder="Title" name="b_title" required>
                          <input type="text" name="room_id" value="<?php echo $room_id; ?>">
                          <input type="text" name="house_id" value="<?php echo $house_id; ?>">
                        </div>
                      </div>

                      <div class="form-group">
                        <label for="inputPassword3" class="col-sm-3 control-label" >Price / Night<span class="text-red">*</span></label>

                        <div class="col-sm-9">
                          <div class="input-group">
                            <span class="input-group-addon btn btn-default"><i>&#8369;</i></span>
                            <input type="number" class="form-control" min='0' placeholder="0" name="b_price" required>
                            <span class="input-group-addon btn btn-default"><i>.00</i></span>
                          </div>
                        </div>
                      </div>

                      <div class="form-group">
                        <label for="inputEmail3" class="col-sm-3 control-label">Status<span class="text-red">*</span></label>

                        <div class="col-sm-9">
                          <select class="form-control" name="b_status" required>
                            <option value="">--SELECT--</option>
                            <option value="Available">Available</option>
                            <option value="Unavailable">Unavailable</option>
                          </select>
                        </div>
                      </div>

                      <div class="form-group">
                        <label for="inputEmail3" class="col-sm-3 control-label">Description<span class="text-red">*</span></label>

                        <div class="col-sm-9">
                          <textarea class="form-control" placeholder="Desription" name="b_description" required></textarea>
                        </div>
                      </div>

                      <div class="form-group">
                        <label for="inputPassword3" class="col-sm-3 control-label">Image<span class="text-red">*</span></label>
                          <div class="col-md-9">
                            <img class="col-md-12" src="images/placeholder.png" style="border: 1px solid #d2d6de; max-width: 100%; max-height: 300px;" id="target">
                          <div class="row"></div><br>
                          <input type="file" class="form-control" name="img" id="src">
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
  var src = document.getElementById("src1");
  var target = document.getElementById("target1");
  showImage1(src1,target1);
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
