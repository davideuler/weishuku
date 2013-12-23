function bookinfo(isbnno) {

	var url='https://api.douban.com/v2/book/isbn/:'+isbnno
	$.ajax({
		type: 'POST',
		url: 'https://api.douban.com/v2/book/isbn/:'+isbnno,
		dataType: 'jsonp',
		timeout: 10000,
		data: {
			'password': '',
			'username': ''
		},
		success: function(rValue, status) {
			alert('success');
			//var obj = eval('('+rValue+')')
			alert(rValue.price);
			book_info = rValue;
			window.location="bookinfo.html";
			//$('#J_bookinfo').innerHTML = '';
		},
		fail: function(e) {
			alert('fail');
		}
	})
}