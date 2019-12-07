const program = require("commander")
const inquirer = require("inquirer")
const qrcode = require("qrcode-terminal") // 生成二维码
const getInfomation = () => {
  const prompt = [{
    type: 'input',
    name: "userName",
    message: "用户名"
  }, {
    type: 'password',
    name: "password",
    message: "密码",
    mask: "🐷 ",
    validate: val => val.length > 0 || '密码不能为空'
  }, {
    type: 'list',
    message: "请选择你喜欢的的答案",
    name: 'like',
    choices: [
      "A.我喜欢你，恰巧你也喜欢我",
      "B.我的答案是A",
      "C.我的答案是B"
    ],
    filter: val => { // 使用filter将回答变为小写
      return `  ❤️ ${val}  ❤️ `;
    }
  }, {
    type: "confirm",
    message: "是否使用监听？",
    name: "watch",
    prefix: "前缀"
  }, ]
  inquirer.prompt(prompt).then(({
    userName,
    password,
    like
  }) => {
    console.log(`你的信息被我知道了，哈哈 \n\n ${userName}\n\n ${password}\n\n ${like}`)
  })
}
/**
 * 输入获取参数处理 node index.js params/p
 */

program
  .command("params")
  .alias("p")
  .description("输入你的信息")
  .action(() => {
    getInfomation()
  })

/**
 * 输入字符串生成二维码 node index.js generate/g 'i like you'
 */
program
  .command('generate [link]')
  .alias('g')
  .description('输入英文地址生成二维码')
  .action((link, cmd) => {

    if (!link) {
      console.error('error', link)
    } else {
      const qrcodeUrl = link
      qrcode.generate(qrcodeUrl, {
        small: true
      });
      console.log(`生成二维码成功。\n\n${qrcodeUrl}`)
    }
  })
/**
 * 必须有 help
 */
program
  .helpOption('-h, --help', '查看帮助信息')
  .usage('<command> [options]')
  .parse(process.argv);

// 如果没有传入参数，输出帮助
if (!process.argv.slice(2).length) {
  program.help();
}