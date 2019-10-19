<?php
require_once __DIR__.'/../../../lib/qiniu/qiniu.php';
use \GatewayWorker\Lib\Gateway;

/**
 * 获取七牛上传凭证
 */
function clientGetQiniuUploadToken($client_id)
{
    $Qiniu = new Qiniu();
    $data=array('action'=>"get_qiniu_upload_token",'status'=>1,"token"=>$Qiniu->getUploadToken());
    Gateway::sendToClient($client_id,json_encode($data));
}