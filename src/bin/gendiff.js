#! /usr/bin/env node
import exec from 'commander';

exec
  .version('0.0.1')
  .description('Compares two configuration files and shows a difference.')
  .usage('[options] <firstConfig> <secondConfig>')
  .option('-f, --format [type]', 'output format')
  .parse(process.argv);
