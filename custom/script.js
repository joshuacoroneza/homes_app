function login(){
    var username = $('#username').val();
    var password = $('#password1').val();
    var error = 0;
	if(username == ''){
		val_error('username','Username is required.');
		error +=1;
	}else{
		val_success('username');
		
	}

	if(password == ''){
		val_error('password1','Password is required.');
		error +=1;
	}else{
		val_success('password1');
	}

	if(error == 0){

	    $.ajax({
			url: 'http://localhost/homes2/admin/mobile/login.php',
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
	                
	                localStorage.setItem("tenant_id",data.user_id);
	                localStorage.setItem("fname",data.fname);
	                localStorage.setItem("mname",data.mname);
	                localStorage.setItem("lname",data.lname);
	                localStorage.setItem("type",data.type);
	                $('.box-login').html('<div class="pad margin no-print" id="success_div"><div class="callout callout-success" style="margin-bottom: 0!important;"><h4><i class="fa fa-check"></i> Success!</h4><p id="success_msg">Already logged in.</p></div></div>');
	                $('#error_div').fadeOut();
	                update_log_details();
	          	}
			}
	    });
	}
}

function register(){
	var lname = $('#lname').val();
	var fname = $('#fname').val();
	var mname = $('#mname').val();
	var contact = $('#contact').val();
	var email = $('#email').val();
	var username = $('#username').val();
	var password = $('#password').val();
	var confirm = $('#confirm').val();
	var type = 'Tenant';

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
			url: 'http://localhost/homes2/admin/mobile/register.php',
			type: 'POST',
			dataType: 'json',
			data: {fname:fname, lname:lname, mname:mname, email:email, contact:contact, username:username, password:password, type:type},
			success: function(response) {
	            
	            var data = response.data;
	            console.log(data);
	            if(data == "error"){
	            	show_error('There was an error!');

	            	//window.location.href="login.html";
	            }else if(data == 'success'){
	               	$('.box-register').html('<div class="pad margin no-print" id="success_div"><div class="callout callout-success" style="margin-bottom: 0!important;"><h4><i class="fa fa-check"></i> Success!</h4><p id="success_msg">Already registered.</p></div></div>');
	          	}else{
	               	show_error('Check your internet conection!');
	                
	          	}
			}
	    });

	}
}

function show_error(msg){
	$('#error_div').fadeIn();
	$('#error_msg').html(msg);
}

function show_success(msg){
	$('#success_div').fadeIn();
	$('#success_msg').html(msg);
}

function log_out(){
    localStorage.clear();
    window.location.href="index.html";
}

function update_log_details(){
	$('#log_name').html(localStorage.fname+' '+localStorage.lname);
    $('#log_name1').html(localStorage.fname+' '+localStorage.lname + ' - '+localStorage.type);
    $('#log_name2').html(localStorage.fname+' '+localStorage.lname);
    $('.user-panel').fadeIn();
	$('#user-menu').fadeIn();
	$('#log_icon').attr('class','fa fa-unlock');
	$('#log_nav').html('Logged In');

}

function update_notlog_details(){
	$('.user-panel').fadeOut();
	$('#user-menu').fadeOut();
	$('#log_icon').attr('class','fa fa-lock');
	$('#log_nav').html('Login');
}

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


$('#password1').on('keyup',function(){
	var password = $('#password1').val();	
	if(password == ''){
		val_error('password1','Password is required.');
	}else{
		val_success('password1');
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
    	console.log('not_login');
    	$('#error_div').fadeOut();
    	update_notlog_details();
    	localStorage.clear();
    }else{
    	$('#error_div').fadeOut();
    	$('.box-login').html('<div class="pad margin no-print" id="success_div"><div class="callout callout-success" style="margin-bottom: 0!important;"><h4><i class="fa fa-check"></i> Success!</h4><p id="success_msg">Already logged in.</p></div></div>');
    	update_log_details();
    }
});




