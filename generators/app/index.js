'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');

module.exports = class extends Generator {
  prompting() {
    this.log(
      yosay(`Welcome to the doozie ${chalk.red('mav-lambda')} generator!`)
    );

    const prompts = [
      {
        type: 'input',
        name: 'newLambdaName',
        message : 'Enter a name for the new lambda (i.e.: api_get_mav_members): '
      },
      {
        type: 'input',
        name: 'newDescription',
        message : 'Enter a description for the new lambda (i.e.: provide mav members to clients): ',
      },
      {
        type: 'input',
        name: 'newAuthor',
        message : 'Enter author',
        default: 'Mavigex'
      },
    ];

    return this.prompt(prompts).then(props => {
      this.props = props;
    });
  }

  writing() {
    this.destinationRoot(this.props.newLambdaName);

    const smartCopy = copyFromTemplateToDestination(this)

    this.fs.copyTpl(
      this.templatePath("package.json"),
      this.destinationPath("package.json"),
      {
        newLambdaName: this.props.newLambdaName,
        newDescription: this.props.newDescription,
        newAuthor: this.props.newAuthor
      }
    );

    smartCopy("tsconfig.json")
    smartCopy(".editorconfig")
    smartCopy("jest.config.js")
    smartCopy(".gitignore")
    smartCopy("src/index.ts")
    smartCopy("src/types.ts")
    smartCopy("src/logic.ts")
  }

  install() {
    this.installDependencies();
  }
};

const copyFromTemplateToDestination = genInstance => path => genInstance.fs.copy(
  genInstance.templatePath(path),
  genInstance.destinationPath(path)
)