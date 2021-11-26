#!/usr/bin/env node
import program from 'commander';
import genDiff from '../src/genDiff.js';
// const program = new program();
program
  .version('0.1')  
  .description('Compares two configuration files and shows a difference.')  
  .arguments('<filepath1> <filepath2>')
  .action((filepath1, filepath2) => {
    return genDiff(filepath1, filepath2);
  })
  .option('-f, --format [type]', 'output format')
  
  program.parse();
