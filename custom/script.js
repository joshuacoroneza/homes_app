function urlParam(name){
  var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
  if (results==null){
     return null;
  }
  else{
     return decodeURI(results[1]) || 0;
  }
}
function inquire_now(house_id,room_id,bedspace_id,target,img){
	if(target == 'whole-house'){
		$('#room_title_div').hide();
		$('#bedspace_title_div').hide();
		$('#inquiry_img').attr('src','http://homes.freesandboxdomain.com/admin/houses/'+img);

		$.ajax({
	    url: 'http://homes.freesandboxdomain.com/admin/mobile/get_house_inquire_details.php',
	    type: 'POST',
	    data: {house_id:house_id},
	    dataType: 'json',
	    	beforeSend: function(){$("#inquiry-overlay").show();},
	        success: function(response1) {
	        	$('#href_url').attr('href','room.html?id='+response1[0].house_id);
	            $('#inquiry_house_title').html(response1[0].h_title);
	            $('#inquiry_price_title').html(response1[0].h_fullprice+'.00 / Night');
	            $('#inquiry_address_title').html(response1[0].h_address);
	            $('#inquiry_homeowner_id').val(response1[0].h_homeowner_id);
	            $('#inquiry_house_id').val(response1[0].house_id);
	            $('#inquiry_target').val(target);
	            $('#inquiry_status_title').html(response1[0].h_status);
	           	setInterval(function() {$("#inquiry-overlay").hide(); },500);
			}
		});
	}else if(target == 'room'){
		$('#bedspace_title_div').hide();
		$('#inquiry_img').attr('src','http://homes.freesandboxdomain.com/admin/rooms/'+img);

		$.ajax({
	    url: 'http://homes.freesandboxdomain.com/admin/mobile/get_room_inquire_details.php',
	    type: 'POST',
	    data: {room_id:room_id},
	    dataType: 'json',
	    	beforeSend: function(){$("#inquiry-overlay").show();},
	        success: function(response1) {
	            $('#inquiry_house_title').html(response1[0].h_title);
	            $('#inquiry_room_title').html(response1[0].r_title);
	            $('#inquiry_price_title').html(response1[0].h_fullprice+'.00 / Night');
	            $('#inquiry_address_title').html(response1[0].h_address);
	            $('#inquiry_homeowner_id').val(response1[0].h_homeowner_id);
	            $('#inquiry_house_id').val(response1[0].house_id);
	            $('#inquiry_room_id').val(response1[0].room_id);
	            $('#inquiry_target').val(target);
	            $('#inquiry_status_title').html(response1[0].r_status);
	            $('#h3_title').html('Inquire for Room only.');
	           	setInterval(function() {$("#inquiry-overlay").hide(); },500);
			}
		});
	}else if(target == 'bedspace'){

		$('#inquiry_img').attr('src','http://homes.freesandboxdomain.com/admin/bedspaces/'+img);

		$.ajax({
	    url: 'http://homes.freesandboxdomain.com/admin/mobile/get_bedspace_inquire_details.php',
	    type: 'POST',
	    data: {bedspace_id:bedspace_id},
	    dataType: 'json',
	    	beforeSend: function(){$("#inquiry-overlay").show();},
	        success: function(response1) {
	            $('#inquiry_house_title').html(response1[0].h_title);
	            $('#inquiry_room_title').html(response1[0].r_title);
	            $('#inquiry_bedspace_title').html(response1[0].b_title);
	            $('#inquiry_price_title').html(response1[0].b_price+'.00 / Night');
	            $('#inquiry_address_title').html(response1[0].h_address);
	            $('#inquiry_homeowner_id').val(response1[0].h_homeowner_id);
	            $('#inquiry_house_id').val(response1[0].house_id);
	            $('#inquiry_room_id').val(response1[0].room_id);
	            $('#inquiry_bedspace_id').val(response1[0].bedspace_id);
	            $('#inquiry_target').val(target);
	            $('#inquiry_status_title').html(response1[0].b_status);
	            $('#h3_title').html('Inquire for Bedspace only.');
	           	setInterval(function() {$("#inquiry-overlay").hide(); },500);
			}
		});
	}
}
function send_inquire(){
	var msg = $('#inquiry_message').val();
	if(msg == ''){
		alert('Please, type any message.');
	}else{
		var house_id = $('#inquiry_house_id').val();
		var tenant_id = localStorage.tenant_id;
		var homeowner_id = $('#inquiry_homeowner_id').val();
		var target = $('#inquiry_target').val();
		var msg = $('#inquiry_message').val();
		if(target == 'whole-house'){
			var room_id = 0 ;
			var bedspace_id = 0 ;
		}else if(target == 'room'){
			var room_id = $('#inquiry_room_id').val();
			var bedspace_id = 0 ;
		}else if(target == 'bedspace'){
			var room_id = $('#inquiry_room_id').val();
			var bedspace_id = $('#inquiry_bedspace_id').val();
		}

		$.ajax({
			url: 'http://homes.freesandboxdomain.com/admin/mobile/send_inquire.php',
			type: 'POST',
			dataType: 'json',
			data: {house_id:house_id, tenant_id:tenant_id, homeowner_id:homeowner_id, target:target, msg:msg, room_id:room_id, bedspace_id:bedspace_id},
			beforeSend: function(){$("#inquiry-overlay").show();},
			success: function(response) {
	            
	            var data = response.data;
	            //console.log(data);
	            if(data == "error"){
	            	alert('There was an error!');

	            	//window.location.href="login.html";
	            }else if(data == 'success'){
	               	alert('Thank you for your inquiry. We will get back to you soon as possible.');
	               	get_inquiries_count(localStorage.tenant_id);
	               	$('#inquiry_close').click();


	          	}else{
	               	show_error('Check your internet conection!');
	                
	          	}
	          	setInterval(function() {$("#inquiry-overlay").hide(); },500);
			}
	    });
	}
	
	
}
//SEND BOOKING

function chat_send(){
	var msg = $('#message').val();
	var a = window.location.href;
    var to_id = urlParam('id');
    var from_id = localStorage.tenant_id;

		$.ajax({
			url: 'http://homes.freesandboxdomain.com/admin/mobile/chat_send.php',
			type: 'POST',
			dataType: 'json',
			data: {content:msg, to_id:to_id, from_id:from_id},
			beforeSend: function(){$("#chat-overlay").show();},
			success: function(response) {
	            
	            var data = response.data;
	            //console.log(data);
	           //  if(data == "error"){
	           //  	alert('There was an error!');

	           //  	//window.location.href="login.html";
	           //  }else if(data != 'error'){
	           //  	var div = '';
	           //   	div += '<div class="direct-chat-msg right">';
		          //   div += '<div class="direct-chat-info clearfix">';
		          //   div += '<span class="direct-chat-name pull-right">';
		          //   div += localStorage.fname+' '+localStorage.lname+'</span>';
		          //   div += '<span class="direct-chat-timestamp pull-left">';
		          //   div +=  data+'</span></div>';
		          //   div += '<img class="direct-chat-img" src="http://homes.freesandboxdomain.com/homeowner/profile/'+localStorage.img+'" alt="Message User Image">';
		          //   div += '<div class="direct-chat-text">';
		          //   div += msg+'</div></div>';

		          //   $('#chat_box').append(div);
		          //   $('#message').val('');
		          //   $('#chat_box').scrollTop($('#chat_box')[0].scrollHeight);

	          	// }else{
	           //     	show_error('Check your internet conection!');
	                
	          	// }
	          	$('#message').val('');
		        $('#chat_box').scrollTop($('#chat_box')[0].scrollHeight);
	          	setInterval(function() {$("#chat-overlay").hide(); },500);
			}
	    });
	
	
}
function dateToString(date) {
    var month = date.getMonth() + 1;
    var day = date.getDate();
    var dateOfString = (("" + day).length < 2 ? "0" : "") + day + "/";
    dateOfString += (("" + month).length < 2 ? "0" : "") + month + "/";
    dateOfString += date.getFullYear();
    return dateOfString;
}

