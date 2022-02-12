run:
	npm start

build-data:
	go run report.go
	mv big-mac-index.json src/data