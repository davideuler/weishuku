
	
// jsonCriteria: {"x" : 1}, a json object
function encodeCriteria(jsonCriteria){
	json = JSON.stringify(jsonCriteria);
	return "criteria=" + encodeURI(json);
}

/** 图书拥有者确认借出图书 */
function confirmBorrow(isbn,title,username,borrowReqDate){
	var ownername = window.localStorage.getItem("name");

	criteria = {username:username, isbn:isbn, bookTitle:title, ownername:ownername};
	newobj = JSON.parse(JSON.stringify(criteria));
	
	//加入借出日期:
	newobj.borrowDate = curDateStr();
	newobj.borrowReqDate = borrowReqDate;

	jsonCriteria = JSON.stringify(criteria);
	jsonNewObj = JSON.stringify(newobj);
	
	/**
		username: "abc",
		isbn: 9787121123368,
		bookTitle: "程序员修炼之道",
		borrowReqDate: "2013-12-24",
		ownername: "lvzhaogang",
	*/
	
	$('#J_status')[0].innerHTML=jsonCriteria;
	
	var booktitle = title;
	
	$.ajax({
	        type: 'POST',
			data: 'criteria=' + jsonCriteria + '&' + 'newobj=' + jsonNewObj,
	        url: BASE_URL + '/borrowinfo/_update',
	        dataType: 'json',        //jsonp 支持跨域的访问，可以本地测试login.html（使用远程登陆服务)
	        timeout: 5000,
	        success: function (rValue, status) {
	            if (rValue.ok == 1) {
					
					//db.books.update(
  					//   { item: "Divine Comedy" },
					//    {
					//       $set: { price: 18 },
					//       $inc: { stock: 5 }
					//    }
					// )
					cri = {isbn:''+isbn , ownername:ownername};
					j = {"$set":{"borrowDate":curDateStr()},"$inc":{"borrowableCount":-1}};					 
					
					$.ajax({
					        type: 'POST',
							data: 'criteria=' + JSON.stringify(cri) + '&' + 'newobj=' + JSON.stringify(j),
					        url: BASE_URL + '/book/_update',
					        dataType: 'json',        //jsonp 支持跨域的访问，可以本地测试login.html（使用远程登陆服务)
					        timeout: 5000,
					        success: function (rValue, status) {
								$('#J_status')[0].innerHTML='"'+booktitle+'"的借书请求已确认:'+ownername;
								window.location.reload();
					        },
					        error: function (e) {
					            $('#J_status')[0].innerHTML = '*请求失败，请稍后再试';
					        }
					    });
						// end of inner ajax
						
					//
					
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

/** 借书人发起借书请求 */
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
	                $('#J_status')[0].innerHTML='"'+booktitle+'"的借书请求已发送至:'+ownername;
					// alert('"'+booktitle+'"的借书请求已发送至:'+ownername);
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

function messages() {
    username = window.localStorage.getItem("name");
	
	j = {ownername:username};
	
	$.ajax({
	        type: 'GET',
	        url: BASE_URL + '/borrowinfo/_find?batch_size=100&' + encodeCriteria(j),
	        dataType: 'json',        //jsonp 支持跨域的访问，可以本地测试login.html（使用远程登陆服务)
	        timeout: 5000,
	        success: function (rValue, status) {
	            if (rValue.results.length >= 1) {
					var tbl_body = '<tr><td width="50%">title</td><td width="10%">username</td><td width="10%">reqdate</td>';
					tbl_body += '<td width="10%">borrowDate</td><td width="10%">return</td><td width="0%" style="display:none"></td>';
					tbl_body += '</tr>';
					
					$.each(rValue.results, function() {
					    var tbl_row = "";
						tbl_row = "<td>" + this["bookTitle"] + "</td><td>" + this["username"] + "</td><td>" + this["borrowReqDate"] + "</td>";
						
						if(this["borrowDate"]==null){
							tbl_row += "<td><input type='button' class='btn btn-sm btn-info' value='确认借出' onclick=\"confirmBorrow(" + this["isbn"] + ",'"+ this["bookTitle"] + "','" + this["username"] + "','" + this["borrowReqDate"] + "');\"></input></td>";				
						}
						else{
							tbl_row += "<td>" + this["borrowDate"] + "</td>";							
						}
						


						if(this["borrowDate"] != null){
							tbl_row += "<td>return</td>";
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
	                $('#contentlist')[0].innerHTML = '*没有查询到数据，请联系管理员';
				}

	        },
	        error: function (e) {
	            $('#contentlist')[0].innerHTML = '*请求失败，请稍后再试';

	        }
	    });
}

function showMyBorrowedBooks(){
    username = window.localStorage.getItem("name");
	
	j = {username:username};
	
	$.ajax({
	        type: 'GET',
	        url: BASE_URL + '/borrowinfo/_find?batch_size=100&' + encodeCriteria(j),
	        dataType: 'json',        //jsonp 支持跨域的访问，可以本地测试login.html（使用远程登陆服务)
	        timeout: 5000,
	        success: function (rValue, status) {
	            if (rValue.results.length >= 1) {
					var tbl_body = '<tr><td width="50%">title</td><td width="10%">username</td><td width="10%">reqdate</td>';
					tbl_body += '<td width="10%">borrowDate</td><td width="10%">return</td><td width="0%" style="display:none"></td>';
					tbl_body += '</tr>';
					
					$.each(rValue.results, function() {
					    var tbl_row = "";
						tbl_row = "<td>" + this["bookTitle"] + "</td><td>" + this["username"] + "</td><td>" + this["borrowReqDate"] + "</td>";
						
						if(this["borrowDate"]==null){
							tbl_row += "<td><label class='label'>待确认</label></td>";				
						}
						else{
							tbl_row += "<td>" + this["borrowDate"] + "</td>";							
						}
						

						if(this["borrowDate"] != null){
							tbl_row += "<td>续借</td>";
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
	                $('#contentlist')[0].innerHTML = '*没有查询到数据，请联系管理员';
				}

	        },
	        error: function (e) {
	            $('#contentlist')[0].innerHTML = '*请求失败，请稍后再试';

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
				alert('ok');
	            if (rValue.results.length >= 1) {
					var tbl_body = '<tr><td width="50%">title</td><td width="10%">owner</td>';
					tbl_body += '<td width="10%">count</td><td width="10%">borrow</td><td width="0%" style="display:none"></td>';
					tbl_body += '</tr>';
					
					$.each(rValue.results, function() {
					    var tbl_row = "";
						tbl_row = "<td>" + this["title"] + "</td><td>" + this["ownername"] + "</td>";
						tbl_row += "<td>" + this["borrowableCount"] + "</td>";

						if(this["borrowableCount"]>0 && !((this["ownername"]+'').toLowerCase()==username.toLowerCase())){
							tbl_row += "<td><input type='button' class='btn btn-sm btn-info' value='Borrow' onclick=\"borrow(" + this["isbn"] + ",'"+ this["title"] + "','" + this["ownername"]+ "');\"></input></td>";
						}
						else if(this["ownername"].toLowerCase()!=(''+username.toLowerCase())){
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
					var tbl_body = '<tr><td width="50%">title</td><td width="10%">author</td><td width="10%">borrowdate</td><td width="10%">borrowableCount</td></tr>';
					$.each(rValue.results, function() {
					    var tbl_row = "";
						var d = this["borrowDate"];
						if(!d && this["borrowableCount"]>0)	{
							d="可借";
						}
						else if(this["isPersonal"]=='1'){
							d="私有";
						}
						var auth = this["author"];
						if(auth.length>8)
						{
							auth = auth.substring(0,9)+'...';
						}
						tbl_row = "<td>" + this["title"] + "</td><td>" + auth + "</td><td>" + d + "</td><td>" + this["borrowableCount"] + "</td>";
				
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