// function for submit comment
function submit_comment(){
	var name = $('#name').val();
	var email = $('#email').val();
	var feedback = $('#feedback').val();
	var house_id = $('#house_id'). val();



var error = 0;

	if(name == ''){
		val_error('name',' Name is required.');
		error += 1;
	}else{
		val_success('name');
	}
	if(email == ''){
		val_error('email','Email is required.');
		error += 1;
	}else if( !isValidEmailAddress(email)){
		val_error('email','Invalid email.');
		error += 1;
	}else{
		val_success('email');
	}
	if(feedback == ''){
		val_error('feedback','Feedback is required.');
		error += 1;
	}else{
		val_success('feedback');
	}

	if(error > 0){

	}else{

		var currentdate = new Date();
		var datetime = "";
		datetime += dateToString(currentdate )+' ';
		datetime += + currentdate.getHours() + ":"
		            + currentdate.getMinutes() + ":"
		            + currentdate.getSeconds();


		$.ajax({
			url: 'http://homes.freesandboxdomain.com/admin/mobile/feedback.php',
			type: 'POST',
			dataType: 'json',
			data: {name:name, email:email, feedback:feedback, house_id:house_id, date_time:datetime},
			success: function(response) {
	            
	            var data = response.data;
	            // console.log(data);
	            if(data == "error"){
	            	show_error('There was an error!');

	           	}else if(data == 'success'){
	           		alert('Comment sent!');
	           		$('#fform').trigger('reset');
	           		$('#fform').removeClass('has-success');
	           		$('.form-name').removeClass('has-success');
	           		$('.form-email').removeClass('has-success');
	           		$('.form-feedback').removeClass('has-success');
	               	$('#comment_box').append(' <div class="box-comment"><img class="img-circle img-sm"  src="dist/img/user7-128x128.jpg" alt="User Image"><div class="comment-text"><span class="username">'+name+'<span class="text-muted pull-right">'+datetime+'</span></span><!-- /.username -->'+feedback+'</div><!-- /.comment-text --></div>');
	          		
	          	}else{
	               	show_error('Check your internet conection!');
	                
	          	}
			}
	    });

	}
}
//Login
function login(){
    var username = $('#username').val();
    var password = $('#log_password').val();
    var error = 0;
	if(username == ''){
		val_error('username','Username is required.');
		error +=1;
	}else{
		val_success('username');
		
	}

	if(password == ''){
		val_error('log_password','Password is required.');
		error +=1;
	}else{
		val_success('log_password');
	}

	if(error == 0){

	    $.ajax({
			url: 'http://homes.freesandboxdomain.com/admin/mobile/login.php',
			type: 'POST',
			dataType: 'json',
			data: {username:username, password:password},
			success: function(response) {
	            
	            var data = response.data;
	            if(data == "mismatch"){
	            	show_error('Invalid username/password!');

	            	//window.location.href="login.html";
	            }else{
	               	//window.location.href="home.html";

	             if(data.type =="Homeowner"){
	             	window.location.href="HomeOwner.html";

	             	// Set Local Storage
	             	localStorage.setItem("tenant_id",data.user_id);
	                localStorage.setItem("fname",data.fname);
	                localStorage.setItem("mname",data.mname);
	                localStorage.setItem("lname",data.lname);
	                localStorage.setItem("type",data.type);
	                localStorage.setItem("uname",data.username);
	                localStorage.setItem("email",data.email);
	                localStorage.setItem("contact",data.contact);
	                localStorage.setItem("img",data.profile);
	                localStorage.setItem("password",data.password);
	                localStorage.setItem("address",data.address);
	                $('.box-login').html('<div class="pad margin no-print" "id="success_div"><div class="callout callout-success wow tada animated" data-wow-duration="1500ms"  data-wow-iteration="infinite"  style="margin-bottom: 0!important;"><h4><i class="fa fa-check"></i> Success!</h4><p id="success_msg">Already logged in.</p></div></div>');
	                $('#error_div').fadeOut();
	                update_log_details();

	             }else if(data.type =="Tenant"){
	             	window.location.href="index.html";
	             	// Set Local Storage

	             	localStorage.setItem("tenant_id",data.user_id);
	                localStorage.setItem("fname",data.fname);
	                localStorage.setItem("mname",data.mname);
	                localStorage.setItem("lname",data.lname);
	                localStorage.setItem("type",data.type);
	                localStorage.setItem("uname",data.username);
	                localStorage.setItem("email",data.email);
	                localStorage.setItem("contact",data.contact);
	                localStorage.setItem("img",data.profile);
	                localStorage.setItem("password",data.password);
	                localStorage.setItem("address",data.address);
	                $('.box-login').html('<div class="pad margin no-print" id="success_div"><div class="callout callout-success wow tada animated" data-wow-duration="1500ms"  data-wow-iteration="infinite"  style="margin-bottom: 0!important;"><h4><i class="fa fa-check"></i> Success!</h4><p id="success_msg">Already logged in.</p></div></div>');
	                $('#error_div').fadeOut();
	                update_log_details();

	             }
	                
	                
	          	}
			}
	    });
	}else{
		alert('There was an error');
	}
}
//Register for homeowner or tenant
function register(){
	var lname = $('#lname').val();
	var fname = $('#fname').val();
	var mname = $('#mname').val();
	var contact = $('#contact').val();
	var email = $('#email').val();
	var username = $('#username').val();
	var password = $('#password').val();
	var confirm = $('#confirm').val();
	var type = $('#usertype').val();
	var address = $('#address').val();

	var error = 0;

	if(lname == ''){
		val_error('lname','Last Name is required.');
		error += 1;
	}else{
		val_success('lname');
	}

	if(fname == ''){
		val_error('fname','First Name is required.');
		error += 1;
	}else{
		val_success('fname');
	}

	if(mname == ''){
		val_error('mname','Middle Name is required.');
		error += 1;
	}else{
		val_success('mname');
	}

	if(email == ''){
		val_error('email','Email is required.');
		error += 1;
	}else if( !isValidEmailAddress(email)){
		val_error('email','Invalid email.');
		error += 1;
	}else{
		val_success('email');
	}

	if(contact == ''){
		val_error('contact','Contact Number is required.');
		error += 1;
	}else{
		val_success('contact');
	}

	if(username == ''){
		val_error('username','Username is required.');
		error += 1;
	}else{
		val_success('username');
	}

	if(address == ''){
		val_error('address','Address is required.');
		error += 1;
	}else{
		val_success('address');
	}


	if(password == ''){
		val_error('password','Password is required.');
		error += 1;
	}else if(confirm != password && confirm != ''){
		val_error('confirm','Passwords did not matched.');
		error += 1;
	}else{
		val_success('password');
	}
	
	if(confirm == ''){
		val_error('confirm','Confirm Password is required.');
		error += 1;
	}else if(confirm != password){
		val_error('confirm','Passwords did not matched.');
		error += 1;
	}else{
		val_success('confirm');
	}

	if(error > 0){

	}else{
		$.ajax({
			url: 'http://homes.freesandboxdomain.com/admin/mobile/register.php',
			type: 'POST',
			dataType: 'json',
			data: {fname:fname, lname:lname, mname:mname, email:email, contact:contact, username:username, password:password, type:type, address:address},
			success: function(response) {
	            
	            var data = response.data;
	            //console.log(data);
	            if(data == "error"){
	            	alert('There was an error!');
	            }else{
	               	$('.box-register').html('<div class="pad margin no-print" id="success_div"><div class="callout callout-success" style="margin-bottom: 0!important;"><h4><i class="fa fa-check"></i> Success!</h4><p id="success_msg">Already registered.</p></div></div>');
	          		//console.log(data[0].fname);
	          		if(response.type =="Homeowner"){
	             	window.location.href="HomeOwner.html";

	             	// Set Local Storage
	             	localStorage.setItem("tenant_id",response.user_id);
	                localStorage.setItem("fname",response.fname);
	                localStorage.setItem("mname",response.mname);
	                localStorage.setItem("lname",response.lname);
	                localStorage.setItem("type",response.type);
	                localStorage.setItem("uname",response.username);
	                localStorage.setItem("email",response.email);
	                localStorage.setItem("contact",response.contact);
	                localStorage.setItem("img",response.profile);
	                localStorage.setItem("password",response.password);
	                localStorage.setItem("address",response.address);
	                $('.box-login').html('<div class="pad margin no-print" "id="success_div"><div class="callout callout-success wow tada animated" data-wow-duration="1500ms"  data-wow-iteration="infinite"  style="margin-bottom: 0!important;"><h4><i class="fa fa-check"></i> Success!</h4><p id="success_msg">Already logged in.</p></div></div>');
	                $('#error_div').fadeOut();
	                update_log_details();

	             }else if(response.type =="Tenant"){
	             	window.location.href="index.html";
	             	// Set Local Storage

	             	localStorage.setItem("tenant_id",response.user_id);
	                localStorage.setItem("fname",response.fname);
	                localStorage.setItem("mname",response.mname);
	                localStorage.setItem("lname",response.lname);
	                localStorage.setItem("type",response.type);
	                localStorage.setItem("uname",response.username);
	                localStorage.setItem("email",response.email);
	                localStorage.setItem("contact",response.contact);
	                localStorage.setItem("img",response.profile);
	                localStorage.setItem("password",response.password);
	                localStorage.setItem("address",response.address);
	                $('.box-login').html('<div class="pad margin no-print" id="success_div"><div class="callout callout-success wow tada animated" data-wow-duration="1500ms"  data-wow-iteration="infinite"  style="margin-bottom: 0!important;"><h4><i class="fa fa-check"></i> Success!</h4><p id="success_msg">Already logged in.</p></div></div>');
	                $('#error_div').fadeOut();
	                update_log_details();

	             }
	          	}
			}
	    });

	}
}

function remove_inquiry(inquiry_id){
	$.ajax({
			url: 'http://homes.freesandboxdomain.com/admin/mobile/remove_inquiry.php',
			type: 'POST',
			dataType: 'json',
			data: {inquiry_id:inquiry_id},
			success: function(response) {
	            
	            var data = response.data;
	            if(data == "error"){
	            	alert('There was an error.');
	            }else if(data == 'success'){
	            	$('#inquiry_div'+inquiry_id).fadeOut();
	            }
			}
	    });
}
//Show error
function show_error(msg){
	$('#error_div').fadeIn();
	$('#error_msg').html(msg);
}
//Show success
function show_success(msg){
	$('#success_div').fadeIn();
	$('#success_msg').html(msg);
}
//For logout
function log_out(){
    localStorage.clear();
    window.location.href="index.html";
}

