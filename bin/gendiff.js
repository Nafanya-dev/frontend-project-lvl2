#!/usr/bin/env node
import program from 'commander';
import getComparison from '../src/getComparison.js';
// const program = new program();
program
  .version('0.1')  
  .description('Compares two configuration files and shows a difference.')  
  .arguments('<filepath1> <filepath2>')
  .action((filepath1, filepath2) => {
    return getComparison(filepath1, filepath2);
  })
  .option('-f, --format [type]', 'output format')
  
  program.parse();
