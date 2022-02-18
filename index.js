#!/usr/bin/env node
const { program } = require("commander");
const download = require("download-git-repo");
const ora = require("ora");
const chalk = require("chalk");
const logSymbols = require("log-symbols");

program.version("0.1.0");

program
  .command("create <project>")
  .description("初始化项目模板")
  .action(function (project) {
    // 下载前提示
    const spinner = ora("正在下载模板中").start();

    const downloadURL =
      "direct:https://github.com/MangoIsGreat/vue_project_templete.git#main";

    download(downloadURL, project, { clone: true }, (err) => {
      if (err) {
        spinner.fail();
        return console.log(
          logSymbols.error,
          chalk.red("下载失败，失败原因：" + err)
        );
      } else {
        spinner.succeed();
        return console.log(logSymbols.success, chalk.yellow("下载成功"));
      }
    });
  });

program
  .command("help")
  .description("查看所有可用的模板帮助")
  .action(function () {
    console.log(`这是关于项目帮助信息`);
  });

program.parse(process.argv);
