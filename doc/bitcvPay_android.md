## 客户端Android集成流程

### 开发工具
Android studio

### 支持sdkersinon
minSdkVersion 17

### 币威钱包版本支持
3.5.1以上

### 集成步骤
1.下载bitcvsdkpay-release.aar 文件，并放入app/libs文件夹下

2.配置app目录下 build.gradle文件
android {
   ...
   ...

    repositories{
        flatDir{
            dirs 'libs'
        }
    }
}
dependencies {
   ...
   ...
   implementation(name: 'bitcvsdkpay-release', ext: 'aar')

}

3.在AndroidManifest.xml中添加相关权限：
    <!--币威支付权限-->
    <uses-permission android:name="android.permission.INTERNET" />
    <uses-permission android:name="android.permission.MODIFY_AUDIO_SETTINGS"/>
    <uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE"/>
    
4.创建bitcvapi目录，并拷贝demo中ResultActivity.class至该目录下
在你的package目录下，创建bitcvapi目录，比如说我使用的demo项目，bitcvapi就在目录com.bitcv.sdkpaydemo目录下

5.支付Activity 配置如下

public class MainActivity extends AppCompatActivity implements BitcvCallBack {
    private BitcvSdkReceiver locationReceiver;
    private BitcvBroadcast broadcast;
      @Override
    protected void onCreate(Bundle savedInstanceState) {
    
      ...
      ...
      locationReceiver = new BitcvSdkReceiver();
      locationReceiver.setBitcvSdkCallBack(this);
      broadcast = new BitcvBroadcast();
      broadcast.registerReceiver(this, locationReceiver);
    }
    
     @Override
    protected void onDestroy() {
        if (broadcast != null) {
            broadcast.unregisterReceiver(this, locationReceiver);
        }
        super.onDestroy();
    }

    @Override
    public void bitcvSdkCallBack(String rs) {
       //返回code+msg
        tv_result.setText(rs);
    }
}

### 类与方法
#### 类名：SdkPayManager

/*

   发送数据调起币威支付
   返回String   sendpay_success  该结果仅作为是否调用成功  
 */

SdkPayManager.SendBitcvSdkPay(Context context, BitcvPayBean payBean)


/*
    获取sdk版本号
    返回String   如1.0.0 
*/

SdkPayManager.getSdkVersion(Context context)


/*
    检查是否安装币威钱包
    返回boolean  
*/

SdkPayManager.isApkInstalled(Context context, String packageName)

### demo地址

https://github.com/bitcv/BitcvpaySDKDemo_Android

### 错误码

    0 支付成功

    -1 取消支付

    100 参数错误

    101 未知错误

    40050 签名错误

    40051 appKey不存在

    40052 应用包名不匹配

    40053 应用名称不匹配

    40054 商品名称不存在

    40060 订单已支付

    40061 订单已超时
