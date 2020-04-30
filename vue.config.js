// vue.config.js
const WebpackAliyunOss = require('webpack-aliyun-oss');
const Oss = require('./oss');
// 根据自定义的变量来进行内容设置
let BASE_URL = '/'
switch(process.env.DEPLOY) {
    case 'online':
        BASE_URL = 'https://duchuanoss.oss-cn-hangzhou.aliyuncs.com/zhoubao/assets/'
        break
    default:
        BASE_URL = '/'
}
module.exports = {
    publicPath: BASE_URL,
    configureWebpack: config => {
        let webpackAliyunOss = [
          new WebpackAliyunOss({
            from: "./dist/**", // 上传那个文件或文件夹  可以是字符串或数组
            // dist: "",  // 需要上传到oss上的给定文件目录
            region: Oss.region,
            accessKeyId: Oss.accessKeyId,
            accessKeySecret: Oss.accessKeySecret,
            bucket: Oss.bucket,
            // test: true,
            setOssPath: filePath => {
              // some operations to filePath
              let index = filePath.lastIndexOf("dist");
              let Path = filePath.substring(index + 4, filePath.length);
              return "zhoubao/assets" + Path.replace(/\\/g, "/");
            },
            setHeaders: filePath => {
              // some operations to filePath
              // return false to use default header
              return {
                "Cache-Control": "max-age=31536000"
              };
            }
          })
        ];
        config.plugins = [...config.plugins, ...webpackAliyunOss ];
    }
}
    
