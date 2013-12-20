

function login() {
	var username = $('#login').value;
	var password = $('#password').value;

	$.ajax({
		type: 'POST',
		url: 'https://api.douban.com/v2/book/isbn/:9787544826440',
		dataType: 'jsonp',
		timeout: 10000,
		data: {
			'password': password,
			'username': username
		},
		success: function(rValue, status) {
			alert('success');
			//var obj = eval('('+rValue+')')
			alert(rValue.price);
		},
		fail: function(e) {
			alert('fail');
		}
	})
}