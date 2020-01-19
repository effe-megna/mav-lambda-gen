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
        name: 'newStackName',
        message : 'Enter a name for the new AWS CloudFormation stack (i.e.: apiGetMavMembers): '
      },
      {
        type: 'input',
        name: 'newApiEndpoint',
        message : 'Enter a name for the new API Gateway endpoint (i.e.: members): '
      },
      {
        type: 'input',
        name: 'newApiMethod',
        message : 'Enter a name for the new API Gateway method (i.e.: GET): ',
        default: 'GET'
      },
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
    this.fs.copyTpl(
      this.templatePath("template-development.json"),
      this.destinationPath("template-development.json"),
      {
        newLambdaName: this.props.newLambdaName,
        newDescription: this.props.newDescription,
        newApiEndpoint: this.props.newApiEndpoint,
        newApiMethod: this.props.newApiMethod
      }
    );
    this.fs.copyTpl(
      this.templatePath("template.json"),
      this.destinationPath("template.json"),
      {
        newLambdaName: this.props.newLambdaName,
        newDescription: this.props.newDescription,
        newApiEndpoint: this.props.newApiEndpoint,
        newApiMethod: this.props.newApiMethod
      }
    );
    this.fs.copyTpl(
      this.templatePath("bitbucket-pipelines.yml"),
      this.destinationPath("bitbucket-pipelines.yml"),
      {
        newLambdaName: this.props.newLambdaName,
        newStackName: this.props.newStackName
      }
    );

    smartCopy("tsconfig.json")
    smartCopy(".editorconfig")
    smartCopy("jest.config.js")
    smartCopy(".gitignore")
    smartCopy(".nvmrc")
    smartCopy("src/index.ts")
    smartCopy("src/types.ts")
    smartCopy("src/logic.ts")
    smartCopy(".vscode/launch.json")
  }

  install() {
    this.npmInstall();
  }
};

const copyFromTemplateToDestination = genInstance => path => genInstance.fs.copy(
  genInstance.templatePath(path),
  genInstance.destinationPath(path)
)