//function to update by inteface when a user is logged in
function update_log_details(){
	$('#log_name').html(localStorage.fname+' '+localStorage.lname);
    $('#log_name1').html(localStorage.fname+' '+localStorage.lname + ' - '+localStorage.type);
    $('#log_name2').html(localStorage.fname+' '+localStorage.lname);
    $('#profile_user_id').val(localStorage.tenant_id);
    $('#profile_img').val(localStorage.img);

    

    $('.user-panel').fadeIn();
	$('#user-menu').fadeIn();
	$('#log_icon').attr('class','fa fa-unlock');
	$('#log_nav').html('Logged In');

	$('#user-menu-div').fadeIn();
	$('#user-image').removeAttr('hidden');


	$('#registerhtml').hide();

	

	if(localStorage.img == ''){
		$('#user-header_img').attr('src','http://homes.freesandboxdomain.com/homeowner/profile/no_image.png');
		$('#user-image').attr('src','http://homes.freesandboxdomain.com/homeowner/profile/no_image.png');
		$('#user-image1').attr('src','http://homes.freesandboxdomain.com/homeowner/profile/no_image.png');
		$('#user-image2').attr('src','http://homes.freesandboxdomain.com/homeowner/profile/no_image.png');
	}else{
		$('#user-header_img').attr('src','http://homes.freesandboxdomain.com/homeowner/profile/'+localStorage.img);
		$('#user-image').attr('src','http://homes.freesandboxdomain.com/homeowner/profile/'+localStorage.img);
		$('#user-image1').attr('src','http://homes.freesandboxdomain.com/homeowner/profile/'+localStorage.img);
		$('#user-image2').attr('src','http://homes.freesandboxdomain.com/homeowner/profile/'+localStorage.img);
	}


	//PROFILE PAGE

	$("#prof_lname").html(localStorage.lname);
	$("#prof_fname").html(localStorage.fname);
	$("#prof_mname").html(localStorage.mname);
 	$("#prof_uname").html(localStorage.uname);
 	$("#prof_ename").html(localStorage.email);
 	$("#prof_cname").html(localStorage.contact);
 	$("#prof_address").html(localStorage.address);

	//PROFILE PAGE - Personal info

	$("#info_lname").val(localStorage.lname);
	$("#info_fname").val(localStorage.fname);
	$("#info_mname").val(localStorage.mname);
	$("#info_uname").val(localStorage.uname);
	$("#info_ename").val(localStorage.email);
	$("#info_cname").val(localStorage.contact);
	$("#info_address").val(localStorage.address);

	// PROFILE PAGE - Password
	$("#info_oldpassword").val(localStorage.password);


	//BOOKING MODAL
	$("#book_lname").val(localStorage.lname);
	$("#book_fname").val(localStorage.fname);
	$("#book_mname").val(localStorage.mname);
	$("#book_email").val(localStorage.email);
	$("#book_contact").val(localStorage.contact);
	$("#book_address").val(localStorage.address);

	if(localStorage.lname == ''){
		$('.form-book-lname').addClass('has-error');
		$('.help-book-lname').fadeIn();
		$('.help-book-lname').html('Please, update your last name. <a href="profile.html">View profile</a>');
	}else{
		$('.form-book-lname').removeClass('has-error');
		$('.help-book-lname').hide();
	}

	if(localStorage.fname == ''){
		$('.form-book-fname').addClass('has-error');
		$('.help-book-fname').fadeIn();
		$('.help-book-fname').html('Please, update your first name. <a href="profile.html">View profile</a>');
	}else{
		$('.form-book-fname').removeClass('has-error');
		$('.help-book-fname').hide();
	}

	if(localStorage.mname == ''){
		$('.form-book-mname').addClass('has-error');
		$('.help-book-mname').fadeIn();
		$('.help-book-mname').html('Please, update your middle name. <a href="profile.html">View profile</a>');
	}else{
		$('.form-book-mname').removeClass('has-error');
		$('.help-book-mname').hide();
	}

	if(localStorage.email == ''){
		$('.form-book-email').addClass('has-error');
		$('.help-book-email').fadeIn();
		$('.help-book-email').html('Please, update your email. <a href="profile.html">View profile</a>');
	}else{
		$('.form-book-email').removeClass('has-error');
		$('.help-book-email').hide();
	}

	if(localStorage.contact == ''){
		$('.form-book-contact').addClass('has-error');
		$('.help-book-contact').fadeIn();
		$('.help-book-contact').html('Please, update your contact number. <a href="profile.html">View profile</a>');
	}else{
		$('.form-book-contact').removeClass('has-error');
		$('.help-book-contact').hide();
	}

	if(localStorage.address == ''){
		$('.form-book-address').addClass('has-error');
		$('.help-book-address').fadeIn();
		$('.help-book-address').html('Please, update your address. <a href="profile.html">View profile</a>');
	}else{
		$('.form-book-address').removeClass('has-error');
		$('.help-book-address').hide();
	}






}

function update_notlog_details(){
	$('.user-panel').prop('hidden','true');
	$('#user-menu').prop('hidden','true');
	$('#log_icon').attr('class','fa fa-lock');
	$('#log_nav').html('Login');
	$('#user-menu-div').prop('hidden','true');
	$('#user-image').prop('hidden','true');
	$('#homeowner_house').prop('hidden','true');
}


$('#name').on('keyup',function(){
	var name = $('#name').val();	
	if(name == ''){
		val_error('name','Name is required.');
	}else{
		val_success('name');
	}
});

$('#email').on('keyup',function(){
	var email = $('#email').val();	
	if(email == ''){
		val_error('email','Email is required.');
	}else{
		val_success('email');
	}
});
$('#feedback').on('keyup',function(){
	var email = $('#feedback').val();	
	if(email == ''){
		val_error('feedback','Feedback is required.');
	}else{
		val_success('feedback');
	}
});


$('#lname').on('keyup',function(){
	var lname = $('#lname').val();	
	if(lname == ''){
		val_error('lname','Last Name is required.');
	}else{
		val_success('lname');
	}
});

$('#fname').on('keyup',function(){
	var fname = $('#fname').val();	
	if(fname == ''){
		val_error('fname','First Name is required.');
	}else{
		val_success('fname');
	}
});

$('#mname').on('keyup',function(){
	var mname = $('#mname').val();	
	if(mname == ''){
		val_error('mname','Middle Name is required.');
	}else{
		val_success('mname');
	}
});

$('#email').on('keyup',function(){
	var email = $('#email').val();	
	if(email == ''){
		val_error('email','Email is required.');
	}else if( !isValidEmailAddress(email)){
		 val_error('email','Invalid email.');
	}else{
		val_success('email');
	}
});

$('#contact').on('keyup',function(){
	var contact = $('#contact').val();	
	if(contact == ''){
		val_error('contact','contact Number is required.');
	}else{
		val_success('contact');
	}
});

$('#username').on('keyup',function(){
	var username = $('#username').val();	
	if(username == ''){
		val_error('username','Username is required.');
	}else{
		val_success('username');
	}
});

$('#address').on('keyup',function(){
	var address = $('#address').val();	
	if(address == ''){
		val_error('address','Address is required.');
	}else{
		val_success('address');
	}
});


$('#log_password').on('keyup',function(){
	var password = $('#log_password').val();	
	if(password == ''){
		val_error('log_password','Password is required.');
	}else{
		val_success('log_password');
	}
});


$('#password').on('keyup',function(){
	var password = $('#password').val();	
	var confirm = $('#confirm').val();	
	if(password == ''){
		val_error('password','Password is required.');
	}else if(confirm != password && confirm != ''){
		val_error('confirm','Passwords did not matched.');
	}else{
		val_success('password');
	}
});

$('#confirm').on('keyup',function(){
	var confirm = $('#confirm').val();	
	var password = $('#password').val();	
	if(confirm == ''){
		val_error('confirm','Confirm Password is required.');
	}else if(confirm != password){
		val_error('confirm','Passwords did not matched.');
	}else{
		val_success('confirm');
	}
});

function isValidEmailAddress(emailAddress) {
    var pattern = /^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
    return pattern.test(emailAddress);
};
function val_error(id,msg){
	$('.form-'+id).removeClass('has-error');
	$('.'+id+'-block').remove();
	$('.form-'+id).addClass('has-error'); // You can change the animation class for a different entrance animation - check animations page
	$('#'+id).after("<span class='"+id+"-block  help-block'>"+msg+"</span>");
}

function val_success(id){
	$('.form-'+id).removeClass('has-error').addClass('has-success')
	$('.'+id+'-block').remove();
}

