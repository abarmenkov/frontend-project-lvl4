start-frontend:
	make -C my-app start

start-backend:
	npx start-server -p 5001

start:
	make start-backend & make start-frontend

deploy:
	git push heroku main

lint-frontend:
	make -C my-app lint
