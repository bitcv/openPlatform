## BitcvWalletSDK集成文档
### SDK运行环境
1、iOS9.0以上的版本(包括iOS9.0)
2、iPhone设备
### 获取SDK
下载地址:
### 导入SDK
BitcvWalletSDK.framework、BitcvWallet.bundle拖入到工程中即可。

### 项目配置
1、添加libc++ 
2、向Other Linker Flags 添加 -Objc 
3、相机和照片权限设置
  Privacy - Camera Usage Description   我们使用您的相机用于：扫描付款是否同意？
  Privacy - Photo Library Usage Description  我们使用您的相册用于：加载二维码是否同意？
### SDK使用
1、初始化SDK
[BitcvWalletManager initWithAppKey:@"xxxxxxxx"];
"xxxxxxxx" 是由该平台提供的AppKey
2、进入币威钱包页面提供两种方式：
模态方式弹出页面
[BitcvWalletManager presentViewControllerWithViewController:self nation:@"+86" mobile:@"xxxxxxxxxxx" exitBlock:^{
    }];
导航控制器push的方式
[BitcvWalletManager pushViewControllerWithNavigationController:self.navigationController nation:@"+86" mobile:@"xxxxxxxxxxx" exitBlock:^{
    }];
3、退出币威钱包
[BitcvWalletManager signOut];
4、获取币威钱包SDK的版本号
[BitcvWalletManager version];