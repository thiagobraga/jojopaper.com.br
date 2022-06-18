PWD := $(shell pwd)
PATH := ${PWD}/node_modules/.bin:$(PATH)
POSTCSS_OPTIONS := autoprefixer cssnano
.SILENT: clean install dev release watch
all: clean install dev watch

clean:
	rm -rf theme.css node_modules

install:
	yarn

dev:
	sass -s expanded src/sass:.
	css2userstyle --no-userscript theme.css

release:
	sass -s compressed --no-charset --no-source-map src/sass:.
	postcss theme.css --no-map --replace --use ${POSTCSS_OPTIONS}
	css2userstyle --no-userscript theme.css

watch:
	chokidar src/sass -c 'make -s dev' & \
		browser-sync start --config bs-config.js & \
		wait
