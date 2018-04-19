# 云切割项目

# 部署
1)环境
```
  node    //安装
  pm2     //npm install -g pm2    --用于启动站点
  yarn    //npm install -g yarn   --用于安装依赖包
```
2)配置
  build根目录下，config文件夹
```
  /config
    /index.js           //确保是生产环境：'production'
    /production.json    //hosts节点: 对应三个站点启动后的路径；
                        //api节点：对应后台java服务的api接口地址；
                        //redis节点：缓存服务的地址。
```
3)安装
```
  yarn --production    // build根目录下运行，安装依赖包
```
4)启动站点
  项目分成三个子项目，build根目录下
```
  pm2 restart ecosystem.json
```
