clean:
	rm -rf ./dist

serve:
	yarn run serve

build:
	yarn run build
	@echo Compressing Javascripts.
	find dist/ -iname '*.js' -print0 | xargs -0 zopfli
	@echo Compressing Stylesheets.
	find dist/ -iname '*.css' -print0 | xargs -0 zopfli
	@echo Compressing index.html.
	zopfli dist/index.html

stage: build
	rsync -rhcP --delete dist/ osrsmoe:/srv/osrs.moe_staging

deploy: build
	rsync -rhcP --delete dist/ osrsmoe:/srv/osrs.moe/
