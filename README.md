微书库图书分享

1. install flask, flask-admin
sudo pip install sandman
sudo pip install flask-admin

2. on mongo server:
download leepy.mongoose from: https://github.com/10gen-labs/sleepy.mongoose

$python httpd.py --xorigin
(支持json跨站post请求数据; 因为jsonp跨站请求时会把post自动改写成get请求，_insert数据需要用post)

to start restful api service for mongo

3.phonegap:
sudo npm install -g cordova

/usr/local/share/npm/lib/node_modules/cordova/bin/cordova build

要在android sdk中安装 android build tools. (启动sdk/tools/android命令安装)。
/usr/local/share/npm/lib/node_modules/cordova/bin/cordova platform add ios

/usr/local/share/npm/lib/node_modules/cordova/bin/cordova build ios

4.web :



其他：
豆瓣通过ISBN查找图书信息的Rest Api:
https://api.douban.com/v2/book/isbn/:9787544826440