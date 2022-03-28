# hotel-manager

## project introduce

本项目是采用微前端qiankun框架技术，将react子应用加入到vue主应用中，子应用是一个使用react框架写的登录界面，父应用是采用vue技术栈编写，实现了一个整体的酒店后台管理系统。子项目与主项目做到了样式隔离，js沙箱隔离。两个应用是独立开发，集成一起。

子项目登录界面制作细节：首选就是先导出子应用的三个生命周期函数（bootstrap、mount、unmount），然后进行webpack配置此文件的输出；然后主应用引入qiankun框架后，使用registermicroApp注册子应用、并start启动子应用、再将子应用渲染到对应的container中；然在子应用中 登录信息在向后台发送http的get请求后，获取到数据就将数据存入本地缓存（其实也可以用qiankun提供的api采用子主应用通信，但这里我还没熟悉掌握，只是暂时先完成我想要的功能），然后父应用查看本地缓存，本地缓存有登录数据，那么就跳转到layout界面。

项目过程：制作登陆注册页面，引入axios和md5加密，并对他们进行封装成为插件，其中还封装了防抖$debounce以及节流插件。以及设置登陆token，对基本信息进行布局，这里使用的是vue-elementUI组件进行布局页面，网站中的主题颜色是通过本地缓存localStorage进行缓存，然后自定义切换主题颜色；错误404页面统一处理；引入API层对业务进行二次封装。管理员信息管理、以及对管理员的增删改查和一些客房和顾客信息管理，这里包括一些分页功能、上传图片以及一些信息excel导出功能，还有按照条件对一些信息进行查询；引入mock.js做拦截请求，引入echars对酒店的销售额数据做成柱状图进行统计，以及权限的一些设置。

1. 使用微前端技术，整个项目使用vue和react技术栈混合开发

2. 使用mixin混入的方式自定义封装了一些有用的插件，比如防抖、节流插件以及axios异步请求、md5加密等插件。

3. 使用vuex状态管理将用户登录信息在保存在vuex的store库中。

4. 使用的路由模式是vue的history模式。

5. 数据的分页功能、上传图片、按条件进行查询数据、模糊查询、以及excel数据导出

6. 引入了mock.js做拦截请求

7. 引入echarts对酒店销售额数据可视化

8. 权限设置

## Project setup

```
npm install
```

### Compiles and hot-reloads for development

```
npm run serve
```

### Compiles and minifies for production

```
npm run build
```

### Lints and fixes files

```
npm run lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).