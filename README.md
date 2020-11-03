# Vue-Weixin-JS-SDK
此项目是用 vue-cli3 搭建的 vue2.0 项目，在其中引入了企业微信的 JS-SDK ，进行简单的封装并调用成功，特上传保存以供参考


# 项目的准备工作
1、注册一个企业微信，或有现有的企业微信并有管理员权限
2、注册一个域名（接口授权域名需用到）
3、能够部署项目的服务器（该项目是试用的腾讯云服务器，试用期一个月 2020-11-30 到期），并将域名解析到该服务器 IP 地址
4、企业微信官方 API 地址：https://work.weixin.qq.com/api/doc/90000/90136/90512


# 告知
该项目只是为了试验在 vue 中调用企业微信 JS-SDK 能否成功，所以只测试了"选人接口"这一个接口

# 注意点
调用 JS-SDK 流程：
1、在企业微信后台为域名配置权限
2、调用 access_token 接口
3、调用接口生成 JS-SDK 使用权限签名
4、调用 wx.config
5、调用相应的 JS 接口

其中步骤 2、3 因涉及到企业 ID 等敏感信息，应由后台进行调用传给前端，该项目中为了方便测试在前端 JS 中完成

该项目中 access_token 是直接通过企业微信接口测试工具获取的，这种方法是不可取的，因为 access_token 每 2 小时就会更新一次，所以应该在后台处理

企业微信接口测试工具：https://open.work.weixin.qq.com/wwopen/devtool/interface/combine

项目开发完成后要在企业微信中运行才能成功调起接口


# 踩过的坑
1、JS-SDK 使用权限签名接口中 timestamp 单位是秒，可用 Date.parse(new Date()) / 1000 获取
2、JS-SDK 使用权限签名接口获取当前 url 要去掉 # 后的部分，通过 window.location.href.split('#')[0] 获取
3、报错提示 not match any relible domain，调用接口的网站域名要在后台设置权限，并在网站根目录放入证书