/*
Navicat MySQL Data Transfer

Source Server         : 148.70.248.117_3306
Source Server Version : 50560
Source Host           : 148.70.248.117:3306
Source Database       : auntlight

Target Server Type    : MYSQL
Target Server Version : 50560
File Encoding         : 65001

Date: 2019-10-18 20:13:44
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
