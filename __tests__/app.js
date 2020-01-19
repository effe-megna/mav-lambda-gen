"use strict";

const { join } = require('path');
const { file, JSONFileContent, fileContent } = require('yeoman-assert');
const { run } = require('yeoman-test');

describe('mav-lambda-gen:app', () => {
  beforeAll(() => {
    return run(join(__dirname, '../generators/app'))
      .withPrompts({
        newStackName: "apiGetMavMembers",
        newApiEndpoint: "members",
        newApiMethod: "GET",
        newLambdaName: "api_get_mav_members",
        newDescription: "provide mav members to clients",
        newAuthor: "Mavigex"
       });
  });

  it('package.json was created', () => {
    file(['package.json']);
  });

  it('package.json was created based on answers', () => {
    JSONFileContent("package.json", {
      name: "api_get_mav_members",
      description: "provide mav members to clients",
      author: "Mavigex"
    })
  });

  it('package.json was created with SAM debug and invoke scripts', () => {
    JSONFileContent("package.json", {
      "scripts": {
        "predebug": "tsc; rsync -qrk --exclude='.git' node_modules dist",
        "debug": "sam local invoke -t template-development.json -d 9229",
        "preinvoke": "tsc; rsync -qrk --exclude='.git' node_modules dist",
        "invoke": "sam local invoke -t template-development.json"
      }
    });
  });

  it('tsconfig.json was created', () => {
    file(['tsconfig.json']);
  });

  it('.editorconfig was created', () => {
    file(['.editorconfig']);
  });

  it('jest.config.js was created', () => {
    file(['jest.config.js']);
  });

  it('.gitignore was created', () => {
    file(['.gitignore']);
  });

  it('.nvmrc was created', () => {
    file(['.nvmrc']);
    fileContent('.nvmrc', 'v12');
  });


  it('src/index.ts was created', () => {
    file(['src/index.ts']);
  });

  it('src/logic.ts was created', () => {
    file(['src/logic.ts']);
  });

  it('src/types.ts was created', () => {
    file(['src/types.ts']);
  });

  it('VS Code debug setup was created', () => {
    file(['.vscode/launch.json']);
  });

  it('CloudFormation template for development stage was created', () => {
    file(['template-development.json']);
  });

  it('CloudFormation template for development stage was created based on answers', () => {
    JSONFileContent("template-development.json", {
      "Resources": {
        "apiGatewayResource": {
          "Type" : "AWS::ApiGateway::Resource",
          "Properties" : {
              "ParentId" : {"Ref": "ApiRootResourceId"},
              "PathPart" : "members",
              "RestApiId" : {"Ref": "ApiId"}
          }
        },
        "resourceMethod": {
          "Type" : "AWS::ApiGateway::Method",
          "Properties" : {
              "HttpMethod" : "GET"
          }
        },
        "lambdaFunction": {
          "Properties": {
            "FunctionName": "api_get_mav_members"
          }
        },
        "lambdaFunctionAliasDevelopmentInvokePermission": {
          "Type": "AWS::Lambda::Permission",
          "Properties": {
              "SourceArn": {"Fn::Sub": "arn:aws:execute-api:${AWS::Region}:${AWS::AccountId}:${ApiId}/*/GET/members"}
          }
        }
      }
    });
  });

  it('CloudFormation template was created', () => {
    file(['template.json']);
  });

  it('CloudFormation template was created based on answers', () => {
    JSONFileContent("template.json", {
      "Resources": {
        "apiGatewayResource": {
          "Type" : "AWS::ApiGateway::Resource",
          "Properties" : {
              "ParentId" : {"Ref": "ApiRootResourceId"},
              "PathPart" : "members",
              "RestApiId" : {"Ref": "ApiId"}
          }
        },
        "resourceMethod": {
          "Type" : "AWS::ApiGateway::Method",
          "Properties" : {
              "HttpMethod" : "GET"
          }
        },
        "lambdaFunction": {
          "Properties": {
            "FunctionName": "api_get_mav_members"
          }
        },
        "lambdaFunctionAliasStagingInvokePermission": {
          "Type": "AWS::Lambda::Permission",
          "Properties": {
              "SourceArn": {"Fn::Sub": "arn:aws:execute-api:${AWS::Region}:${AWS::AccountId}:${ApiId}/*/GET/members"}
          }
        },
        "lambdaFunctionAliasProductionInvokePermission": {
          "Type": "AWS::Lambda::Permission",
          "Properties": {
              "SourceArn": {"Fn::Sub": "arn:aws:execute-api:${AWS::Region}:${AWS::AccountId}:${ApiId}/*/GET/members"}
          }
        }
      }
    });
  });

  it('Bitbucket pipeline description file was created', () => {
    file(['bitbucket-pipelines.yml']);
  });
});
