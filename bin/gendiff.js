#!/usr/bin/env node
import program from 'commander';
import genDiff from '../genDiff.js';
// const program = new program();
program
  .version('0.1')
  .description('Compares two configuration files and shows a difference.')
  .argument('<filepath1>')
  .argument('<filepath2>')
  .option('-f, --format [type]', 'output format, stylish')
  .action((filepath1, filepath2, { format }) => {
    console.log(genDiff(filepath1, filepath2, format));
  });
program.parse();
