#!/usr/bin/env node
const args = process.argv;
if (args.length != 3) {
    console.error(`ERROR\nUsage: ${args[0]} ${args[1]} <question-number>`)
    process.exit(1);
}

const questionNum = args[2];
const fs = require("fs");
const files = fs.readdirSync('./src', {withFileTypes: true});
const matchingFolder = files.find(
    (file) => file.isDirectory() && file.name.startsWith(`${questionNum}.`)
);

if (!matchingFolder) {
    console.error(`Question ${questionNum} not found`);
    process.exit(2);
}

console.log("Question found")
const tsPath = `${matchingFolder.parentPath}/${matchingFolder.name}/index.ts`;

const {exec} = require('child_process');

exec(`ts-node "${tsPath}"`, (error, stdout, stderr) => {
    if (error) {
        console.error(`Error: ${error.message}`);
        return;
      }
      if (stderr) {
        console.error(stderr);
        return;
      }
      console.log(stdout);    
});