$( document ).ready(function() {

    if(localStorage.tenant_id === undefined){
    	//console.log('not_login');
    	$('#error_div').fadeOut();
    	update_notlog_details();
    	localStorage.clear();
    }else{
    	$('#error_div').fadeOut();
    	$('.box-login').html('<div class="pad margin no-print" id="success_div"><div class="callout callout-success" style="margin-bottom: 0!important;"><h4><i class="fa fa-check"></i> Success!</h4><p id="success_msg">Already logged in.</p></div></div>');
    	update_log_details();

    	if(localStorage.type=="Homeowner"){
    		$("#homehtml").attr("href", "HomeOwner.html");

    	}else if(localStorage.type=="Tenant"){
    		
    			$("#homehtml").attr("href", "index.html");
    		
    	}
    }



    	if(localStorage.type == "Homeowner"){

    		$.ajax({
			    url: 'http://homes.freesandboxdomain.com/admin/mobile/get_houses.php?id='+localStorage.tenant_id,
			    type: 'POST',
			    data: {id:localStorage.tenant_id},
			    dataType: 'json',
			        success: function(response) {
			            //var days = response.days;

						//console.log(response);
						
						houses_counter = response.length;
						var house_id;

						$('#houses').html('');
						for(var i=0; i<houses_counter; i++){
							if(localStorage.tenant_id == undefined){
							    var modal = '#modal-login-first';
							}else{
							    var modal = '#modal-inquire';
							}
							var div = '<div class="col-lg-3 col-xs-6 bounceIn wow" style="padding: 5px;" data-wow-duration="1500ms"> ';
							div += '<div class="hovereffect">';
							div += '<img src = "http://homes.freesandboxdomain.com/admin/houses/'+response[i].h_img+'" class="img-responsive" width="1100px;" height="150px;" style="min-height: 150px; max-height: 150px;">';
							div += '<div class="overlay"><a class="info">'+response[i].h_status+'</a><br></div></div><div class="row"></div>';
							div += '<div  animated bounceInDown wow" data-wow-duration="1500ms" style="margin-top: 10px">';
							div += '<span class="content_head"><b><a href="room.html?id='+response[i].house_id+'" class="info" style="margin-top: 5px">'+response[i].h_title+'</a></b></span><br>';
							div += '<span class="content_head">'+response[i].h_address+'</span><br>';
							div += '<span class="content_head"><span id="avail_room_count_'+response[i].house_id+'"></span> Room(s) Available</span><br>';
							div += '<span class="content_head"> ₱'+response[i].h_fullprice+'.00 / month</span></div>';


							div += '<div class="row lead" style="margin-left: 1px;" ><div id="hearts" class="starrr" data-rating="1"><fieldset class="rating">';
							div += '<input type="radio" id="star5" name="rating" value="5" /><label class = "full" for="star5" title="Awesome - 5 stars"></label>';
							div += '<input type="radio" id="star4half" name="rating" value="4 and a half" /><label class="half" for="star4half" title="Pretty good - 4.5 stars"></label>';
							div += '<input type="radio" id="star4" name="rating" value="4" /><label class = "full" for="star4" title="Pretty good - 4 stars"></label>';
							div += '<input type="radio" id="star3half" name="rating" value="3 and a half" /><label class="half" for="star3half" title="Meh - 3.5 stars"></label>';
							div += '<input type="radio" id="star3" name="rating" value="3" /><label class = "full" for="star3" title="Meh - 3 stars"></label>';
							div += '<input type="radio" id="star2half" name="rating" value="2 and a half" /><label class="half" for="star2half" title="Kinda bad - 2.5 stars"></label>';
							div += '<input type="radio" id="star2" name="rating" value="2" /><label class = "full" for="star2" title="Kinda bad - 2 stars"></label>';
							div += '<input type="radio" id="star1half" name="rating" value="1 and a half" /><label class="half" for="star1half" title="Meh - 1.5 stars"></label>';
							div += '<input type="radio" id="star1" name="rating" value="1" /><label class = "full" for="star1" title="Sucks big time - 1 star"></label>';
							div += '<input type="radio" id="starhalf" name="rating" value="half" /><label class="half" for="starhalf" title="Sucks big time - 0.5 stars"></label>';
							div += '</fieldset><div style="float: right; margin-right: 18px; font-size: 17px; font-weight: bold">';
							div += '<font id="count">0</font></div></div></div>';


							$('#houses').append(div);
							// if(i%2!=0){
							// 	$('#houses').append('<div class="row"></div>');
							// }
							house_id = response[i].house_id;
							get_avail_room(house_id);
							get_comment_count(house_id);
							display_feedback(house_id);
							$('#homeowner_house').removeAttr('hidden');
							$('.permit-div').removeAttr('hidden');
							display_Advertisements();
						



			            }
			            $('#houses').append('<div class="row"></div>');

					}
			});
    	}else if(localStorage.type == 'Tenant'){
    		$.ajax({
			    url: 'http://homes.freesandboxdomain.com/admin/mobile/get_houses.php?tenant_id='+localStorage.tenant_id,
			    type: 'POST',
			    //data: {leave_id:leave_id},
			    dataType: 'json',
			        success: function(response) {
			            //var days = response.days;

						// console.log(response);
						
						houses_counter = response.length;
						var house_id;

						$('#houses').html('');
						for(var i=0; i<houses_counter; i++){
							if(localStorage.tenant_id == undefined){
							    var modal = '#modal-login-first';
							    var my_title = 'INQUIRE NOW';
							}else{
								if(response[i].h_ans == 'common'){
									var modal = '';
									var my_title = 'ALREADY INQUIRED';
								}else{
							    	var modal = '#modal-inquire';
							    	var my_title = 'INQUIRE NOW';
							    }
							}
							var div = '<div class="col-lg-3 col-xs-6 bounceIn wow" style="padding: 5px;" data-wow-duration="1500ms"> ';
							div += '<div class="hovereffect">';
							div += '<img src = "http://homes.freesandboxdomain.com/admin/houses/'+response[i].h_img+'" class="img-responsive" width="1100px;" height="150px;" style="min-height: 150px; max-height: 150px;">';
							div += '<div class="overlay"><h2><a onclick=inquire_now("'+response[i].house_id+'","0","0","whole-house","'+response[i].h_img+'") data-toggle="modal" id="inquire_button'+response[i].house_id+'" data-target="'+modal+'">'+my_title+'</a></h2><a class="info">'+response[i].h_status+'</a><br></div></div><div class="row"></div>';
							div += '<div  animated bounceInDown wow" data-wow-duration="1500ms" style="margin-top: 10px">';
							div += '<span class="content_head"><b><a href="room.html?id='+response[i].house_id+'" class="info" style="margin-top: 5px">'+response[i].h_title+'</a></b></span><br>';
							div += '<span class="content_head">'+response[i].h_address+'</span><br>';
							div += '<span class="content_head"><span id="avail_room_count_'+response[i].house_id+'"></span> Room(s) Available</span><br>';
							div += '<span class="content_head"> ₱'+response[i].h_fullprice+'.00 / month</span></div>';


							div += '<div class="row lead" style="margin-left: 1px;" ><div id="hearts" class="starrr" data-rating="1"><fieldset class="rating">';
							div += '<input type="radio" id="star5" name="rating" value="5" /><label class = "full" for="star5" title="Awesome - 5 stars"></label>';
							div += '<input type="radio" id="star4half" name="rating" value="4 and a half" /><label class="half" for="star4half" title="Pretty good - 4.5 stars"></label>';
							div += '<input type="radio" id="star4" name="rating" value="4" /><label class = "full" for="star4" title="Pretty good - 4 stars"></label>';
							div += '<input type="radio" id="star3half" name="rating" value="3 and a half" /><label class="half" for="star3half" title="Meh - 3.5 stars"></label>';
							div += '<input type="radio" id="star3" name="rating" value="3" /><label class = "full" for="star3" title="Meh - 3 stars"></label>';
							div += '<input type="radio" id="star2half" name="rating" value="2 and a half" /><label class="half" for="star2half" title="Kinda bad - 2.5 stars"></label>';
							div += '<input type="radio" id="star2" name="rating" value="2" /><label class = "full" for="star2" title="Kinda bad - 2 stars"></label>';
							div += '<input type="radio" id="star1half" name="rating" value="1 and a half" /><label class="half" for="star1half" title="Meh - 1.5 stars"></label>';
							div += '<input type="radio" id="star1" name="rating" value="1" /><label class = "full" for="star1" title="Sucks big time - 1 star"></label>';
							div += '<input type="radio" id="starhalf" name="rating" value="half" /><label class="half" for="starhalf" title="Sucks big time - 0.5 stars"></label>';
							div += '</fieldset><div style="float: right; margin-right: 18px; font-size: 17px; font-weight: bold">';
							div += '<font id="count">0</font></div></div></div>';


							$('#houses').append(div);
							// if(i%2!=0){
							// 	$('#houses').append('<div class="row"></div>');
							// }
							lat = parseFloat(response[i].lat);
							lang = parseFloat(response[i].lng);
							house_id = response[i].house_id;
							get_avail_room(house_id);
							get_comment_count(house_id);
							get_inquiries_count(localStorage.tenant_id);
							display_feedback(house_id);
							$('.permit-div').hide();
							$('#tenant_inquiries').removeAttr('hidden');
							display_Advertisements();
							// console.log(check_inquiry_existence(localStorage.tenant_id,response[i].house_id));

							




			            }
			            $('#houses').append('<div class="row"></div>');

					}
				});

    		
    	}else{
    		$.ajax({
			    url: 'http://homes.freesandboxdomain.com/admin/mobile/get_houses.php',
			    type: 'POST',
			    //data: {leave_id:leave_id},
			    dataType: 'json',
			        success: function(response) {
			            //var days = response.days;

						//console.log(response);
						
						houses_counter = response.length;
						var house_id;
						$('#houses').html('');
						for(var i=0; i<houses_counter; i++){
							if(localStorage.tenant_id == undefined){
							    var modal = '#modal-login-first';
							}else{
							    var modal = '#modal-inquire';
							}
							var div = '<div class="col-lg-3 col-xs-6 bounceIn wow" data-wow-duration="1500ms" style="padding: 5px;"> ';
							div += '<div class="hovereffect">';
							div += '<img src = "http://homes.freesandboxdomain.com/admin/houses/'+response[i].h_img+'" class="img-responsive" width="1100px;" height="150px;" style="min-height: 150px; max-height: 150px;">';
							div += '<div class="overlay"><h2><a data-toggle="modal" id="inquire_button" data-target="'+modal+'">INQUIRE NOW</button></h2><a class="info">'+response[i].h_status+'</a><br></div></div><div class="row"></div>';
							div += '<div  animated bounceInDown wow" data-wow-duration="1500ms" style="margin-top: 10px">';
							div += '<span class="content_head"><b><a href="room.html?id='+response[i].house_id+'" class="info" style="margin-top: 5px">'+response[i].h_title+'</a></b></span><br>';
							div += '<span class="content_head">'+response[i].h_address+'</span><br>';
							div += '<span class="content_head"><span id="avail_room_count_'+response[i].house_id+'"></span> Room(s) Available</span><br>';
							div += '<span class="content_head"> ₱'+response[i].h_fullprice+'.00 / month</span></div>';


							div += '<div class="row lead" style="margin-left: 1px;" ><div id="hearts" class="starrr" data-rating="1"><fieldset class="rating">';
							div += '<input type="radio" id="star5" name="rating" value="5" /><label class = "full" for="star5" title="Awesome - 5 stars"></label>';
							div += '<input type="radio" id="star4half" name="rating" value="4 and a half" /><label class="half" for="star4half" title="Pretty good - 4.5 stars"></label>';
							div += '<input type="radio" id="star4" name="rating" value="4" /><label class = "full" for="star4" title="Pretty good - 4 stars"></label>';
							div += '<input type="radio" id="star3half" name="rating" value="3 and a half" /><label class="half" for="star3half" title="Meh - 3.5 stars"></label>';
							div += '<input type="radio" id="star3" name="rating" value="3" /><label class = "full" for="star3" title="Meh - 3 stars"></label>';
							div += '<input type="radio" id="star2half" name="rating" value="2 and a half" /><label class="half" for="star2half" title="Kinda bad - 2.5 stars"></label>';
							div += '<input type="radio" id="star2" name="rating" value="2" /><label class = "full" for="star2" title="Kinda bad - 2 stars"></label>';
							div += '<input type="radio" id="star1half" name="rating" value="1 and a half" /><label class="half" for="star1half" title="Meh - 1.5 stars"></label>';
							div += '<input type="radio" id="star1" name="rating" value="1" /><label class = "full" for="star1" title="Sucks big time - 1 star"></label>';
							div += '<input type="radio" id="starhalf" name="rating" value="half" /><label class="half" for="starhalf" title="Sucks big time - 0.5 stars"></label>';
							div += '</fieldset><div style="float: right; margin-right: 18px; font-size: 17px; font-weight: bold">';
							div += '<font id="count">0</font></div></div></div>';


							$('#houses').append(div);
							// if(i%2!=0){
							// 	$('#houses').append('<div class="row"></div>');
							// }
							house_id = response[i].house_id;
							get_avail_room(house_id);
							get_comment_count(house_id);
							display_feedback(house_id);
							$('#homeowner_house').attr('hidden');
							display_Advertisements();
							




			            }
			            $('#houses').append('<div class="row"></div>');

					}
				});
    	}
    



});

