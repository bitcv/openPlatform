## 客户端iOS集成流程
启动 IDE（如 Xcode），把 BitcvpaySDK.framework导入到项目工程中。依赖库：UIKit.framework

### 支持系统版本
包括iOS9.0及以上版本

### 配置 URL Scheme 白名单
<key>LSApplicationQueriesSchemes</key>
	<array>
		<string>bitcvpay</string>
	</array>

### 增加头文件引用
#import <BitcvpaySDK/BitcvPayManager.h>

### 配置返回 url 处理方法
本步骤指引开发者配置币威钱包客户端返回 url 处理方法（外部存在币威钱包，币威钱包将处理结果通过 url 返回）。

如示例BitcvPayDemo\AppDelegate.m 文件中，增加引用代码：
#import <BitcvpaySDK/BitcvPayManager.h>

将 @implementation AppDelegate 中以下代码中的 NSLog 改为实际业务处理代码：

// NOTE: 9.0以后使用新API接口

-(BOOL)application:(UIApplication *)app openURL:(NSURL *)url options:(NSDictionary<NSString*, id> *)options{

    return [[BitcvPayManager sharedBitcvPayManager] handleOpenURL:url options:options];
}

// 支持所有iOS系统

-(BOOL)application:(UIApplication *)application openURL:(NSURL *)url sourceApplication:(NSString *)sourceApplication annotation:(id)annotation{
    
       return [[BitcvPayManager sharedBitcvPayManager] handleOpenURL:url sourceApplication:sourceApplication annotation:annotation];
}


### 类与方法
#### 类名：BitcvPayManager

#### 方法如下：

/*

    单例方式获取BitcvPayManager的支付实例

*/

+(instancetype)sharedBitcvPayManager;

/*

    是否安装了币威钱包

    @return 是否处理。YES代表已安装币威钱包。NO代表:1、没有安装币威钱包2、urlscheme白名单没有配置3、币威钱包的当前版本小于等于3.5.1

 */

-(BOOL)isInstallBitcvWallet;

/*
 
    orderString 订单信息
 
    urlScheme 币威钱包回调的urlScheme，该urlScheme要和币威提供的保持一致。
 
 */

-(void)payOrder:(NSString*)orderString urlScheme:(NSString*)urlScheme callback:(CompletionBlock)completionBlock;


/*

    获得从sso或者web端回调到本app的回调

    @param url               第三方sdk的打开本app的回调的url

    @param sourceApplication 回调的源程序

    @param annotation        annotation

    @return 是否处理  YES代表处理成功，NO代表不处理
 
 */

-(BOOL)handleOpenURL:(NSURL *)url sourceApplication:(NSString *)sourceApplication annotation:(id)annotation;

/*

    获得从sso或者web端回调到本app的回调
 
    @param url     第三方sdk的打开本app的回调的url

    @param options 回调的参数
 
    @return 是否处理  YES代表处理成功，NO代表不处理
 
 */

-(BOOL)handleOpenURL:(NSURL *)url options:(NSDictionary*)options;

/*

    获取当前SDK版本号

*/

-(NSString*)currentVersion;

### Demo地址

https://github.com/bitcv/BitcvpaySDKDemo_iOS

