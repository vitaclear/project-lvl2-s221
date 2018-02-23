#! /usr/bin/env node
import exec from 'commander';
import genDiff from '..';
import { version, description } from '../../package.json';

exec
  .version(version)
  .description(description)
  .usage('[options] <firstConfig> <secondConfig>')
  .option('-f, --format [type]', 'output format')
  .parse(process.argv);


const lastArg = process.argv[process.argv.length - 1].toLowerCase();
const beforeLastArg = process.argv[process.argv.length - 2].toLowerCase();

console.log(genDiff(beforeLastArg, lastArg));
