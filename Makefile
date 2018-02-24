install:
	npm install
start:
	npm run babel-node -- src/bin/gendiff.js __tests__/__fixtures__/before.json __tests__/__fixtures__/after.json
run-yaml:
	npm run babel-node -- src/bin/gendiff.js __tests__/__fixtures__/before.yml __tests__/__fixtures__/after.yml
run-ini:
	npm run babel-node -- src/bin/gendiff.js __tests__/__fixtures__/before.ini __tests__/__fixtures__/after.ini
run-json-deep:
	npm run babel-node -- src/bin/gendiff.js __tests__/__fixtures__/beforeDeep.json __tests__/__fixtures__/afterDeep.json
run-help:
	npm run babel-node -- src/bin/gendiff.js -h
publish:
	npm publish
lint:
	npm run eslint .
test:
	npm test
