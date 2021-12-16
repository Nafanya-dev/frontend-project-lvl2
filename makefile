install:
	npm ci

publish:
	npm publish --dry-run

genDiff:
	npm link

lint:
	npx eslint .

test:	
	npx jest
