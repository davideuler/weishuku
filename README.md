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

/usr/local/share/npm/lib/node_modules/cordova/bin/cordova run android

Your need to add android sdk tools and platform-tools to PATH:
in bash:
export PATH=$PATH:/data/program/adt-bundle-mac-x86_64/sdk/platform-tools/:/data/program/adt-bundle-mac-x86_64/sdk/tools/
in fish shell:
set PATH $PATH /data/program/adt-bundle-mac-x86_64/sdk/platform-tools/ /data/program/adt-bundle-mac-x86_64/sdk/tools/

4.web :


5.mongodb

ensure unique index:
db.book.ensureIndex( { "isbn": 1, "ownername":1 }, { unique: true } )
db.user.ensureIndex( { "email": 1}, { unique: true } )
db.user.ensureIndex( { "name": 1}, { unique: true } )

db.book.ensureIndex( { isbn: 1, ownername:1 }, { unique: true, dropDups:true})
db.borrowinfo.ensureIndex( { isbn: 1, ownername:1, username:1 }, { unique: true, dropDups:true})

6.其他：
豆瓣通过ISBN查找图书信息的Rest Api:
https://api.douban.com/v2/book/isbn/:9787544826440


## todos:
1.重构

2.分类

3.分城市

4.谁借的，借的谁的，什么时候借的，还的，预借时间。

## 后续

5.群组

6.支持IE

7.支持域账号  2014.1.24前

8.到期提醒

## 其他

1.热门图书

2.书评