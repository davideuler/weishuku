function bookinfo(isbnno) {

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
			window.location="bookinfo.html?book="+rValue
		},
		fail: function(e) {
			alert('fail');
		}
	})
}