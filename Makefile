stand-start-server:
	cd ./stand/ && make up

stand-start-web-client:
	cd ./stand/client/web/ && npm run start

npm-packages-start:
	cd ./npm-packages && npm run watch