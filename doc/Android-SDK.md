## Android-SDK集成文档
###支持Android Studio 


                          币威SDK集成文档
目录
一、 获取Appid	
二、 Maven地址	
三、 SDK基本信息
四、 项目(app)中build.gradle配置	
五、 AndroidManifest.xml 配置	
六、 项目(app)中AppLication配置初始化信息	
七、 跳转界面接入	
八、 退出登录接口	
九、 获取SDK版本号接口	
十、 是否开启混淆	



##一、获取Appid
请联系客服或开发人员获取接入Appid;

##二、Maven地址
Maven远程地址 https://dl.bintray.com/fengye12345/BvSdk
##三、SDK基本信息
minSdkVersion 15
targetSdkVersion 28
compileSdkVersion 28

##四、项目(app)中build.gradle配置
在app build.gradle中配置如下代码   
代码片段：
repositories {
              flatDir {
                     dirs 'libs'
                    }
              maven {
                    url "https://dl.bintray.com/fengye12345/BvSdk"
                    }
               }
导入bcvSdk：implementation 'com.bitcv:bcvsdk:1.0.0'
##五、AndroidManifest.xml 配置
<uses-permission android:name="android.permission.INTERNET" />
<uses-permission android:name="android.permission.WAKE_LOCK" />
<uses-permission android:name="android.permission.READ_PHONE_STATE" />
<uses-permission android:name="android.permission.CAMERA"></uses-permission>
<uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE" />
<uses-feature android:name="android.hardware.camera" />
<uses-feature android:name="android.hardware.camera.autofocus" />
<uses-permission
    android:name="android.permission.WRITE_SETTINGS"
    tools:ignore="ProtectedPermissions" />
<uses-permission android:name="android.permission.VIBRATE" />
<uses-permission
    android:name="android.permission.MOUNT_UNMOUNT_FILESYSTEMS"
    tools:ignore="ProtectedPermissions" />
<uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
<uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION" />
<uses-permission android:name="android.permission.CHANGE_WIFI_STATE" />
<uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />
<uses-permission android:name="android.permission.ACCESS_LOCATION_EXTRA_COMMANDS" />
<uses-permission android:name="android.permission.CHANGE_NETWORK_STATE" />
<uses-permission android:name="android.permission.GET_TASKS" />
<uses-permission android:name="android.permission.ACCESS_WIFI_STATE" />
<uses-permission android:name="android.permission.KILL_BACKGROUND_PROCESSES" />
<uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />
<uses-permission android:name="android.permission.REQUEST_INSTALL_PACKAGES" />
<uses-permission android:name="android.permission.SYSTEM_ALERT_WINDOW" />
<uses-permission android:name="android.permission.SYSTEM_OVERLAY_WINDOW" />
<uses-permission android:name="android.permission.FLASHLIGHT" />
<uses-permission android:name="android.permission.BLUETOOTH" />
<uses-permission android:name="android.permission.DOWNLOAD_WITHOUT_NOTIFICATION" />


##六、项目(app)中AppLication配置初始化信息

代码片段：
String appid = "bcv2SnqmaJ4Y4xk2";
BvSdkApplication bcvSdkApplication = new BvSdkApplication();
bcvSdkApplication.init(this, appid);

##七、跳转界面接入
 
代码片段：
BvSdkApplication.getApplication().BvLoginJump(MainActivity.this, cCode, phone);

备注：国家码（cCode）、手机号码（phone）不能为空且需要按标准格式传入
       国家码标准详见文档  CountryCode.doc文档
##八、退出登录接口

代码片段：
BvSdkApplication.getApplication().BvLogout(BvAboutActivity.this, new LogoutListener() {
    @Override
    public void logOutStart() {
        // 退出开始
    }

    @Override
    public void logOutSuccess() {
        // 成功退出
    }

    @Override
    public void logOutFail(int code, String msg) {
        // 退出失败  code 错误码  msg 错误信息
    }

    @Override
    public void logOutComplete() {
    }
});

备注:BvAboutActivity.this 换成当前退出Activity
##九、获取SDK版本号接口
BvSdkApplication.getApplication().BvVersion();
##十、是否开启混淆
如果项目开启混淆
minifyEnabled true
请将demo中proguard-rules.pro文件代码全部复制至项目中即可