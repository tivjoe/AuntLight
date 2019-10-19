
# AuntLight（楼下阿姨）

* 基于用户方圆500-1000米的外卖平台，配送时间为8min+商家备餐时间；有没有遇到过，在家里想喝水吃零食喝奶茶等等，可是这些店明明就在楼下或者附件，就是不想下楼，可是普通的外卖都要半小时，使用AuntLight，听2首歌的时间外卖就到了，酷！这就是AuntLight的价值。

* **该项目含有客户端，商家端，配送端，后台，数据库**

> 1. 客户端/商家端/配送端，3端app均采用react-native+react navigation+mobx。
> 2. 后台语言使用php7.x,框架为基于workerman封装的长连接框架GatewayWoker；数据库使用mysql。
> 3. app与后台通信全部采用websocket。

* 项目目前版本为0.9，我会不断的更新，和加强用户体验（后续我会打包项目，方便大家体验）；目前还有以下待完善

> 1. 完善评论和搜索功能
> 2. 优化app（尤其Android）
> 3. 后台防sql注入
> 4. 写一个后台管理
> 5. 将react-native版本升级到0.6x

---

# 部署

## 数据库部署(mysql)

* auntlight_structuer_and_data.sql 数据库结构+测试数据
* auntlight_structuer.sql 只有数据库结构
* 数据库并没有各表之间的约束，只有主键和索引，字段都添加了注释方便阅读

~~~

第一步：

  使用Navicat Premium连接到你的服务器/本地

第二步：

  新建数据库auntlight（字符集：utf8 -- UTF-8 Unicode，排序规则：utf8_general_ci）

第三步：

  运行sql文件，auntlight_structuer_and_data.sql或者auntlight_structuer.sql
~~~

## 后台部署（server）

* 请参考[GatewayWorker](http://doc2.workerman.net/)，配置环境。


~~~

第一步：

  配置七牛云：在AuntLight/server/Applications/App/lib/qiniu/qiniu.php 配置公匙，私匙，空间名

第二步：

  配置后台连接数据库：在AuntLight/server/Applications/Events.php

  self::$db = new \Workerman\MySQL\Connection('localhost', '3306', 'root', '填写你的密码', 'auntlight');

最后一步：

  //启动后台，命令行 cd 到AuntLigt/server目录下执行
  php start.php start

~~~

## APP部署(client,seller,delivery)

* 请参考[React-Native](https://reactnative.cn/)，配置环境。

* 高德定位sdk: 在AuntLight/client/app/public/Position.js 下修改

~~~

第一步：

  client，seller，delivery /app/public/websocket.js；ws = new WebSocket("ws://服务器地址:端口"); 

第二步：

  // cd 到客户端client/商家端seller/配送端delivery目录下执行以下命令

  1. yarn或npm install 

  2. react-native run-ios或react-native run-android
~~~

--- 

# 阅读源码的一些帮助

**只要知道入口在哪，跟着代码和注释一步一步走就完事了**

## 后台

* 只需要关注 AuntLight/server/Applications/App目录下的文件

* 简单的流程(从上往下，每个请求会经过的地方)，来了解app发送过来的请求是如何进行处理，帮助你更容易阅读代码和进行修改；

``` 
Events.php //请求最刚开始进来的地方，判断是否心跳包 ↓
app/index.php //通过请求发送的action参数判断该调用哪个api ↓
app/client,seller,delivery/api/...... //api封装的地方 END
```

## APP

* 3个app都是采用一样的架构,一个简单的流程；

```
index.js->app/index.js //阅读app/index.js,就可以了解到app最先进入的页面。
这里需要了解react navigation+mobx这两个工具，如果不太了解需要请自行补课。
```

---

# 预览

只放了客户端效果（因为gif图较大压缩质量太差）。

（**如果喜欢记得右上角star⭐，谢谢！！！**）

[我的博客](https://www.jianshu.com/u/381f46e0b8a7)

![avatar](https://media.giphy.com/media/UTdtFlsxzCzSo5NLQH/giphy.gif)