//Get available rooms
function get_avail_room(house_id){
	$.ajax({
	    url: 'http://homes.freesandboxdomain.com/admin/mobile/get_available_rooms.php',
	    type: 'POST',
	    data: {house_id:house_id},
	    dataType: 'json',
	        success: function(response1) {
	            //var days = response.days;

				//console.log(house_id);
				$('#avail_room_count_'+house_id).html('');
	            $('#avail_room_count_'+house_id).append(response1[0].available_room);
	            

			}
	});
}
//Get comment count
function get_comment_count(house_id){
	$.ajax({
	    url: 'http://homes.freesandboxdomain.com/admin/mobile/get_comment_count.php',
	    type: 'POST',
	    data: {house_id:house_id},
	    dataType: 'json',
	        success: function(response1) {
	            //var days = response.days;


	            $('#commentcount'+house_id).html('<i class="fa fa-comments-o margin-r-5"></i>Comments('+response1[0].total_count+')');
			}
	});
}

function check_inquiry_existence(tenant_id,house_id){
	var ans = 'none';
	$.ajax({
	    url: 'http://homes.freesandboxdomain.com/admin/mobile/get_inquiries_count.php',
	    type: 'POST',
	    async: false,
	    data: {tenant_id:tenant_id,house_id:house_id},
	    dataType: 'json',
	        success: function(response1) {
	        	if(response1[0].total_count >= 1){
	        		$('#inquire_button'+house_id).removeAttr('onclick');
	        		$('#inquire_button'+house_id).removeAttr('data-target');
	        		$('#inquire_button'+house_id).html('Already inquired');
	        	}
	            
			}
	});
}

//Get comment count
function get_inquiries_count(tenant_id){
	$.ajax({
	    url: 'http://homes.freesandboxdomain.com/admin/mobile/get_inquiries_count.php',
	    type: 'POST',
	    data: {tenant_id:tenant_id},
	    dataType: 'json',
	        success: function(response1) {
	            //var days = response.days;


	            $('#pending_inquiry_count').html(response1[0].total_pending);
	            $('#accepted_inquiry_count').html(response1[0].total_accepted);
			}
	});
}

//Display feedback
function display_feedback(house_id){
	    		$.ajax({
	    url: 'http://homes.freesandboxdomain.com/admin/mobile/display_feedback.php?id='+house_id,
	    type: 'POST',
	    //data: {leave_id:leave_id},
	    dataType: 'json',
	        success: function(response) {
	            //var days = response.days;

				// console.log(response);
				var div = '';
				feedback_counter = response.length;
				for(var i=0; i<feedback_counter; i++){
					


					div += '<div class="box-comment"><img class="img-circle img-sm"  src="http://homes.freesandboxdomain.com/homeowner/profile/no_image.png" alt="User Image"><div class="comment-text"><span class="username">'+response[i].name+'<span class="text-muted pull-right">'+response[i].date_time+'</span></span><!-- /.username -->'+response[i].content+'</div><!-- /.comment-text --></div>';



	            }
	            $('#comment_box').html(div);
			}
	});
}
//Display rooms
function display_room(house_id){
	$.ajax({
	    url: 'http://homes.freesandboxdomain.com/admin/mobile/available_room.php?house_id='+house_id,
	    type: 'POST',
	    // data: {house_id:house_id},
	    dataType: 'json',
	        success: function(response) {
	            //var days = response.days;

				var div = '';
				room_counter = response.length;
				$('#house_available_rooms').html('');
				for(var i=0; i<room_counter; i++){
					if(localStorage.tenant_id == undefined){
					    var modal = '#modal-login-first';
					    var functions = '';
					}else{
					    var modal = '#modal-inquire';
					    var functions = 'onclick=inquire_now("'+response[i].house_id+'","'+response[i].room_id+'","0","room","'+response[i].r_img+'")';
					}

	            	div += '<div class="col-lg-6"><div class="hovereffect"><img class="img-responsive" src="http://homes.freesandboxdomain.com/admin/rooms/'+response[i].r_img+'" alt="IMG" width="1100px;" height="200px;" style="min-height: 200px; max-height: 200;">';
	            	div += '<div class="overlay"><h2><a '+functions+' data-toggle="modal" id="inquire_button" data-target="'+modal+'">INQUIRE NOW</a></h2>';
	            	div += '<a class="info" >'+response[i].r_status+'</a></div></div><center>';
	            	div += '<a class="pull-right" target="_blank" href="dem.html?src=rooms/'+response[i].r_360+'">View 360</a><div class="row"></div><b><a target="_blank" href="bedspace.html?id='+response[i].room_id+'">'+response[i].r_title+'</a><br><i>'+response[i].r_status+'</i></b><br>2 available<br>2 unavailable<br>'+response[i].r_description+'<br></center></div>';

	            }
	            if (response.length > 0 ) {
	            	$("#rooms_h2").html("<center>List of Room(s)</center>");

	            }else{
	            	$("#rooms_h2").html("<center>No Room Added</center>");

	            }
	            $('#house_available_rooms').html(div);


			}
	});
}

