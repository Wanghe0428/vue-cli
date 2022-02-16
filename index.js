#!/usr/bin/env node // 使用Node开发命令行工具所执行的js脚本必须在顶部加入 #!/usr/bin/env node该声明，是为了告诉执行器使用node来执行当前脚本代码
// 进入commander模块，来获取命令myVue之后的字段
import { program } from "commander";
// 引入下载github内容模块，用于下载github仓库中的template模板
import download from "download-git-repo"
// 引入向导模块，实现命令行交互式一问一答
import inquirer from "inquirer";
// 引入用于读取文件的node原生模块fs
import fs from "fs";
// 引入handlebars模块，用于解析项目中的package.json文件
import handlebars from "handlebars"
// 引入样式美化模块ora
import ora from "ora";
// 引入chalk模块，用来增加字体颜色美化效果
import chalk from 'chalk';
// 引入log-symbols模块，来增加一些符号美化效果
import logSymbols from "log-symbols"


// 1. 获取用户输入的命令
// 实现这个功能可使用原生node.js提供的进程对象process.argv，但是这种方法比较麻烦，所以可以使用commander模块实现读取命令行中的命令
// console.log(process.argv); //process.argv是一个数组，里面数组的第三个元素开始是终端上的命令
/**比如输入 myVue init则process.arg为：
 * [
    'D:\\development_tools\\node\\node.exe',
    'C:\\Users\\wang_He\\AppData\\Roaming\\npm\\node_modules\\vue-cli\\index.js',
    'init'
  ]
 */
// 2. 根据不同得命令执行不同的功能操作
// myVue init时所用到的模板
const templates = {
    // 模板tpl-a: 模板a的地址
    "tpl-a": {
        url: "https://github.com/Wanghe0428/template-a",
        // download-git-repo模块提供的download函数的第一个参数下载地址
        downloadUrl: "https://github.com:Wanghe0428/template-a#main",
        description: "a模板"
    },
    "tpl-b": {
        url: "https://github.com/Wanghe0428/template-b",
        downloadUrl: "https://github.com:Wanghe0428/template-b#main",
        description: "b模板"
    },
    "tpl-c": {
        url: "https://github.com:Wanghe0428/template-c",
        downloadUrl: "https://github.com/Wanghe0428/template-c#main",
        description: "c模板"
    }
}
// commander的一些规则
program
    .version('0.1.0')  // myVue -V | --version时终端输出0.8.0



// 自己配置myVue init命令功能
// myVue init a a-name 基于a模板进行初始化项目，并为此项目起名为a-name
program
    // <>尖括号为必须参数，[]为可选参数
    .command('init <template> <project>')
    .description('初始化项目模板')
    // action函数为匹配到init后执行的回调函数
    .action((templateName, projectName) => {
        // 下载之前做loading提示
        const spinner = ora("正在下载模板").start();



        // 根据模板名下载对应的模板到本地
        // console.log(templates[templateName].url);
        /**
         * download()函数：
         * 第一个参数是：仓库地址
         * 第二个参数是：创建的项目名字
         */
        let myDownloadUrl = templates[templateName].downloadUrl
        download(myDownloadUrl, projectName, { clone: true }, (err) => {
            if (err) {
                // ora提示下载失败提示
                spinner.fail("下载失败")
                // console.log(logSymbols.error, "下载失败啦您");
                return
            }
            // ora下载成功提示
            spinner.succeed("下载成功")
            // 把项目下的package.json文件读取出来
            // 使用向导的方式即一问一答的方式（这里采用inquire库来实现）采集用户输入的数据，然后将数据解析到package.json文件中
            inquirer
                .prompt([
                    /* 这里放置想要询问的字段 */
                    {
                        type: "input",
                        name: "name",
                        message: "请输入项目名称"
                    }, {
                        type: "input",
                        name: "author",
                        message: "请输入作者名称"
                    }, {
                        type: "input",
                        name: "description",
                        message: "请输入项目简介"
                    }
                ])
                .then((answers) => {
                    // answers就是一个对象，对象里面存储了name、author、description三个属性字段
                    // 把采集到的数据用户输入的数据（也就是answers对象中的字段）解析替换到package.json文件中
                    // console.log(answers);
                    // 读取package.json文件，这里是使用的fs模块的readfilesync函数，第一个参数是指文件路径，第二个参数是读取文件方式，这里是utf8表示读取的是字符串，若没有utf8则表示读取的是二进制数据
                    const packagePath = `${projectName}/package.json`  //package.json文件路径
                    // packageContent就是读取到的package.json字符串文件
                    const packageContent = fs.readFileSync(packagePath, "utf-8")
                    // 使用handlebars来将文件编译为渲染函数,然后将从命令行中获取到的数据解析到packageContent中，就得到了已完成字段插入解析完成后的package.json
                    const packageResult = handlebars.compile(packageContent)(answers)
                    // console.log(packageResult);
                    // 最后将结果packageResult重新写入到package.json文件中
                    fs.writeFileSync(packagePath, packageResult)
                    console.log(11);
                    // 表示输出 √ +“绿色的初始化模板成功”
                    console.log(logSymbols.success, chalk.blue("初始化模板成功"));
                })
                .catch((error) => {
                    if (error.isTtyError) {
                        // Prompt couldn't be rendered in the current environment
                    } else {
                        // Something else went wrong
                    }
                });

            // 解析完毕，把解析之后的结果重新写入到package.json文件中
        })
    });


program
    .command("list") //查看拥有的模板
    .description("查看所有可用模板")
    .action(() => {
        for (const key in templates) {
            // 输出每个模板的模板名和模板描述
            console.log(key, templates[key].description);
        }
    })

// program
//     .command('*')
//     .action(function (env) {
//         console.log('deploying "%s"', env);
//     });

program.parse(process.argv);

