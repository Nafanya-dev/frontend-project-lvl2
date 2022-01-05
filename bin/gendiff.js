#!/usr/bin/env node
import program from 'commander';
import index from '../index.js';
// const program = new program();
program
  .version('0.1')
  .description('Compares two configuration files and shows a difference.')
  .argument('<filepath1>')
  .argument('<filepath2>')
  .argument('[format]')
  .action((filepath1, filepath2, format) => index(filepath1, filepath2, format))
  .option('-f, --format [type]', 'output format, stylish');
program.parse();