function display_images(house_id){
	$.ajax({
	    url: 'http://homes.freesandboxdomain.com/admin/mobile/get_images.php?house_id='+house_id,
	    type: 'POST',
	    // data: {house_id:house_id},
	    dataType: 'json',
	        success: function(response) {
	            //var days = response.days;

				var div = '';
				var div1 = '';
				image_counter = response.length;
				$('#house_available_rooms').html('');
				
				var a = 0;
				for(var i=0; i<image_counter; i++){
					a++;
	            	div += '<li data-target="#carousel-example-generic" data-slide-to="'+a+'"></li>';

	        	      div1 += '<div class="item">';
			          div1 += '<a target="_blank"><img class="img-responsive" src="http://homes.freesandboxdomain.com/admin/houses/'+response[i].file_name+'"" alt="Room 1" ></a>';
			          div1 += '</div>';
	            }
	            $('#carousel-indicators-images').append(div);
	            $('#carousel-inner-images').append(div1);


			}
	});
}
//Update personal info
function update_personal_info(){
	var lname = $('#info_lname').val();
	var fname = $('#info_fname').val();
	var mname = $('#info_mname').val();
	var email = $('#info_ename').val();
	var username = $('#info_uname').val();
	var contact = $('#info_cname').val();
	var address = $('#info_address').val();

	$.ajax({
		url: 'http://homes.freesandboxdomain.com/admin/mobile/update_personal_info.php',
		type: 'POST',
		dataType: 'json',
		data: {fname:fname, lname:lname, mname:mname, email:email, contact:contact, username:username, user_id:localStorage.tenant_id,address:address},
		success: function(response) {
	        
	        var data = response.data;
	        //console.log(data);
	        if(data == "error"){
	        	show_error('There was an error!');

	        	//window.location.href="login.html";
	        }else if(data == 'success'){
	           	$('#box-personal-info').html('<div class="pad margin no-print" id="success_div"><div class="callout callout-success" style="margin-bottom: 0!important;"><h4><i class="fa fa-check"></i> Success!</h4><p id="success_msg">Personal info updated</p></div></div>');
	      		localStorage.setItem("fname",fname);
                localStorage.setItem("mname",mname);
                localStorage.setItem("lname",lname);
                localStorage.setItem("uname",username);
                localStorage.setItem("email",email);
                localStorage.setItem("contact",contact);
                localStorage.setItem("address",address);

                update_log_details();

	      	}else{
	           	show_error('Check your internet conection!');
	            
	      	}
		}
	});

}


function change_password(){
	var oldpassword = $('#info_oldpassword').val();
	var newpassword = $('#info_newpassword').val(); 
	var currentpassword = $('#info_currentpassword').val();
	var confirmpassword = $('#info_confirmpassword').val();
	    $.ajax({
			url: 'http://homes.freesandboxdomain.com/admin/mobile/check_password.php',
			type: 'POST',
			dataType: 'json',
			data: {user_id:localStorage.tenant_id, password:currentpassword},
			success: function(response) {
	            
	            var data = response.data;
	            //console.log(data);
	            if(data == "mismatch"){
	            	$('#box-password').html('<div class="pad margin no-print" id="success_div"><div class="callout callout-danger" style="margin-bottom: 0!important;"><h4><i class="fa fa-remove"></i> Error!</h4><p id="success_msg">Wrong current password.</p></div></div>');

	            	//window.location.href="login.html";
	            }else if(newpassword != confirmpassword){
					$('#box-password').html('<div class="pad margin no-print" id="success_div"><div class="callout callout-danger" style="margin-bottom: 0!important;"><h4><i class="fa fa-remove"></i> Error!</h4><p id="success_msg">Did not match.</p></div></div>');
				}else{
					 $.ajax({
						url: 'http://homes.freesandboxdomain.com/admin/mobile/update_password.php',
						type: 'POST',
						dataType: 'json',
						data: {password:newpassword, user_id:localStorage.tenant_id},
						success: function(response) {
					        
					        var data = response.data;
					        //console.log(data);
					        if(data == 'error'){
					        	alert('Check your internet conection!');
					      	}else{
					           	$('#box-password').html('<div class="pad margin no-print" id="success_div"><div class="callout callout-success" style="margin-bottom: 0!important;"><h4><i class="fa fa-check"></i> Success!</h4><p id="success_msg">Password updated.</p></div></div>');
					      		$('#reset_form').click();
					      		localStorage.setItem("password",data);
					      		update_log_details();
				                //alert(newpassword);
					      	}
						}
					}); 
				}
			}
	    });

	// 
}
	//console.log(confirmpassword);
	
	//display advertisements
function display_Advertisements(){
	$.ajax({
	    url: 'http://homes.freesandboxdomain.com/admin/mobile/display_ads.php',
	    type: 'POST',
	    //data: {house_id:house_id},
	    dataType: 'json',
	    	beforeSend: function(){$("#ads-overlay").show();},
	        success: function(response) {
	            //var days = response.days;

				var div = '';
				var car_class = '';
				var div1 = '';
				var item_class = '';
				ad_counter = response.length;

				$('#carousel-indicators').html('');
	            $('#carousel-inner').html('');
				for(var i=0; i<ad_counter; i++){
					if(i == 0){
						car_class = 'active';
						item_class = 'active' ;
					}else{
						car_class = '';
						item_class = '' ;
					}
	            	div += '<li data-target="#carousel-example-generic" data-slide-to="'+i+'" class="'+car_class+'">';
	            	div1 += '<div class="item '+item_class+'"><a href="'+response[i].ads_website+'"><img class="slide-image" target="_blank" src="http://homes.freesandboxdomain.com/admin/ads/'+response[i].ads_file+'" style="width: 1100px;" alt=""></a></div>';
	         	}
	            $('#carousel-indicators').html(div);
	            $('#carousel-inner').html(div1);

	            setInterval(function() {$("#ads-overlay").hide(); },500);
			}
	});
}
	//hide advertisements
function hide_me(){
	$('#hide_me').fadeOut();
}
		//Search
