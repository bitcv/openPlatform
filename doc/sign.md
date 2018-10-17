### 签名机制
部分接口调用需要进行数据签名，签名规则如下：

1. 请求的所有参数，需要根据参数名=参数值的格式，按首字符字典顺序（ascii值大小）排序，若遇到相同首字符，则判断第二个字符，以此类推，待签名字符串需要以“参数名1=参数值1&参数名2=参数值2&….&参数名N=参数值N”的规则进行拼接。
2. 在对请求的参数做签名时，这些参数必须来源于请求参数列表，并且除去列表中的参数sign。
3. 在对请求的参数做签名时，对于请求参数列表中那些可空的参数，如果选择使用它们，那么这些参数的参数值必须不能为空或空值。
4. 待签名数据应该是参数原始值而不是url encoding之后的值，例如：调用某接口需要对请求参数email进行数字签名，那么待签名数据应该是email=test@example.com，而不是email=test%40example.com。


### 生成待签名字符串

1. 需要参与签名的参数
   在请求参数列表中，除去sign、sign_type、sign_version三个参数外，其他需要使用到的参数皆是要签名的参数。
   在通知返回参数列表中，除去sign、sign_type、sign_version三个参数外，凡是通知返回回来的参数皆是要签名的参数
2. 生成待签名字符串
   对于如下的参数数组：

```
string[] parameters={
    “appid=2088002018018916”,
    “return_url=http://www.example.com/return_url”,
    “out_trade_no=BW96511872899679”,
    “subject=iPhone plus”,
    “price=32”,
    “quantity=1”,
    “seller_email=test@example.com”
};
```
对数组里的每一个值从a到z的顺序排序，若遇到相同首字母，则看第二个字母，以此类推。
排序完成之后，再把所有数组值以“&”字符连接起来，如：

```
appid=2088002007018916&out_trade_no=BW96511872899679&price=32&quantity=1&return_url=http://www.example.com/return_url&seller_email=test@example.com&subject=iPhoneplus
```
这串字符串便是待签名字符串。
将待签名字符串与第三方平台APP_SECRET拼接再进行MD5散列即是最终的签名参数。

**注意：**
1.没有值的参数无需传递，也无需包含到待签名数据中；
2..签名串必须验证通过后才能进行业务处理。
根据HTTP协议要求，传递参数的值中如果存在特殊字符（如：&、@等），那么该值需要做URL Encoding，这样请求接收方才能接收到正确的参数值。这种情况下，待签名数据应该是原生值而不是encoding之后的值。例如：调用某接口需要对请求参数email进行数字签名，那么待签名数据应该是email=test@example.com，而不是email=test%40example.com。

