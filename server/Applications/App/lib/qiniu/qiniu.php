<?php 
require_once __DIR__.'/../../../../vendor/autoload.php';
use Qiniu\Auth;

/**
 * 对七牛云的操作进行封装
 * 所有需要使用到七牛云的api只需要引入当前文件
 */
class Qiniu
{
    /**
     * 用于签名的常量
     * @param string $accessKey 公匙
     * @param string $secretKey 私匙
     * @param string $bucket 空间名
     */
    private static $accessKey = '';
    private static $secretKey = '';
    private static $bucket = '';

    /**
     * 初始化鉴权对象
     */
    private function auth()
    {
        $auth = new Auth(self::$accessKey,self::$secretKey);
        return $auth;
    }

    /**
     * 返回一个token，用于客户端直接上传资源七牛云的凭证
     */
    public function getUploadToken()
    {
        $auth = $this->auth();
        $token = $auth->uploadToken(self::$bucket);
        return $token;
    }

    /**
     * 删除一个图片
     * @param string key 删除文件的标识
     */
    public function deleteImage($key)
    {
        $auth = $this->auth();
        $config = new \Qiniu\Config();
        $bucketManager = new \Qiniu\Storage\BucketManager($auth, $config);
        $err = $bucketManager->delete(self::$bucket, $key);
    }
}


