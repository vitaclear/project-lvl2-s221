#! /usr/bin/env node
import exec from 'commander';
import { readFileSync } from 'fs';
import { safeLoad } from 'js-yaml';
import genDiff from '..';

exec
  .version('0.0.1')
  .description('Compares two configuration files and shows a difference.')
  .usage('[options] <firstConfig> <secondConfig>')
  .option('-f, --format [type]', 'output format')
  .parse(process.argv);


const lastArg = process.argv[process.argv.length - 1].toLowerCase();
const beforeLastArg = process.argv[process.argv.length - 2].toLowerCase();
const extentionBefore = beforeLastArg.indexOf('.yml') !== -1 ? 'yaml' : 'json';
const extentionAfter = lastArg.indexOf('.yml') !== -1 ? 'yaml' : 'json';

const chooseParser = (extention, file) => {
  switch (extention) {
    case 'json':
      return JSON.parse(readFileSync(file));
    case 'yaml':
      return safeLoad(readFileSync(file));
    default:
      return readFileSync(file);
  }
};

const before = chooseParser(extentionBefore, beforeLastArg);
const after = chooseParser(extentionAfter, lastArg);
console.log(genDiff(before, after));
