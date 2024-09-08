# Language: makefile

setup:
	cp .env.example .env
	npm install

test:
	NODE_ENV=test npm run test

key:
	openssl rand -hex 32