function search_me(){

	if(localStorage.type == 'Tenant'){
		  var search_value = $("#search_val").val();
		  $('#houses').html('');
		  $("#hide_me").fadeOut();
		  	if(search_value != ''){
			  $.ajax({
						    url: 'http://homes.freesandboxdomain.com/admin/mobile/search_houses.php?id='+search_value+'&&tenant_id='+localStorage.tenant_id,
						    type: 'POST',
						    data: {search_value:search_value},
						    dataType: 'json',
						    	beforeSend: function(){$("#search_result-overlay").show();},
						        success: function(response) {
						            //var days = response.days;

									//console.log(response);
									// console.log(search_value);
									
									var houses_counter = response.length;
									var house_id;

									
									$('#houses').html('<i style="color: gray; margin-top: 5px;">About '+response.length+' result(s) for &#8220;'+search_value+'&#8220;<br></i><div class="row"></div>');
									// $('#houses').html(response.length+' result(s) for '+search_value+'<div class="row"></div>');
									for(var i=0; i<houses_counter; i++){
									if(localStorage.tenant_id == undefined){
									    var modal = '#modal-login-first';
									    var my_title = 'INQUIRE NOW';
									}else{
										if(response[i].h_ans == 'common'){
											var modal = '';
											var my_title = 'ALREADY INQUIRED';
										}else{
									    	var modal = '#modal-inquire';
									    	var my_title = 'INQUIRE NOW';
									    }
									}
									var div = '<div class="col-lg-3 col-xs-6" style="padding: 5px;"> ';
									div += '<div class="hovereffect">';
									div += '<img src = "http://homes.freesandboxdomain.com/admin/houses/'+response[i].h_img+'" class="img-responsive" width="1100px;" height="150px;" style="min-height: 150px; max-height: 150px;">';
									div += '<div class="overlay"><h2><a onclick=inquire_now("'+response[i].house_id+'","0","0","whole-house","'+response[i].h_img+'") data-toggle="modal" id="inquire_button'+response[i].house_id+'" data-target="'+modal+'">'+my_title+'</a></h2><a class="info">'+response[i].h_status+'</a><br></div></div><div class="row"></div>';
									div += '<div  animated bounceInDown wow" data-wow-duration="1500ms" style="margin-top: 10px">';
									div += '<span class="content_head"><b><a href="room.html?id='+response[i].house_id+'" class="info" style="margin-top: 5px">'+response[i].h_title+'</a></b></span><br>';
									div += '<span class="content_head">'+response[i].h_address+'</span><br>';
									div += '<span class="content_head"><span id="avail_room_count_'+response[i].house_id+'"></span> Room(s) Available</span><br>';
									div += '<span class="content_head"> ₱'+response[i].h_fullprice+'.00 / month</span></div>';


									div += '<div class="row lead" style="margin-left: 1px;" ><div id="hearts" class="starrr" data-rating="1"><fieldset class="rating">';
									div += '<input type="radio" id="star5" name="rating" value="5" /><label class = "full" for="star5" title="Awesome - 5 stars"></label>';
									div += '<input type="radio" id="star4half" name="rating" value="4 and a half" /><label class="half" for="star4half" title="Pretty good - 4.5 stars"></label>';
									div += '<input type="radio" id="star4" name="rating" value="4" /><label class = "full" for="star4" title="Pretty good - 4 stars"></label>';
									div += '<input type="radio" id="star3half" name="rating" value="3 and a half" /><label class="half" for="star3half" title="Meh - 3.5 stars"></label>';
									div += '<input type="radio" id="star3" name="rating" value="3" /><label class = "full" for="star3" title="Meh - 3 stars"></label>';
									div += '<input type="radio" id="star2half" name="rating" value="2 and a half" /><label class="half" for="star2half" title="Kinda bad - 2.5 stars"></label>';
									div += '<input type="radio" id="star2" name="rating" value="2" /><label class = "full" for="star2" title="Kinda bad - 2 stars"></label>';
									div += '<input type="radio" id="star1half" name="rating" value="1 and a half" /><label class="half" for="star1half" title="Meh - 1.5 stars"></label>';
									div += '<input type="radio" id="star1" name="rating" value="1" /><label class = "full" for="star1" title="Sucks big time - 1 star"></label>';
									div += '<input type="radio" id="starhalf" name="rating" value="half" /><label class="half" for="starhalf" title="Sucks big time - 0.5 stars"></label>';
									div += '</fieldset><div style="float: right; margin-right: 18px; font-size: 17px; font-weight: bold">';
									div += '<font id="count">0</font></div></div></div>';


									$('#houses').append(div);
									// if(i%2!=0){
									// 	$('#houses').append('<div class="row"></div>');
									// }
									lat = parseFloat(response[i].lat);
									lang = parseFloat(response[i].lng);
									house_id = response[i].house_id;
									get_avail_room(house_id);
									get_comment_count(house_id);
									get_inquiries_count(localStorage.tenant_id);
									display_feedback(house_id);
									$('.permit-div').hide();
									$('#tenant_inquiries').removeAttr('hidden');
									display_Advertisements();
									// console.log(check_inquiry_existence(localStorage.tenant_id,response[i].house_id));

									




					            }
					            $('#houses').append('<div class="row"></div>');

					            setInterval(function() {$("#search_result-overlay").hide(); },500);
								}
							});
			}else{
				$.ajax({
					    url: 'http://homes.freesandboxdomain.com/admin/mobile/get_houses.php',
					    type: 'POST',
					    //data: {leave_id:leave_id},
					    dataType: 'json',
					    	beforeSend: function(){$("#search_result-overlay").show();},
					        success: function(response) {
					            //var days = response.days;

								//console.log(response);
								
								var houses_counter = response.length;
								var house_id;
								$('#houses').html('<i style="color: gray; margin-top: 5px;">About '+response.length+' result(s) for &#8220;'+search_value+'&#8220;<br></i><div class="row"></div>');
								for(var i=0; i<houses_counter; i++){
									if(localStorage.tenant_id == undefined){
									    var modal = '#modal-login-first';
									    var my_title = 'INQUIRE NOW';
									}
									var div = '<div class="col-lg-3 col-xs-6" style="padding: 5px;"> ';
									div += '<div class="hovereffect">';
									div += '<img src = "http://homes.freesandboxdomain.com/admin/houses/'+response[i].h_img+'" class="img-responsive" width="1100px;" height="150px;" style="min-height: 150px; max-height: 150px;">';
									div += '<div class="overlay"><h2><a onclick=inquire_now("'+response[i].house_id+'","0","0","whole-house","'+response[i].h_img+'") data-toggle="modal" id="inquire_button'+response[i].house_id+'" data-target="'+modal+'">'+my_title+'</a></h2><a class="info">'+response[i].h_status+'</a><br></div></div><div class="row"></div>';
									div += '<div  animated bounceInDown wow" data-wow-duration="1500ms" style="margin-top: 10px">';
									div += '<span class="content_head"><b><a href="room.html?id='+response[i].house_id+'" class="info" style="margin-top: 5px">'+response[i].h_title+'</a></b></span><br>';
									div += '<span class="content_head">'+response[i].h_address+'</span><br>';
									div += '<span class="content_head"><span id="avail_room_count_'+response[i].house_id+'"></span> Room(s) Available</span><br>';
									div += '<span class="content_head"> ₱'+response[i].h_fullprice+'.00 / month</span></div>';


									div += '<div class="row lead" style="margin-left: 1px;" ><div id="hearts" class="starrr" data-rating="1"><fieldset class="rating">';
									div += '<input type="radio" id="star5" name="rating" value="5" /><label class = "full" for="star5" title="Awesome - 5 stars"></label>';
									div += '<input type="radio" id="star4half" name="rating" value="4 and a half" /><label class="half" for="star4half" title="Pretty good - 4.5 stars"></label>';
									div += '<input type="radio" id="star4" name="rating" value="4" /><label class = "full" for="star4" title="Pretty good - 4 stars"></label>';
									div += '<input type="radio" id="star3half" name="rating" value="3 and a half" /><label class="half" for="star3half" title="Meh - 3.5 stars"></label>';
									div += '<input type="radio" id="star3" name="rating" value="3" /><label class = "full" for="star3" title="Meh - 3 stars"></label>';
									div += '<input type="radio" id="star2half" name="rating" value="2 and a half" /><label class="half" for="star2half" title="Kinda bad - 2.5 stars"></label>';
									div += '<input type="radio" id="star2" name="rating" value="2" /><label class = "full" for="star2" title="Kinda bad - 2 stars"></label>';
									div += '<input type="radio" id="star1half" name="rating" value="1 and a half" /><label class="half" for="star1half" title="Meh - 1.5 stars"></label>';
									div += '<input type="radio" id="star1" name="rating" value="1" /><label class = "full" for="star1" title="Sucks big time - 1 star"></label>';
									div += '<input type="radio" id="starhalf" name="rating" value="half" /><label class="half" for="starhalf" title="Sucks big time - 0.5 stars"></label>';
									div += '</fieldset><div style="float: right; margin-right: 18px; font-size: 17px; font-weight: bold">';
									div += '<font id="count">0</font></div></div></div>';


									$('#houses').append(div);
									if(i%2!=0){
										$('#houses').append('<div class="row"></div>');
									}
									house_id = response[i].house_id;
									get_avail_room(house_id);
									get_comment_count(house_id);
									display_feedback(house_id);
									$('#homeowner_house').attr('hidden');
									display_Advertisements();
									




					            }
					            $('#houses').append('<div class="row"></div>');
					            setInterval(function() {$("#search_result-overlay").hide(); },500);

							}
						});
			}
	}else{
		var search_value = $("#search_val").val();
		  $('#houses').html('');
		  $("#hide_me").fadeOut();
		  	if(search_value != ''){
			  $.ajax({
						    url: 'http://homes.freesandboxdomain.com/admin/mobile/search_houses.php?id='+search_value,
						    type: 'POST',
						    data: {search_value:search_value},
						    dataType: 'json',
						    	beforeSend: function(){$("#search_result-overlay").show();},
						        success: function(response) {
						            //var days = response.days;

									//console.log(response);
									// console.log(search_value);
									
									var houses_counter = response.length;
									var house_id;

									
									$('#houses').html('<i style="color: gray; margin-top: 5px;">About '+response.length+' result(s) for &#8220;'+search_value+'&#8220;<br></i><div class="row"></div>');
									for(var i=0; i<houses_counter; i++){
									if(localStorage.tenant_id == undefined){
									    var modal = '#modal-login-first';
									    var my_title = 'INQUIRE NOW';
									}else{
										if(response[i].h_ans == 'common'){
											var modal = '';
											var my_title = 'ALREADY INQUIRED';
										}else{
									    	var modal = '#modal-inquire';
									    	var my_title = 'INQUIRE NOW';
									    }
									}
									var div = '<div class="col-lg-3 col-xs-6" style="padding: 5px;"> ';
									div += '<div class="hovereffect">';
									div += '<img src = "http://homes.freesandboxdomain.com/admin/houses/'+response[i].h_img+'" class="img-responsive" width="1100px;" height="150px;" style="min-height: 150px; max-height: 150px;">';
									div += '<div class="overlay"><h2><a onclick=inquire_now("'+response[i].house_id+'","0","0","whole-house","'+response[i].h_img+'") data-toggle="modal" id="inquire_button'+response[i].house_id+'" data-target="'+modal+'">'+my_title+'</a></h2><a class="info">'+response[i].h_status+'</a><br></div></div><div class="row"></div>';
									div += '<div  animated bounceInDown wow" data-wow-duration="1500ms" style="margin-top: 10px">';
									div += '<span class="content_head"><b><a href="room.html?id='+response[i].house_id+'" class="info" style="margin-top: 5px">'+response[i].h_title+'</a></b></span><br>';
									div += '<span class="content_head">'+response[i].h_address+'</span><br>';
									div += '<span class="content_head"><span id="avail_room_count_'+response[i].house_id+'"></span> Room(s) Available</span><br>';
									div += '<span class="content_head"> ₱'+response[i].h_fullprice+'.00 / month</span></div>';


									div += '<div class="row lead" style="margin-left: 1px;" ><div id="hearts" class="starrr" data-rating="1"><fieldset class="rating">';
									div += '<input type="radio" id="star5" name="rating" value="5" /><label class = "full" for="star5" title="Awesome - 5 stars"></label>';
									div += '<input type="radio" id="star4half" name="rating" value="4 and a half" /><label class="half" for="star4half" title="Pretty good - 4.5 stars"></label>';
									div += '<input type="radio" id="star4" name="rating" value="4" /><label class = "full" for="star4" title="Pretty good - 4 stars"></label>';
									div += '<input type="radio" id="star3half" name="rating" value="3 and a half" /><label class="half" for="star3half" title="Meh - 3.5 stars"></label>';
									div += '<input type="radio" id="star3" name="rating" value="3" /><label class = "full" for="star3" title="Meh - 3 stars"></label>';
									div += '<input type="radio" id="star2half" name="rating" value="2 and a half" /><label class="half" for="star2half" title="Kinda bad - 2.5 stars"></label>';
									div += '<input type="radio" id="star2" name="rating" value="2" /><label class = "full" for="star2" title="Kinda bad - 2 stars"></label>';
									div += '<input type="radio" id="star1half" name="rating" value="1 and a half" /><label class="half" for="star1half" title="Meh - 1.5 stars"></label>';
									div += '<input type="radio" id="star1" name="rating" value="1" /><label class = "full" for="star1" title="Sucks big time - 1 star"></label>';
									div += '<input type="radio" id="starhalf" name="rating" value="half" /><label class="half" for="starhalf" title="Sucks big time - 0.5 stars"></label>';
									div += '</fieldset><div style="float: right; margin-right: 18px; font-size: 17px; font-weight: bold">';
									div += '<font id="count">0</font></div></div></div>';


									$('#houses').append(div);
									// if(i%2!=0){
									// 	$('#houses').append('<div class="row"></div>');
									// }
									lat = parseFloat(response[i].lat);
									lang = parseFloat(response[i].lng);
									house_id = response[i].house_id;
									get_avail_room(house_id);
									get_comment_count(house_id);
									display_feedback(house_id);
									// console.log(check_inquiry_existence(localStorage.tenant_id,response[i].house_id));

									




					            }
					            $('#houses').append('<div class="row"></div>');
					            setInterval(function() {$("#search_result-overlay").hide(); },500);


								}
							});
			}else{
				$.ajax({
					    url: 'http://homes.freesandboxdomain.com/admin/mobile/get_houses.php',
					    type: 'POST',
					    //data: {leave_id:leave_id},
					    dataType: 'json',
					    	beforeSend: function(){$("#search_result-overlay").show();},
					        success: function(response) {
					            //var days = response.days;

								//console.log(response);
								
								var houses_counter = response.length;
								var house_id;
								$('#houses').html('<i style="color: gray; margin-top: 5px;">About '+response.length+' result(s) for &#8220;'+search_value+'&#8220;<br></i><div class="row"></div>');
								for(var i=0; i<houses_counter; i++){
									if(localStorage.tenant_id == undefined){
									    var modal = '#modal-login-first';
									    var my_title = 'INQUIRE NOW';
									}else{
										if(response[i].h_ans == 'common'){
											var modal = '';
											var my_title = 'ALREADY INQUIRED';
										}else{
									    	var modal = '#modal-inquire';
									    	var my_title = 'INQUIRE NOW';
									    }
									}
									var div = '<div class="col-lg-3 col-xs-6" style="padding: 5px;"> ';
									div += '<div class="hovereffect">';
									div += '<img src = "http://homes.freesandboxdomain.com/admin/houses/'+response[i].h_img+'" class="img-responsive" width="1100px;" height="150px;" style="min-height: 150px; max-height: 150px;">';
									div += '<div class="overlay"><h2><a onclick=inquire_now("'+response[i].house_id+'","0","0","whole-house","'+response[i].h_img+'") data-toggle="modal" id="inquire_button'+response[i].house_id+'" data-target="'+modal+'">'+my_title+'</a></h2><a class="info">'+response[i].h_status+'</a><br></div></div><div class="row"></div>';
									div += '<div  animated bounceInDown wow" data-wow-duration="1500ms" style="margin-top: 10px">';
									div += '<span class="content_head"><b><a href="room.html?id='+response[i].house_id+'" class="info" style="margin-top: 5px">'+response[i].h_title+'</a></b></span><br>';
									div += '<span class="content_head">'+response[i].h_address+'</span><br>';
									div += '<span class="content_head"><span id="avail_room_count_'+response[i].house_id+'"></span> Room(s) Available</span><br>';
									div += '<span class="content_head"> ₱'+response[i].h_fullprice+'.00 / month</span></div>';


									div += '<div class="row lead" style="margin-left: 1px;" ><div id="hearts" class="starrr" data-rating="1"><fieldset class="rating">';
									div += '<input type="radio" id="star5" name="rating" value="5" /><label class = "full" for="star5" title="Awesome - 5 stars"></label>';
									div += '<input type="radio" id="star4half" name="rating" value="4 and a half" /><label class="half" for="star4half" title="Pretty good - 4.5 stars"></label>';
									div += '<input type="radio" id="star4" name="rating" value="4" /><label class = "full" for="star4" title="Pretty good - 4 stars"></label>';
									div += '<input type="radio" id="star3half" name="rating" value="3 and a half" /><label class="half" for="star3half" title="Meh - 3.5 stars"></label>';
									div += '<input type="radio" id="star3" name="rating" value="3" /><label class = "full" for="star3" title="Meh - 3 stars"></label>';
									div += '<input type="radio" id="star2half" name="rating" value="2 and a half" /><label class="half" for="star2half" title="Kinda bad - 2.5 stars"></label>';
									div += '<input type="radio" id="star2" name="rating" value="2" /><label class = "full" for="star2" title="Kinda bad - 2 stars"></label>';
									div += '<input type="radio" id="star1half" name="rating" value="1 and a half" /><label class="half" for="star1half" title="Meh - 1.5 stars"></label>';
									div += '<input type="radio" id="star1" name="rating" value="1" /><label class = "full" for="star1" title="Sucks big time - 1 star"></label>';
									div += '<input type="radio" id="starhalf" name="rating" value="half" /><label class="half" for="starhalf" title="Sucks big time - 0.5 stars"></label>';
									div += '</fieldset><div style="float: right; margin-right: 18px; font-size: 17px; font-weight: bold">';
									div += '<font id="count">0</font></div></div></div>';


									$('#houses').append(div);
									if(i%2!=0){
										$('#houses').append('<div class="row"></div>');
									}
									house_id = response[i].house_id;
									get_avail_room(house_id);
									get_comment_count(house_id);
									display_feedback(house_id);
									$('#homeowner_house').attr('hidden');
									display_Advertisements();
									




					            }
					            $('#houses').append('<div class="row"></div>');
					            setInterval(function() {$("#search_result-overlay").hide(); },500);

							}
						});
			}
	}
}

