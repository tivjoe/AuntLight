/*
Navicat MySQL Data Transfer

Source Server         : 148.70.248.117_3306
Source Server Version : 50560
Source Host           : 148.70.248.117:3306
Source Database       : auntlight

Target Server Type    : MYSQL
Target Server Version : 50560
File Encoding         : 65001

Date: 2019-10-18 20:14:17
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for activity
-- ----------------------------
DROP TABLE IF EXISTS `activity`;
CREATE TABLE `activity` (
  `activity_id` varchar(21) NOT NULL,
  `seller_id` varchar(11) NOT NULL,
  `seller_name` varchar(20) NOT NULL,
  `seller_headurl` varchar(255) NOT NULL,
  `text` varchar(255) NOT NULL,
  `image_url_1` varchar(255) DEFAULT NULL,
  `image_url_2` varchar(255) DEFAULT NULL,
  `image_url_3` varchar(255) DEFAULT NULL,
  `time` datetime NOT NULL,
  PRIMARY KEY (`activity_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of activity
-- ----------------------------
INSERT INTO `activity` VALUES ('1', '15012341234', '派大星', 'http://cdn.kuailefn.xyz/timg.jpg', '海绵宝宝请客。我只管吃', null, null, null, '2019-04-19 18:45:27');
INSERT INTO `activity` VALUES ('2', '15012341234', '比基尼海滩最帅的章鱼哥', 'http://cdn.kuailefn.xyz/zyg.jpg', '再见了，笨蛋们，我要和一个美丽的姑娘约会了，他的名字叫竖笛。实际上海绵宝宝我喜欢你，我喜欢和你做邻居，我也喜欢小蜗，派大星，珊迪，蟹老板，以及所有我不得不交往的人。', 'http://cdn.kuailefn.xyz/3.jpg', 'http://cdn.kuailefn.xyz/2.jpg', 'http://cdn.kuailefn.xyz/1.jpg', '2019-04-19 18:46:06');
INSERT INTO `activity` VALUES ('3', '15012341234', '海绵宝宝', 'http://cdn.kuailefn.xyz/hm.jpg', '哦，我的老天，太棒了！哦，章鱼哥，你在冒烟耶，你看起来就像是一棵煮熟的青菜！', 'http://cdn.kuailefn.xyz/hh.jpg', null, null, '2019-04-19 18:46:36');

-- ----------------------------
-- Table structure for delivery_information
-- ----------------------------
DROP TABLE IF EXISTS `delivery_information`;
CREATE TABLE `delivery_information` (
  `delivery_id` varchar(50) NOT NULL COMMENT '配送员id',
  `delivery_phone` varchar(11) NOT NULL COMMENT '配送员手机号',
  `level` int(1) NOT NULL COMMENT '配送员等级（可用作优先派单标识）',
  `turnover` float(9,2) NOT NULL COMMENT '总收入',
  `blance` float(7,2) NOT NULL COMMENT '账号余额（可提现）',
  `delivery_name` varchar(20) NOT NULL COMMENT '配送员名字',
  `delivery_headurl` varchar(255) NOT NULL COMMENT '配送员头像',
  `all_order_number` int(6) NOT NULL COMMENT '总订单数',
  `is_pass` int(1) NOT NULL COMMENT '是否通过实名审核（1是，0否）',
  `is_bind_alipay` int(1) NOT NULL COMMENT '是否绑定支付宝（1是，0否）',
  `is_get` int(1) NOT NULL COMMENT '当前是否接单（1接单，0休息）',
  `now_count_number` int(2) NOT NULL COMMENT '当前手上订单数（可做优先派单标识）',
  `open_time` datetime NOT NULL COMMENT '开始接单时间',
  `close_time` datetime NOT NULL COMMENT '休息时间',
  PRIMARY KEY (`delivery_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of delivery_information
-- ----------------------------
INSERT INTO `delivery_information` VALUES ('deliveryaFdf15628183183372', '13012341234', '5', '0.00', '0.00', '配送员', 'http://cdn.kuailefn.xyz/FqR8lxwtg-P3eMsP0oIqevMBQph3', '0', '0', '0', '1', '0', '0000-00-00 00:00:00', '0000-00-00 00:00:00');

-- ----------------------------
-- Table structure for delivery_login
-- ----------------------------
DROP TABLE IF EXISTS `delivery_login`;
CREATE TABLE `delivery_login` (
  `delivery_id` varchar(50) NOT NULL COMMENT '配送员唯一标识',
  `phone` varchar(11) NOT NULL COMMENT '手机号',
  `password` varchar(16) NOT NULL COMMENT '密码',
  `token` varchar(50) NOT NULL,
  `time` datetime NOT NULL COMMENT '注册时间',
  PRIMARY KEY (`delivery_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of delivery_login
-- ----------------------------
INSERT INTO `delivery_login` VALUES ('deliveryaFdf15628183183372', '13012341234', '123456789', 'KkYzgtIyjlAJbFlnXhGY', '2019-07-11 12:11:58');

-- ----------------------------
-- Table structure for order
-- ----------------------------
DROP TABLE IF EXISTS `order`;
CREATE TABLE `order` (
  `order_id` varchar(16) NOT NULL COMMENT '订单唯一标识',
  `user_id` varchar(50) NOT NULL COMMENT '用户唯一标识',
  `seller_id` varchar(50) NOT NULL COMMENT '商家唯一标识',
  `seller_name` varchar(50) NOT NULL COMMENT '商家名字',
  `seller_phone` varchar(11) NOT NULL COMMENT '商家手机号',
  `seller_address` varchar(255) NOT NULL COMMENT '商家地址',
  `seller_url` varchar(200) NOT NULL COMMENT '商家头像',
  `preparing_time` int(2) NOT NULL COMMENT '商家备餐时间',
  `delivery_id` varchar(50) DEFAULT NULL COMMENT '配送员唯一标识',
  `delivery_name` varchar(20) DEFAULT NULL COMMENT '配送员名字',
  `delivery_phone` varchar(11) DEFAULT NULL COMMENT '配送员手机号',
  `queue_number` varchar(4) NOT NULL COMMENT '取餐号',
  `order_state` int(1) NOT NULL COMMENT '订单状态（1商家接单，2配送中，3订单完成）',
  `pay_state` int(1) NOT NULL COMMENT '支付状态（1已支付，0未支付）',
  `appraise_state` int(1) NOT NULL COMMENT '评价状态（1以评价，0位评价）',
  `pay_method` varchar(15) NOT NULL COMMENT '支付方式）',
  `order_money` float(6,2) NOT NULL COMMENT '订单总价',
  `good_money` float(6,2) NOT NULL COMMENT '商品总价',
  `order_freight` float(4,2) NOT NULL COMMENT '订单总运费',
  `user_pay_freight` float(4,2) NOT NULL COMMENT '用户支付的运费',
  `seller_pay_freight` float(4,2) NOT NULL COMMENT '商家支付的运费',
  `delivery_profit` float(4,2) NOT NULL COMMENT '配送员收入',
  `seller_profit` float(4,2) NOT NULL COMMENT '商家收入',
  `profit` float(4,2) NOT NULL COMMENT '平台收入',
  `contact_name` varchar(20) NOT NULL COMMENT '联系人名字',
  `contact_phone` varchar(11) NOT NULL COMMENT '联系人手机号',
  `contact_street` varchar(100) NOT NULL COMMENT '联系人地址',
  `contact_remake` varchar(100) DEFAULT NULL COMMENT '联系人备注',
  `lnt` float(10,6) NOT NULL COMMENT '联系人地理经度',
  `lat` float(10,6) NOT NULL COMMENT '联系人地理纬度',
  `get_order_time` datetime NOT NULL COMMENT '接单时间',
  `finish_order_time` datetime DEFAULT NULL COMMENT '完成订单时间',
  `level` float(2,1) NOT NULL COMMENT '订单评分',
  PRIMARY KEY (`order_id`),
  KEY `order_user_id` (`user_id`) USING BTREE,
  KEY `order_seller_id` (`seller_id`) USING BTREE,
  KEY `order_delivery_id` (`delivery_id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of order
-- ----------------------------
INSERT INTO `order` VALUES ('8080157139070184', 'vIEH15621738831819', '12345678902', '屈臣氏', '', '', 'http://cdn.kuailefn.xyz/image/seller/2/head/2.jpg', '0', null, null, null, '3', '1', '1', '0', 'weichatpay', '56.00', '54.00', '4.00', '2.00', '2.00', '4.00', '49.30', '0.00', 'dawwda', '18094701669', '东方铭楼--dawd', 'Aa', '120.333176', '30.308622', '2019-10-18 17:25:01', null, '4.8');
INSERT INTO `order` VALUES ('9384157139017461', 'vIEH15621738831819', '12345678902', '屈臣氏', '', '', 'http://cdn.kuailefn.xyz/image/seller/2/head/2.jpg', '0', null, null, null, '7', '2', '1', '0', 'alipay', '39.00', '37.00', '4.00', '2.00', '2.00', '4.00', '33.15', '0.00', 'dawwda', '18094701669', '东方铭楼--dawd', '', '120.333176', '30.308622', '2019-10-18 17:16:14', null, '4.8');
INSERT INTO `order` VALUES ('9411157010481047', 'vIEH15621738831819', 'ajdhgfks541348awadawd', 'Ssssaa', '', '西湖-1号店', 'http://cdn.kuailefn.xyz/FnUFOQwc834qBF9edBhITvR9fM4l', '2', 'deliveryaFdf15628183183372', null, null, '1', '3', '1', '0', 'weichatpay', '68.47', '66.97', '4.00', '1.50', '2.50', '4.00', '3.35', '0.00', 'noobjoe', '18012341234', '西湖--大街上', '', '120.334480', '30.308647', '2019-10-03 20:13:30', null, '4.8');
INSERT INTO `order` VALUES ('9702157001709395', 'vIEH15621738831819', 'ajdhgfks541348awadawd', 'Ssssaa', '', '西湖-1号店', 'http://cdn.kuailefn.xyz/FnUFOQwc834qBF9edBhITvR9fM4l', '2', 'deliveryaFdf15628183183372', null, null, '2', '3', '1', '1', 'alipay', '59.81', '58.31', '4.00', '1.50', '2.50', '4.00', '2.92', '0.00', 'noobjoe', '18012341234', '西湖--大街上', '', '120.334480', '30.308647', '2019-10-02 19:51:33', null, '4.8');
INSERT INTO `order` VALUES ('9899157139215116', 'vIEH15621738831819', '12345678902', '屈臣氏', '', '', 'http://cdn.kuailefn.xyz/image/seller/2/head/2.jpg', '0', null, null, null, '4', '1', '1', '0', 'weichatpay', '62.00', '60.00', '4.00', '2.00', '2.00', '4.00', '55.00', '0.00', 'noobjoe', '18012341234', '东方铭楼--dawd', 'Aaa', '120.333176', '30.308622', '2019-10-18 17:49:11', null, '4.8');
INSERT INTO `order` VALUES ('9901157138987556', 'vIEH15621738831819', '12345678902', '屈臣氏', '', '', 'http://cdn.kuailefn.xyz/image/seller/2/head/2.jpg', '0', null, null, null, '4', '1', '1', '0', 'alipay', '39.00', '37.00', '4.00', '2.00', '2.00', '4.00', '33.15', '0.00', 'dawwda', '18094701669', '东方铭楼--dawd', '', '120.333176', '30.308622', '2019-10-18 17:11:15', null, '4.8');

-- ----------------------------
-- Table structure for order_goods
-- ----------------------------
DROP TABLE IF EXISTS `order_goods`;
CREATE TABLE `order_goods` (
  `order_id` varchar(16) NOT NULL COMMENT '订单唯一标识',
  `good_name` varchar(40) NOT NULL COMMENT '商品名字',
  `good_price` float(6,2) NOT NULL COMMENT '商品单价',
  `good_amount` int(6) NOT NULL COMMENT '商品数量',
  `good_url` varchar(100) NOT NULL COMMENT '商品图片',
  KEY `order_number` (`order_id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of order_goods
-- ----------------------------
INSERT INTO `order_goods` VALUES ('9702157001709395', 'aaaaa', '6.35', '1', 'http://cdn.kuailefn.xyz/FoTnWS1K7zOe5YCWDbb2Cb747Yej');
INSERT INTO `order_goods` VALUES ('9702157001709395', 'wdawd', '8.66', '6', 'http://cdn.kuailefn.xyz/FiI3cS2AleDlwYn-QsR2rVwJOjKq');
INSERT INTO `order_goods` VALUES ('7646157009283494', '乐事薯片（原味）', '6.50', '1', 'http://cdn.kuailefn.xyz/image/seller/1/goods/%E6%8E%A8%E8%8D%90/%E4%B9%90%E4%BA%8B%E8%96%AF%E7%89%87');
INSERT INTO `order_goods` VALUES ('7646157009283494', '乐事薯片（黄瓜味）', '5.50', '7', 'http://cdn.kuailefn.xyz/image/seller/1/goods/%E6%8E%A8%E8%8D%90/%E4%B9%90%E4%BA%8B%E8%96%AF%E7%89%87');
INSERT INTO `order_goods` VALUES ('7646157009283494', '可口可乐', '2.50', '1', 'http://cdn.kuailefn.xyz/image/seller/1/goods/%E6%8E%A8%E8%8D%90/%E5%8F%AF%E5%8F%A3%E5%8F%AF%E4%B9%90');
INSERT INTO `order_goods` VALUES ('7646157009283494', '农夫山泉', '2.00', '1', 'http://cdn.kuailefn.xyz/image/seller/1/goods/%E6%8E%A8%E8%8D%90/%E5%86%9C%E5%A4%AB%E5%B1%B1%E6%B3%89');
INSERT INTO `order_goods` VALUES ('1565157009287254', '雪碧', '5.00', '1', 'http://cdn.kuailefn.xyz/image/seller/1/goods/%E6%8E%A8%E8%8D%90/%E9%9B%AA%E7%A2%A7.jpg');
INSERT INTO `order_goods` VALUES ('1565157009287254', '芬达', '4.50', '1', 'http://cdn.kuailefn.xyz/image/seller/1/goods/%E6%8E%A8%E8%8D%90/%E8%8A%AC%E8%BE%BE.jpg');
INSERT INTO `order_goods` VALUES ('1565157009287254', '百事可乐', '3.50', '10', 'http://cdn.kuailefn.xyz/image/seller/1/goods/%E6%8E%A8%E8%8D%90/%E7%99%BE%E4%BA%8B%E5%8F%AF%E4%B9%90');
INSERT INTO `order_goods` VALUES ('8610157009447573', '农夫山泉', '2.00', '8', 'http://cdn.kuailefn.xyz/image/seller/1/goods/%E6%8E%A8%E8%8D%90/%E5%86%9C%E5%A4%AB%E5%B1%B1%E6%B3%89');
INSERT INTO `order_goods` VALUES ('8610157009447573', '可口可乐', '2.50', '1', 'http://cdn.kuailefn.xyz/image/seller/1/goods/%E6%8E%A8%E8%8D%90/%E5%8F%AF%E5%8F%A3%E5%8F%AF%E4%B9%90');
INSERT INTO `order_goods` VALUES ('8610157009447573', '芬达', '4.50', '5', 'http://cdn.kuailefn.xyz/image/seller/1/goods/%E6%8E%A8%E8%8D%90/%E8%8A%AC%E8%BE%BE.jpg');
INSERT INTO `order_goods` VALUES ('8610157009447573', '百事可乐', '3.50', '1', 'http://cdn.kuailefn.xyz/image/seller/1/goods/%E6%8E%A8%E8%8D%90/%E7%99%BE%E4%BA%8B%E5%8F%AF%E4%B9%90');
INSERT INTO `order_goods` VALUES ('8610157009447573', '雪碧', '5.00', '1', 'http://cdn.kuailefn.xyz/image/seller/1/goods/%E6%8E%A8%E8%8D%90/%E9%9B%AA%E7%A2%A7.jpg');
INSERT INTO `order_goods` VALUES ('9411157010481047', 'aaaaa', '6.35', '1', 'http://cdn.kuailefn.xyz/FoTnWS1K7zOe5YCWDbb2Cb747Yej');
INSERT INTO `order_goods` VALUES ('9411157010481047', 'wdawd', '8.66', '7', 'http://cdn.kuailefn.xyz/FiI3cS2AleDlwYn-QsR2rVwJOjKq');
INSERT INTO `order_goods` VALUES ('6084157138975574', '乐事薯片（原味）', '6.50', '1', 'http://cdn.kuailefn.xyz/image/seller/1/goods/%E6%8E%A8%E8%8D%90/%E4%B9%90%E4%BA%8B%E8%96%AF%E7%89%87');
INSERT INTO `order_goods` VALUES ('6084157138975574', '乐事薯片（黄瓜味）', '5.50', '6', 'http://cdn.kuailefn.xyz/image/seller/1/goods/%E6%8E%A8%E8%8D%90/%E4%B9%90%E4%BA%8B%E8%96%AF%E7%89%87');
INSERT INTO `order_goods` VALUES ('6084157138975574', '可口可乐', '2.50', '1', 'http://cdn.kuailefn.xyz/image/seller/1/goods/%E6%8E%A8%E8%8D%90/%E5%8F%AF%E5%8F%A3%E5%8F%AF%E4%B9%90');
INSERT INTO `order_goods` VALUES ('6084157138975574', '百事可乐', '3.50', '1', 'http://cdn.kuailefn.xyz/image/seller/1/goods/%E6%8E%A8%E8%8D%90/%E7%99%BE%E4%BA%8B%E5%8F%AF%E4%B9%90');
INSERT INTO `order_goods` VALUES ('2344157138976273', '乐事薯片（原味）', '6.50', '1', 'http://cdn.kuailefn.xyz/image/seller/1/goods/%E6%8E%A8%E8%8D%90/%E4%B9%90%E4%BA%8B%E8%96%AF%E7%89%87');
INSERT INTO `order_goods` VALUES ('2344157138976273', '乐事薯片（黄瓜味）', '5.50', '6', 'http://cdn.kuailefn.xyz/image/seller/1/goods/%E6%8E%A8%E8%8D%90/%E4%B9%90%E4%BA%8B%E8%96%AF%E7%89%87');
INSERT INTO `order_goods` VALUES ('2344157138976273', '可口可乐', '2.50', '1', 'http://cdn.kuailefn.xyz/image/seller/1/goods/%E6%8E%A8%E8%8D%90/%E5%8F%AF%E5%8F%A3%E5%8F%AF%E4%B9%90');
INSERT INTO `order_goods` VALUES ('2344157138976273', '百事可乐', '3.50', '1', 'http://cdn.kuailefn.xyz/image/seller/1/goods/%E6%8E%A8%E8%8D%90/%E7%99%BE%E4%BA%8B%E5%8F%AF%E4%B9%90');
INSERT INTO `order_goods` VALUES ('1895157138980960', '乐事薯片（原味）', '6.50', '1', 'http://cdn.kuailefn.xyz/image/seller/1/goods/%E6%8E%A8%E8%8D%90/%E4%B9%90%E4%BA%8B%E8%96%AF%E7%89%87');
INSERT INTO `order_goods` VALUES ('1895157138980960', '乐事薯片（黄瓜味）', '5.50', '6', 'http://cdn.kuailefn.xyz/image/seller/1/goods/%E6%8E%A8%E8%8D%90/%E4%B9%90%E4%BA%8B%E8%96%AF%E7%89%87');
INSERT INTO `order_goods` VALUES ('1895157138980960', '可口可乐', '2.50', '1', 'http://cdn.kuailefn.xyz/image/seller/1/goods/%E6%8E%A8%E8%8D%90/%E5%8F%AF%E5%8F%A3%E5%8F%AF%E4%B9%90');
INSERT INTO `order_goods` VALUES ('1895157138980960', '百事可乐', '3.50', '1', 'http://cdn.kuailefn.xyz/image/seller/1/goods/%E6%8E%A8%E8%8D%90/%E7%99%BE%E4%BA%8B%E5%8F%AF%E4%B9%90');
INSERT INTO `order_goods` VALUES ('9901157138987556', '乐事薯片（原味）', '6.50', '1', 'http://cdn.kuailefn.xyz/image/seller/1/goods/%E6%8E%A8%E8%8D%90/%E4%B9%90%E4%BA%8B%E8%96%AF%E7%89%87');
INSERT INTO `order_goods` VALUES ('9901157138987556', '乐事薯片（黄瓜味）', '5.50', '1', 'http://cdn.kuailefn.xyz/image/seller/1/goods/%E6%8E%A8%E8%8D%90/%E4%B9%90%E4%BA%8B%E8%96%AF%E7%89%87');
INSERT INTO `order_goods` VALUES ('9901157138987556', '可口可乐', '2.50', '6', 'http://cdn.kuailefn.xyz/image/seller/1/goods/%E6%8E%A8%E8%8D%90/%E5%8F%AF%E5%8F%A3%E5%8F%AF%E4%B9%90');
INSERT INTO `order_goods` VALUES ('9901157138987556', '农夫山泉', '2.00', '5', 'http://cdn.kuailefn.xyz/image/seller/1/goods/%E6%8E%A8%E8%8D%90/%E5%86%9C%E5%A4%AB%E5%B1%B1%E6%B3%89');
INSERT INTO `order_goods` VALUES ('2845157138988236', '乐事薯片（原味）', '6.50', '1', 'http://cdn.kuailefn.xyz/image/seller/1/goods/%E6%8E%A8%E8%8D%90/%E4%B9%90%E4%BA%8B%E8%96%AF%E7%89%87');
INSERT INTO `order_goods` VALUES ('2845157138988236', '乐事薯片（黄瓜味）', '5.50', '1', 'http://cdn.kuailefn.xyz/image/seller/1/goods/%E6%8E%A8%E8%8D%90/%E4%B9%90%E4%BA%8B%E8%96%AF%E7%89%87');
INSERT INTO `order_goods` VALUES ('2845157138988236', '可口可乐', '2.50', '6', 'http://cdn.kuailefn.xyz/image/seller/1/goods/%E6%8E%A8%E8%8D%90/%E5%8F%AF%E5%8F%A3%E5%8F%AF%E4%B9%90');
INSERT INTO `order_goods` VALUES ('2845157138988236', '农夫山泉', '2.00', '5', 'http://cdn.kuailefn.xyz/image/seller/1/goods/%E6%8E%A8%E8%8D%90/%E5%86%9C%E5%A4%AB%E5%B1%B1%E6%B3%89');
INSERT INTO `order_goods` VALUES ('2832157139007264', '乐事薯片（原味）', '6.50', '1', 'http://cdn.kuailefn.xyz/image/seller/1/goods/%E6%8E%A8%E8%8D%90/%E4%B9%90%E4%BA%8B%E8%96%AF%E7%89%87');
INSERT INTO `order_goods` VALUES ('2832157139007264', '乐事薯片（黄瓜味）', '5.50', '1', 'http://cdn.kuailefn.xyz/image/seller/1/goods/%E6%8E%A8%E8%8D%90/%E4%B9%90%E4%BA%8B%E8%96%AF%E7%89%87');
INSERT INTO `order_goods` VALUES ('2832157139007264', '可口可乐', '2.50', '6', 'http://cdn.kuailefn.xyz/image/seller/1/goods/%E6%8E%A8%E8%8D%90/%E5%8F%AF%E5%8F%A3%E5%8F%AF%E4%B9%90');
INSERT INTO `order_goods` VALUES ('2832157139007264', '农夫山泉', '2.00', '5', 'http://cdn.kuailefn.xyz/image/seller/1/goods/%E6%8E%A8%E8%8D%90/%E5%86%9C%E5%A4%AB%E5%B1%B1%E6%B3%89');
INSERT INTO `order_goods` VALUES ('9384157139017461', '乐事薯片（原味）', '6.50', '1', 'http://cdn.kuailefn.xyz/image/seller/1/goods/%E6%8E%A8%E8%8D%90/%E4%B9%90%E4%BA%8B%E8%96%AF%E7%89%87');
INSERT INTO `order_goods` VALUES ('9384157139017461', '乐事薯片（黄瓜味）', '5.50', '1', 'http://cdn.kuailefn.xyz/image/seller/1/goods/%E6%8E%A8%E8%8D%90/%E4%B9%90%E4%BA%8B%E8%96%AF%E7%89%87');
INSERT INTO `order_goods` VALUES ('9384157139017461', '可口可乐', '2.50', '6', 'http://cdn.kuailefn.xyz/image/seller/1/goods/%E6%8E%A8%E8%8D%90/%E5%8F%AF%E5%8F%A3%E5%8F%AF%E4%B9%90');
INSERT INTO `order_goods` VALUES ('9384157139017461', '农夫山泉', '2.00', '5', 'http://cdn.kuailefn.xyz/image/seller/1/goods/%E6%8E%A8%E8%8D%90/%E5%86%9C%E5%A4%AB%E5%B1%B1%E6%B3%89');
INSERT INTO `order_goods` VALUES ('7131157139020687', '乐事薯片（原味）', '6.50', '1', 'http://cdn.kuailefn.xyz/image/seller/1/goods/%E6%8E%A8%E8%8D%90/%E4%B9%90%E4%BA%8B%E8%96%AF%E7%89%87');
INSERT INTO `order_goods` VALUES ('7131157139020687', '乐事薯片（黄瓜味）', '5.50', '1', 'http://cdn.kuailefn.xyz/image/seller/1/goods/%E6%8E%A8%E8%8D%90/%E4%B9%90%E4%BA%8B%E8%96%AF%E7%89%87');
INSERT INTO `order_goods` VALUES ('7131157139020687', '可口可乐', '2.50', '6', 'http://cdn.kuailefn.xyz/image/seller/1/goods/%E6%8E%A8%E8%8D%90/%E5%8F%AF%E5%8F%A3%E5%8F%AF%E4%B9%90');
INSERT INTO `order_goods` VALUES ('7131157139020687', '农夫山泉', '2.00', '5', 'http://cdn.kuailefn.xyz/image/seller/1/goods/%E6%8E%A8%E8%8D%90/%E5%86%9C%E5%A4%AB%E5%B1%B1%E6%B3%89');
INSERT INTO `order_goods` VALUES ('3672157139028475', '乐事薯片（原味）', '6.50', '1', 'http://cdn.kuailefn.xyz/image/seller/1/goods/%E6%8E%A8%E8%8D%90/%E4%B9%90%E4%BA%8B%E8%96%AF%E7%89%87');
INSERT INTO `order_goods` VALUES ('3672157139028475', '乐事薯片（黄瓜味）', '5.50', '5', 'http://cdn.kuailefn.xyz/image/seller/1/goods/%E6%8E%A8%E8%8D%90/%E4%B9%90%E4%BA%8B%E8%96%AF%E7%89%87');
INSERT INTO `order_goods` VALUES ('3672157139028475', '农夫山泉', '2.00', '9', 'http://cdn.kuailefn.xyz/image/seller/1/goods/%E6%8E%A8%E8%8D%90/%E5%86%9C%E5%A4%AB%E5%B1%B1%E6%B3%89');
INSERT INTO `order_goods` VALUES ('3672157139028475', '可口可乐', '2.50', '1', 'http://cdn.kuailefn.xyz/image/seller/1/goods/%E6%8E%A8%E8%8D%90/%E5%8F%AF%E5%8F%A3%E5%8F%AF%E4%B9%90');
INSERT INTO `order_goods` VALUES ('8080157139070184', '乐事薯片（原味）', '6.50', '5', 'http://cdn.kuailefn.xyz/image/seller/1/goods/%E6%8E%A8%E8%8D%90/%E4%B9%90%E4%BA%8B%E8%96%AF%E7%89%87');
INSERT INTO `order_goods` VALUES ('8080157139070184', '乐事薯片（黄瓜味）', '5.50', '1', 'http://cdn.kuailefn.xyz/image/seller/1/goods/%E6%8E%A8%E8%8D%90/%E4%B9%90%E4%BA%8B%E8%96%AF%E7%89%87');
INSERT INTO `order_goods` VALUES ('8080157139070184', '可口可乐', '2.50', '1', 'http://cdn.kuailefn.xyz/image/seller/1/goods/%E6%8E%A8%E8%8D%90/%E5%8F%AF%E5%8F%A3%E5%8F%AF%E4%B9%90');
INSERT INTO `order_goods` VALUES ('8080157139070184', '百事可乐', '3.50', '1', 'http://cdn.kuailefn.xyz/image/seller/1/goods/%E6%8E%A8%E8%8D%90/%E7%99%BE%E4%BA%8B%E5%8F%AF%E4%B9%90');
INSERT INTO `order_goods` VALUES ('8080157139070184', '农夫山泉', '2.00', '5', 'http://cdn.kuailefn.xyz/image/seller/1/goods/%E6%8E%A8%E8%8D%90/%E5%86%9C%E5%A4%AB%E5%B1%B1%E6%B3%89');
INSERT INTO `order_goods` VALUES ('9899157139215116', '乐事薯片（原味）', '6.50', '8', 'http://cdn.kuailefn.xyz/image/seller/1/goods/%E6%8E%A8%E8%8D%90/%E4%B9%90%E4%BA%8B%E8%96%AF%E7%89%87');
INSERT INTO `order_goods` VALUES ('9899157139215116', '芬达', '4.50', '1', 'http://cdn.kuailefn.xyz/image/seller/1/goods/%E6%8E%A8%E8%8D%90/%E8%8A%AC%E8%BE%BE.jpg');
INSERT INTO `order_goods` VALUES ('9899157139215116', '百事可乐', '3.50', '1', 'http://cdn.kuailefn.xyz/image/seller/1/goods/%E6%8E%A8%E8%8D%90/%E7%99%BE%E4%BA%8B%E5%8F%AF%E4%B9%90');

-- ----------------------------
-- Table structure for order_mistake
-- ----------------------------
DROP TABLE IF EXISTS `order_mistake`;
CREATE TABLE `order_mistake` (
  `order_id` varchar(16) NOT NULL,
  `mistake_state` int(1) NOT NULL COMMENT '处理异常状态（1完成，0位完成）',
  `get_time` datetime NOT NULL,
  `finish_time` datetime NOT NULL,
  PRIMARY KEY (`order_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of order_mistake
-- ----------------------------
INSERT INTO `order_mistake` VALUES ('1565157009287254', '0', '2019-10-03 16:54:32', '0000-00-00 00:00:00');
INSERT INTO `order_mistake` VALUES ('7646157009283494', '0', '2019-10-03 16:53:54', '0000-00-00 00:00:00');
INSERT INTO `order_mistake` VALUES ('8610157009447573', '0', '2019-10-03 17:21:15', '0000-00-00 00:00:00');
INSERT INTO `order_mistake` VALUES ('9411157010481047', '0', '2019-10-03 20:13:30', '0000-00-00 00:00:00');
INSERT INTO `order_mistake` VALUES ('9702157001709395', '0', '2019-10-02 19:51:33', '0000-00-00 00:00:00');

-- ----------------------------
-- Table structure for seller_apply
-- ----------------------------
DROP TABLE IF EXISTS `seller_apply`;
CREATE TABLE `seller_apply` (
  `phone` varchar(11) NOT NULL,
  `name` varchar(10) NOT NULL,
  `address` varchar(100) DEFAULT NULL,
  `time` datetime NOT NULL,
  PRIMARY KEY (`phone`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of seller_apply
-- ----------------------------
INSERT INTO `seller_apply` VALUES ('15012341234', '123456', null, '2019-07-05 01:36:31');

-- ----------------------------
-- Table structure for seller_discuss
-- ----------------------------
DROP TABLE IF EXISTS `seller_discuss`;
CREATE TABLE `seller_discuss` (
  `seller_id` varchar(11) NOT NULL,
  `user_id` varchar(50) NOT NULL,
  `user_name` varchar(20) NOT NULL,
  `user_headurl` varchar(255) NOT NULL,
  `discuss_level` int(1) NOT NULL,
  `text` varchar(200) NOT NULL,
  `image_url_1` varchar(255) DEFAULT NULL,
  `image_url_2` varchar(255) DEFAULT NULL,
  `image_url_3` varchar(255) DEFAULT NULL,
  `time` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of seller_discuss
-- ----------------------------
INSERT INTO `seller_discuss` VALUES ('12345678902', '1234567890', '派大星', 'http://cdn.kuailefn.xyz/timg.jpg', '5', '海绵宝宝请客。我只管吃', null, null, null, '2019-04-17 21:30:23');
INSERT INTO `seller_discuss` VALUES ('12345678902', '1234567891', '比基尼海滩最帅的章鱼哥', 'http://cdn.kuailefn.xyz/zyg.jpg', '5', '再见了，笨蛋们，我要和一个美丽的姑娘约会了，他的名字叫竖笛。实际上海绵宝宝我喜欢你，我喜欢和你做邻居，我也喜欢小蜗，派大星，珊迪，蟹老板，以及所有我不得不交往的人。', 'http://cdn.kuailefn.xyz/3.jpg', 'http://cdn.kuailefn.xyz/2.jpg', 'http://cdn.kuailefn.xyz/1.jpg', '2019-04-17 21:28:22');
INSERT INTO `seller_discuss` VALUES ('12345678902', '1234567892', '海绵宝宝', 'http://cdn.kuailefn.xyz/hm.jpg', '5', '哦，我的老天，太棒了！哦，章鱼哥，你在冒烟耶，你看起来就像是一棵煮熟的青菜！', 'http://cdn.kuailefn.xyz/hh.jpg', null, null, '2019-04-17 20:55:26');

-- ----------------------------
-- Table structure for seller_goods
-- ----------------------------
DROP TABLE IF EXISTS `seller_goods`;
CREATE TABLE `seller_goods` (
  `seller_id` varchar(50) NOT NULL,
  `is_out` int(1) NOT NULL,
  `class_name` varchar(20) NOT NULL,
  `good_name` varchar(40) NOT NULL,
  `good_price` float(6,2) NOT NULL,
  `good_url` varchar(200) NOT NULL,
  `time` datetime NOT NULL,
  KEY `seller_id` (`seller_id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of seller_goods
-- ----------------------------
INSERT INTO `seller_goods` VALUES ('12345678902', '0', '食品', '乐事薯片（原味）', '6.50', 'http://cdn.kuailefn.xyz/image/seller/1/goods/%E6%8E%A8%E8%8D%90/%E4%B9%90%E4%BA%8B%E8%96%AF%E7%89%87%28%E5%8E%9F%E5%91%B3%29.jpg', '2019-04-21 16:14:41');
INSERT INTO `seller_goods` VALUES ('12345678902', '0', '食品', '乐事薯片（黄瓜味）', '5.50', 'http://cdn.kuailefn.xyz/image/seller/1/goods/%E6%8E%A8%E8%8D%90/%E4%B9%90%E4%BA%8B%E8%96%AF%E7%89%87%28%E9%BB%84%E7%93%9C%E5%91%B3%29.jpg', '2019-04-21 16:16:08');
INSERT INTO `seller_goods` VALUES ('12345678902', '0', '饮料', '农夫山泉', '2.00', 'http://cdn.kuailefn.xyz/image/seller/1/goods/%E6%8E%A8%E8%8D%90/%E5%86%9C%E5%A4%AB%E5%B1%B1%E6%B3%89.jpg', '2019-04-21 16:16:42');
INSERT INTO `seller_goods` VALUES ('12345678902', '0', '饮料', '可口可乐', '2.50', 'http://cdn.kuailefn.xyz/image/seller/1/goods/%E6%8E%A8%E8%8D%90/%E5%8F%AF%E5%8F%A3%E5%8F%AF%E4%B9%90.jpg', '2019-04-21 16:17:11');
INSERT INTO `seller_goods` VALUES ('12345678902', '0', '饮料', '百事可乐', '3.50', 'http://cdn.kuailefn.xyz/image/seller/1/goods/%E6%8E%A8%E8%8D%90/%E7%99%BE%E4%BA%8B%E5%8F%AF%E4%B9%90.jpg', '2019-04-21 16:17:31');
INSERT INTO `seller_goods` VALUES ('12345678902', '0', '饮料', '芬达', '4.50', 'http://cdn.kuailefn.xyz/image/seller/1/goods/%E6%8E%A8%E8%8D%90/%E8%8A%AC%E8%BE%BE.jpg', '2019-04-21 16:17:57');
INSERT INTO `seller_goods` VALUES ('12345678902', '0', '饮料', '雪碧', '5.00', 'http://cdn.kuailefn.xyz/image/seller/1/goods/%E6%8E%A8%E8%8D%90/%E9%9B%AA%E7%A2%A7.jpg', '2019-04-21 16:18:12');
INSERT INTO `seller_goods` VALUES ('ajdhgfks541348awadawd', '1', 'Aaaa', 'aaaaa', '6.35', 'http://cdn.kuailefn.xyz/FoTnWS1K7zOe5YCWDbb2Cb747Yej', '2019-07-09 14:27:43');
INSERT INTO `seller_goods` VALUES ('ajdhgfks541348awadawd', '1', 'Bbbb', 'wdawd', '8.66', 'http://cdn.kuailefn.xyz/FiI3cS2AleDlwYn-QsR2rVwJOjKq', '2019-07-17 18:08:07');

-- ----------------------------
-- Table structure for seller_goods_class
-- ----------------------------
DROP TABLE IF EXISTS `seller_goods_class`;
CREATE TABLE `seller_goods_class` (
  `seller_id` varchar(50) NOT NULL,
  `class_name` varchar(20) NOT NULL,
  `count_goods` int(4) NOT NULL,
  `time` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of seller_goods_class
-- ----------------------------
INSERT INTO `seller_goods_class` VALUES ('12345678902', '食品', '2', '2019-06-06 18:13:36');
INSERT INTO `seller_goods_class` VALUES ('12345678902', '饮料', '5', '2019-06-06 20:15:22');
INSERT INTO `seller_goods_class` VALUES ('ajdhgfks541348awadawd', 'Bbbbbb', '0', '2019-07-09 08:01:37');
INSERT INTO `seller_goods_class` VALUES ('ajdhgfks541348awadawd', 'Aaaa', '1', '2019-07-09 12:35:47');
INSERT INTO `seller_goods_class` VALUES ('ajdhgfks541348awadawd', 'Bbbb', '1', '2019-07-17 18:07:40');

-- ----------------------------
-- Table structure for seller_information
-- ----------------------------
DROP TABLE IF EXISTS `seller_information`;
CREATE TABLE `seller_information` (
  `seller_id` varchar(50) NOT NULL COMMENT '商家唯一标识',
  `seller_phone` varchar(11) NOT NULL COMMENT '商家手机号',
  `seller_name` varchar(50) NOT NULL COMMENT '商家名字',
  `class` int(1) NOT NULL COMMENT '商家所属分类',
  `clicks` int(8) NOT NULL COMMENT '商家点击量',
  `level` float(3,2) NOT NULL COMMENT '商家评分',
  `blance` float(8,2) NOT NULL COMMENT '商家账号余额',
  `turnover` float(11,2) NOT NULL COMMENT '商家总交易额',
  `message` varchar(255) NOT NULL COMMENT '商家留言',
  `seller_addres` varchar(255) NOT NULL COMMENT '商家地址',
  `all_order_number` int(8) NOT NULL COMMENT '总接单书',
  `is_get` int(1) NOT NULL COMMENT '是否接单（1接单，0休息）',
  `feight` float(2,1) NOT NULL COMMENT '运费',
  `preparing_time` int(1) NOT NULL COMMENT '备餐时间',
  `start_money` float(4,2) NOT NULL COMMENT '起送费',
  `headurl` varchar(255) NOT NULL COMMENT '头像',
  `lnt` int(6) NOT NULL COMMENT '商家地址地理经度',
  `lat` int(6) NOT NULL COMMENT '商家地理位置纬度',
  `open_time` datetime NOT NULL COMMENT '接单时间',
  `close_time` datetime NOT NULL COMMENT '关店手机',
  PRIMARY KEY (`seller_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of seller_information
-- ----------------------------
INSERT INTO `seller_information` VALUES ('12345678902', '', '屈臣氏', '0', '0', '0.00', '0.00', '0.00', '', '', '0', '1', '2.0', '0', '35.00', 'http://cdn.kuailefn.xyz/image/seller/2/head/2.jpg', '0', '0', '0000-00-00 00:00:00', '0000-00-00 00:00:00');
INSERT INTO `seller_information` VALUES ('12345678903', '', '世纪联华', '0', '0', '0.00', '0.00', '0.00', '', '', '0', '1', '2.0', '0', '23.00', 'http://cdn.kuailefn.xyz/image/seller/3/head/3.png', '0', '0', '0000-00-00 00:00:00', '0000-00-00 00:00:00');
INSERT INTO `seller_information` VALUES ('12345678904', '', '甜丫丫', '1', '0', '0.00', '0.00', '0.00', '', '', '0', '1', '2.0', '0', '35.00', 'http://cdn.kuailefn.xyz/image/seller/4/head/4.png', '0', '0', '0000-00-00 00:00:00', '0000-00-00 00:00:00');
INSERT INTO `seller_information` VALUES ('12345678905', '', '鹿角巷', '1', '0', '0.00', '0.00', '0.00', '', '', '0', '1', '2.0', '0', '40.00', 'http://cdn.kuailefn.xyz/image/seller/5/head/5.png', '0', '0', '0000-00-00 00:00:00', '0000-00-00 00:00:00');
INSERT INTO `seller_information` VALUES ('12345678906', '', '一點點', '1', '0', '0.00', '0.00', '0.00', '', '', '0', '1', '2.0', '0', '15.00', 'http://cdn.kuailefn.xyz/image/seller/6/head/6.jpg', '0', '0', '0000-00-00 00:00:00', '0000-00-00 00:00:00');
INSERT INTO `seller_information` VALUES ('12345678907', '', 'CoCo都可', '1', '0', '0.00', '0.00', '0.00', '', '', '0', '1', '2.0', '0', '18.00', 'http://cdn.kuailefn.xyz/image/seller/7/head/7.jpg', '0', '0', '0000-00-00 00:00:00', '0000-00-00 00:00:00');
INSERT INTO `seller_information` VALUES ('12345678908', '', '贡茶', '1', '0', '0.00', '0.00', '0.00', '', '', '0', '1', '2.0', '0', '18.00', 'http://cdn.kuailefn.xyz/image/seller/8/head/8.png', '0', '0', '0000-00-00 00:00:00', '0000-00-00 00:00:00');
INSERT INTO `seller_information` VALUES ('12345678909', '', '百果园', '2', '0', '0.00', '0.00', '0.00', '', '', '0', '1', '2.0', '0', '21.00', 'http://cdn.kuailefn.xyz/image/seller/9/head/9.jpg', '0', '0', '0000-00-00 00:00:00', '0000-00-00 00:00:00');
INSERT INTO `seller_information` VALUES ('12345678910', '', '鲜丰水果', '2', '0', '0.00', '0.00', '0.00', '', '', '0', '1', '2.0', '0', '20.00', 'http://cdn.kuailefn.xyz/image/seller/10/head/10.jpg', '0', '0', '0000-00-00 00:00:00', '0000-00-00 00:00:00');
INSERT INTO `seller_information` VALUES ('12345678911', '', '菜市场', '2', '0', '0.00', '0.00', '0.00', '', '', '0', '1', '2.0', '0', '22.00', 'http://cdn.kuailefn.xyz/image/seller/11/head/11.jpg', '0', '0', '0000-00-00 00:00:00', '0000-00-00 00:00:00');
INSERT INTO `seller_information` VALUES ('12345678912', '', '老婆大人零食贩卖', '2', '0', '0.00', '0.00', '0.00', '', '', '0', '1', '2.0', '0', '38.00', 'http://cdn.kuailefn.xyz/image/seller/12/head/12.jpg', '0', '0', '0000-00-00 00:00:00', '0000-00-00 00:00:00');
INSERT INTO `seller_information` VALUES ('12345678913', '', '绝望鸭脖', '3', '0', '0.00', '0.00', '0.00', '', '', '0', '1', '2.0', '0', '24.00', 'http://cdn.kuailefn.xyz/image/seller/13/head/13.png', '0', '0', '0000-00-00 00:00:00', '0000-00-00 00:00:00');
INSERT INTO `seller_information` VALUES ('12345678914', '', '周黑鸭', '3', '0', '0.00', '0.00', '0.00', '', '', '0', '1', '2.0', '0', '26.00', 'http://cdn.kuailefn.xyz/image/seller/14/head/14.png', '0', '0', '0000-00-00 00:00:00', '0000-00-00 00:00:00');
INSERT INTO `seller_information` VALUES ('12345678915', '', '肯德基', '3', '0', '0.00', '0.00', '0.00', '', '', '0', '1', '2.0', '0', '48.00', 'http://cdn.kuailefn.xyz/image/seller/15/head/15.png', '0', '0', '0000-00-00 00:00:00', '0000-00-00 00:00:00');
INSERT INTO `seller_information` VALUES ('12345678916', '', '麦当劳', '3', '0', '0.00', '0.00', '0.00', '', '', '0', '1', '2.0', '0', '42.00', 'http://cdn.kuailefn.xyz/image/seller/16/head/16.jpg', '0', '0', '0000-00-00 00:00:00', '0000-00-00 00:00:00');
INSERT INTO `seller_information` VALUES ('12345678917', '', '弄堂里', '4', '0', '0.00', '0.00', '0.00', '', '', '0', '1', '2.0', '0', '68.00', 'http://cdn.kuailefn.xyz/image/seller/17/head/17.jpg', '0', '0', '0000-00-00 00:00:00', '0000-00-00 00:00:00');
INSERT INTO `seller_information` VALUES ('12345678918', '', '绿茶餐厅', '4', '0', '0.00', '0.00', '0.00', '', '', '0', '1', '2.0', '0', '58.00', 'http://cdn.kuailefn.xyz/image/seller/18/head/18.jpg', '0', '0', '0000-00-00 00:00:00', '0000-00-00 00:00:00');
INSERT INTO `seller_information` VALUES ('12345678919', '', '沙县小差', '4', '0', '0.00', '0.00', '0.00', '', '', '0', '1', '2.0', '0', '10.00', 'http://cdn.kuailefn.xyz/image/seller/19/head/19.png', '0', '0', '0000-00-00 00:00:00', '0000-00-00 00:00:00');
INSERT INTO `seller_information` VALUES ('12345678920', '', '黄焖鸡米饭', '4', '0', '0.00', '0.00', '0.00', '', '', '0', '1', '2.0', '0', '16.00', 'http://cdn.kuailefn.xyz/image/seller/20/head/20.jpg', '0', '0', '0000-00-00 00:00:00', '0000-00-00 00:00:00');
INSERT INTO `seller_information` VALUES ('ajdhgfks541348awadawd', '', 'Ssssaa', '0', '0', '5.00', '58439.54', '1548625.62', 'wdadwadawdadw', '', '0', '1', '1.5', '2', '2.00', 'http://cdn.kuailefn.xyz/FnUFOQwc834qBF9edBhITvR9fM4l', '0', '0', '0000-00-00 00:00:00', '0000-00-00 00:00:00');

-- ----------------------------
-- Table structure for seller_login
-- ----------------------------
DROP TABLE IF EXISTS `seller_login`;
CREATE TABLE `seller_login` (
  `seller_id` varchar(50) NOT NULL,
  `seller_phone` varchar(11) NOT NULL,
  `password` varchar(16) NOT NULL,
  `token` varchar(50) NOT NULL,
  `date` datetime NOT NULL,
  PRIMARY KEY (`seller_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of seller_login
-- ----------------------------
INSERT INTO `seller_login` VALUES ('ajdhgfks541348awadawd', '15012341234', '123456', 'gfevmbpmymjokFpVUCiZ', '2019-04-27 10:53:00');

-- ----------------------------
-- Table structure for user_address
-- ----------------------------
DROP TABLE IF EXISTS `user_address`;
CREATE TABLE `user_address` (
  `user_id` varchar(50) NOT NULL,
  `position_Name` varchar(255) NOT NULL,
  `house` varchar(255) NOT NULL,
  `contact_name` varchar(10) NOT NULL,
  `contact_phone` varchar(11) NOT NULL,
  `lnt` float(10,6) NOT NULL,
  `lat` float(10,6) NOT NULL,
  `date` datetime NOT NULL,
  KEY `user_id` (`user_id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user_address
-- ----------------------------
INSERT INTO `user_address` VALUES ('tyBv15549671353267', '下沙·铭都雅苑', 'dwadawd', 'noobjoe', '18012341234', '120.334259', '30.307026', '2019-05-30 08:11:01');
INSERT INTO `user_address` VALUES ('tyBv15549671353267', '财通中心', 'dwadadw', 'noobjoe', '18012341234', '120.334480', '30.308647', '2019-05-30 08:17:43');
INSERT INTO `user_address` VALUES ('tyBv15549671353267', '东方铭楼', 'dwaw', 'noobjoe', '18012341234', '120.333176', '30.308622', '2019-05-30 08:35:31');
INSERT INTO `user_address` VALUES ('tyBv15549671353267', '和达·御观邸', 'dawdwa', 'noobjoe', '18012341234', '120.330612', '30.307819', '2019-05-30 09:08:11');
INSERT INTO `user_address` VALUES ('tyBv15549671353267', '和达·御观邸', 'dwadaw', 'noobjoe', '18012341234', '120.330612', '30.307819', '2019-05-30 09:13:33');
INSERT INTO `user_address` VALUES ('tyBv15549671353267', '随寓(中沙金座社区)', 'dawdaw', 'noobjoe', '18012341234', '120.330795', '30.306221', '2019-05-30 09:17:20');
INSERT INTO `user_address` VALUES ('tyBv15549671353267', '巷弄里', 'dawdawd', 'noobjoe', '18012341234', '120.330849', '30.306080', '2019-06-09 22:33:27');
INSERT INTO `user_address` VALUES ('tyBv15549671353267', '下沙·铭都雅苑', 'dwad', 'noobjoe', '18012341234', '120.334259', '30.307026', '2019-06-11 19:25:43');
INSERT INTO `user_address` VALUES ('tyBv15549671353267', '杭州金沙印象城', 'dawdad', 'noobjoe', '18012341234', '120.336258', '30.308559', '2019-06-11 19:26:54');
INSERT INTO `user_address` VALUES ('tyBv15549671353267', '财通中心', 'dwada', 'noobjoe', '18012341234', '120.334480', '30.308647', '2019-06-11 19:38:14');
INSERT INTO `user_address` VALUES ('vIEH15621738831819', '财通中心', 'dawda', 'noobjoe', '18012341234', '120.334480', '30.308647', '2019-07-04 06:41:57');
INSERT INTO `user_address` VALUES ('vIEH15621738831819', '东方铭楼', 'dawd', 'noobjoe', '18012341234', '120.333176', '30.308622', '2019-07-04 06:43:56');
INSERT INTO `user_address` VALUES ('vIEH15621738831819', '财通中心', 'dwadad', 'noobjoe', '18012341234', '120.334480', '30.308647', '2019-07-17 17:50:36');

-- ----------------------------
-- Table structure for user_information
-- ----------------------------
DROP TABLE IF EXISTS `user_information`;
CREATE TABLE `user_information` (
  `user_id` varchar(50) NOT NULL COMMENT '用户唯一标识',
  `user_phone` varchar(11) NOT NULL COMMENT '手机号',
  `user_name` varchar(50) NOT NULL COMMENT '用户名字',
  `user_headurl` varchar(255) NOT NULL COMMENT '用户头像',
  `user_au` double(6,2) NOT NULL,
  `user_count_orders` int(6) NOT NULL COMMENT '用户总下单数',
  `user_count_outlay` double(8,2) NOT NULL COMMENT '用户总支出',
  `register_way` int(1) NOT NULL COMMENT '注册方式',
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user_information
-- ----------------------------
INSERT INTO `user_information` VALUES ('vIEH15621738831819', '18012341234', 'noobjoe', 'http://cdn.kuailefn.xyz/FnUFOQwc834qBF9edBhITvR9fM4l', '0.00', '0', '0.00', '0');

-- ----------------------------
-- Table structure for user_like_seller
-- ----------------------------
DROP TABLE IF EXISTS `user_like_seller`;
CREATE TABLE `user_like_seller` (
  `user_id` varchar(50) NOT NULL,
  `seller_id` varchar(50) NOT NULL,
  `seller_name` varchar(20) NOT NULL,
  `seller_headurl` varchar(255) NOT NULL,
  `time` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user_like_seller
-- ----------------------------
INSERT INTO `user_like_seller` VALUES ('tyBv15549671353267', '12345678911', '菜市场', 'http://cdn.kuailefn.xyz/image/seller/11/head/11.jpg', '2019-05-26 21:03:11');
INSERT INTO `user_like_seller` VALUES ('tyBv15549671353267', '12345678905', '鹿角巷', 'http://cdn.kuailefn.xyz/image/seller/5/head/5.png', '2019-06-11 20:06:21');
INSERT INTO `user_like_seller` VALUES ('tyBv15549671353267', 'ajdhgfks541348awadawd', 'dwadawd', 'http://cdn.kuailefn.xyz/FqR8lxwtg-P3eMsP0oIqevMBQph3', '2019-06-11 21:50:01');
INSERT INTO `user_like_seller` VALUES ('tyBv15549671353267', '12345678902', '屈臣氏', 'http://cdn.kuailefn.xyz/image/seller/2/head/2.jpg', '2019-06-11 21:50:02');
INSERT INTO `user_like_seller` VALUES ('tyBv15549671353267', '12345678903', '世纪联华', 'http://cdn.kuailefn.xyz/image/seller/3/head/3.png', '2019-06-15 22:42:40');
INSERT INTO `user_like_seller` VALUES ('vIEH15621738831819', '12345678903', '世纪联华', 'http://cdn.kuailefn.xyz/image/seller/3/head/3.png', '2019-07-04 06:30:00');
INSERT INTO `user_like_seller` VALUES ('vIEH15621738831819', '12345678908', '贡茶', 'http://cdn.kuailefn.xyz/image/seller/8/head/8.png', '2019-07-17 17:49:58');
INSERT INTO `user_like_seller` VALUES ('vIEH15621738831819', '12345678909', '百果园', 'http://cdn.kuailefn.xyz/image/seller/9/head/9.jpg', '2019-07-17 17:49:59');
INSERT INTO `user_like_seller` VALUES ('vIEH15621738831819', '12345678902', '屈臣氏', 'http://cdn.kuailefn.xyz/image/seller/2/head/2.jpg', '2019-10-18 17:48:35');

-- ----------------------------
-- Table structure for user_login_phone
-- ----------------------------
DROP TABLE IF EXISTS `user_login_phone`;
CREATE TABLE `user_login_phone` (
  `user_id` varchar(18) NOT NULL COMMENT '用户Id',
  `user_phone` varchar(11) NOT NULL,
  `user_password` varchar(16) NOT NULL,
  `token` varchar(20) NOT NULL,
  `register_date` datetime NOT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user_login_phone
-- ----------------------------
INSERT INTO `user_login_phone` VALUES ('vIEH15621738831819', '18012341234', '123456', 'dwNZIsDZQgWCjCANBAxA', '2019-07-04 01:11:23');
