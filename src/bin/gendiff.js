#! /usr/bin/env node
import exec from 'commander';
import { readFileSync } from 'fs';
import genDiff from '..';

exec
  .version('0.0.1')
  .description('Compares two configuration files and shows a difference.')
  .usage('[options] <firstConfig> <secondConfig>')
  .option('-f, --format [type]', 'output format')
  .parse(process.argv);

const before = JSON.parse(readFileSync(process.argv[2]));
const after = JSON.parse(readFileSync(process.argv[3]));
console.log(genDiff(before, after));