$("#profileForm").on('submit',(function(e) {
    // var formData = new FormData($(this)[0]);
    if ($(this).valid()) {
        $.ajax({
		url: 'http://homes.freesandboxdomain.com/admin/mobile/update_profile.php',
		type: 'POST',
		data: new FormData(this),
		contentType: false,
		cache: false,
		processData: false,
		success: function(response) {
	        
	        var data = response.data;
	        // console.log(data);
	        if(data == "error"){
	        	alert('There was an error!');

	        	//window.location.href="login.html";
	        }else if(data == 'success'){
	        	alert('Success');

	           	
	      	}else{
	           	show_error('Check your internet conection!');
	            
	      	}
		}
	});       
    }
 }));


function update_profile(){ 
    var formData = new FormData($('#formData')[0]);
        $.ajax({
		url: 'http://homes.freesandboxdomain.com/admin/mobile/update_profile.php',
		type: 'POST',
		dataType: 'json',
		data: formData,
		success: function(response) {
	        
	        var data = response.data;
	        // console.log(data);
	        if(data == "error"){
	        	alert('There was an error!');

	        	//window.location.href="login.html";
	        }else if(data == 'success'){
	        	alert('Success');

	           	
	      	}else{
	           	show_error('Check your internet conection!');
	            
	      	}
		}
	});  
}

function showPreview(objFileInput) {
    if (objFileInput.files[0]) {
        var fileReader = new FileReader();
        fileReader.onload = function (e) {
            $("#targetLayer").html('<img src="'+e.target.result+'" width="200px" height="200px" class="upload-preview" />');
			$("#targetLayer").css('opacity','0.7');
			$(".icon-choose-image").css('opacity','0.5');
        }
		fileReader.readAsDataURL(objFileInput.files[0]);
    }
}

$(document).ready(function (e) {
	$("#uploadForm").on('submit',(function(e) {
		e.preventDefault();
		$.ajax({
        	url: 'http://homes.freesandboxdomain.com/admin/mobile/update_profile.php',
			type: "POST",
			data:  new FormData(this),
			beforeSend: function(){$("#body-overlay").show();},
			contentType: false,
    	    processData:false,
			success: function(data)
		    {
		    	
			$("#targetLayer").html(data);
			$("#targetLayer").css('opacity','1');
			setInterval(function() {$("#body-overlay").hide(); },500);

			$('#profile_img').val(data);
			localStorage.setItem("img",data);
			// $('#user-image2'.)
			update_log_details();

			},
		  	error: function() 
	    	{
	    	} 	        
	   });
	}));
});
