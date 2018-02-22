#! /usr/bin/env node
import exec from 'commander';
import { readFileSync } from 'fs';
import { safeLoad } from 'js-yaml';
import { parse as parseIni } from 'ini';
import genDiff from '..';

exec
  .version('0.0.1')
  .description('Compares two configuration files and shows a difference.')
  .usage('[options] <firstConfig> <secondConfig>')
  .option('-f, --format [type]', 'output format')
  .parse(process.argv);


const lastArg = process.argv[process.argv.length - 1].toLowerCase();
const beforeLastArg = process.argv[process.argv.length - 2].toLowerCase();

const extOfFile = (filePath) => {
  if (filePath.indexOf('.yml') !== -1) { return { type: 'yaml', file: filePath }; }
  if (filePath.indexOf('.json') !== -1) { return { type: 'json', file: filePath }; }
  if (filePath.indexOf('.ini') !== -1) { return { type: 'ini', file: filePath }; }
  return { type: 'unknown', file: filePath };
};

const chooseParser = (obj) => {
  switch (obj.type) {
    case 'json':
      return JSON.parse(readFileSync(obj.file));
    case 'yaml':
      return safeLoad(readFileSync(obj.file));
    case 'ini':
      return parseIni(readFileSync(obj.file, 'utf-8'));
    default:
      return readFileSync(obj.file);
  }
};

const before = chooseParser(extOfFile(beforeLastArg));
const after = chooseParser(extOfFile(lastArg));
console.log(genDiff(before, after));
