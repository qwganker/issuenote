### IssueNote

IssueNote 是基于 [quasar](https://quasar.dev/) 构建，将个人笔记存储于 github issue 的私人笔记，支持web和electron(理论上也支持安卓/ios)

### 源码地址:

- gitee: https://gitee.com/QWganker/issuenote
- github https://github.com/qwganker/issuenote

### 预览

### web模式
![image](https://raw.githubusercontent.com/qwganker/issuenote/master/docs/imgs/preview.png)
### electron模式
![image](https://raw.githubusercontent.com/qwganker/issuenote/master/docs/imgs/electron.png)

### 设置

1. 先申请 [access token](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token)

2. 创建一个用于存放笔记的仓库
3. 启动项目，在仓库管理设置参数，并保存

![image](https://raw.githubusercontent.com/qwganker/issuenote/master/docs/imgs/setting.png)

### 开发手册

1. 安装依赖

```bash
npm install -g @quasar/cli
npm install
```

2. 本地运行

```bash
quasar dev
```

本地访问地址: http://localhost:8080

3. 打包 electron 应用

```
quasar build -m electron
```

打包的应用存放在 dist/electroon 目录下

### 交流

QQ 群(764361968)
