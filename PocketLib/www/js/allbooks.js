// jsonCriteria: {"x" : 1}, a json object
function encodeCriteria(jsonCriteria){
	json = JSON.stringify(jsonCriteria);
	return "criteria=" + encodeURI(json);
}

function toDisplayKey(k){
	return k=="title" || k == "author" || k=="ownername";
}

function allbooks() {
	BASE_URL = "http://192.168.8.103:27080/weishuku";

    username = window.localStorage.getItem("username");
	j = {isPublic:"1"};
	
	$.ajax({
	        type: 'GET',
	        url: BASE_URL + '/book/_find?' + encodeCriteria(j),
	        dataType: 'json',        //jsonp 支持跨域的访问，可以本地测试login.html（使用远程登陆服务)
	        timeout: 5000,
	        success: function (rValue, status) {
	            if (rValue.results.length >= 1) {
					var tbl_body = '';
					$.each(rValue.results, function() {
					    var tbl_row = "";
					    $.each(this, function(k , v) {
							if (toDisplayKey(k)){
								if(k=="ownerid") v = v.substring(0,v.indexOf('@'));
					        	tbl_row += "<td>"+v+"</td>";
							}
					    })
					    tbl_body += "<tr>"+tbl_row+"</tr>";                 
					});
					$("#display").html(tbl_body);

	            } else{
	                $('#contentlist')[0].innerHTML = '*没有查询到图书，请联系管理员';
				}

	        },
	        error: function (e) {
	            $('#contentlist')[0].innerHTML = '*请求失败，请稍后再试';

	        }
	    });
}



function mybooks() {
	BASE_URL = "http://192.168.8.103:27080/weishuku";

    username = window.localStorage.getItem("name");
	j = {isPublic:"1",ownername:username};
	
	$.ajax({
	        type: 'GET',
	        url: BASE_URL + '/book/_find?' + encodeCriteria(j),
	        dataType: 'json',        //jsonp 支持跨域的访问，可以本地测试login.html（使用远程登陆服务)
	        timeout: 5000,
	        success: function (rValue, status) {
	            if (rValue.results.length >= 1) {
					var tbl_body = '';
					$.each(rValue.results, function() {
					    var tbl_row = "";
					    $.each(this, function(k , v) {
							if (toDisplayKey(k)){
								// if(k=="ownerid") v = v.substring(0,v.indexOf('@'));
					        	tbl_row += "<td>"+v+"</td>";
							}
					    })
					    tbl_body += "<tr>"+tbl_row+"</tr>";                 
					});
					$("#display").html(tbl_body);

	            } else{
	                $('#contentlist')[0].innerHTML = '*没有查询到图书，请联系管理员';
				}

	        },
	        error: function (e) {
	            $('#contentlist')[0].innerHTML = '*请求失败，请稍后再试';

	        }
	    });
}