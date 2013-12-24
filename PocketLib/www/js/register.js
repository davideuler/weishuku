
	
function register() {
	BASE_URL = "http://192.168.8.103:27080/weishuku";

    var username = $('#login')[0].value;
    var password = $('#password')[0].value;
	var name = $('#name')[0].value;
	
	if (String(username) == '' || String(password) == '') {
		//alert('*用户名或密码不可为空!');
		$('#J_status')[0].innerHTML = '*用户名或密码不可为空!';
	        return;
	}
	
	var sha256 = CryptoJS.SHA256(password);
	
    var d = new Date();
    var curr_date = d.getDate();
    var curr_month = d.getMonth() + 1; //Months are zero based
    var curr_year = d.getFullYear();
	var d = curr_year + "-" + curr_month + "-" + curr_date;
	
	j = {email : username, password: ''+sha256, name:name, createdDate:d };
	jsonstr = JSON.stringify(j);
	
	$('#message')[0].innerHTML=jsonstr;
	
	
	$.ajax({
	        type: 'POST',
			data: 'docs=[' + jsonstr + ']',
	        url: BASE_URL + '/user/_insert',
	        dataType: 'json',        //jsonp 支持跨域的访问，可以本地测试login.html（使用远程登陆服务)
	        timeout: 5000,
	        success: function (rValue, status) {
	            if (rValue.oids.length == 1) {
	                
	                $('#message')[0].innerHTML='Register successfully! click "<a href=\'index.html\'>Login</a>" to login';
	                return;
	            } else{
	                $('#J_status')[0].innerHTML = '*注册失败，请更换邮箱重试';
				}

	        },
	        error: function (e) {
	            $('#J_status')[0].innerHTML = '*请求失败，请稍后再试';

	        }
	    });
}