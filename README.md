#请按照以下顺序熟悉项目
- 安装node、npm，地址：https://nodejs.org/zh-cn/
- 命令行 node -v，出现 ```v10.13.0```版本号即为安装成功
- 配置taobao镜像，地址：http://npm.taobao.org/   （不配置也可以）
- 使用 npm install 安装包
>## start 启动项目
npm run dev
>##build  打包项目
npm run build
>##项目ip地址
https://192.168.1.103:10003
>##docker环境更新
checkin代码即可
>###增加页面
- 需先配置路由，注意大小写，地址：src/router/index.js
- 编写页面，src/page/...
- 一个路由对应一个文件夹
>###更改已有需求
- 找到需求地址，例如：```http://localhost:3000/#/login```
- 在 src/router/index.js 内寻找#后的路由
- 再寻找对应页面
>###常量
- src/constants/constants.js
- 常量一律采用大写格式
```
import {REMEMBER,LOCALKEY,TOKEN} from "../../constants/constants";
```
>###路由配置
src/router/index.js
>###样式
src/style
- 公共样式 ：src/style/index.scss
- 修改ui框架样式：src/style/form.scss （不同组件请单独命名）
- 私有样式请单独开发在相应page需求内
>###公用工具js
src/utils
>###api处理
api地址请统一放置在 src/api/api.js内
>###静态文件，例如图片位置
static
>###公用状态处理store
src/store
>###项目使用的框架及ui链接
- https://cn.vuejs.org/
- https://router.vuejs.org/
- https://vuex.vuejs.org/
- http://element-cn.eleme.io/#/zh-CN
>###其他注意事项
- 此项目使用ES6及以上语言开发
- 函数名为小驼峰命名法，类名为中线横杠命名，常量命名为全部大写命名
- 需兼容至IE9
- 本地代理
config/index.js
```      proxyTable: {
          '/api': {// '/api':匹配项
              target: 'https://192.168.1.103:10001',// 接口的域名
              secure: false,// 如果是https接口，需要配置这个参数
              changeOrigin: true,// 如果接口跨域，需要进行这个参数配置
          }
        }
 ```
- 本地重定向
build/webpack.dev.conf.js
```
    before(app){
          app.get('/web/adminportal', function(req, res) {
              res.redirect(302, 'https://192.168.1.103:10003');
          });
      }
```
#####项目涉及负责人：赵进（后端接口）
swagger地址：https://192.168.1.103:10001/swagger/index.html
