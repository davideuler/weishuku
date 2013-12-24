
	
// jsonCriteria: {"x" : 1}, a json object
function encodeCriteria(jsonCriteria){
	json = JSON.stringify(jsonCriteria);
	return "criteria=" + encodeURI(json);
}

function borrow(isbn,title,ownername){
	var name = window.localStorage.getItem("name");
	
	j = {username:name, isbn:isbn, bookTitle:title, borrowReqDate:curDateStr(), ownername:ownername };
	jsonstr = JSON.stringify(j);
	
	$('#J_status')[0].innerHTML=jsonstr;
	
	var booktitle = title;
	
	$.ajax({
	        type: 'POST',
			data: 'docs=[' + jsonstr + ']',
	        url: BASE_URL + '/borrowinfo/_insert',
	        dataType: 'json',        //jsonp 支持跨域的访问，可以本地测试login.html（使用远程登陆服务)
	        timeout: 5000,
	        success: function (rValue, status) {
	            if (rValue.oids.length == 1) {
	                
	                $('#J_status')[0].innerHTML='<'+booktitle+'>的借书请求已发送至:'+ownername;
	                return;
	            } else{
	                $('#J_status')[0].innerHTML = '*发送借书请求失败，请联系管理员';
				}

	        },
	        error: function (e) {
	            $('#J_status')[0].innerHTML = '*请求失败，请稍后再试';

	        }
	    });
		
}

function allbooks() {
    username = window.localStorage.getItem("name");
	
	j = {borrowable:"1"};
	
	$.ajax({
	        type: 'GET',
	        url: BASE_URL + '/book/_find?batch_size=100&' + encodeCriteria(j),
	        dataType: 'json',        //jsonp 支持跨域的访问，可以本地测试login.html（使用远程登陆服务)
	        timeout: 5000,
	        success: function (rValue, status) {
	            if (rValue.results.length >= 1) {
					var tbl_body = '<tr><td width="50%">title</td><td width="10%">author</td><td width="10%">owner</td>';
					tbl_body += '<td width="10%">count</td><td width="10%">borrow</td><td width="0%" style="display:none"></td>';
					tbl_body += '</tr>';
					
					$.each(rValue.results, function() {
					    var tbl_row = "";
						tbl_row = "<td>" + this["title"] + "</td><td>" + this["author"] + "</td><td>" + this["ownername"] + "</td>";
						tbl_row += "<td>" + this["borrowableCount"] + "</td>";

						if(this["borrowableCount"]>0 && !(this["ownername"].toLowerCase()==username.toLowerCase())){
							tbl_row += "<td><input type='button' class='btn btn-sm btn-info' value='Borrow' onclick=\"borrow(" + this["isbn"] + ",'"+ this["title"] + "','" + this["ownername"]+ "');\"></input></td>";
						}
						else if(this["ownername"].toLowerCase()!=username.toLowerCase()){
							tbl_row += "<td>预约</td>";
						}
						else
						{
							tbl_row += "<td></td>";
						}
						tbl_row += "<td style='display:none'>" + this["isbn"] + "</td>";

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
    username = window.localStorage.getItem("name");
	j = {borrowable:"1",ownername:username};
	
	$.ajax({
	        type: 'GET',
	        url: BASE_URL + '/book/_find?batch_size=100&' + encodeCriteria(j),
	        dataType: 'json',        //jsonp 支持跨域的访问，可以本地测试login.html（使用远程登陆服务)
	        timeout: 5000,
	        success: function (rValue, status) {
	            if (rValue.results.length >= 1) {
					var tbl_body = '<tr><td width="50%">title</td><td width="10%">author</td><td width="10%">borrowdate</td></tr>';
					$.each(rValue.results, function() {
					    var tbl_row = "";
						tbl_row = "<td>" + this["title"] + "</td><td>" + this["author"] + "</td><td>" + this["borrowdate"] + "</td>";
				
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