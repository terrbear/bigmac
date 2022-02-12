run:
	npm start

build-data:
	go run report.go
	mv big-mac-index.json src/data

deploy:
	git branch -D deploy 
	git switch -c deploy
	PUBLIC_URL=https://terrbear.org/bigmac npm run build 
	mv build/* . 
	touch .nojekyll 
	git add . 
	git commit -m "deploy" 
	git push -u origin --force
	git switch main