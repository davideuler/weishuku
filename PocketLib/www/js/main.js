

function myLogin() {
	BASE_URL = "http://192.168.8.103:27080/weishuku";

    var username = $('#login')[0].value;
    var password = $('#password')[0].value;
	
	if (String(username) == '' || String(password) == '') {
		//alert('*用户名或密码不可为空!');
		$('#J_status')[0].innerHTML = '*用户名或密码不可为空!';
	        return;
	}
	
	window.localStorage.setItem('username', username);
	window.localStorage.setItem('password', password);
	var sha256 = CryptoJS.SHA256(password);
	
	j = {email : username, password: ''+sha256};
	sha256pass = JSON.stringify(j);
	
	$('#J_status')[0].innerHTML=sha256pass;
	
	$.ajax({
	        type: 'GET',		
	        url: BASE_URL + '/user/_find?criteria=' + encodeURI(sha256pass),
	        dataType: 'jsonp',        //jsonp 支持跨域的访问，可以本地测试login.html（使用远程登陆服务)
	        timeout: 5000,
	        success: function (rValue, status) {
				
	            if (rValue.results.length == 1) {
	                $('#J_status')[0].innerHTML = '登录成功';
	                window.localStorage.setItem("userid", rValue.user_id);
					window.localStorage.setItem("token", rValue.results[0]._id['$oid']);
	                window.location = "booklist.html";
	                return;
	            } else{
	                $('#J_status')[0].innerHTML = '*用户名或密码错误';
				}
	            window.localStorage.removeItem('password');
	        },
	        error: function (e) {
	            $('#J_status')[0].innerHTML = '*请求失败，请稍后再试';
	            window.localStorage.removeItem('password');
	        }
	    });
	
	return false;
	
}