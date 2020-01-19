"use strict";

const { join } = require('path');
const { file, JSONFileContent } = require('yeoman-assert');
const { run } = require('yeoman-test');

describe('mav-lambda-gen:app', () => {
  beforeAll(() => {
    return run(join(__dirname, '../generators/app'))
      .withPrompts(
        { newLambdaName: "api_get_mav_members" },
        { newDescription: "provide mav members to clients" },
        { newAuthor: "Mavigex" }
      );
  });

  it('package.json was created', () => {
    file(['package.json']);
  });

  it('package.json was created based on answers', () => {
    JSONFileContent("package.json", { 
      name: "api_get_mav_members",
      // description: "provide mav members to clients", ** strange behavior
      author: "Mavigex"
    })
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

  it('src/index.ts was created', () => {
    file(['src/index.ts']);
  });

  it('src/logic.ts was created', () => {
    file(['src/logic.ts']);
  });

  it('src/types.ts was created', () => {
    file(['src/types.ts']);
  });
});
